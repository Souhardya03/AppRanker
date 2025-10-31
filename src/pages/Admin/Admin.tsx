import React, { useState } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Tooltip,
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
} from "recharts";
import { motion } from "framer-motion";
import {
	DollarSign,
	TrendingUp,
	Activity,
	Target,
	Calendar,
	Info,
	LayoutDashboard,
	Clock,
	FileText,
	Bell,
	Users,
	Trophy,
	Ticket,
	GitCompare,
	Search,
	Menu,
	X,
	CheckCircle,
	AlertCircle,
	XCircle,
	Package,
	Check,
	Settings,
	GripVertical,
	// UserCircle2,
	// Sparkles,
	// Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface RevenueData {
	month: string;
	value: number;
}

interface NewUserData {
	date: string;
	users: number;
}

interface AppSubmissionData {
	category: string;
	count: number;
	color: string;
	[key: string]: string | number; // Add index signature
}

interface PendingApprovalData {
	name: string;
	status: string;
	date: string;
	priority: "high" | "medium" | "low";
}

const Dashboard: React.FC = () => {
	const [selectedRange, setSelectedRange] = useState<string>("6 Months");
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

	const revenueData: RevenueData[] = [
		{ month: "Apr 2025", value: 0 },
		{ month: "May 2025", value: 0 },
		{ month: "Jun 2025", value: 0 },
		{ month: "Jul 2025", value: 0 },
		{ month: "Aug 2025", value: 0 },
		{ month: "Sep 2025", value: 0 },
		{ month: "Oct 2025", value: 320 },
	];

	const newUserData: NewUserData[] = [
		{ date: "Week 1", users: 45 },
		{ date: "Week 2", users: 78 },
		{ date: "Week 3", users: 52 },
		{ date: "Week 4", users: 95 },
		{ date: "Week 5", users: 112 },
		{ date: "Week 6", users: 88 },
	];

	const appSubmissionData: AppSubmissionData[] = [
		{ category: "E-commerce", count: 35, color: "#3b82f6" },
		{ category: "Social Media", count: 28, color: "#8b5cf6" },
		{ category: "Productivity", count: 22, color: "#10b981" },
		{ category: "Entertainment", count: 15, color: "#f59e0b" },
	];

	const pendingApprovalData: PendingApprovalData[] = [
		{
			name: "ShopifyConnect Pro",
			status: "Review",
			date: "2 hours ago",
			priority: "high",
		},
		{
			name: "Social Analytics Dashboard",
			status: "Testing",
			date: "5 hours ago",
			priority: "medium",
		},
		{
			name: "Task Manager Plus",
			status: "Documentation",
			date: "1 day ago",
			priority: "low",
		},
		{
			name: "Video Streaming App",
			status: "Review",
			date: "1 day ago",
			priority: "high",
		},
		{
			name: "Email Marketing Suite",
			status: "Testing",
			date: "2 days ago",
			priority: "medium",
		},
	];

	const dateRanges: string[] = [
		"7 Days",
		"30 Days",
		"3 Months",
		"6 Months",
		"1 Year",
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5 },
		},
	};

	const totalNewUsers = newUserData.reduce((acc, curr) => acc + curr.users, 0);
	const totalSubmissions = appSubmissionData.reduce(
		(acc, curr) => acc + curr.count,
		0
	);
	const [currView, setCurrView] = useState("dashboard");

	const cardAppPendingVariants = {
		hidden: { opacity: 0, scale: 0.95 },
		show: {
			opacity: 1,
			scale: 1,
			transition: { duration: 0.3 },
		},
	};
	const containerAppPendingVariants = {
		hidden: { opacity: 0, y: 20 },
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				staggerChildren: 0.1,
			},
		},
	};

	const appData = [
		{
			id: 1,
			icon: "/api/placeholder/40/40",
			name: "Design Studio",
			vendor: "Creative Labs",
			submittedOn: "22 Oct, 2025",
		},
		{
			id: 2,
			icon: "/api/placeholder/40/40",
			name: "SecureVault VPN",
			vendor: "Privacy Solutions",
			submittedOn: "22 Oct, 2025",
		},
		{
			id: 3,
			icon: "/api/placeholder/40/40",
			name: "TaskMaster Pro",
			vendor: "Productivity Co",
			submittedOn: "22 Oct, 2025",
		},
	];
	const [app1, setApp1] = useState<string>("");
	const [app2, setApp2] = useState<string>("");

	const apps: {
		id: string;
		name: string;
		logo: string;
		vendor: string;
		category: string;
		pricing: string;
		features: Record<string, boolean>;
	}[] = [
		{
			id: "1",
			name: "Augment Code",
			logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO6OV2vb0Q3CKPGDnnigIPZ4q_7ufTZ7riYA&s", // official Augment Code preview image
			vendor: "Augment Labs",
			category: "AI Development Tools",
			pricing: "$0/month",
			features: {
				"Code Editor": true,
				Debugger: true,
				"Version Control Integration": true,
				"AI Assistance": true,
				"Real-time Collaboration": false,
				"Offline Mode": false,
			},
		},
		{
			id: "2",
			name: "Cline",
			logo: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/cline.png", // official Cline GitHub org logo
			vendor: "Cline",
			category: "Collaborative coding agent",
			pricing: "$0/month",
			features: {
				"Code Editor": true,
				Debugger: true,
				"Version Control Integration": true,
				"AI Assistance": true,
				"Real-time Collaboration": true,
				"Offline Mode": false,
			},
		},
		{
			id: "3",
			name: "Cursor",
			logo: "https://www.logoshape.com/wp-content/uploads/2025/03/Cursor_Vector_Logo.png", // Cursor AI logo from GitHub
			vendor: "Cursor AI",
			category: "AI Coding Assistant",
			pricing: "$0/month",
			features: {
				"Code Editor": true,
				Debugger: true,
				"Version Control Integration": true,
				"AI Assistance": true,
				"Real-time Collaboration": false,
				"Offline Mode": true,
			},
		},
	];

	const selectedApp1 = apps.find((a) => a.id === app1);
	const selectedApp2 = apps.find((a) => a.id === app2);

	const [menuItems, setMenuItems] = useState([
		{
			id: 1,
			label: "Profile",
			icon: "UserIcon",
			linkPageName: "UserProfile",
			authVisible: true,
			adminVisible: true,
			visible: true,
		},
		{
			id: 2,
			label: "Admin Panel",
			icon: "Settings",
			linkPageName: "AdminPanel",
			authVisible: true,
			adminVisible: true,
			visible: true,
		},
		{
			id: 3,
			label: "Explore",
			icon: "Sparkles",
			linkPageName: "Explore",
			authVisible: false,
			adminVisible: false,
			visible: true,
		},
		{
			id: 4,
			label: "Add Your App",
			icon: "Plus",
			linkPageName: "AddApp",
			authVisible: false,
			adminVisible: false,
			visible: true,
		},
		{
			id: 5,
			label: "Your Score",
			icon: "Trophy",
			linkPageName: "ImpactDashboard",
			authVisible: true,
			adminVisible: false,
			visible: true,
		},
		{
			id: 6,
			label: "Pricing",
			icon: "DollarSign",
			linkPageName: "Pricing",
			authVisible: false,
			adminVisible: false,
			visible: true,
		},
		{
			id: 7,
			label: "About",
			icon: "Info",
			linkPageName: "About",
			authVisible: false,
			adminVisible: false,
			visible: true,
		},
	]);

	const handleCheckboxChange = (
		id: number,
		field: "authVisible" | "adminVisible"
	) => {
		setMenuItems((items) =>
			items.map((item) =>
				item.id === id ? { ...item, [field]: !item[field] } : item
			)
		);
	};

	const handleIconChange = (id: number, newIcon: string) => {
		setMenuItems((items) =>
			items.map((item) => (item.id === id ? { ...item, icon: newIcon } : item))
		);
	};

	// const iconMap: { [key: string]: unknown } = {
	// 	UserIcon: UserCircle2,
	// 	Settings: Settings,
	// 	Sparkles: Sparkles,
	// 	Plus: Plus,
	// 	Trophy: Trophy,
	// 	DollarSign: DollarSign,
	// 	Info: Info,
	// };

	return (
		<div className=" pt-24">
			{/* Mobile Menu Button */}
			<button
				onClick={() => setSidebarOpen(!sidebarOpen)}
				className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 rounded-lg">
				{sidebarOpen ? <X size={24} /> : <Menu size={24} />}
			</button>

			{/* Sidebar */}
			<div
				className={`fixed left-0 h-full no-scrollbar  w-56 bg-slate-900/50 border-r border-slate-700/50 backdrop-blur-sm transition-transform duration-300 z-40 overflow-y-auto ${
					sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
				}`}>
				{/* Main Section */}
				<div className="px-4 py-6">
					<div className="text-xs text-slate-500 mb-3 font-semibold">MAIN</div>
					<div className="space-y-1">
						<div
							onClick={() => setCurrView("dashboard")}
							className={`flex items-center space-x-3 hover:text-white hover:bg-slate-800/30 cursor-pointer px-3 py-2 ${
								currView === "dashboard"
									? "bg-slate-800/50 text-white"
									: "text-slate-400"
							}  rounded-lg text-sm`}>
							<LayoutDashboard size={16} />
							<span>Dashboard</span>
						</div>
						<div
							onClick={() => setCurrView("app-pending")}
							className={`flex items-center space-x-3 hover:text-white hover:bg-slate-800/30 cursor-pointer px-3 py-2 ${
								currView === "app-pending"
									? "bg-slate-800/50 text-white"
									: "text-slate-400"
							}  rounded-lg text-sm`}>
							<Clock size={16} />
							<span>Apps Pending</span>
						</div>
						<div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
							<FileText size={16} />
							<span>Media Library Pro</span>
						</div>
					</div>
				</div>

				{/* Content Section */}
				<div className="px-4 py-6 border-t border-slate-700/50">
					<div className="text-xs text-slate-500 mb-3 font-semibold">
						CONTENT
					</div>
					<div className="space-y-1">
						<div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
							<Target size={16} />
							<span>Apps</span>
						</div>
						<div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
							<FileText size={16} />
							<span>Manage Pages</span>
						</div>
						<div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
							<Bell size={16} />
							<span>Notifications</span>
						</div>
					</div>
				</div>

				{/* Community Section */}
				<div className="px-4 py-6 border-t border-slate-700/50">
					<div className="text-xs text-slate-500 mb-3 font-semibold">
						COMMUNITY
					</div>
					<div className="space-y-1">
						<div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
							<Users size={16} />
							<span>Users</span>
						</div>
						<div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
							<Trophy size={16} />
							<span>Gamification</span>
						</div>
					</div>
				</div>

				{/* Business Section */}
				<div className="px-4 py-6 border-t border-slate-700/50">
					<div className="text-xs text-slate-500 mb-3 font-semibold">
						BUSINESS
					</div>
					<div className="space-y-1">
						<div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
							<DollarSign size={16} />
							<span>Financials</span>
						</div>
						<div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
							<Ticket size={16} />
							<span>Coupons</span>
						</div>
					</div>
				</div>

				{/* Tools Section */}
				<div className="px-4 py-6 border-t border-slate-700/50">
					<div className="text-xs text-slate-500 mb-3 font-semibold">TOOLS</div>
					<div
						onClick={() => setCurrView("compare-apps")}
						className="space-y-1">
						<div
							className={`flex items-center space-x-3 hover:text-white hover:bg-slate-800/30 cursor-pointer px-3 py-2 ${
								currView === "compare-apps"
									? "bg-slate-800/50 text-white"
									: "text-slate-400"
							}  rounded-lg text-sm`}>
							<GitCompare size={16} />
							<span>Compare Apps</span>
						</div>
					</div>
				</div>
				{/* System Section */}
				<div className="px-4 py-6 border-t border-slate-700/50">
					<div className="text-xs text-slate-500 mb-3 font-semibold">
						SYSTEM
					</div>
					<div className="space-y-1">
						<div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
							<Search size={16} />
							<span>SEO Tools</span>
						</div>
					</div>
					<div className="space-y-1">
						<div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
							<Activity size={16} />
							<span>System Health</span>
						</div>
					</div>
					<div
						onClick={() => setCurrView("menu-items")}
						className="space-y-1">
						<div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
							<Menu size={16} />
							<span>Menu Settings</span>
						</div>
					</div>
					<div className="space-y-1">
						<div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer">
							<Settings size={16} />
							<span>General Settings</span>
						</div>
					</div>
					<div className="space-y-1">
						<div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer"></div>
					</div>
					<div className="space-y-1">
						<div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer"></div>
					</div>
					<div className="space-y-1">
						<div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer"></div>
					</div>
					<div className="space-y-1">
						<div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer"></div>
					</div>
					<div className="space-y-1">
						<div className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg text-sm cursor-pointer"></div>
					</div>
				</div>
			</div>

			{/* Overlay for mobile */}
			{sidebarOpen && (
				<div
					className="lg:hidden fixed inset-0 bg-black/50 z-30"
					onClick={() => setSidebarOpen(false)}></div>
			)}

			{/* Main Content */}
			{currView === "dashboard" && (
				<div className="lg:ml-56  p-4 md:p-6 lg:p-8">
					{/* Date Range Selector */}
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6 lg:mb-8">
						<div className="flex items-center space-x-2 text-slate-300">
							<Calendar size={20} />
							<span className="text-sm font-medium">Date Range:</span>
						</div>
						<div className="flex flex-wrap gap-2">
							{dateRanges.map((range) => (
								<button
									key={range}
									onClick={() => setSelectedRange(range)}
									className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
										selectedRange === range
											? "bg-cyan-500 text-white"
											: "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50"
									}`}>
									{range}
								</button>
							))}
						</div>
						<div className="flex items-center space-x-2 lg:space-x-3 lg:ml-auto">
							<input
								type="text"
								value="04/22/2025"
								readOnly
								className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-2 md:px-4 py-2 text-xs md:text-sm w-24 md:w-32 text-center"
							/>
							<span className="text-slate-500 text-xs md:text-sm">to</span>
							<input
								type="text"
								value="10/22/2025"
								readOnly
								className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-2 md:px-4 py-2 text-xs md:text-sm w-24 md:w-32 text-center"
							/>
						</div>
					</motion.div>

					{/* Stats Cards */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 lg:mb-8">
						{/* Total Revenue Card */}
						<motion.div
							variants={itemVariants}
							className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border border-emerald-700/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center space-x-2 text-emerald-300">
									<span className="text-xs md:text-sm font-medium">
										Total Revenue
									</span>
									<Info
										size={14}
										className="text-emerald-400"
									/>
								</div>
								<DollarSign
									size={20}
									className="text-emerald-400"
								/>
							</div>
							<div className="text-3xl md:text-4xl font-bold text-white">
								$32
							</div>
						</motion.div>

						{/* Vendor Conversion Rate Card */}
						<motion.div
							variants={itemVariants}
							className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-700/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center space-x-2 text-blue-300">
									<span className="text-xs md:text-sm font-medium">
										Vendor Conversion Rate
									</span>
									<Info
										size={14}
										className="text-blue-400"
									/>
								</div>
								<TrendingUp
									size={20}
									className="text-blue-400"
								/>
							</div>
							<div className="text-3xl md:text-4xl font-bold text-white">
								66.7%
							</div>
						</motion.div>

						{/* GMV Card */}
						<motion.div
							variants={itemVariants}
							className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-700/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center space-x-2 text-purple-300">
									<span className="text-xs md:text-sm font-medium">GMV</span>
									<Info
										size={14}
										className="text-purple-400"
									/>
								</div>
								<Activity
									size={20}
									className="text-purple-400"
								/>
							</div>
							<div className="text-3xl md:text-4xl font-bold text-white">
								$320
							</div>
						</motion.div>

						{/* ARR Card */}
						<motion.div
							variants={itemVariants}
							className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 border border-amber-700/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center space-x-2 text-amber-300">
									<span className="text-xs md:text-sm font-medium">ARR</span>
									<Info
										size={14}
										className="text-amber-400"
									/>
								</div>
								<Target
									size={20}
									className="text-amber-400"
								/>
							</div>
							<div className="text-3xl md:text-4xl font-bold text-white">
								$239.76
							</div>
						</motion.div>
					</motion.div>

					{/* Revenue Trend Chart */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-4 md:p-6 backdrop-blur-sm mb-6 lg:mb-8">
						<h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">
							Revenue Trend
						</h3>
						<ResponsiveContainer
							width="100%"
							height={250}
							className="md:h-[300px]">
							<LineChart data={revenueData}>
								<XAxis
									dataKey="month"
									stroke="#64748b"
									tick={{ fill: "#94a3b8", fontSize: 11 }}
									axisLine={{ stroke: "#334155" }}
								/>
								<YAxis
									stroke="#64748b"
									tick={{ fill: "#94a3b8", fontSize: 11 }}
									axisLine={{ stroke: "#334155" }}
									ticks={[0, 80, 160, 240, 320]}
								/>
								<Tooltip
									contentStyle={{
										backgroundColor: "#1e293b",
										border: "1px solid #334155",
										borderRadius: "8px",
										color: "#fff",
										fontSize: "12px",
									}}
								/>
								<Line
									type="monotone"
									dataKey="value"
									stroke="#06b6d4"
									strokeWidth={3}
									dot={{ fill: "#06b6d4", r: 5 }}
									activeDot={{ r: 7 }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</motion.div>

					{/* Bottom Cards with Data */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
						{/* New Users Card */}
						<motion.div
							variants={itemVariants}
							className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-700/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center space-x-2 text-blue-300">
									<span className="text-sm md:text-base font-medium">
										New Users
									</span>
									<Info
										size={14}
										className="text-blue-400"
									/>
								</div>
								<Users
									size={20}
									className="text-blue-400"
								/>
							</div>
							<div className="text-2xl md:text-3xl font-bold text-white mb-4">
								{totalNewUsers}
							</div>
							<ResponsiveContainer
								width="100%"
								height={150}>
								<BarChart data={newUserData}>
									<XAxis
										dataKey="date"
										stroke="#64748b"
										tick={{ fill: "#94a3b8", fontSize: 10 }}
										axisLine={{ stroke: "#334155" }}
									/>
									<Tooltip
										contentStyle={{
											backgroundColor: "#1e293b",
											border: "1px solid #334155",
											borderRadius: "8px",
											color: "#fff",
											fontSize: "11px",
										}}
									/>
									<Bar
										dataKey="users"
										fill="#3b82f6"
										radius={[8, 8, 0, 0]}
									/>
								</BarChart>
							</ResponsiveContainer>
						</motion.div>

						{/* App Submissions Card */}
						<motion.div
							variants={itemVariants}
							className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-700/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center space-x-2 text-purple-300">
									<span className="text-sm md:text-base font-medium">
										App Submissions
									</span>
									<Info
										size={14}
										className="text-purple-400"
									/>
								</div>
								<FileText
									size={20}
									className="text-purple-400"
								/>
							</div>
							<div className="text-2xl md:text-3xl font-bold text-white mb-4">
								{totalSubmissions}
							</div>
							<div className="flex items-center justify-between">
								<ResponsiveContainer
									width="50%"
									height={150}>
									<PieChart>
										<Pie
											data={appSubmissionData}
											cx="50%"
											cy="50%"
											innerRadius={30}
											outerRadius={50}
											paddingAngle={5}
											dataKey="count">
											{appSubmissionData.map((entry, index) => (
												<Cell
													key={`cell-${index}`}
													fill={entry.color}
												/>
											))}
										</Pie>
										<Tooltip />
									</PieChart>
								</ResponsiveContainer>
								<div className="space-y-2 text-xs">
									{appSubmissionData.map((item, index) => (
										<div
											key={index}
											className="flex items-center space-x-2">
											<div
												className="w-3 h-3 rounded-full"
												style={{ backgroundColor: item.color }}></div>
											<span className="text-slate-300">
												{item.category}: {item.count}
											</span>
										</div>
									))}
								</div>
							</div>
						</motion.div>

						{/* Pending Approval Card */}
						<motion.div
							variants={itemVariants}
							className="bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-700/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center space-x-2 text-amber-300">
									<span className="text-sm md:text-base font-medium">
										Pending Approval
									</span>
									<Info
										size={14}
										className="text-amber-400"
									/>
								</div>
								<Clock
									size={20}
									className="text-amber-400"
								/>
							</div>
							<div className="text-2xl md:text-3xl font-bold text-white mb-4">
								{pendingApprovalData.length}
							</div>
							<div className="space-y-2 max-h-[150px] overflow-y-auto no-scrollbar">
								{pendingApprovalData.map((item, index) => (
									<div
										key={index}
										className="flex items-center justify-between p-2 bg-slate-800/30 rounded-lg">
										<div className="flex-1 min-w-0">
											<div className="text-xs font-medium text-white truncate">
												{item.name}
											</div>
											<div className="text-xs text-slate-400">{item.date}</div>
										</div>
										<div className="ml-2 flex items-center space-x-2">
											<span
												className={`px-2 py-1 rounded text-xs ${
													item.priority === "high"
														? "bg-red-500/20 text-red-400"
														: item.priority === "medium"
														? "bg-yellow-500/20 text-yellow-400"
														: "bg-green-500/20 text-green-400"
												}`}>
												{item.status}
											</span>
										</div>
									</div>
								))}
							</div>
						</motion.div>
					</motion.div>
				</div>
			)}
			{currView === "app-pending" && (
				<div className=" lg:ml-56  p-4 md:p-6 lg:p-8">
					<motion.div
						variants={containerAppPendingVariants}
						initial="hidden"
						animate="show"
						className="max-w-7xl mx-auto">
						{/* Header */}
						<div className="mb-8">
							<h2 className="text-3xl font-bold text-white mb-2">
								Apps Pending (FIFO)
							</h2>
						</div>

						{/* Stats Cards */}
						<motion.div
							variants={containerAppPendingVariants}
							className="grid grid-cols-4 gap-4 mb-8">
							{/* Approved This Month */}
							<motion.div
								variants={cardAppPendingVariants}
								className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 backdrop-blur border border-emerald-700/50 rounded-xl p-6 relative overflow-hidden">
								<div className="absolute top-3 right-3">
									<CheckCircle className="w-5 h-5 text-emerald-400" />
								</div>
								<div className="text-emerald-400 text-sm font-medium mb-2">
									Approved This Month
								</div>
								<div className="text-4xl font-bold text-white">3</div>
							</motion.div>

							{/* Rejected This Month */}
							<motion.div
								variants={cardAppPendingVariants}
								className="bg-gradient-to-br from-red-900/40 to-red-800/20 backdrop-blur border border-red-700/50 rounded-xl p-6 relative overflow-hidden">
								<div className="absolute top-3 right-3">
									<XCircle className="w-5 h-5 text-red-400" />
								</div>
								<div className="text-red-400 text-sm font-medium mb-2">
									Rejected This Month
								</div>
								<div className="text-4xl font-bold text-white">1</div>
							</motion.div>

							{/* Changes Requested */}
							<motion.div
								variants={cardAppPendingVariants}
								className="bg-gradient-to-br from-amber-900/40 to-amber-800/20 backdrop-blur border border-amber-700/50 rounded-xl p-6 relative overflow-hidden">
								<div className="absolute top-3 right-3">
									<AlertCircle className="w-5 h-5 text-amber-400" />
								</div>
								<div className="text-amber-400 text-sm font-medium mb-2">
									Changes Requested
								</div>
								<div className="text-4xl font-bold text-white">1</div>
							</motion.div>

							{/* Total Submitted */}
							<motion.div
								variants={cardAppPendingVariants}
								className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur border border-blue-700/50 rounded-xl p-6 relative overflow-hidden">
								<div className="absolute top-3 right-3">
									<Package className="w-5 h-5 text-blue-400" />
								</div>
								<div className="text-blue-400 text-sm font-medium mb-2">
									Total Submitted
								</div>
								<div className="text-4xl font-bold text-white">8</div>
							</motion.div>
						</motion.div>

						{/* Table Section */}
						<motion.div
							variants={cardAppPendingVariants}
							className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
							<div className="overflow-x-auto rounded-xl border border-slate-700/50 bg-slate-800/60">
								<table className="min-w-full divide-y divide-slate-700/30">
									<thead>
										<tr className="text-slate-400 text-sm">
											<th className="text-left px-4 py-3 font-medium">
												APP NAME
											</th>
											<th className="text-left px-4 py-3 font-medium">
												VENDOR
											</th>
											<th className="text-left px-4 py-3 font-medium">
												SUBMITTED ON
											</th>
											<th className="text-left px-4 py-3 font-medium">
												ACTIONS
											</th>
										</tr>

										{/* Filter Row */}
										<tr>
											<th className="px-4 pb-3">
												<Input
													placeholder="Filter by name..."
													className="bg-slate-700/30 border-slate-600/50 text-slate-300 text-sm"
												/>
											</th>
											<th className="px-4 pb-3">
												<Input
													placeholder="Filter by vendor..."
													className="bg-slate-700/30 border-slate-600/50 text-slate-300 text-sm"
												/>
											</th>
											<th className="px-4 pb-3">
												<Input
													type="date"
													className="bg-slate-700/30 border-slate-600/50 text-slate-300 text-sm"
												/>
											</th>
											<th></th>
										</tr>
									</thead>

									<tbody className="divide-y divide-slate-700/30">
										{appData.map((app) => (
											<motion.tr
												key={app.id}
												whileHover={{ backgroundColor: "rgba(51,65,85,0.3)" }}
												className="transition-colors">
												{/* App Name */}
												<td className="px-4 py-3 flex items-center gap-3">
													<div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center overflow-hidden">
														<img
															src={app.icon}
															alt={app.name}
															className="w-full h-full object-cover"
														/>
													</div>
													<span className="text-slate-200 font-medium">
														{app.name}
													</span>
												</td>

												{/* Vendor */}
												<td className="px-4 py-3 text-slate-400">
													{app.vendor}
												</td>

												{/* Submitted On */}
												<td className="px-4 py-3 text-slate-400">
													{app.submittedOn}
												</td>

												{/* Actions */}
												<td className="px-4 py-3 flex items-center gap-2">
													<Button
														size="sm"
														className="bg-blue-600 hover:bg-blue-700 text-white">
														<Search className="w-3 h-3 mr-1" />
														View
													</Button>
													<Button
														size="sm"
														className="bg-emerald-600 hover:bg-emerald-700 text-white">
														<CheckCircle className="w-3 h-3 mr-1" />
														Approve
													</Button>
													<Button
														size="sm"
														className="bg-amber-600 hover:bg-amber-700 text-white">
														<AlertCircle className="w-3 h-3 mr-1" />
														Request Changes
													</Button>
													<Button
														size="sm"
														className="bg-red-600 hover:bg-red-700 text-white">
														<XCircle className="w-3 h-3 mr-1" />
														Reject
													</Button>
												</td>
											</motion.tr>
										))}
									</tbody>
								</table>
							</div>
						</motion.div>
					</motion.div>
				</div>
			)}
			{currView === "compare-apps" && (
				<div className="lg:ml-56  p-4 md:p-6 lg:p-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className=" text-slate-200">
						<h2 className="text-3xl font-bold mb-6">App Comparison Tool</h2>

						{/* Select Section */}
						<div className="flex bg-[#15232a] p-4 rounded-xl md:grid-cols-2 gap-6 mb-8">
							<div className="w-1/2">
								<label className="text-sm text-slate-400 mb-2 block">
									Select App 1
								</label>
								<Select onValueChange={(val) => setApp1(val)}>
									<SelectTrigger className="bg-slate-800 w-full border-slate-700 text-slate-200">
										<SelectValue placeholder="Select App 1" />
									</SelectTrigger>
									<SelectContent className="bg-slate-800 text-slate-200 border-slate-700">
										{apps.map((app) => (
											<SelectItem
												key={app.id}
												value={app.id}>
												{app.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className="w-1/2">
								<label className="text-sm text-slate-400 mb-2 block">
									Select App 2
								</label>
								<Select onValueChange={(val) => setApp2(val)}>
									<SelectTrigger className="bg-slate-800 w-full border-slate-700 text-slate-200">
										<SelectValue placeholder="Select App 2" />
									</SelectTrigger>
									<SelectContent className="bg-slate-800 text-slate-200 border-slate-700">
										{apps.map((app) => (
											<SelectItem
												key={app.id}
												value={app.id}>
												{app.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>

						{/* Comparison Table */}
						{(selectedApp1 || selectedApp2) && (
							<div className="overflow-x-auto border border-slate-700/50 rounded-xl bg-slate-800/60">
								<table className="min-w-full divide-y bg-[#15232a] divide-slate-700/30">
									<thead>
										<tr className="text-slate-400 text-sm">
											<th className="px-4 py-3 text-left font-medium">
												Feature
											</th>
											<th className="px-4 py-3 text-left font-medium">
												{selectedApp1 ? selectedApp1.name : "-"}
											</th>
											<th className="px-4 py-3 text-left font-medium">
												{selectedApp2 ? selectedApp2.name : "-"}
											</th>
										</tr>
									</thead>

									<tbody className="divide-y bg-[#192d37] divide-slate-700/30">
										{/* Logos */}
										<tr>
											<td className="px-4 py-3 font-medium">Logo</td>
											<td className="px-4 py-3">
												{selectedApp1 && (
													<img
														src={selectedApp1.logo}
														alt={selectedApp1.name}
														className="w-10 h-10 rounded-md"
													/>
												)}
											</td>
											<td className="px-4 py-3">
												{selectedApp2 && (
													<img
														src={selectedApp2.logo}
														alt={selectedApp2.name}
														className="w-10 h-10 rounded-md"
													/>
												)}
											</td>
										</tr>

										{/* Vendor */}
										<tr>
											<td className="px-4 py-3 font-medium">Vendor</td>
											<td className="px-4 py-3 text-slate-300">
												{selectedApp1?.vendor || "-"}
											</td>
											<td className="px-4 py-3 text-slate-300">
												{selectedApp2?.vendor || "-"}
											</td>
										</tr>

										{/* Category */}
										<tr>
											<td className="px-4 py-3 font-medium">Category</td>
											<td className="px-4 py-3 text-slate-300">
												{selectedApp1?.category || "-"}
											</td>
											<td className="px-4 py-3 text-slate-300">
												{selectedApp2?.category || "-"}
											</td>
										</tr>

										{/* Pricing */}
										<tr>
											<td className="px-4 py-3 font-medium">Pricing</td>
											<td className="px-4 py-3 text-slate-300">
												{selectedApp1?.pricing || "-"}
											</td>
											<td className="px-4 py-3 text-slate-300">
												{selectedApp2?.pricing || "-"}
											</td>
										</tr>

										{/* Features */}
										{Object.keys(apps[0].features).map((feature) => (
											<tr key={feature}>
												<td className="px-4 py-3 font-medium">{feature}</td>
												<td className="px-4 py-3">
													{selectedApp1?.features[feature] ? (
														<Check className="text-emerald-500 w-4 h-4" />
													) : (
														<X className="text-red-500 w-4 h-4" />
													)}
												</td>
												<td className="px-4 py-3">
													{selectedApp2?.features[feature] ? (
														<Check className="text-emerald-500 w-4 h-4" />
													) : (
														<X className="text-red-500 w-4 h-4" />
													)}
												</td>
											</tr>
										))}
										<tr>
											<td className="px-4 py-3 font-medium"></td>
											<td className="px-4 py-3 text-slate-300">
												<Button className="bg-blue-600">Buy Now</Button>
											</td>
											<td className="px-4 py-3 text-slate-300">
												<Button className="bg-blue-600">Buy Now</Button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						)}

						{/* Empty state message */}
						{!app1 && !app2 && (
							<p className="text-slate-400 text-center mt-10">
								Please select apps to compare.
							</p>
						)}
					</motion.div>
				</div>
			)}
			{currView === "menu-items" && (
				<div className="lg:ml-56  p-4 md:p-6 lg:p-8">
					<div className="max-w-7xl mx-auto">
						{/* Header */}
						<div className="flex justify-between items-center mb-8">
							<h2 className="text-3xl font-bold text-white">
								Mobile Menu Settings
							</h2>
							<Button className="bg-teal-600 hover:bg-teal-700 text-white">
								Save Changes
							</Button>
						</div>

						{/* Instructions */}
						<p className="text-gray-400 text-sm mb-6">
							Drag items to reorder, toggle visibility, or edit properties
						</p>

						{/* Menu Items */}
						<div className="space-y-3">
							{menuItems.map((item) => {
								// const IconComponent = iconMap[item.icon];

								return (
									<div
										key={item.id}
										className="bg-[#132f4c] rounded-lg p-4 flex items-center gap-4 border border-[#1e4976]">
										{/* Drag Handle */}
										<div className="flex items-center gap-2">
											<GripVertical className="w-5 h-5 text-gray-500 cursor-move" />
											<span className="text-gray-500 text-sm">{item.id}</span>
										</div>

										{/* Label Input */}
										<div className="flex-1">
											<label className="text-xs text-gray-400 block mb-1">
												Label
											</label>
											<input
												type="text"
												value={item.label}
												onChange={(e) => {
													setMenuItems((items) =>
														items.map((i) =>
															i.id === item.id
																? { ...i, label: e.target.value }
																: i
														)
													);
												}}
												className="w-full bg-[#0a1929] border border-[#1e4976] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-600"
											/>
										</div>

										{/* Icon Select */}
										<div className="flex-1">
											<label className="text-xs text-gray-400 block mb-1">
												Icon
											</label>
											<Select
												value={item.icon}
												onValueChange={(value) =>
													handleIconChange(item.id, value)
												}>
												<SelectTrigger className="w-full bg-[#0a1929] border-[#1e4976] text-white">
													<SelectValue />
												</SelectTrigger>
												<SelectContent className="bg-[#0a1929] border-[#1e4976]">
													<SelectItem
														value="UserIcon"
														className="text-white">
														UserIcon
													</SelectItem>
													<SelectItem
														value="Settings"
														className="text-white">
														Settings
													</SelectItem>
													<SelectItem
														value="Sparkles"
														className="text-white">
														Sparkles
													</SelectItem>
													<SelectItem
														value="Plus"
														className="text-white">
														Plus
													</SelectItem>
													<SelectItem
														value="Trophy"
														className="text-white">
														Trophy
													</SelectItem>
													<SelectItem
														value="DollarSign"
														className="text-white">
														DollarSign
													</SelectItem>
													<SelectItem
														value="Info"
														className="text-white">
														Info
													</SelectItem>
												</SelectContent>
											</Select>
										</div>

										{/* Link Page Name */}
										<div className="flex-1">
											<label className="text-xs text-gray-400 block mb-1">
												Link (Page Name)
											</label>
											<input
												type="text"
												value={item.linkPageName}
												onChange={(e) => {
													setMenuItems((items) =>
														items.map((i) =>
															i.id === item.id
																? { ...i, linkPageName: e.target.value }
																: i
														)
													);
												}}
												className="w-full bg-[#0a1929] border border-[#1e4976] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-600"
											/>
										</div>

										{/* Visibility Checkboxes */}
										<div className="flex items-center gap-4 bg-[#0a1929] border border-[#1e4976] rounded px-4 py-3 min-w-[180px]">
											<div className="flex items-center gap-2">
												<Checkbox
													id={`auth-${item.id}`}
													checked={item.authVisible}
													onCheckedChange={() =>
														handleCheckboxChange(item.id, "authVisible")
													}
													className="border-gray-500 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
												/>
												<label
													htmlFor={`auth-${item.id}`}
													className="text-sm text-gray-300 cursor-pointer">
													Auth
												</label>
											</div>
											<div className="flex items-center gap-2">
												<Checkbox
													id={`admin-${item.id}`}
													checked={item.adminVisible}
													onCheckedChange={() =>
														handleCheckboxChange(item.id, "adminVisible")
													}
													className="border-gray-500 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
												/>
												<label
													htmlFor={`admin-${item.id}`}
													className="text-sm text-gray-300 cursor-pointer">
													Admin
												</label>
											</div>
										</div>

										{/* Visible Button */}
										<Button
											variant="outline"
											className="bg-transparent border-green-600 text-green-500 hover:bg-green-600/10 min-w-[80px]">
											Visible
										</Button>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
