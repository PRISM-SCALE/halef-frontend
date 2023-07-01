import Header from "../Header";
import Card from "../layout/Card";
import data from "../../mock/services.json";
import {Link} from "react-router-dom";

const ServiceList = () => {
	const header_name = (
		<>
			Cost <strong className="text-[#DD3333]">Estimator</strong>
		</>
	);

	return (
		<div className="py-8">
			<Header caption="our services" title={header_name} />
			{data.map(({name, id, code}) => {
				return (
					<Link to={`/${code}`} key={id}>
						<Card icon={<h3>0{id}</h3>} title={name} />
					</Link>
				);
			})}
		</div>
	);
};

export default ServiceList;
