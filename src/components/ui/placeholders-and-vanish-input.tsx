/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { LucideLoader2 } from "lucide-react";

const RANDOM = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1) + min);

export function PlaceholdersAndVanishInput({
	placeholders,
	onChange,
	onSubmit,
	searching,
}: {
	placeholders: string[];
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	searching?: boolean;
}) {
	const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
	const intervalRef = useRef<number | null>(null);
	const [isButtonHovered, setIsButtonHovered] = useState(false);
	const particleRefs = useRef<(SVGSVGElement | null)[]>([]);

	const startAnimation = () => {
		intervalRef.current = setInterval(() => {
			setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
		}, 3000);
	};

	const handleVisibilityChange = () => {
		if (document.visibilityState !== "visible" && intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		} else if (document.visibilityState === "visible") {
			startAnimation();
		}
	};

	useEffect(() => {
		startAnimation();
		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [placeholders]);

	// Initialize particle positions
	useEffect(() => {
		particleRefs.current.forEach((p) => {
			if (p) {
				p.style.setProperty("--x", String(RANDOM(20, 80)));
				p.style.setProperty("--y", String(RANDOM(20, 80)));
				p.style.setProperty("--duration", String(RANDOM(6, 20)));
				p.style.setProperty("--delay", String(RANDOM(1, 10)));
				p.style.setProperty("--alpha", String(RANDOM(40, 90) / 100));
				p.style.setProperty(
					"--origin-x",
					`${Math.random() > 0.5 ? RANDOM(300, 800) * -1 : RANDOM(300, 800)}%`
				);
				p.style.setProperty(
					"--origin-y",
					`${Math.random() > 0.5 ? RANDOM(300, 800) * -1 : RANDOM(300, 800)}%`
				);
				p.style.setProperty("--size", String(RANDOM(40, 90) / 100));
			}
		});
	}, []);

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const newDataRef = useRef<any[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);
	const [value, setValue] = useState("");
	const [animating, setAnimating] = useState(false);

	const draw = useCallback(() => {
		if (!inputRef.current) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d", { willReadFrequently: true });
		if (!ctx) return;

		canvas.width = 800;
		canvas.height = 800;
		ctx.clearRect(0, 0, 800, 800);
		const computedStyles = getComputedStyle(inputRef.current);
		const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
		ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
		ctx.fillStyle = "#FFF";
		ctx.fillText(value, 16, 40);

		const imageData = ctx.getImageData(0, 0, 800, 800);
		const pixelData = imageData.data;
		const newData: any[] = [];

		for (let t = 0; t < 800; t++) {
			const i = 4 * t * 800;
			for (let n = 0; n < 800; n++) {
				const e = i + 4 * n;
				if (
					pixelData[e] !== 0 &&
					pixelData[e + 1] !== 0 &&
					pixelData[e + 2] !== 0
				) {
					newData.push({
						x: n,
						y: t,
						color: [
							pixelData[e],
							pixelData[e + 1],
							pixelData[e + 2],
							pixelData[e + 3],
						],
					});
				}
			}
		}

		newDataRef.current = newData.map(({ x, y, color }) => ({
			x,
			y,
			r: 1,
			color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
		}));
	}, [value]);

	useEffect(() => {
		draw();
	}, [value, draw]);

	const animate = (start: number) => {
		const animateFrame = (pos: number = 0) => {
			requestAnimationFrame(() => {
				const newArr = [];
				for (let i = 0; i < newDataRef.current.length; i++) {
					const current = newDataRef.current[i];
					if (current.x < pos) {
						newArr.push(current);
					} else {
						if (current.r <= 0) continue;
						current.x += Math.random() > 0.5 ? 1 : -1;
						current.y += Math.random() > 0.5 ? 1 : -1;
						current.r -= 0.05 * Math.random();
						newArr.push(current);
					}
				}
				newDataRef.current = newArr;
				const ctx = canvasRef.current?.getContext("2d");
				if (ctx) {
					ctx.clearRect(pos, 0, 800, 800);
					newDataRef.current.forEach((t) => {
						const { x: n, y: i, r: s, color } = t;
						if (n > pos) {
							ctx.beginPath();
							ctx.rect(n, i, s, s);
							ctx.fillStyle = color;
							ctx.strokeStyle = color;
							ctx.stroke();
						}
					});
				}
				if (newDataRef.current.length > 0) {
					animateFrame(pos - 8);
				} else {
					setValue("");
					setAnimating(false);
				}
			});
		};
		animateFrame(start);
	};

	const vanishAndSubmit = () => {
		setAnimating(true);
		draw();

		const value = inputRef.current?.value || "";
		if (value && inputRef.current) {
			const maxX = newDataRef.current.reduce(
				(prev, current) => (current.x > prev ? current.x : prev),
				0
			);
			animate(maxX);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		vanishAndSubmit();
		onSubmit && onSubmit(e);
	};

	return (
		<>
			<style>{`
				.sparkle-btn {
					--cut: 0.1em;
					--active: 0;
					--transition: 0.25s;
					--spark: 1.8s;
					--bg: radial-gradient(
							40% 50% at center 100%,
							hsl(270 calc(var(--active) * 97%) 72% / var(--active)),
							transparent
						),
						radial-gradient(
							80% 100% at center 120%,
							hsl(260 calc(var(--active) * 97%) 70% / var(--active)),
							transparent
						),
						hsl(260 calc(var(--active) * 97%) calc((var(--active) * 44%) + 12%));
					background: var(--bg);
					box-shadow: 0 0 calc(var(--active) * 6em) calc(var(--active) * 3em) hsl(260 97% 61% / 0.75),
						0 0.05em 0 0 hsl(260 calc(var(--active) * 97%) calc((var(--active) * 50%) + 30%)) inset,
						0 -0.05em 0 0 hsl(260 calc(var(--active) * 97%) calc(var(--active) * 60%)) inset;
					transition: box-shadow var(--transition), scale var(--transition), background var(--transition);
					scale: calc(1 + (var(--active) * 0.1));
				}

				.sparkle-btn:active {
					scale: 1;
				}

				.sparkle-btn svg {
					overflow: visible !important;
				}

				.sparkle-svg path {
					color: hsl(0 0% calc((var(--active, 0) * 70%) + var(--base)));
					transform-box: fill-box;
					transform-origin: center;
					fill: currentColor;
					stroke: currentColor;
					animation-delay: calc((var(--transition) * 1.5) + (var(--delay) * 1s));
					animation-duration: 0.6s;
					transition: color var(--transition);
				}

				.sparkle-btn:hover .sparkle-svg path {
					animation-name: bounce;
				}

				@keyframes bounce {
					35%, 65% {
						scale: var(--scale);
					}
				}

				.sparkle-svg path:nth-of-type(1) {
					--scale: 0.5;
					--delay: 0.1;
					--base: 40%;
				}

				.sparkle-svg path:nth-of-type(2) {
					--scale: 1.5;
					--delay: 0.2;
					--base: 20%;
				}

				.sparkle-svg path:nth-of-type(3) {
					--scale: 2.5;
					--delay: 0.35;
					--base: 30%;
				}

				.sparkle-btn:before {
					content: "";
					position: absolute;
					inset: -0.25em;
					z-index: -1;
					border: 0.25em solid hsl(260 97% 50% / 0.5);
					border-radius: 100px;
					opacity: var(--active, 0);
					transition: opacity var(--transition);
				}

				.spark {
					position: absolute;
					inset: 0;
					border-radius: 100px;
					rotate: 0deg;
					overflow: hidden;
					mask: linear-gradient(white, transparent 50%);
					animation: flip calc(var(--spark) * 2) infinite steps(2, end);
				}

				@keyframes flip {
					to {
						rotate: 360deg;
					}
				}

				.spark:before {
					content: "";
					position: absolute;
					width: 200%;
					aspect-ratio: 1;
					top: 0%;
					left: 50%;
					z-index: -1;
					translate: -50% -15%;
					rotate: 0;
					transform: rotate(-90deg);
					opacity: calc((var(--active)) + 0.4);
					background: conic-gradient(from 0deg, transparent 0 340deg, white 360deg);
					transition: opacity var(--transition);
					animation: rotate var(--spark) linear infinite both;
				}

				.spark:after {
					content: "";
					position: absolute;
					inset: var(--cut);
					border-radius: 100px;
				}

				.backdrop {
					position: absolute;
					inset: var(--cut);
					background: var(--bg);
					border-radius: 100px;
					transition: background var(--transition);
				}

				@keyframes rotate {
					to {
						transform: rotate(90deg);
					}
				}

				.particle-pen {
					position: absolute;
					width: 200%;
					aspect-ratio: 1;
					top: 50%;
					left: 50%;
					translate: -50% -50%;
					-webkit-mask: radial-gradient(white, transparent 65%);
					z-index: -1;
					opacity: var(--active, 0);
					transition: opacity var(--transition);
					pointer-events: none;
				}

				.particle {
					fill: white;
					width: calc(var(--size, 0.25) * 1rem);
					aspect-ratio: 1;
					position: absolute;
					top: calc(var(--y) * 1%);
					left: calc(var(--x) * 1%);
					opacity: var(--alpha, 1);
					animation: float-out calc(var(--duration, 1) * 1s) calc(var(--delay) * -1s) infinite linear;
					transform-origin: var(--origin-x, 1000%) var(--origin-y, 1000%);
					z-index: -1;
					animation-play-state: var(--play-state, paused);
				}

				.particle path {
					fill: hsl(0 0% 90%);
					stroke: none;
				}

				.particle:nth-of-type(even) {
					animation-direction: reverse;
				}

				@keyframes float-out {
					to {
						rotate: 360deg;
					}
				}

				.text-sparkle {
					translate: 2% -6%;
					letter-spacing: 0.01ch;
					background: linear-gradient(
						90deg,
						hsl(0 0% calc((var(--active) * 100%) + 65%)),
						hsl(0 0% calc((var(--active) * 100%) + 26%))
					);
					-webkit-background-clip: text;
					background-clip: text;
					color: transparent;
					transition: background var(--transition);
				}

				.sparkle-svg {
					inline-size: 1.25em;
					translate: -25% -5%;
				}
			`}</style>

			<form
				className={cn(
					"w-full relative max-w-3xl mx-auto bg-[#131213] border border-gray-600 h-16 rounded-xl overflow-hidden transition duration-200",
					"shadow-[0_0_20px_rgba(255,255,255,0.15),_0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)]"
				)}
				onSubmit={handleSubmit}>
				{/* Canvas for vanish animation */}
				<canvas
					className={cn(
						"absolute pointer-events-none text-white transform scale-50 top-[20%] left-2 sm:left-8 origin-top-left filter invert dark:invert-0 pr-20",
						!animating ? "opacity-0" : "opacity-100"
					)}
					ref={canvasRef}
				/>

				{/* Input field */}
				<input
					onChange={(e) => {
						if (!animating) {
							setValue(e.target.value);
							onChange && onChange(e);
						}
					}}
					onKeyDown={(e) =>
						e.key === "Enter" && !animating && vanishAndSubmit()
					}
					ref={inputRef}
					value={value}
					type="text"
					className={cn(
						"w-full relative text-sm sm:text-base z-50 border-none text-white bg-transparent h-full rounded-full focus:outline-none focus:ring-0 pl-2 sm:pl-8 pr-20",
						animating && "text-transparent dark:text-transparent"
					)}
				/>

				{/* Glowing animated background behind button */}
				<motion.div
					className="absolute right-4 top-1/2 -translate-y-1/2 w-[110px] h-[45px] rounded-full opacity-40 blur-md z-40"
					animate={{
						backgroundPosition: ["0% 80%", "100% 50%", "0% 50%"],
					}}
					transition={{
						duration: 6,
						ease: "linear",
						repeat: Infinity,
					}}
					// style={{
					// 	background:
					// 		"linear-gradient(90deg, #007bff, #00ffff, #ff00ff, #007bff)",
					// 	backgroundSize: "300% 300%",
					// }}
				/>

				{/* Sparkle Button */}
				<div className="absolute right-4 top-1/2 -translate-y-1/2 z-50">
					<button
						disabled={!value}
						type="submit"
						className="sparkle-btn px-4 py-2 rounded-full border-2 font-medium flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed border-gray-500 bg-[#131213] text-white transition duration-200"
						onMouseEnter={() => setIsButtonHovered(true)}
						onMouseLeave={() => setIsButtonHovered(false)}
						style={
							{
								"--active": isButtonHovered && value ? 1 : 0,
							} as any
						}>
						<span className="spark"></span>
						<span className="backdrop"></span>
						<svg
							className="sparkle-svg"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
								fill="currentColor"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
								fill="currentColor"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
								fill="currentColor"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<span className="text-sparkle">
							{searching ? (
								<div className="flex items-center gap-2">
									<LucideLoader2
										className="animate-spin"
										size={18}
									/>{" "}
									Searching
								</div>
							) : (
								"Explore"
							)}
						</span>
					</button>
					<span
						className="particle-pen"
						style={
							{
								"--active": isButtonHovered && value ? 1 : 0,
								"--play-state": isButtonHovered && value ? "running" : "paused",
							} as any
						}>
						{[...Array(20)].map((_, i) => (
							<svg
								key={i}
								ref={(el: any) => (particleRefs.current[i] = el)}
								className="particle"
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M6.937 3.846L7.75 1L8.563 3.846C8.77313 4.58114 9.1671 5.25062 9.70774 5.79126C10.2484 6.3319 10.9179 6.72587 11.653 6.936L14.5 7.75L11.654 8.563C10.9189 8.77313 10.2494 9.1671 9.70874 9.70774C9.1681 10.2484 8.77413 10.9179 8.564 11.653L7.75 14.5L6.937 11.654C6.72687 10.9189 6.3329 10.2494 5.79226 9.70874C5.25162 9.1681 4.58214 8.77413 3.847 8.564L1 7.75L3.846 6.937C4.58114 6.72687 5.25062 6.3329 5.79126 5.79226C6.3319 5.25162 6.72587 4.58214 6.936 3.847L6.937 3.846Z"
									fill="white"
									stroke="white"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						))}
					</span>
				</div>

				{/* Placeholder animation */}
				<div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
					<AnimatePresence mode="wait">
						{!value && (
							<motion.p
								initial={{ y: 5, opacity: 0 }}
								key={`placeholder-${currentPlaceholder}`}
								animate={{ y: 0, opacity: 1 }}
								exit={{ y: -15, opacity: 0 }}
								transition={{ duration: 0.3, ease: "linear" }}
								className="text-sm sm:text-base font-normal text-white/80 pl-4 sm:pl-8 text-left w-[calc(100%-2rem)] truncate">
								{placeholders[currentPlaceholder]}
							</motion.p>
						)}
					</AnimatePresence>
				</div>
			</form>
		</>
	);
}
