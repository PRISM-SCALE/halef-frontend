import {Suspense, lazy} from "react";
import LoadingScreen from "../components/LoadingScreen";

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

export const RootLayout = Loadable(lazy(() => import("../pages/RootLayout")));
export const Home = Loadable(lazy(() => import("../pages/home/Home")));
export const Relocation = Loadable(lazy(() => import("../pages/relocation/Relocation")));
export const Cargo = Loadable(lazy(() => import("../pages/cargo/Cargo")));
export const Trucking = Loadable(lazy(() => import("../pages/trucking/Trucking")));
export const Warehouse = Loadable(lazy(() => import("../pages/warehouse/Warehouse")));
export const AirAmbulance = Loadable(lazy(() => import("../pages/ambulance/AirAmbulance")));
