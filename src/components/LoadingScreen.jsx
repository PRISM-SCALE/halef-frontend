// import PropTypes from "prop-types";
// @mui
import {styled} from "@mui/material/styles";
//
// import Logo from "./Logo";
import ProgressBar from "./ProgressBar";
import {Box} from "@mui/material";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({theme}) => ({
	right: 0,
	bottom: 0,
	zIndex: 99999,
	width: "100%",
	height: "100%",
	position: "fixed",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

// LoadingScreen.propTypes = {
// 	isDashboard: PropTypes.bool,
// };

export default function LoadingScreen({...other}) {
	return (
		<>
			<ProgressBar />

			<RootStyle {...other}>
				<Box component="img" src="/loading_screen.gif" alt="loading" sx={{height: 280}} />
			</RootStyle>
		</>
	);
}
