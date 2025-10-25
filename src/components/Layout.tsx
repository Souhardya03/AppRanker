import React, { type ReactNode } from "react";
import { SparklesCore } from "./ui/sparkles";

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="min-h-screen no-scrollbar overflow-hidden text-white relative">
			{/* Background Wrapper */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				{/* Gradient Base */}
				<div
					className="absolute inset-0"
					style={{
						background: `
							radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
							radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.08) 0%, transparent 50%),
							radial-gradient(circle at 60% 20%, rgba(14, 165, 233, 0.05) 0%, transparent 50%),
							linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0f172a 100%)
						`,
					}}></div>

				{/* Particles Layer */}
				<div className="w-full absolute inset-0 h-screen">
					<SparklesCore
						id="tsparticlesfullpage"
						background="transparent"
						minSize={0.6}
						maxSize={2.4}
						speed={2}
						particleDensity={20}
						className="w-full h-full"
						particleColor="#FFFFFF"
					/>
				</div>
			</div>

			{/* Page Content */}
			<div className="relative z-10">{children}</div>
		</div>
	);
};

export default Layout;
