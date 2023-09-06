import {useMemo} from "react";
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

	return (
		<ThemeProvider theme={theme}>
			<LoadScriptNext googleMapsApiKey={API_KEY} libraries={libraries}>
				<RouterProvider router={router} />
			</LoadScriptNext>
		</ThemeProvider>
	);
};

export default App;
