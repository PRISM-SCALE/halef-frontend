import {Link} from "react-router-dom";
import Logo from "../Logo";

const Navbar = () => {
	return (
		<div
			style={{
				height: "100px",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<div>
				{/* LOGO */}
				<a href="https://halefinternational.com">
					<Logo styles={{height: "140px", paddingTop: "5px"}} />
				</a>
			</div>
			<div className="flex items-center gap-2">
				<div className="relative px-5 py-2">
					<Link
						to="/"
						className="active-menu_item text-[#595959] uppercase text-base font-barlow font-semibold"
						// style={{
						// 	color: "#171717",
						// 	fontSize: "18px",

						// 	"a:hover": {
						// 		color: "#595959",
						// 	},
						// }}
					>
						Calculator
					</Link>
				</div>

				<div className="relative px-5 py-2">
					{/* HOME */}
					<a
						href="https://halefinternational.com"
						className="text-[#171717] hover:text-[#595959] hover-menu_item uppercase text-base font-barlow font-semibold"
						// style={{
						// 	color: "#171717",
						// 	fontSize: "18px",

						// 	"a:hover": {
						// 		color: "#595959",
						// 	},
						// }}
					>
						Home
					</a>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
