import halefLogo from "/logo.svg";
import PropTypes from "prop-types";

const Logo = ({styles}) => {
	return <img src={halefLogo} alt="HALEF_LOGO" style={styles} />;
};

Logo.propTypes = {
	styles: PropTypes.object,
};

export default Logo;
