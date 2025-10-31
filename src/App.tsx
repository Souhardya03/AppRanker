import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Explore from "./pages/Explore/Explore";
import Compare from "./pages/Compare/Compare";
import ImpactDashboard from "./pages/Dashboard/ImapactDashboard";
import Dashboard from "./pages/Admin/Admin";
import About from "./pages/About/About";

function App() {
	const location = useLocation();

	const hideFooterRoutes = ["/about"];
	const hideNavbarRoutes = ["/about"];

	return (
		<Layout>
			{!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

			<Routes>
				<Route
					index
					element={<Home />}
				/>
				<Route
					path="/explore"
					element={<Explore />}
				/>
				<Route
					path="/compare"
					element={<Compare />}
				/>
				<Route
					path="/dashboard"
					element={<ImpactDashboard />}
				/>
				<Route
					path="/admin"
					element={<Dashboard />}
				/>
				<Route
					path="/about"
					element={<About />}
				/>
			</Routes>

			{!hideFooterRoutes.includes(location.pathname) && <Footer />}
		</Layout>
	);
}

export default App;
