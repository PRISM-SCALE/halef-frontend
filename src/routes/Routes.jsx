import {createBrowserRouter} from "react-router-dom";
import {servicesLoader} from "../pages/home/Home";
import {relocationLoader} from "../pages/relocation/Relocation";
import {truckingLoader} from "../pages/trucking/Trucking";
import {warehouseLoader} from "../pages/warehouse/Warehouse";

// NOT FOUND
import NotFound from "../pages/NotFound";
import {AirAmbulance, Cargo, Home, Relocation, RootLayout, Trucking, Warehouse} from "./LazyLoad";
import Payment from "../pages/payment/Payment";

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
			{
				path: "/pay-online",
				element: <Payment />,
				// loader: airAmbulanceLoader,
			},
		],
	},

	{
		path: "*",
		element: <NotFound />,
	},
]);

// PAGES
