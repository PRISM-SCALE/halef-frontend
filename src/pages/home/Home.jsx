import {useLoaderData} from "react-router-dom";
import ServiceList from "../../components/services/ServiceList";
import {getAllServices} from "../../utils/api";

const Home = () => {
	const data = useLoaderData();

	return (
		<div>
			{data ? (
				<ServiceList data={data} />
			) : (
				<div className="flex items-center justify-center p-14 border-dashed border-slate-300 border-2 my-20">
					<h2 className="text-xl">Uh-oh! There&apos;s nothing to show here.</h2>
				</div>
			)}
		</div>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export async function servicesLoader() {
	const services = await getAllServices();

	if (!services) {
		return null;
	}

	return services;
}

export default Home;
