import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LoadScript} from "@react-google-maps/api";

import "./App.css";

// UTILS
import {API_KEY} from "./utils/variables";

// PAGES
import NotFound from "./pages/NotFound";
import RootLayout from "./pages/RootLayout";
import Relocation from "./pages/relocation/Relocation";
import Home, {serviceLoader} from "./pages/home/Home";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <RootLayout />,
			// errorElement: <ErrorPage />,
			children: [
				// {index: true, element: <LandingPage />},
				{
					index: true,
					element: <Home />,
					loader: serviceLoader,
				},
				{
					path: "/RELOCATION",
					element: <Relocation />,
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
