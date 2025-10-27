import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Plus, WandSparkles } from "lucide-react";
import { MovingButton } from "./ui/moving-border";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Navbar = () => {
	const lineRef = useRef<SVGRectElement | null>(null);
	const exploreBtnRef = useRef<HTMLButtonElement | null>(null);
	const plusWrapperRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!lineRef.current) return;

		// Continuous stroke animation
		const continuousAnim = gsap.to(lineRef.current, {
			strokeDashoffset: -430,
			duration: 4,
			ease: "linear",
			repeat: -1,
		});

		// Hover animation for the SVG stroke (Explore button)
		const rectHover = gsap.to(lineRef.current, {
			strokeWidth: 6,
			duration: 0.25,
			paused: true,
			ease: "power1.inOut",
			filter: "drop-shadow(0px 0px 12px rgba(79,149,218,0.9))",
		});

		// Hover animation for the small Plus button (wrapper)
		const plusHover = gsap.to(plusWrapperRef.current, {
			scale: 1.08,
			boxShadow: "0 0 12px rgba(50,234,108,0.9)",
			duration: 0.18,
			paused: true,
			ease: "power1.out",
		});

		const exploreBtn = exploreBtnRef.current;
		const plusWrap = plusWrapperRef.current;

		const onExploreEnter = () => {
			rectHover.play();
			gsap.to(exploreBtn, { scale: 1.03, duration: 0.18, ease: "power1.out" });
		};
		const onExploreLeave = () => {
			rectHover.reverse();
			gsap.to(exploreBtn, { scale: 1, duration: 0.18, ease: "power1.out" });
		};

		const onPlusEnter = () => plusHover.play();
		const onPlusLeave = () => plusHover.reverse();

		exploreBtn?.addEventListener("mouseenter", onExploreEnter);
		exploreBtn?.addEventListener("mouseleave", onExploreLeave);
		plusWrap?.addEventListener("mouseenter", onPlusEnter);
		plusWrap?.addEventListener("mouseleave", onPlusLeave);

		return () => {
			exploreBtn?.removeEventListener("mouseenter", onExploreEnter);
			exploreBtn?.removeEventListener("mouseleave", onExploreLeave);
			plusWrap?.removeEventListener("mouseenter", onPlusEnter);
			plusWrap?.removeEventListener("mouseleave", onPlusLeave);

			rectHover.kill();
			plusHover.kill();
			continuousAnim.kill();
		};
	}, []);

	const strokeWidth = 3;
	const size = 30;
	const percentage = 87; // Example percentage
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (percentage / 100) * circumference;
	return (
		<nav className="flex p-6 items-center justify-between">
			<div className="flex items-center gap-4">
				{/* Logo */}
				<div className="w-36">
					<img
						src="/images/logo.png"
						alt=""
					/>
				</div>

				{/* Explore Button */}
				<Link to="/explore">
					<MovingButton
						borderRadius="1.9rem"
						className="bg-[#131213]  flex items-center justify-center gap-4 text-lg text-white border-slate-800">
						Explore <WandSparkles size={18} />
					</MovingButton>
				</Link>
				<div>
					<motion.div
						animate="idle"
						whileHover="hover"
						whileTap="tap"
						variants={{
							idle: {
								boxShadow: [
									"0 0 0 rgba(79,149,218,0)",
									"0 0 20px rgba(79,149,218,0.4)",
									"0 0 0 rgba(79,149,218,0)",
								],
								scale: 1,
								transition: {
									boxShadow: {
										duration: 2.5,
										repeat: Infinity,
										ease: "easeInOut",
									},
									scale: { duration: 0.3 },
								},
							},
							hover: {
								boxShadow: [
									"0 0 30px rgba(79,149,218,0.8), 0 0 60px rgba(50,234,108,0.5)",
									"0 0 35px rgba(79,149,218,1), 0 0 70px rgba(50,234,108,0.6)",
									"0 0 30px rgba(79,149,218,0.8), 0 0 60px rgba(50,234,108,0.5)",
								],
								scale: 1.05,
								y: -2,
								transition: {
									boxShadow: {
										duration: 1.5,
										repeat: Infinity,
										ease: "easeInOut",
									},
									scale: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
									y: { duration: 0.4, ease: "easeOut" },
								},
							},
							tap: {
								scale: 0.98,
								transition: { duration: 0.1 },
							},
						}}
						className="rounded-full">
						<Button className="h-12 w-28 text-lg relative overflow-hidden group">
							<motion.span
								className="absolute inset-0 bg-linear-to-r from-blue-400/20 via-green-400/20 to-blue-400/20"
								initial={{ x: "-100%" }}
								whileHover={{ x: "100%" }}
								transition={{ duration: 0.8, ease: "easeInOut" }}
							/>
							<span className="relative z-10">Pricing</span>
						</Button>
					</motion.div>
				</div>

				{/* Plus Button */}
				<div className="inline-block">
					<Button className="h-12 w-12 transition-transform duration-200">
						<Plus
							color="#32ea6c"
							size={24}
						/>
					</Button>
				</div>
			</div>
			<div className="flex  items-center bg-[#131313] p-2 rounded-full gap-2">
				{/* Circle with percentage */}
				<div className="flex items-center gap-2 border rounded-full p-1 px-2 border-gray-600">
					<div
						className="relative flex  rotate-180 items-center justify-center"
						style={{ width: size, height: size }}>
						<svg
							width={size}
							height={size}>
							<circle
								cx={size / 2}
								cy={size / 2}
								r={radius}
								stroke="#47505e"
								strokeWidth={strokeWidth}
								fill="none"
							/>
							<circle
								cx={size / 2}
								cy={size / 2}
								r={radius}
								stroke="#03ba4c"
								strokeWidth={strokeWidth}
								fill="none"
								strokeDasharray={circumference}
								strokeDashoffset={offset}
								strokeLinecap="round"
								style={{ transition: "stroke-dashoffset 1s ease" }}
							/>
						</svg>
					</div>

					{/* Label */}
					<span className="text-white font-medium">87% impact</span>
				</div>
				{/* Profile Image */}
				<img
					src={
						"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
					}
					alt="Profile"
					className="w-10 h-10 rounded-full object-cover "
				/>
			</div>
		</nav>
	);
};

export default Navbar;
