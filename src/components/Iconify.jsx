import PropTypes from "prop-types";
import {Icon} from "@iconify-icon/react";

const Iconify = ({icon, size = "1rem", color = "currentColor"}) => {
	return <Icon icon={icon} width={size} height={size} color={color} />;
};

Iconify.propTypes = {
	icon: PropTypes.string.isRequired,
	size: PropTypes.string,
	color: PropTypes.string,
};

export default Iconify;
