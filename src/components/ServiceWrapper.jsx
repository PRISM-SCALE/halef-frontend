import PropTypes from "prop-types";

const ServiceWrapper = ({children}) => {
	return <div className="py-20 px-4">{children}</div>;
};

ServiceWrapper.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ServiceWrapper;
