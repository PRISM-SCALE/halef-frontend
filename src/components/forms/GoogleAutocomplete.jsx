import PropTypes from "prop-types";
import {forwardRef} from "react";

const GoogleAutocomplete = forwardRef((props, ref) => {
	const {placeholder, ...otherProps} = props;

	return <input ref={ref} className="input-fields" placeholder={placeholder} {...otherProps} />;
});

GoogleAutocomplete.propTypes = {
	placeholder: PropTypes.string.isRequired,
};

GoogleAutocomplete.displayName = "GoogleAutocomplete";

export default GoogleAutocomplete;
