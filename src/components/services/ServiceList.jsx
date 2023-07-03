import PropTypes from "prop-types";
import {Link} from "react-router-dom";

// COMPONENTS
import Header from "../Header";
import Card from "../layout/Card";

const ServiceList = ({data}) => {
	const header_name = (
		<>
			Cost <strong className="text-[#DD3333]">Estimator</strong>
		</>
	);

	return (
		<div className="py-8">
			<Header caption="our services" title={header_name} />
			{data.map(({name, _id, code}, index) => {
				return (
					<Link to={`/${code.toLowerCase()}`} key={_id}>
						<Card icon={<h3>0{index + 1}</h3>} title={name} />
					</Link>
				);
			})}
		</div>
	);
};

ServiceList.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			code: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default ServiceList;
