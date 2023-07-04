import PropTypes from "prop-types";

const Button = ({buttonText}) => {
	return (
		<button
			type="submit"
			className="px-6 py-3 bg-[#dd3333] text-white uppercase w-1/2 mx-auto mt-8"
		>
			{buttonText}
		</button>
	);
};

Button.propTypes = {
	buttonText: PropTypes.string.isRequired,
};

export default Button;
