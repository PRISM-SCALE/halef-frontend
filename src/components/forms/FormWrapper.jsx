import PropTypes from "prop-types";

const FormWrapper = ({children, ...otherProps}) => {
	return (
		<form className="flex flex-col gap-6 w-full" {...otherProps}>
			{children}
		</form>
	);
};

FormWrapper.propTypes = {
	children: PropTypes.node.isRequired,
};

export default FormWrapper;
