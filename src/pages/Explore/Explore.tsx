/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Multipliers {
  mouse: number;
  firefox: number;
}

interface WheelCoords {
  x: number;
  y: number;
}

interface MaxCoords {
  x: number;
  y: number;
}

class Core {
  tx: number = 0;
  ty: number = 0;
  cx: number = 0;
  cy: number = 0;
  diff: number = 0;
  wheel: WheelCoords = { x: 0, y: 0 };
  on: WheelCoords = { x: 0, y: 0 };
  max: MaxCoords = { x: 0, y: 0 };
  isDragging: boolean = false;
  el: HTMLElement | null = null;
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  renderer: THREE.WebGLRenderer;
  planes: Plane[] = [];
  ww: number;
  wh: number;
  multipliers: Multipliers;
  animationId: number | null = null;

  constructor(ww: number, wh: number, multipliers: Multipliers) {
    this.ww = ww;
    this.wh = wh;
    this.multipliers = multipliers;
    this.el = document.querySelector(".js-grid");

    /** GL specifics **/
    this.scene = new THREE.Scene();

    this.camera = new THREE.OrthographicCamera(
      ww / -2,
      ww / 2,
      wh / 2,
      wh / -2,
      1,
      1000
    );
    this.camera.lookAt(this.scene.position);
    this.camera.position.z = 1;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(ww, wh);
    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 1.5)
    );

    document.body.appendChild(this.renderer.domElement);
    /** Gl specifics end **/

    this.addPlanes();
    this.addEvents();
    this.resize();
    this.tick();
  }

  addEvents(): void {
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mousedown", this.onMouseDown);
    window.addEventListener("mouseup", this.onMouseUp);
    window.addEventListener("wheel", this.onWheel);
    window.addEventListener("resize", this.resize);
  }

  addPlanes(): void {
    const planes = [...document.querySelectorAll<HTMLElement>(".js-plane")];

    this.planes = planes.map((el, i) => {
      const plane = new Plane(this.ww, this.wh);
      plane.init(el, i);

      this.scene.add(plane);

      return plane;
    });
  }

  tick = (): void => {
    this.animationId = requestAnimationFrame(this.tick);

    const xDiff = this.tx - this.cx;
    const yDiff = this.ty - this.cy;

    this.cx += xDiff * 0.085;
    this.cx = Math.round(this.cx * 100) / 100;

    this.cy += yDiff * 0.085;
    this.cy = Math.round(this.cy * 100) / 100;

    this.diff = Math.max(
      Math.abs(yDiff * 0.0001),
      Math.abs(xDiff * 0.0001)
    );

    this.planes.length &&
      this.planes.forEach((plane) =>
        plane.update(this.cx, this.cy, this.max, this.diff)
      );

    this.renderer.render(this.scene, this.camera);
  };

  onMouseMove = (e: MouseEvent): void => {
    if (!this.isDragging) return;

    this.tx = this.on.x + e.clientX * 2.5;
    this.ty = this.on.y - e.clientY * 2.5;
  };

  onMouseDown = (e: MouseEvent): void => {
    if (this.isDragging) return;

    this.isDragging = true;

    this.on.x = this.tx - e.clientX * 2.5;
    this.on.y = this.ty + e.clientY * 2.5;
  };

  onMouseUp = (): void => {
    if (!this.isDragging) return;

    this.isDragging = false;
  };

  onWheel = (e: WheelEvent): void => {
    const { mouse, firefox } = this.multipliers;
    const isFirefox = navigator.userAgent.indexOf("Firefox") > -1;

    this.wheel.x = (e as any).wheelDeltaX || e.deltaX * -1;
    this.wheel.y = (e as any).wheelDeltaY || e.deltaY * -1;

    if (isFirefox && e.deltaMode === 1) {
      this.wheel.x *= firefox;
      this.wheel.y *= firefox;
    }

    this.wheel.y *= mouse;
    this.wheel.x *= mouse;

    this.tx += this.wheel.x;
    this.ty -= this.wheel.y;
  };

  resize = (): void => {
    this.ww = window.innerWidth;
    this.wh = window.innerHeight;

    this.camera.left = this.ww / -2;
    this.camera.right = this.ww / 2;
    this.camera.top = this.wh / 2;
    this.camera.bottom = this.wh / -2;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.ww, this.wh);

    if (!this.el) return;

    const { bottom, right } = this.el.getBoundingClientRect();

    this.max.x = right;
    this.max.y = bottom;

    this.planes.forEach(plane => {
      plane.ww = this.ww;
      plane.wh = this.wh;
      plane.resize();
    });
  };

  destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mousedown", this.onMouseDown);
    window.removeEventListener("mouseup", this.onMouseUp);
    window.removeEventListener("wheel", this.onWheel);
    window.removeEventListener("resize", this.resize);
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
    }
    this.planes.forEach(plane => {
      plane.geometry.dispose();
      plane.material.dispose();
      if (plane.texture) plane.texture.dispose();
    });
  }
}

