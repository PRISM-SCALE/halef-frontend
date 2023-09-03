import {Suspense, lazy} from "react";
import {createBrowserRouter} from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import {servicesLoader} from "../pages/home/Home";
import {relocationLoader} from "../pages/relocation/Relocation";
import {truckingLoader} from "../pages/trucking/Trucking";
import {warehouseLoader} from "../pages/warehouse/Warehouse";

// NOT FOUND
import NotFound from "../pages/NotFound";

const Loadable = (Component) => {
	const WrappedComponent = (props) => {
		// const {pathname} = useLocation();

		return (
			<Suspense fallback={<LoadingScreen />}>
				<Component {...props} />
			</Suspense>
		);
	};

	// Set the displayName property for easier debugging and identification
	WrappedComponent.displayName = `Loadable(${
		Component.displayName || Component.name || "Component"
	})`;

	return WrappedComponent;
};

// PAGES
const RootLayout = Loadable(lazy(() => import("../pages/RootLayout")));
const Home = Loadable(lazy(() => import("../pages/home/Home")));
const Relocation = Loadable(lazy(() => import("../pages/relocation/Relocation")));
const Cargo = Loadable(lazy(() => import("../pages/cargo/Cargo")));
const Trucking = Loadable(lazy(() => import("../pages/trucking/Trucking")));
const Warehouse = Loadable(lazy(() => import("../pages/warehouse/Warehouse")));
const AirAmbulance = Loadable(lazy(() => import("../pages/ambulance/AirAmbulance")));

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		// errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
				loader: servicesLoader,
			},
			{
				path: "/relocation",
				element: <Relocation />,
				loader: relocationLoader,
				// action: saveRelocationData,
			},
			{
				path: "/couriercargo",
				element: <Cargo />,
			},
			{
				path: "/trucking",
				element: <Trucking />,
				loader: truckingLoader,
			},
			{
				path: "/warehouse",
				element: <Warehouse />,
				loader: warehouseLoader,
			},
			{
				path: "/airambulance",
				element: <AirAmbulance />,
				// loader: airAmbulanceLoader,
			},
		],
	},

	{
		path: "*",
		element: <NotFound />,
	},
]);
