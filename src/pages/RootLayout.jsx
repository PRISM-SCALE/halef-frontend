import {Outlet} from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/Footer";
// import PreloadImages from "../components/PreLoadImage";

const RootLayout = () => {
	return (
		<div className="max-[1200px]:px-8">
			{/* Navigation */}
			{/* <PreloadImages /> */}
			<Navbar />

			<main id="main_start" style={{maxWidth: "1200px", margin: "0 auto"}}>
				<Outlet />
			</main>

			{/* <Footer /> */}
		</div>
	);
};

export default RootLayout;
