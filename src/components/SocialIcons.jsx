import {Icon} from "@iconify-icon/react";
import PropTypes from "prop-types";

const SocialIcons = ({size}) => {
	return (
		<div className="flex items-center gap-3">
			<Icon icon="basil:facebook-outline" width={size} height={size} className="text-white" />
			<Icon icon="basil:twitter-outline" width={size} height={size} className="text-white" />
			<Icon icon="basil:instagram-outline" width={size} height={size} className="text-white" />
			<Icon icon="eva:linkedin-outline" width={size} height={size} className="text-white" />
		</div>
	);
};

SocialIcons.propTypes = {
	size: PropTypes.string.isRequired || PropTypes.number.isRequired,
};

export default SocialIcons;
