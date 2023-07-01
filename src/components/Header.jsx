import PropTypes from "prop-types";

const Header = ({caption, title}) => {
	return (
		<div className="mb-10">
			<div className="relative px-5 py-2">
				<span className="active-menu_item uppercase font-barlow tracking-[0.2rem] font-medium">
					{caption}
				</span>
			</div>
			<h2 className="text-6xl font-light my-2">{title}</h2>
		</div>
	);
};

Header.propTypes = {
	caption: PropTypes.string.isRequired,
	title: PropTypes.object.isRequired,
};

export default Header;