/** PLANE **/
const loader = new THREE.TextureLoader();

const vertexShader = `
precision mediump float;

uniform float u_diff;

varying vec2 vUv;

void main(){
vec3 pos = position;

pos.y *= 1. - u_diff;
pos.x *= 1. - u_diff;

vUv = uv;
gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);;
}
`;

const fragmentShader = `
precision mediump float;

uniform vec2 u_res;
uniform vec2 u_size;

uniform sampler2D u_texture;

vec2 cover(vec2 screenSize, vec2 imageSize, vec2 uv) {
float screenRatio = screenSize.x / screenSize.y;
float imageRatio = imageSize.x / imageSize.y;

vec2 newSize = screenRatio < imageRatio 
? vec2(imageSize.x * (screenSize.y / imageSize.y), screenSize.y)
: vec2(screenSize.x, imageSize.y * (screenSize.x / imageSize.x));
vec2 newOffset = (screenRatio < imageRatio 
? vec2((newSize.x - screenSize.x) / 2.0, 0.0) 
: vec2(0.0, (newSize.y - screenSize.y) / 2.0)) / newSize;

return uv * screenSize / newSize + newOffset;
}

varying vec2 vUv;

void main() {
vec2 uv = vUv;

vec2 uvCover = cover(u_res, u_size, uv);
vec4 texture = texture2D(u_texture, uvCover);

gl_FragColor = texture;
}
`;

const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

interface PlaneUniforms {
  [key: string]: { value: any };
  u_texture: { value: THREE.Texture | number };
  u_res: { value: THREE.Vector2 };
  u_size: { value: THREE.Vector2 };
  u_diff: { value: number };
}

function wrap(min: number, max: number, value: number): number {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

class Plane extends THREE.Object3D {
  el!: HTMLElement;
  x: number = 0;
  y: number = 0;
  my: number = 1;
  geometry!: THREE.PlaneGeometry;
  material!: THREE.ShaderMaterial;
  texture!: THREE.Texture;
  mesh!: THREE.Mesh;
  rect!: DOMRect;
  xOffset: number = 0;
  yOffset: number = 0;
  ww: number;
  wh: number;

  constructor(ww: number, wh: number) {
    super();
    this.ww = ww;
    this.wh = wh;
  }

  init(el: HTMLElement, i: number): void {
    this.el = el;

    this.x = 0;
    this.y = 0;

    this.my = 1 - (i % 5) * 0.1;

    this.geometry = geometry.clone();
    this.material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        u_texture: { value: 0 },
        u_res: { value: new THREE.Vector2(1, 1) },
        u_size: { value: new THREE.Vector2(1, 1) },
        u_diff: { value: 0 },
      }
    });

    const dataSrc = this.el.dataset.src;
    if (dataSrc) {
      this.texture = loader.load(dataSrc, (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;

        const { naturalWidth, naturalHeight } = texture.image;
        const uniforms = this.material.uniforms as PlaneUniforms;
        const { u_size, u_texture } = uniforms;

        u_texture.value = texture;
        u_size.value.x = naturalWidth;
        u_size.value.y = naturalHeight;
      });
    }

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.add(this.mesh);

    this.resize();
  }

  update = (x: number, y: number, max: MaxCoords, diff: number): void => {
    const { right, bottom } = this.rect;
    const uniforms = this.material.uniforms as PlaneUniforms;
    const { u_diff } = uniforms;

    this.y = wrap(-(max.y - bottom), bottom, y * this.my) - this.yOffset;
    this.x = wrap(-(max.x - right), right, x) - this.xOffset;

    u_diff.value = diff;

    this.position.x = this.x;
    this.position.y = this.y;
  };

  resize(): void {
    this.rect = this.el.getBoundingClientRect();

    const { left, top, width, height } = this.rect;
    const uniforms = this.material.uniforms as PlaneUniforms;

    this.xOffset = left + width / 2 - this.ww / 2;
    this.yOffset = top + height / 2 - this.wh / 2;

    this.position.x = this.xOffset;
    this.position.y = this.yOffset;

    uniforms.u_res.value.x = width;
    uniforms.u_res.value.y = height;

    this.mesh.scale.set(width, height, 1);
  }
}

