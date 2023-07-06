import PropTypes from "prop-types";
import {forwardRef} from "react";

const GoogleInput = forwardRef((props, ref) => {
	const {placeholder, ...otherProps} = props;

	return (
		<input
			ref={ref}
			className="input-fields focus:outline-[#dd3333]"
			placeholder={placeholder}
			{...otherProps}
		/>
	);
});

GoogleInput.propTypes = {
	placeholder: PropTypes.string.isRequired,
};

GoogleInput.displayName = "GoogleInput";

export default GoogleInput;
