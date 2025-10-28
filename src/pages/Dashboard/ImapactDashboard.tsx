"use client";

import { CountingNumber } from "@/components/ui/shadcn-io/counting-number";
import { motion, type Variants } from "framer-motion";
import { Sparkles, Users, Heart, ShoppingCart } from "lucide-react";

// Animation Variants
const containerVariants: Variants = {
	hidden: { opacity: 0, scale: 0.95 },
	show: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.6,
			ease: "easeOut",
			staggerChildren: 0.12, // Stagger delay between child cards
			delayChildren: 0.2,
		},
	},
};

const cardVariants: Variants = {
	hidden: { opacity: 0, y: 30, scale: 0.9 },
	show: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

export default function ImpactDashboard() {
	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="show"
			className="px-6 overflow-hidden">
			{/* Header */}
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-2xl font-bold text-white text-center flex-1">
					Your Impact Dashboard
				</h1>
			</div>

			{/* Score Cards Grid */}
			<motion.div
				variants={containerVariants}
				className="grid grid-cols-3 gap-2 max-w-7xl mx-auto mb-3">
				{/* Discovery Score */}
				<motion.div
					variants={cardVariants}
					className="bg-linear-to-br flex items-center justify-center flex-col from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-5">
					<div className="flex items-center gap-2 text-emerald-400 mb-3">
						<Sparkles className="w-4 h-4" />
						<span className="text-xs">Discovery Score</span>
					</div>
					<div className="text-4xl font-bold text-white mb-2">
						<CountingNumber
							number={482}
							inView={true}
							transition={{ stiffness: 100, damping: 30 }}
						/>
					</div>
					<p className="text-slate-400 text-xs">
						Activity, curiosity, and exploration across the platform
					</p>
				</motion.div>

				{/* 🌟 Impact Score (Center Card with Glow Animation) */}
				<motion.div
					variants={cardVariants}
					className="row-span-2 bg-linear-to-br from-emerald-900/30 to-slate-900/50 backdrop-blur border-2 border-emerald-500/50 rounded-2xl p-5 flex flex-col items-center justify-center"
					animate={{
						boxShadow: [
							"0 0 0px rgba(16, 185, 129, 0.2)",
							"0 0 25px rgba(16, 185, 129, 0.8)",
							"0 0 0px rgba(16, 185, 129, 0.2)",
						],
						scale: [1, 1.05, 1],
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: "easeInOut",
					}}>
					<div className="flex items-center gap-2 text-emerald-400 mb-3">
						<Heart className="w-5 h-5" />
						<span className="text-sm">Impact Score</span>
					</div>
					<div className="text-6xl font-bold text-white mb-2">
						<CountingNumber
							number={900}
							inView={true}
							transition={{ stiffness: 100, damping: 30 }}
						/>
					</div>
					<p className="text-slate-300 text-base">Total Points</p>
				</motion.div>

				{/* Influence Score */}
				<motion.div
					variants={cardVariants}
					className="bg-linear-to-br flex items-center justify-center flex-col from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-5">
					<div className="flex items-center gap-2 text-emerald-400 mb-3">
						<Users className="w-4 h-4" />
						<span className="text-xs">Influence Score</span>
					</div>
					<div className="text-4xl font-bold text-white mb-2">
						<CountingNumber
							number={668}
							inView={true}
							transition={{ stiffness: 100, damping: 30 }}
						/>
					</div>
					<p className="text-slate-400 text-xs">
						Community growth through shares and referrals
					</p>
				</motion.div>

				{/* Engagement Score */}
				<motion.div
					variants={cardVariants}
					className="bg-linear-to-br flex items-center justify-center flex-col from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-5">
					<div className="flex items-center gap-2 text-emerald-400 mb-3">
						<Users className="w-4 h-4" />
						<span className="text-xs">Engagement Score</span>
					</div>
					<div className="text-4xl font-bold text-white mb-2">
						<CountingNumber
							number={96}
							inView={true}
							transition={{ stiffness: 100, damping: 30 }}
						/>
					</div>
					<p className="text-slate-400 text-xs">
						Profile completion and initial platform engagement
					</p>
				</motion.div>

				{/* Loyalty Score */}
				<motion.div
					variants={cardVariants}
					className="bg-linear-to-br flex items-center justify-center flex-col from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-5">
					<div className="flex items-center gap-2 text-emerald-400 mb-3">
						<ShoppingCart className="w-4 h-4" />
						<span className="text-xs">Loyalty Score</span>
					</div>
					<div className="text-4xl font-bold text-white mb-2"><CountingNumber
							number={121}
							inView={true}
							transition={{ stiffness: 100, damping: 30 }}
						/></div>
					<p className="text-slate-400 text-xs">
						Purchases and repeat engagement
					</p>
				</motion.div>
			</motion.div>

			{/* Rewards Section */}
			<motion.div
				variants={containerVariants}
				className="grid grid-cols-4 gap-2 max-w-7xl mx-auto">
				{[
					{
						title: "Engagement Rewards",
						color: "text-blue-400",
						icon: <Users className="w-4 h-4" />,
						rewards: [
							{ text: "Create account", points: "+60" },
							{ text: "Add profile picture", points: "+15" },
							{ text: "Add full name", points: "+15" },
							{ text: "Choose nickname", points: "+15" },
							{ text: "Select interests", points: "+15" },
							{ text: "First login", points: "+50" },
						],
					},
					{
						title: "Discovery Rewards",
						color: "text-emerald-400",
						icon: <Sparkles className="w-4 h-4" />,
						rewards: [
							{ text: "Daily login (7-day streak bonus)", points: "+75" },
							{ text: "Visit new product page", points: "+5" },
							{ text: "Watch demo video", points: "+10" },
							{ text: "Visit comparison page", points: "+15" },
							{ text: "Save to favorites", points: "+5" },
						],
					},
					{
						title: "Influence Rewards",
						color: "text-purple-400",
						icon: <Users className="w-4 h-4" />,
						rewards: [
							{ text: "User arrives from your social link", points: "+200" },
							{ text: "Referred friend makes first purchase", points: "+500" },
						],
					},
					{
						title: "Loyalty Rewards",
						color: "text-amber-400",
						icon: <ShoppingCart className="w-4 h-4" />,
						rewards: [
							{ text: "Make purchase", points: "+100" },
							{ text: "Purchase Editor's Choice product", points: "+50" },
							{ text: "Reach $100 cumulative purchases", points: "+250" },
						],
					},
				].map((section, i) => (
					<motion.div
						key={i}
						variants={cardVariants}
						className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
						<div className={`flex items-center gap-2 ${section.color} mb-3`}>
							{section.icon}
							<h3 className="font-bold text-xs uppercase">{section.title}</h3>
						</div>
						<div className="space-y-2">
							{section.rewards.map((r, idx) => (
								<RewardItem
									key={idx}
									text={r.text}
									points={r.points}
								/>
							))}
						</div>
					</motion.div>
				))}
			</motion.div>
		</motion.div>
	);
}

function RewardItem({ text, points }: { text: string; points: string }) {
	return (
		<div className="flex justify-between items-center text-xs">
			<span className="text-slate-300">{text}</span>
			<span className="text-emerald-400 font-semibold">{points}</span>
		</div>
	);
}
