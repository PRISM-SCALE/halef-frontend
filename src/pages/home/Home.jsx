import {useLoaderData} from "react-router-dom";
import ServiceList from "../../components/services/ServiceList";
import {getAllServices} from "../../utils/api";

const Home = () => {
	const data = useLoaderData();

	return (
		<div>
			<ServiceList data={data} />
		</div>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export function servicesLoader() {
	return getAllServices();
}

export default Home;
