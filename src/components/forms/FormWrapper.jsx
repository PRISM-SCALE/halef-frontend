import PropTypes from "prop-types";
// import { Form } from "react-router-dom";

const FormWrapper = ({children, ...otherProps}) => {
	return (
		<form className="flex flex-col gap-6 w-full" autoComplete="off" {...otherProps}>
			{children}
		</form>
	);
};

FormWrapper.propTypes = {
	children: PropTypes.node.isRequired,
};

export default FormWrapper;
