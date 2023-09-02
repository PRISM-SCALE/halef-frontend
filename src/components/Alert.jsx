import {Icon} from "@iconify-icon/react";
import PropTypes from "prop-types";

const Alert = ({message, icon, bgColor, textColor, value}) => {
	return (
		<div className={`flex items-center gap-4 py-3 rounded-md ${bgColor} text-blue-950 h-14 px-6`}>
			<Icon icon={icon} width={24} height={24} className={`${textColor}`} />
			<span className={`text-md ${textColor}`}>
				{message} {value && value}
			</span>
		</div>
	);
};

Alert.propTypes = {
	message: PropTypes.string.isRequired,
	bgColor: PropTypes.string.isRequired,
	textColor: PropTypes.string.isRequired,
	icon: PropTypes.node.isRequired,
	value: PropTypes.node,
};

export default Alert;

//absolute bottom-0 left-2/4 translate-y-[-10%] translate-x-[-50%]