export default function InfiniteGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ww = window.innerWidth;
    const wh = window.innerHeight;

    const isWindows = navigator.appVersion.indexOf("Win") != -1;

    const mouseMultiplier = 0.6;
    const firefoxMultiplier = 20;

    const multipliers: Multipliers = {
      mouse: isWindows ? mouseMultiplier * 2 : mouseMultiplier,
      firefox: isWindows ? firefoxMultiplier * 2 : firefoxMultiplier,
    };

    const core = new Core(ww, wh, multipliers);

    return () => {
      core.destroy();
    };
  }, []);

  return (
    <>
      <style>{`
        body {
          overflow: hidden;
          margin: 0;
          padding: 0;
        }

        *::-webkit-scrollbar {
          display: none;
        }

        * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .grid {
          user-select: none;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2vw;
          padding: 2vw;
          width: 200vw;
          height: 200vh;
        }

        canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          background: transparent;
        }

        .js-plane {
          width: 100%;
          height: 100%;
          background: transparent;
          border-radius: 16px;
          overflow: hidden;
        }

        .w-dyn-list {
          width: 100%;
          height: 100%;
        }

        .w-dyn-items {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5vw;
          padding: 2vw;
        }

        .w-dyn-item {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: transparent;
        }

        .w-dyn-item:nth-child(3n+1) {
          grid-row: span 2;
        }

        .w-dyn-item:nth-child(5n+2) {
          grid-column: span 2;
        }

        .w-dyn-item:nth-child(7n+3) {
          grid-row: span 2;
          grid-column: span 2;
        }

        .embed {
          width: 100%;
          height: 100%;
        }

        .w-embed {
          width: 100%;
          height: 100%;
        }

        @media (max-width: 1200px) {
          .w-dyn-items {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .w-dyn-items {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 2vw;
          }
        }

        @media (max-width: 480px) {
          .w-dyn-items {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 2.5vw;
          }
        }
      `}</style>

      <div className="w-dyn-list" ref={containerRef}>
        <div role="list" className="grid js-grid w-dyn-items">
          <div role="listitem" className="div w-dyn-item">
            <div className="embed w-embed">
              <figure
                className="js-plane"
                data-src="https://cdn.prod.website-files.com/6241e4a88f77682170e17d32/6241e4a88f7768212ae17d35_1648480981580-image13.jpg"
              ></figure>
            </div>
          </div>
          <div role="listitem" className="div w-dyn-item">
            <div className="embed w-embed">
              <figure
                className="js-plane"
                data-src="https://cdn.prod.website-files.com/6241e4a88f77682170e17d32/6241e4a88f7768df22e17d39_1648480981697-image18.jpg"
              ></figure>
            </div>
          </div>
          <div role="listitem" className="div w-dyn-item">
            <div className="embed w-embed">
              <figure
                className="js-plane"
                data-src="https://cdn.prod.website-files.com/6241e4a88f77682170e17d32/6241e4a88f7768cc6de17d34_1648480981582-image7.jpg"
              ></figure>
            </div>
          </div>
          <div role="listitem" className="div w-dyn-item">
            <div className="embed w-embed">
              <figure
                className="js-plane"
                data-src="https://cdn.prod.website-files.com/6241e4a88f77682170e17d32/6241e4a88f7768711ae17d37_1648480981698-image19.jpg"
              ></figure>
            </div>
          </div>
          <div role="listitem" className="div w-dyn-item">
            <div className="embed w-embed">
              <figure
                className="js-plane"
                data-src="https://cdn.prod.website-files.com/6241e4a88f77682170e17d32/6241e4a88f776816efe17d38_1648480981659-image14.jpg"
              ></figure>
            </div>
          </div>
          <div role="listitem" className="div w-dyn-item">
            <div className="embed w-embed">
              <figure
                className="js-plane"
                data-src="https://cdn.prod.website-files.com/6241e4a88f77682170e17d32/6241e4a88f776816efe17d38_1648480981659-image14.jpg"
              ></figure>
            </div>
          </div>
          <div role="listitem" className="div w-dyn-item">
            <div className="embed w-embed">
              <figure
                className="js-plane"
                data-src="https://cdn.prod.website-files.com/6241e4a88f77682170e17d32/6241e4a88f776816efe17d38_1648480981659-image14.jpg"
              ></figure>
            </div>
          </div>
          <div role="listitem" className="div w-dyn-item">
            <div className="embed w-embed">
              <figure
                className="js-plane"
                data-src="https://cdn.prod.website-files.com/6241e4a88f77682170e17d32/6241e4a88f7768df22e17d39_1648480981697-image18.jpg"
              ></figure>
            </div>
          </div>
          <div role="listitem" className="div w-dyn-item">
            <div className="embed w-embed">
              <figure
                className="js-plane"
                data-src="https://cdn.prod.website-files.com/6241e4a88f77682170e17d32/6241e4a88f7768212ae17d35_1648480981580-image13.jpg"
              ></figure>
            </div>
          </div>
          <div role="listitem" className="div w-dyn-item">
            <div className="embed w-embed">
              <figure
                className="js-plane"
                data-src="https://cdn.prod.website-files.com/6241e4a88f77682170e17d32/6241e4a88f77682b70e17d3b_1648480981758-image1.jpg"
              ></figure>
            </div>
          </div>
          <div role="listitem" className="div w-dyn-item">
            <div className="embed w-embed">
              <figure
                className="js-plane"
                data-src="https://cdn.prod.website-files.com/6241e4a88f77682170e17d32/6241e4a88f77683013e17d36_1648480981578-image6.jpg"
              ></figure>
            </div>
          </div>
          <div role="listitem" className="div w-dyn-item">
            <div className="embed w-embed">
              <figure
                className="js-plane"
                data-src="https://cdn.prod.website-files.com/6241e4a88f77682170e17d32/6241e4a88f7768823ae17d3e_1648480981757-image5.jpg"
              ></figure>
            </div>
          </div>
          <div role="listitem" className="div w-dyn-item">
            <div className="embed w-embed">
              <figure
                className="js-plane"
                data-src="https://cdn.prod.website-files.com/6241e4a88f77682170e17d32/6241e4a88f7768212ae17d35_1648480981580-image13.jpg"
              ></figure>
            </div>
          </div>
          <div role="listitem" className="div w-dyn-item">
            <div className="embed w-embed">
              <figure
                className="js-plane"
                data-src="https://cdn.prod.website-files.com/6241e4a88f77682170e17d32/6241e4a88f7768aa5be17d3c_1648480981759-image2.jpg"
              ></figure>
            </div>
          </div>
          <div role="listitem" className="div w-dyn-item">
            <div className="embed w-embed">
              <figure
                className="js-plane"
                data-src="https://cdn.prod.website-files.com/6241e4a88f77682170e17d32/6241e4a88f7768823ae17d3e_1648480981757-image5.jpg"
              ></figure>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}