import PropTypes from "prop-types";
import {Icon} from "@iconify-icon/react";
import {useLocation, useNavigate} from "react-router-dom";

const Header = ({caption, title}) => {
	const navigate = useNavigate();
	const location = useLocation();
	return (
		<div className="mb-6">
			<div className="relative py-2 flex items-center gap-4">
				{location.pathname === "/" ? null : (
					<Icon
						icon={"ion:chevron-back"}
						height={"2rem"}
						className="cursor-pointer text-[#DD3333]"
						onClick={() => navigate("/")}
					/>
				)}
				<span className="uppercase font-barlow tracking-[0.2rem] font-medium">{caption}</span>
			</div>
			<h2 className="text-4xl md:text-6xl font-light my-2">{title}</h2>
		</div>
	);
};

Header.propTypes = {
	caption: PropTypes.string.isRequired,
	title: PropTypes.node.isRequired,
};

export default Header;
