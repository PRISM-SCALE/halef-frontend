import {Outlet} from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import {AuthProvider} from "../context/LogoutProvider";
import Footer from "../components/Footer";
import HeaderLayout from "../components/HeaderLayout";
// import PreloadImages from "../components/PreLoadImage";

const RootLayout = () => {
	return (
		<AuthProvider>
			<div>
				<Navbar />
				<HeaderLayout />

				{/* Navigation */}
				{/* <PreloadImages /> */}

				<main
					id="main_start"
					className="max-[1200px]:px-8"
					style={{maxWidth: "1200px", margin: "0 auto"}}
				>
					<Outlet />
				</main>
			</div>
			<Footer />
		</AuthProvider>
	);
};

export default RootLayout;
