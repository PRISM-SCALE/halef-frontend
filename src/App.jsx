import {createBrowserRouter, RouterProvider} from "react-router-dom";
// import {Loader} from "@googlemaps/js-api-loader";
import {LoadScriptNext} from "@react-google-maps/api";

import "./App.css";

// UTILS
import {API_KEY} from "./utils/variables";

// PAGES
import NotFound from "./pages/NotFound";
import RootLayout from "./pages/RootLayout";
import Home, {servicesLoader} from "./pages/home/Home";
import Relocation, {relocationLoader} from "./pages/relocation/Relocation";
import Trucking, {truckingLoader} from "./pages/trucking/Trucking";
import Warehouse, {warehouseLoader} from "./pages/warehouse/Warehouse";
import AirAmbulance from "./pages/ambulance/AirAmbulance";
import Cargo from "./pages/cargo/Cargo";

const lib = ["places", "geometry"];
// new Loader({
// 	apiKey: API_KEY,
// 	version: "weekly",
// 	libraries: lib,
// });

function App() {
	const router = createBrowserRouter([
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

	return (
		<LoadScriptNext googleMapsApiKey={API_KEY} libraries={lib}>
			<RouterProvider router={router} />
		</LoadScriptNext>
	);
}

export default App;
