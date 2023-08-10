import PropTypes from "prop-types";
import iconRightArrow from "/arrow-right.svg";

const Card = ({title, icon, code}) => {
	return (
		<div className="service-card">
			<div className="w-full flex justify-between items-center cursor-pointer shadow-sm px-8 py-6 rounded-md mb-6 hover:shadow-md transition-shadow ">
				<div className="flex items-center gap-10">
					{/* <span className="text-4xl text-[#dd3333] ">{icon}</span> */}
					<img src={icon} alt={code} className="h-12 md:h-20" />
					<h4 className="text-xl md:text-3xl">{title}</h4>
				</div>
				<img src={iconRightArrow} alt="arrow-right" className="h-8" />
			</div>
		</div>
	);
};

Card.propTypes = {
	title: PropTypes.string.isRequired,
	code: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
};

export default Card;

// box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
