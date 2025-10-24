import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
	return (
		<Layout>
			<Navbar />
			<Routes>
				<Route
					index
					element={<Home />}
				/>
			</Routes>
			<Footer/>
		</Layout>
	);
}

export default App;
