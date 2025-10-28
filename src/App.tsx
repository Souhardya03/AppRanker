import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Explore from "./pages/Explore/Explore";
import Compare from "./pages/Compare/Compare";
import ImpactDashboard from "./pages/Dashboard/ImapactDashboard";
import Dashboard from "./pages/Admin/Admin";
function App() {
	return (
		<Layout>
			<Navbar />
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
			</Routes>
			<Footer/>
		</Layout>
	);
}

export default App;
