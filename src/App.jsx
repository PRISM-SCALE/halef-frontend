import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LoadScript} from "@react-google-maps/api";

import "./App.css";

// UTILS
import {API_KEY} from "./utils/variables";

// PAGES
import NotFound from "./pages/NotFound";
import RootLayout from "./pages/RootLayout";
import Home, {servicesLoader} from "./pages/home/Home";
import Relocation, {relocationLoader} from "./pages/relocation/Relocation";
import Cargo from "./pages/cargo/cargo";
import Trucking from "./pages/trucking/Trucking";
import Warehouse from "./pages/warehouse/Warehouse";
import AirAmbulance from "./pages/ambulance/AirAmbulance";

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
				},
				{
					path: "/couriercargo",
					element: <Cargo />,
				},
				{
					path: "/trucking",
					element: <Trucking />,
				},
				{
					path: "/warehouse",
					element: <Warehouse />,
				},
				{
					path: "/airambulance",
					element: <AirAmbulance />,
				},
			],
		},

		{
			path: "*",
			element: <NotFound />,
		},
	]);

	return (
		<LoadScript googleMapsApiKey={API_KEY} libraries={["places", "geometry"]}>
			<RouterProvider router={router} />
		</LoadScript>
	);
}

export default App;
