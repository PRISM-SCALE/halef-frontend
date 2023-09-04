import PropTypes from "prop-types";
import {Link} from "react-router-dom";

// COMPONENTS
import Header from "../Header";
import Card from "../layout/Card";

const ServiceList = ({data}) => {
	const header_name = (
		<>
			Choose Your <strong className="text-[#DD3333]">Service</strong>
		</>
	);

	return (
		<div className="py-20">
			<Header caption="30 second Cost calculator" title={header_name} />
			{data.map(({name, _id, code, icon}) => {
				return (
					<Link to={`/${code.toLowerCase()}?id=${_id}`} key={_id}>
						<Card icon={icon} title={name} code={code} />
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
