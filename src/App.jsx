import {useEffect, useMemo} from "react";
import {/*createBrowserRouter,*/ RouterProvider} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
// import {Loader} from "@googlemaps/js-api-loader";
import {LoadScriptNext} from "@react-google-maps/api";

import "./App.css";

// * THEME
import {theme} from "./theme";

// * UTILS
import {API_KEY} from "./utils/variables";

import {router} from "./routes/Routes";

// new Loader({
// 	apiKey: API_KEY,
// 	version: "weekly",
// 	libraries: lib,
// });

const App = () => {
	const libraries = useMemo(() => ["places", "geometry"], []);

	// * TEMPORARY CODE, REMOVE LATER
	useEffect(() => {
		// Add an event listener to the beforeunload event
		const handleBeforeUnload = () => {
			// Clear the localStorage
			localStorage.clear();
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<LoadScriptNext googleMapsApiKey={API_KEY} libraries={libraries}>
				<RouterProvider router={router} />
			</LoadScriptNext>
		</ThemeProvider>
	);
};

export default App;
