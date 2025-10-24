"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { LucideLoader2 } from "lucide-react";

export function PlaceholdersAndVanishInput({
	placeholders,
	onChange,
	onSubmit,
	searching
}: {
	placeholders: string[];
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	searching?: boolean;
}) {
	const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const newDataRef = useRef<any[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);
	const [value, setValue] = useState("");
	const [animating, setAnimating] = useState(false);

	const draw = useCallback(() => {
		if (!inputRef.current) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
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
			let i = 4 * t * 800;
			for (let n = 0; n < 800; n++) {
				let e = i + 4 * n;
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
				onKeyDown={(e) => e.key === "Enter" && !animating && vanishAndSubmit()}
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
				style={{
					background:
						"linear-gradient(90deg, #007bff, #00ffff, #ff00ff, #007bff)",
					backgroundSize: "300% 300%",
				}}
			/>

			{/* Main Button */}
			<motion.button
				disabled={!value}
				type="submit"
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className="absolute right-4 top-1/2 z-50 px-4 py-2 -translate-y-1/2 rounded-full
					border-2 font-medium flex items-center justify-center 
					disabled:bg-[#131213] disabled:text-white/50 disabled:border-gray-700 border-gray-500 bg-[#131213] text-white
					transition duration-200">
				{searching ? (
					<div className="flex items-center text-white/50 gap-2">
						<LucideLoader2 className="animate-spin" size={18}/> Searching
					</div>
				) : (
					"Explore"
				)}
			</motion.button>

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
	);
}
