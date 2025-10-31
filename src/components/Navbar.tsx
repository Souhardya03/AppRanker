import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
	Bell,
	Plus,
	User,
	WandSparkles,
	LogOut,
	Settings,
	Trophy,
	Menu,
	Home,
} from "lucide-react";
import { MovingButton } from "./ui/moving-border";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { CountingNumber } from "./ui/shadcn-io/counting-number";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
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
	const location = useLocation();

	const isActive = (path: string) => location.pathname === path;
	const [isScrollingUp, setIsScrollingUp] = useState(false);
	const lastScrollY = useRef(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > lastScrollY.current) {
				setIsScrollingUp(true);
			} else {
				setIsScrollingUp(false);
			}
			lastScrollY.current = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={`flex fixed w-full z-999 px-6 py-5 items-center justify-between transition-all duration-500
        ${
					isScrollingUp
						? "backdrop-blur-md bg-slate-800/70 "
						: "bg-transparent backdrop-blur-0"
				}`}>
			<div className="flex items-center gap-4">
				{/* Logo */}
				<Link
					to={"/"}
					className="md:w-48 w-48">
					<img
						src="/images/logo.png"
						alt=""
					/>
				</Link>

				{/* Explore Button */}
				<Link
					to="/explore"
					className="lg:block hidden">
					<MovingButton
						borderRadius="1.9rem"
						className="bg-[#131213]  cursor-pointer flex items-center justify-center gap-4 text-lg text-white border-slate-800">
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
						className="rounded-full lg:block hidden">
						<Button className="h-12 rounded-full w-28 text-lg relative overflow-hidden group">
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
				<Link
					to={"/about"}
					className="md:inline-block hidden">
					<Button className="h-12 w-12 rounded-full transition-transform duration-200">
						<Plus
							color="#32ea6c"
							size={24}
						/>
					</Button>
				</Link>
			</div>
			<div className="md:flex hidden items-center rounded-full gap-2">
				<Link
					to={"/dashboard"}
					className="flex items-center gap-2 bg-teal-900/30 border border-teal-700/50 rounded-full px-4 py-1.5">
					<span className="text-teal-400 text-2xl font-bold">
						<CountingNumber
							number={50}
							inView={true}
							transition={{ stiffness: 100, damping: 30 }}
						/>
					</span>
					<span className="text-teal-300 text-sm">Impact</span>
				</Link>

				{/* Bell Icon */}
				<div className="bg-teal-900/30 border border-teal-700/50 rounded-full p-2.5">
					<Bell className="w-5 h-5 text-teal-300" />
				</div>

				{/* User Profile Dropdown */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button className="bg-teal-500 rounded-full p-2.5 hover:bg-teal-600 transition-colors focus:outline-none">
							<User className="w-5 h-5 text-white" />
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="end"
						className="w-56 mt-2 bg-[#142c3a] border-slate-700 text-slate-200">
						<div className="px-3 py-2 border-b border-slate-700">
							<p className="text-xs text-slate-400">contact</p>
							<p className="text-sm text-teal-400">contact@appraiser.io</p>
						</div>

						<DropdownMenuItem
							asChild
							className="cursor-pointer focus:text-white transition-colors hover:bg-[#163d53] focus:bg-[#163d53]">
							<Link
								to="/profile"
								className="flex items-center  gap-2 py-2">
								<User className="w-4 h-4 text-teal-400" />
								<span>Profile</span>
							</Link>
						</DropdownMenuItem>

						<DropdownMenuItem
							asChild
							className="cursor-pointer focus:text-white transition-colors hover:bg-[#163d53] focus:bg-[#163d53]">
							<Link
								to="/score"
								className="flex items-center  gap-2 py-2">
								<Trophy className="w-4 h-4 text-teal-400" />
								<span>Your Score</span>
							</Link>
						</DropdownMenuItem>

						<DropdownMenuItem
							asChild
							className="cursor-pointer focus:text-white transition-colors hover:bg-[#163d53] focus:bg-[#163d53]">
							<Link
								to="/admin"
								className="flex items-center hover:bg-[#163d53] focus:bg-[#163d53] gap-2 py-2">
								<Settings className="w-4 h-4 text-teal-400" />
								<span>Admin Panel</span>
							</Link>
						</DropdownMenuItem>

						<DropdownMenuSeparator className="bg-slate-700" />

						<DropdownMenuItem
							className="cursor-pointer hover:bg-red-800/40 hover:text-white focus:text-white transition-colors focus:bg-red-800/40  text-red-400"
							onClick={() => {
								console.log("Logout clicked");
							}}>
							<LogOut className="w-4 h-4 text-red-400" />
							<span>Logout</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				{/* MobileNav */}
			</div>
			<Sheet>
				<SheetTrigger asChild>
					<div className={`bg-teal-900/30 border md:hidden block border-teal-700/50 rounded-full p-2.5 ${isActive("/admin")?"hidden":"block"}`}>
						<Menu className="w-5 h-5 text-teal-300" />
					</div>
				</SheetTrigger>

				<SheetContent className="bg-slate-900/50 text-white backdrop-blur-md border border-slate-700">
					<SheetHeader>
						<SheetTitle className="w-32">
							<img
								src="/images/logo.png"
								alt="Logo"
							/>
						</SheetTitle>
						<SheetDescription>
							Compare your favourite apps and rank them like a pro!
						</SheetDescription>
					</SheetHeader>

					<div className="mt-4">
						{/* Impact */}
						<Link
							to={"/dashboard"}
							className="flex items-center gap-2 bg-teal-900/30 border border-teal-700/50 rounded-full px-4 py-1.5 mx-3">
							<span className="text-teal-400 text-2xl font-bold">50</span>
							<span className="text-teal-300 text-sm">Impact</span>
						</Link>

						{/* Nav Links */}
						<div className="p-4 space-y-2 border-t border-b border-slate-700 mt-4">
							<Link
								to="/"
								className={`flex items-center gap-2 py-2 px-3 rounded-md transition-colors ${
									isActive("/")
										? "bg-teal-800/40 text-white"
										: "hover:bg-[#163d53] text-slate-300"
								}`}>
								<Home className="w-4 h-4 text-teal-400" />
								<span>Home</span>
							</Link>

							<Link
								to="/profile"
								className={`flex items-center gap-2 py-2 px-3 rounded-md transition-colors ${
									isActive("/profile")
										? "bg-teal-800/40 text-white"
										: "hover:bg-[#163d53] text-slate-300"
								}`}>
								<User className="w-4 h-4 text-teal-400" />
								<span>Profile</span>
							</Link>

							<Link
								to="/notifications"
								className={`flex items-center gap-2 py-2 px-3 rounded-md transition-colors ${
									isActive("/profile")
										? "bg-teal-800/40 text-white"
										: "hover:bg-[#163d53] text-slate-300"
								}`}>
								<Bell className="w-4 h-4 text-teal-400" />
								<span>Notifications</span>
							</Link>

							<Link
								to="/score"
								className={`flex items-center gap-2 py-2 px-3 rounded-md transition-colors ${
									isActive("/score")
										? "bg-teal-800/40 text-white"
										: "hover:bg-[#163d53] text-slate-300"
								}`}>
								<Trophy className="w-4 h-4 text-teal-400" />
								<span>Your Score</span>
							</Link>

							<Link
								to="/admin"
								className={`flex items-center gap-2 py-2 px-3 rounded-md transition-colors ${
									isActive("/admin")
										? "bg-teal-800/40 text-white"
										: "hover:bg-[#163d53] text-slate-300"
								}`}>
								<Settings className="w-4 h-4 text-teal-400" />
								<span>Admin Panel</span>
							</Link>
						</div>
					</div>

					{/* Footer */}
					<SheetFooter className="mt-4 flex gap-4">
						<Button
							type="submit"
							className="w-full bg-red-700 text-white hover:bg-red-900 transition-colors">
							<LogOut className="w-4 h-4 text-white " />
							Logout
						</Button>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</nav>
	);
};

export default Navbar;
