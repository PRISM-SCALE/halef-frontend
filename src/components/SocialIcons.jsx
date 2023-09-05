import {Icon} from "@iconify-icon/react";
import PropTypes from "prop-types";

const SocialIcons = ({size}) => {
	return (
		<div className="flex items-center gap-3">
			<Iconify
				icon="basil:facebook-outline"
				size={size}
				link="https://www.facebook.com/Halefint2019?paipv=0&eav=AfZ8yvi6EeLUW89B0XI57QEbYjGvwOs-3hwrWCSz--Xs40oC_lXuL_rq-dauKAu-AzQ"
			/>
			<Iconify icon="basil:twitter-outline" size={size} link="https://twitter.com/halefint2019" />
			<Iconify
				icon="basil:instagram-outline"
				size={size}
				link="https://www.instagram.com/halefint2019/"
			/>
			<Iconify
				icon="eva:linkedin-outline"
				size={size}
				link="https://www.linkedin.com/in/halef-international-600063276/"
			/>
		</div>
	);
};

SocialIcons.propTypes = {
	size: PropTypes.number.isRequired,
};

const Iconify = ({size, icon, link}) => {
	return (
		<a href={link} target="_blank" rel="noreferrer">
			<Icon
				icon={icon}
				width={size}
				height={size}
				className="text-white cursor-pointer hover:text-[#DD3333] transition-colors ease-in-out delay-300"
			/>
		</a>
	);
};

Iconify.propTypes = {
	size: PropTypes.number.isRequired,
	icon: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
};

export default SocialIcons;
