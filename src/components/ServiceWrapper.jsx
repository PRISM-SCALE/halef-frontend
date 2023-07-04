import PropTypes from "prop-types";

const ServiceWrapper = ({children}) => {
	return <div className="py-8">{children}</div>;
};

ServiceWrapper.propTypes = {
	children: PropTypes.element.isRequired,
};

export default ServiceWrapper;
