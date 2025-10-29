/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { motion, AnimatePresence } from "framer-motion";
import { data } from "@/data";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const placeholders = [
		"Name of the app",
		"Vibe Coding",
		"Social Media Management Platform",
		"AI-Powered Marketing Platform",
		"AI-Generated UGC Video Ads",
		"Resume Optimizer",
		"AI Chatbots",
	];

	const [value, setValue] = useState("");
	const [results, setResults] = useState<any[]>([]);
	const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
	const [currentImageIdx, setCurrentImageIdx] = useState<{
		[key: number]: number;
	}>({});
	const [searching, setSearching] = useState(false);

	useEffect(() => {
		const intervals: number[] = [];

		results.slice(0, 3).forEach((item, idx) => {
			if (item.screenshots && item.screenshots.length > 1) {
				const interval = setInterval(() => {
					setCurrentImageIdx((prev) => ({
						...prev,
						[idx]: ((prev[idx] || 0) + 1) % item.screenshots.length,
					}));
				}, 8000);
				intervals.push(interval);
			}
		});

		return () => intervals.forEach((interval) => clearInterval(interval));
	}, [results]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value.toLowerCase();
		setValue(query);
		setSearching(true);

		if (query.trim() === "") {
			setResults([]);
			setCurrentImageIdx({});
			setSearching(false);
			setSelectedId(undefined);
		} else {
			const filtered = data.filter(
				(item) =>
					item.name?.toLowerCase().includes(query) ||
					(Array.isArray(item.tags) &&
						item.tags.some((tag) => String(tag).toLowerCase().includes(query)))
			);
			setResults(filtered);
			setCurrentImageIdx({});
			setSearching(false); // stop searching once filtered
		}
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const [seletedId, setSelectedId] = useState();
	const selectedData = results.find((item) => item.id === seletedId);
	const [moreOpen, setMoreOpen] = useState(false);
	const [showFAQ, setShowFAQ] = useState<number>();
	const [showGallery, setShowGallery] = useState(false);
	const [selectedImageIdx, setSelectedImageIdx] = useState(0);
	const navigate = useNavigate();
	return (
		<div className="flex flex-col min-h-[88vh]  gap-4 items-center justify-center px-4 pt-24">
			<motion.div
				initial={{ y: 0, scale: 1 }}
				animate={seletedId ? { y: -40, scale: 0.95 } : { y: 0, scale: 1 }}
				exit={{ y: 0 }}
				className=""
				transition={{ duration: 0.8, ease: "easeOut" }}>
				<img
					src="/images/logo.png"
					alt="Logo"
					className={` ${
						seletedId ? "hidden" : "block"
					} transition-all duration-300`}
				/>
				<p
					className={`text-gray-400 text-center text-sm  ${
						seletedId ? "hidden" : "block"
					} transition-all duration-300`}>
					Apps For Everything. Prices For Everyone
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 1, y: 0 }}
				animate={
					seletedId
						? { opacity: 1, y: -20, scale: 0.85 }
						: { opacity: 1, y: 0, scale: 1 }
				}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className="w-full max-w-3xl "
				style={{
					position: seletedId ? "fixed" : "static",
					top: seletedId ? 40 : "auto",
					left: seletedId ? "35%" : "auto",
					zIndex: seletedId ? 50 : "auto",
				}}>
				<PlaceholdersAndVanishInput
					placeholders={placeholders}
					onChange={handleChange}
					onSubmit={onSubmit}
					searching={searching}
				/>
			</motion.div>

			<motion.div
				className="flex gap-4 mt-2 justify-center flex-wrap"
				initial="hidden"
				animate="visible"
				variants={{
					hidden: {},
					visible: {
						transition: { staggerChildren: 0.1 },
					},
				}}>
				{results.slice(0, 3).map((item, idx) => {
					const isHovered = hoveredIdx === idx;
					const screenshots = item.screenshots || [
						item.logo || "/images/default.png",
					];
					const currentImg = screenshots[currentImageIdx[idx] || 0];

					return (
						<AnimatePresence>
							<motion.div
								onClick={() => setSelectedId(item.id)}
								key={idx}
								className="relative bg-[#101010] border border-gray-700 rounded-3xl p-2 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] overflow-hidden cursor-pointer"
								initial={{ opacity: 0, y: 30 }}
								animate={
									seletedId
										? { opacity: 0, scale: 0, display: "none" }
										: {
												opacity: 1,
												scale: 1,
												y: 0,
												width: isHovered
													? 460
													: hoveredIdx !== null
													? 300
													: 320,
												boxShadow: isHovered
													? "0 0 35px rgba(0, 119, 255, 0.5)"
													: "0 0 20px rgba(255,255,255,0.1)",
										  }
								}
								transition={{
									opacity: {
										duration: 0.8,
										ease: "easeOut",
										delay: idx * 0.1,
									},
									y: { duration: 0.3, ease: "easeOut" },
									width: { duration: 0.3, ease: "easeOut" },
									boxShadow: { duration: 0.3 },
									scale: { duration: 0.8, ease: "easeOut" },
								}}
								onHoverStart={() => setHoveredIdx(idx)}
								onHoverEnd={() => setHoveredIdx(null)}>
								{/* Rest of the component remains the same */}
								{item.bestRating && (
									<div className="absolute border -top-3 left-3 bg-linear-to-r from-orange-600 to-red-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
										<span>⭐</span> Best Rating
									</div>
								)}

								<div className="relative shadow-[0_0_20px_rgba(255,255,255,0.1)] w-full h-40 rounded-xl bg-black overflow-hidden">
									<AnimatePresence mode="wait">
										<motion.img
											key={currentImg}
											src={currentImg}
											alt={item.name}
											className="absolute shadow-[0_0_20px_rgba(255,255,255,0.1)] rounded-xl inset-0 w-full h-full object-cover"
											initial={{ opacity: 0, scale: 0.95 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0, scale: 0.95 }}
											transition={{ duration: 0.5 }}
											whileHover={{ scale: 1.05 }}
										/>
									</AnimatePresence>
								</div>

								<div className="flex p-2 justify-between items-center">
									<div className="flex gap-3 items-center justify-center">
										<img
											src={item.logo}
											alt=""
											width={36}
											height={24}
										/>
										<div>
											<div className="mb-2">
												<p className="font-semibold">{item.name}</p>
												<div className=" flex items-center gap-2 text-white/60">
													<div className="flex items-center gap-1">
														{Array.from({ length: 5 }).map((_, i) => {
															const pos = i + 1;
															const full = item.rating >= pos;
															const half = !full && item.rating >= pos - 0.5;
															const gradId = `halfGrad-${i}`;
															return (
																<span
																	key={i}
																	className="w-3 h-3 inline-block">
																	{full ? (
																		<svg
																			viewBox="0 0 24 24"
																			className="w-3 h-3 text-yellow-400"
																			fill="currentColor"
																			aria-hidden>
																			<path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.168L12 18.896l-7.336 3.866 1.402-8.168L.132 9.21l8.2-1.192L12 .587z" />
																		</svg>
																	) : half ? (
																		<svg
																			viewBox="0 0 24 24"
																			className="w-3 h-3 text-yellow-400"
																			aria-hidden>
																			<defs>
																				<linearGradient id={gradId}>
																					<stop
																						offset="50%"
																						stopColor="currentColor"
																					/>
																					<stop
																						offset="50%"
																						stopColor="transparent"
																					/>
																				</linearGradient>
																			</defs>
																			<path
																				d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.168L12 18.896l-7.336 3.866 1.402-8.168L.132 9.21l8.2-1.192L12 .587z"
																				fill={`url(#${gradId})`}
																				stroke="currentColor"
																				strokeWidth="0.5"
																			/>
																		</svg>
																	) : (
																		<svg
																			viewBox="0 0 24 24"
																			className="w-3 h-3 text-gray-600"
																			fill="none"
																			stroke="currentColor"
																			aria-hidden>
																			<path
																				d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.168L12 18.896l-7.336 3.866 1.402-8.168L.132 9.21l8.2-1.192L12 .587z"
																				strokeWidth="0.8"
																			/>
																		</svg>
																	)}
																</span>
															);
														})}
													</div>
												</div>
											</div>
											<p className="text-sm line-clamp-1 text-gray-400">
												{item.short_description || "AI App"}
											</p>
										</div>
									</div>
									<div className="text-right">
										<p className="text-gray-400 line-through text-sm">
											{item.pricing[1]?.price || "10"}
										</p>
										<div className="flex items-center justify-end">
											<p className="text-green-400 w-9 h-9 border-gray-600 flex items-center justify-center rounded-full border font-semibold">
												{item.pricing[0]?.price || "0"}
											</p>
										</div>
									</div>
								</div>
							</motion.div>
						</AnimatePresence>
					);
				})}
			</motion.div>

			{results.length > 0 && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={seletedId ? { opacity: 0, y: 120 } : { opacity: 1, y: 0 }}
					exit={{ y: 120, opacity: 0 }}
					transition={{ duration: 0.4, ease: "easeOut" }}>
					<motion.button
					onClick={()=>navigate('/compare')}
						whileHover={{ scale: 1.05 }}
						className="h-12 bg-[#155dfc] cursor-pointer hover:bg-[#0d51e2] mt-4 px-6 rounded-lg text-white font-semibold">
						Compare These Options
					</motion.button>
				</motion.div>
			)}

			{value && results.length === 0 && (
				<p className="mt-6 text-gray-500">No results found.</p>
			)}
			<AnimatePresence mode="wait">
				{selectedData && (
					<motion.div
						className="fixed h-[78vh] overflow-auto top-24 w-full max-w-lg  left-1/2 transform -translate-x-1/2  bg-[#0b0b0b] border border-gray-700 rounded-3xl p-4 text-white shadow-[0_0_30px_rgba(255,255,255,0.2)] z-50"
						initial={{ opacity: 0, y: 110 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 110 }}
						transition={{ duration: 0.8, ease: "easeOut" }}>
						<div className="flex relative h-[35vh] rounded-lg overflow-hidden items-center justify-center">
							<img
								src={selectedData.screenshots[1]}
								alt=""
								// width={280}
								className="object-contain w-full h-full rounded-3xl"
							/>
							<Button
								className="absolute top-1 left-0 border border-gray-500"
								onClick={() => {
									setSelectedId(undefined);
									selectedData(null);
								}}>
								<ChevronLeft size={18} />
							</Button>
						</div>
						<div className="flex mt-4 justify-between items-center">
							<div>
								<h2 className="font-semibold text-2xl">{selectedData.name}</h2>
								<p className="text-sm">{selectedData.category}</p>
							</div>
							<div className="text-right gap-3 flex items-center">
								<p className="text-gray-400 line-through text-sm">
									{selectedData.pricing[1]?.price || "10"}
								</p>
								<div className="flex items-center justify-end">
									<p className="text-green-400 text-xl  flex items-center justify-center rounded-full  font-semibold">
										{selectedData.pricing[0]?.price || "0"}
									</p>
								</div>
							</div>
						</div>
						<div className="w-full border border-gray-800 my-4 rounded-full"></div>
						<p className="text-white/80">{selectedData.description}</p>
						<div className="my-4 flex items-center gap-2 text-white/60">
							<h2>Rating:</h2>
							<p>{selectedData.rating}/5</p>
							<div className="flex items-center gap-2"></div>
							<div className="flex items-center gap-1">
								{Array.from({ length: 5 }).map((_, i) => {
									const pos = i + 1;
									const full = selectedData.rating >= pos;
									const half = !full && selectedData.rating >= pos - 0.5;
									const gradId = `halfGrad-${i}`;
									return (
										<span
											key={i}
											className="w-4 h-4 inline-block">
											{full ? (
												<svg
													viewBox="0 0 24 24"
													className="w-4 h-4 text-yellow-400"
													fill="currentColor"
													aria-hidden>
													<path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.168L12 18.896l-7.336 3.866 1.402-8.168L.132 9.21l8.2-1.192L12 .587z" />
												</svg>
											) : half ? (
												<svg
													viewBox="0 0 24 24"
													className="w-4 h-4 text-yellow-400"
													aria-hidden>
													<defs>
														<linearGradient id={gradId}>
															<stop
																offset="50%"
																stopColor="currentColor"
															/>
															<stop
																offset="50%"
																stopColor="transparent"
															/>
														</linearGradient>
													</defs>
													<path
														d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.168L12 18.896l-7.336 3.866 1.402-8.168L.132 9.21l8.2-1.192L12 .587z"
														fill={`url(#${gradId})`}
														stroke="currentColor"
														strokeWidth="0.5"
													/>
												</svg>
											) : (
												<svg
													viewBox="0 0 24 24"
													className="w-4 h-4 text-gray-600"
													fill="none"
													stroke="currentColor"
													aria-hidden>
													<path
														d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.168L12 18.896l-7.336 3.866 1.402-8.168L.132 9.21l8.2-1.192L12 .587z"
														strokeWidth="0.8"
													/>
												</svg>
											)}
										</span>
									);
								})}
							</div>
						</div>
						<div className="flex pt-2 items-center justify-between">
							<Button
								onClick={() => setShowGallery(!showGallery)}
								className="text-white/80 w-24 cursor-pointer hover:scale-110 duration-200 h-10">
								Gallery
							</Button>
							<Button
								onClick={() => setMoreOpen(!moreOpen)}
								className="text-white/80 cursor-pointer hover:scale-110 duration-200 w-24 h-10">
								More
							</Button>
						</div>
						<Button className="w-full mt-6 bg-[#155dfc] hover:bg-[#0d51e2] text-white font-semibold">
							Buy Now
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{moreOpen && selectedData && (
					<motion.div
						className="fixed h-[78vh] overflow-auto bottom-0 w-full max-w-[30%] right-0 top-24 -translate-x-10 transform  bg-[#0b0b0b] border border-gray-700 rounded-3xl p-4 text-white shadow-[0_0_30px_rgba(255,255,255,0.2)] z-50"
						initial={{ opacity: 0, x: 110 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 800 }}
						transition={{ duration: 0.8, ease: "easeOut" }}>
						<div className="flex justify-between items-center mb-4">
							<h2 className="font-semibold text-white/40 text-xl">More Info</h2>
							<Button
								className="border border-gray-500"
								onClick={() => setMoreOpen(false)}>
								<X size={18} />
							</Button>
						</div>
						<p className="text-white/80">{selectedData.description}</p>
						<div>
							<h2 className="font-semibold my-6 text-white/40 text-xl">FAQ</h2>
							<ul className="">
								{selectedData.faqs?.map((faq: any, idx: number) => (
									<motion.li
										key={idx}
										layout
										className="mb-6">
										<div
											onClick={() =>
												setShowFAQ((prev) => (prev === idx ? undefined : idx))
											}
											className="flex items-center justify-between cursor-pointer">
											<motion.p
												layout
												className="font-semibold text-white/80">
												{faq.question}
											</motion.p>
											<motion.span
												animate={{ rotate: showFAQ === idx ? 45 : 0 }}
												transition={{
													type: "spring",
													stiffness: 400,
													damping: 30,
												}}>
												<Plus size={16} />
											</motion.span>
										</div>

										<AnimatePresence initial={false}>
											{showFAQ === idx && (
												<motion.p
													key="answer"
													initial={{ opacity: 0, height: 0 }}
													animate={{ opacity: 1, height: "auto" }}
													exit={{ opacity: 0, height: 0 }}
													transition={{ duration: 0.25 }}
													className="text-white/80 overflow-hidden mt-2">
													{faq.answer}
												</motion.p>
											)}
										</AnimatePresence>
									</motion.li>
								))}
							</ul>
						</div>
						{selectedData.version_info && <h2></h2>}
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{showGallery && selectedData && (
					<motion.div
						className="fixed h-[78vh] overflow-auto bottom-0 w-full max-w-[30%] left-0 top-24 translate-x-10 transform  bg-[#0b0b0b] border border-gray-700 rounded-3xl p-4 text-white shadow-[0_0_30px_rgba(255,255,255,0.2)] z-50"
						initial={{ opacity: 0, x: -110 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -800 }}
						transition={{ duration: 0.8, ease: "easeOut" }}>
						<div className="flex justify-between items-center mb-4">
							<h2 className="font-semibold text-white/80 w-full text-center text-xl">
								Screenshot Gallery
							</h2>
							<Button
								className="border border-gray-500"
								onClick={() => setShowGallery(false)}>
								<X size={18} />
							</Button>
						</div>
						<div className="h-[40vh] border rounded-3xl overflow-hidden border-white/50">
							<img
								src={selectedData.screenshots[selectedImageIdx]}
								alt=""
								className="w-full h-full object-contain rounded-3xl"
							/>
						</div>
						<div className="grid gap-1 grid-cols-4">
							{selectedData.screenshots.map((_: any, idx: number) => (
								<img
									key={idx}
									src={selectedData.screenshots[idx]}
									alt=""
									className={`w-full h-20 object-contain rounded-lg cursor-pointer border-2 ${
										selectedImageIdx === idx
											? "border-blue-500"
											: "border-white/20"
									} mt-4`}
									onClick={() => setSelectedImageIdx(idx)}
								/>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Home;
