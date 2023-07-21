import {Outlet} from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
// import PreloadImages from "../components/PreLoadImage";

const RootLayout = () => {
	return (
		<div style={{maxWidth: "1200px", margin: "0 auto"}} className="max-[1200px]:px-8">
			{/* Navigation */}
			{/* <PreloadImages /> */}
			<Navbar />

			<main id="main_start">
				<Outlet />
			</main>
		</div>
	);
};

export default RootLayout;
