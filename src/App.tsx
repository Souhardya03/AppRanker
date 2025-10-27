import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Explore from "./pages/Explore/Explore";
import Compare from "./pages/Compare/Compare";
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
			</Routes>
			<Footer/>
		</Layout>
	);
}

export default App;
