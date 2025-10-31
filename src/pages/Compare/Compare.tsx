import { Button } from "@/components/ui/button";
import { data } from "@/data";
import {
	Check,
	ChevronLeft,
	ChevronRight,
	Globe,
	LaptopMinimal,
	Tag,
} from "lucide-react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Compare: React.FC = () => {
	const selected = data[2];
	const percentage = (selected.rating / 5) * 100;
	const [currentImageIndex, setCurrentImageIndex] = useState<number[]>([
		0, 0, 0,
	]);

	const handlePrevImage = (cardIndex: number) => {
		setCurrentImageIndex((prev) => {
			const newIndices = [...prev];
			newIndices[cardIndex] =
				prev[cardIndex] === 0
					? selected.screenshots.length - 1
					: prev[cardIndex] - 1;
			return newIndices;
		});
	};

	const handleNextImage = (cardIndex: number) => {
		setCurrentImageIndex((prev) => {
			const newIndices = [...prev];
			newIndices[cardIndex] =
				prev[cardIndex] === selected.screenshots.length - 1
					? 0
					: prev[cardIndex] + 1;
			return newIndices;
		});
	};

	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.1,
			},
		},
	};

	const cardVariants: Variants = {
		hidden: {
			opacity: 0,
			y: 50,
			scale: 0.9,
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.6,
				ease: "easeOut",
			},
		},
	};

	const headingVariants: Variants = {
		hidden: { opacity: 0, y: -20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: "easeOut",
			},
		},
	};

	const scrollContainerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (scrollContainerRef.current) {
			const container = scrollContainerRef.current;
			const cardWidth = 320; // or 350 for md screens
			const gap = 24; // gap-6 = 24px
			const scrollPosition = cardWidth + gap; // Scroll to show second card

			container.scrollLeft = scrollPosition;
		}
	}, []);

	return (
		<div className="pt-24">
			<motion.div
				className="flex items-center justify-center"
				initial="hidden"
				animate="visible"
				variants={headingVariants}>
				<h2 className="text-3xl md:text-4xl text-center lg:text-5xl font-semibold">
					<span className="text-white">Smart Comparisons for</span>
					<br />
					<span className="bg-linear-to-r from-blue-600 via-[#189597] to-green-400 bg-clip-text text-transparent">
						Smarter Decisions
					</span>
				</h2>
			</motion.div>
			<div className="flex items-center justify-center">
				<motion.div
					ref={scrollContainerRef}
					className="flex gap-6 py-2 mt-14 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
					{[0, 1, 2].map((index: number) => (
						<motion.div
							key={index}
							className="bg-[#131313] rounded-3xl p-4 snap-center shrink-0 w-[320px] md:w-[350px]"
							variants={cardVariants}
							whileHover={{
								y: -8,
								transition: { duration: 0.3 },
							}}>
							<motion.div
								className="flex items-center bg-black gap-2 p-2 px-3 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] font-medium text-green-300 rounded-full w-fit text-sm"
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.2 }}>
								<Tag
									size={14}
									className="rotate-90"
								/>
								Editors Choice
							</motion.div>
							<motion.div
								className="flex mt-6 gap-2 items-center"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.3 + index * 0.2 }}>
								<img
									src={selected.logo}
									alt=""
									className="object-cover w-10 h-10"
								/>
								<p className="text-2xl font-medium">{selected.name}</p>
							</motion.div>
							<p className="text-xs text-white/40 my-4">
								{selected.description}
							</p>
							<div>
								<div className="rounded-2xl h-52 overflow-hidden relative">
									<AnimatePresence mode="wait">
										<motion.img
											key={currentImageIndex[index]}
											src={selected.screenshots[currentImageIndex[index]]}
											alt=""
											className="object-cover w-full h-full"
											initial={{ opacity: 0, x: 100 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -100 }}
											transition={{ duration: 0.3 }}
										/>
									</AnimatePresence>
								</div>
								<div className="flex gap-2 items-center mt-2">
									<motion.div
										className="h-8 flex border border-white/10 items-center justify-center bg-black/20 w-8 rounded-full cursor-pointer"
										whileHover={{
											scale: 1.1,
											backgroundColor: "rgba(255,255,255,0.1)",
										}}
										whileTap={{ scale: 0.95 }}
										onClick={() => handlePrevImage(index)}>
										<ChevronLeft size={16} />
									</motion.div>
									<motion.div
										className="h-8 flex border border-white/10 items-center justify-center bg-black/20 w-8 rounded-full cursor-pointer"
										whileHover={{
											scale: 1.1,
											backgroundColor: "rgba(255,255,255,0.1)",
										}}
										whileTap={{ scale: 0.95 }}
										onClick={() => handleNextImage(index)}>
										<ChevronRight size={16} />
									</motion.div>
									<div className="flex gap-1 ml-2">
										{selected.screenshots.map((_: string, dotIndex: number) => (
											<div
												key={dotIndex}
												className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
													currentImageIndex[index] === dotIndex
														? "bg-blue-500 w-3"
														: "bg-white/30"
												}`}
											/>
										))}
									</div>
								</div>
							</div>
							<div className="my-8 flex items-center gap-3">
								<p className="text-gray-600 line-through">
									{selected.pricing[1].price}
								</p>
								<motion.p
									className="text-green-400 font-semibold text-2xl"
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{
										delay: 0.5 + index * 0.2,
										type: "spring",
										stiffness: 200,
									}}>
									{selected.pricing[0].price}
								</motion.p>
							</div>
							<div>
								<h2 className="text-lg">Key Features</h2>
								<ul>
									{selected.features.map(
										(feature: string, featureIndex: number) => (
											<motion.li
												key={featureIndex}
												className="flex items-center gap-2 m-2"
												initial={{ opacity: 0, x: -10 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{
													delay: 0.6 + index * 0.2 + featureIndex * 0.05,
												}}>
												<span className="w-3 h-3 flex items-center justify-center bg-green-400 rounded-full shrink-0">
													<Check
														size={10}
														color="black"
													/>
												</span>
												<span className="text-sm text-white/80">{feature}</span>
											</motion.li>
										)
									)}
								</ul>
							</div>
							<div className="my-8">
								<h2 className="text-lg">Key Benefits</h2>
								<div className="flex flex-wrap gap-2 m-2">
									{[
										"Cheating angaging CRM",
										"Fast 5G Build",
										"Comments",
										"Components",
									].map((feature: string, benefitIndex: number) => (
										<motion.div
											key={benefitIndex}
											className="flex border border-white/20 rounded-full p-2 px-3 items-center"
											initial={{ opacity: 0, scale: 0.8 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{
												delay: 0.8 + index * 0.2 + benefitIndex * 0.05,
											}}
											whileHover={{
												scale: 1.05,
												borderColor: "rgba(59, 130, 246, 0.5)",
											}}>
											<span className="text-xs text-blue-600 font-semibold">
												{feature}
											</span>
										</motion.div>
									))}
								</div>
							</div>
							<div>
								<h2 className="text-lg">Target Audience</h2>
								<p className="mt-1 text-sm text-white/50">Teams</p>
							</div>
							<div className="my-8">
								<h2 className="text-lg">Supporting Platforms</h2>
								<div className="flex gap-2 items-center m-2">
									<motion.div
										className="flex flex-col gap-1 items-center"
										whileHover={{ scale: 1.1 }}
										transition={{ duration: 0.2 }}>
										<div className="border border-white/20 rounded-md p-2">
											<Globe
												size={14}
												color="blue"
											/>
										</div>
										<p className="text-xs text-white/50">Web</p>
									</motion.div>
									<motion.div
										className="flex flex-col gap-1 items-center"
										whileHover={{ scale: 1.1 }}
										transition={{ duration: 0.2 }}>
										<div className="border border-white/20 rounded-md p-2">
											<LaptopMinimal
												size={14}
												color="green"
											/>
										</div>
										<p className="text-xs text-white/50">Desktop</p>
									</motion.div>
								</div>
							</div>
							<div>
								<div className="flex items-center justify-between mb-3">
									<span className="text-white text-lg font-medium">
										Users Rating
									</span>
									<span className="text-white text-sm font-medium">
										{Math.round(percentage)}%
									</span>
								</div>
								<div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
									<motion.div
										className="h-full bg-linear-to-r from-green-400 to-green-500 rounded-full"
										initial={{ width: 0 }}
										animate={{ width: `${percentage}%` }}
										transition={{
											delay: 1 + index * 0.2,
											duration: 1,
											ease: "easeOut",
										}}
									/>
								</div>
							</div>
							<motion.div
								className="mt-8"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}>
								<Button className="w-full bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold py-2 px-4 rounded-lg">
									Buy Now
								</Button>
							</motion.div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</div>
	);
};

export default Compare;
