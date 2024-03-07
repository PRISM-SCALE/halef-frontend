import {Outlet, useLocation} from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import {AuthProvider} from "../context/LogoutProvider";
import Footer from "../components/Footer";
import HeaderLayout from "../components/HeaderLayout";
import ScrollToTop from "../components/ScrollToTop";
// import PreloadImages from "../components/PreLoadImage";

const RootLayout = () => {
	const location = useLocation();
	const {pathname} = location;

	const changeText = pathname.includes("/pay") ? true : false;

	const headerText = (
		<>
			Pay <span className="text-[#d40035]">Online</span>
		</>
	);

	const headerCostEstimator = (
		<>
			Quote <span className="text-[#d40035]">Calculator</span>
		</>
	);

	return (
		<AuthProvider>
			<ScrollToTop />
			<div>
				<Navbar />
				<HeaderLayout
					breadcrumbLink={changeText ? "Pay Now" : "Quote Calculator"}
					title={changeText ? headerText : headerCostEstimator}
				/>

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
