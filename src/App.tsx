import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Explore from "./pages/Explore/Explore";
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
			</Routes>
			<Footer/>
		</Layout>
	);
}

export default App;
