// import halefLogo from "/logo.png";
import PropTypes from "prop-types";

const Logo = ({styles, halefLogo}) => {
	return <img src={halefLogo} alt="HALEF_LOGO" style={styles} />;
};

Logo.propTypes = {
	styles: PropTypes.object,
	halefLogo: PropTypes.string.isRequired,
};

export default Logo;
