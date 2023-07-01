import {Outlet} from "react-router-dom";
import Navbar from "../components/navigation/Navbar";

const RootLayout = () => {
	return (
		<div style={{maxWidth: "1200px", margin: "0 auto"}} className="max-[1200px]:px-8">
			{/* Navigation */}
			<Navbar />

			<main id="main_start">
				<Outlet />
			</main>
		</div>
	);
};

export default RootLayout;
