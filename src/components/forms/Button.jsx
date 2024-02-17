import PropTypes from "prop-types";

const Button = ({buttonText, ...otherProps}) => {
	return (
		<button
			type="submit"
			className="px-6 py-3 bg-[#dd3333] text-white uppercase w-full md:w-1/2 mx-auto mt-8 disabled:bg-slate-400 disabled:cursor-not-allowed"
			{...otherProps}
		>
			{buttonText}
		</button>
	);
};

Button.propTypes = {
	buttonText: PropTypes.string.isRequired,
};

export default Button;
