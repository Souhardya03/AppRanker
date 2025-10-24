
import { useState, useEffect } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { motion, AnimatePresence } from "framer-motion";
import { data } from "@/data";

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

	return (
		<div className="flex flex-col min-h-[75vh] gap-4 items-center justify-center px-4">
			<img
				src="/images/logo.png"
				alt="Logo"
				className=""
			/>
			<p className="text-gray-400 text-sm mb-4">
				Apps For Everything. Prices For Everyone
			</p>

			<div className="w-full max-w-3xl">
				<PlaceholdersAndVanishInput
					placeholders={placeholders}
					onChange={handleChange}
					onSubmit={onSubmit}
					searching={searching}
				/>
			</div>

			<motion.div
				className="flex gap-4 mt-6 justify-center flex-wrap"
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
						<motion.div
							key={idx}
							className="relative bg-[#131213] border border-gray-700 rounded-3xl p-2 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] overflow-hidden cursor-pointer"
							initial={{ opacity: 0, y: 30 }}
							animate={{
								opacity: 1,
								y: 0,
								width: isHovered ? 460 : hoveredIdx !== null ? 300 : 320,
								boxShadow: isHovered
									? "0 0 35px rgba(0, 119, 255, 0.5)"
									: "0 0 20px rgba(255,255,255,0.1)",
								transition: {
									opacity: { duration: 0.4, ease: "easeOut", delay: idx * 0.1 },
									y: { duration: 0.4, ease: "easeOut", delay: idx * 0.1 },
									width: { duration: 0.3 },
									boxShadow: { duration: 0.3 },
								},
							}}
							onHoverStart={() => setHoveredIdx(idx)}
							onHoverEnd={() => setHoveredIdx(null)}>
							{item.bestRating && (
								<div className="absolute -top-3 left-3 bg-gradient-to-r from-orange-600 to-red-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
									<span>⭐</span> Best Rating
								</div>
							)}

							<div className="relative w-full h-40 rounded-xl bg-black overflow-hidden">
								<AnimatePresence mode="wait">
									<motion.img
										key={currentImg}
										src={currentImg}
										alt={item.name}
										className="absolute inset-0 w-full h-full object-cover"
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
										<p className="font-semibold">{item.name}</p>
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
					);
				})}
			</motion.div>

			{results.length > 0 && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}>
					<motion.button
						whileHover={{ scale: 1.05 }}
						className="h-12 bg-[#155dfc] cursor-pointer hover:bg-[#0d51e2] mt-4 px-6 rounded-lg text-white font-semibold">
						Compare These Options
					</motion.button>
				</motion.div>
			)}

			{value && results.length === 0 && (
				<p className="mt-6 text-gray-500">No results found.</p>
			)}
		</div>
	);
};

export default Home;
