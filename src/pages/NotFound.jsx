import {Link as RouterLink} from "react-router-dom";
// @mui
import {styled} from "@mui/material/styles";
import {Box, Button, Typography, Container} from "@mui/material";
// components
import PageNotFoundIllustration from "../assets/illustration_404";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({theme}) => ({
	display: "flex",
	height: "100%",
	alignItems: "center",
	paddingTop: theme.spacing(15),
	paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function NotFound() {
	return (
		<RootStyle>
			<Container>
				<Box sx={{maxWidth: 480, margin: "auto", textAlign: "center"}}>
					<Typography variant="h3" paragraph>
						Sorry, page not found!
					</Typography>
					<Typography sx={{color: "text.secondary"}}>
						Sorry, we couldn&apos;t find the page you&apos;re looking for. Perhaps you&apos;ve
						mistyped the URL? Be sure to check your spelling.
					</Typography>

					<PageNotFoundIllustration sx={{height: 260, my: {xs: 5, sm: 10}}} />

					<Button
						to={"/"}
						size="large"
						variant="contained"
						component={RouterLink}
						color="error"
						disableElevation
					>
						Go to Home
					</Button>
				</Box>
			</Container>
		</RootStyle>
	);
}
