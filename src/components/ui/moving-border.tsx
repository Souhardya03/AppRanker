/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
	motion,
	useAnimationFrame,
	useMotionTemplate,
	useMotionValue,
	useTransform,
} from "framer-motion";
import { useRef } from "react";

function cn(...classes: any[]) {
	return classes.filter(Boolean).join(" ");
}

export function MovingButton({
	borderRadius = "1.75rem",
	children,
	as: Component = "button",
	containerClassName,
	borderClassName,
	duration,
	className,
	...otherProps
}: {
	borderRadius?: string;
	children: React.ReactNode;
	as?: any;
	containerClassName?: string;
	borderClassName?: string;
	duration?: number;
	className?: string;
	[key: string]: any;
}) {
	return (
		<Component
			className={cn(
				"relative h-13 w-36 overflow-hidden bg-transparent p-px text-xl",
				containerClassName
			)}
			style={{
				borderRadius: borderRadius,
			}}
			{...otherProps}>
			<div
				className="absolute inset-0"
				style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
				<MovingBorder
					duration={duration}
					rx="30%"
					ry="30%">
					<div
						className={cn(
							"h-20 w-20 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]",
							borderClassName
						)}
					/>
				</MovingBorder>
			</div>

			<div
				className={cn(
					"relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/80 text-sm text-white antialiased backdrop-blur-xl",
					className
				)}
				style={{
					borderRadius: `calc(${borderRadius} * 0.96)`,
				}}>
				{children}
			</div>
		</Component>
	);
}

export const MovingBorder = ({
	children,
	duration = 3000,
	rx,
	ry,
	...otherProps
}: {
	children: React.ReactNode;
	duration?: number;
	rx?: string;
	ry?: string;
	[key: string]: any;
}) => {
	const pathRef = useRef<SVGPathElement>(null);
	const progress = useMotionValue<number>(0);

	useAnimationFrame((time) => {
		if (!pathRef.current) return;

		try {
			const length = pathRef.current.getTotalLength();
			if (length) {
				const pxPerMillisecond = length / duration;
				progress.set((time * pxPerMillisecond) % length);
			}
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (err) {
			// Silently handle if element isn't rendered yet
			console.debug("SVG path not ready yet");
		}
	});

	const x = useTransform(progress, (val) => {
		if (!pathRef.current) return 0;
		try {
			return pathRef.current.getPointAtLength(val).x;
		} catch {
			return 0;
		}
	});

	const y = useTransform(progress, (val) => {
		if (!pathRef.current) return 0;
		try {
			return pathRef.current.getPointAtLength(val).y;
		} catch {
			return 0;
		}
	});

	const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

	// Convert rx/ry percentages to actual border radius for path calculation
	const rxValue = rx ? parseFloat(rx) : 30;
	const ryValue = ry ? parseFloat(ry) : 30;

	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="none"
				className="absolute h-full w-full"
				width="100%"
				height="100%"
				{...otherProps}>
				{/* Use path instead of rect - this supports getTotalLength() */}
				<path
					fill="none"
					d={`M ${rxValue},0 L ${
						100 - rxValue
					},0 Q 100,0 100,${ryValue} L 100,${100 - ryValue} Q 100,100 ${
						100 - rxValue
					},100 L ${rxValue},100 Q 0,100 0,${
						100 - ryValue
					} L 0,${ryValue} Q 0,0 ${rxValue},0 Z`}
					ref={pathRef}
					style={{
						vectorEffect: "non-scaling-stroke",
					}}
				/>
			</svg>
			<motion.div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					display: "inline-block",
					transform,
				}}>
				{children}
			</motion.div>
		</>
	);
};
