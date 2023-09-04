import {Link} from "react-router-dom";
import Logo from "../Logo";
import {useAuth} from "../../context/LogoutProvider";

const Navbar = () => {
	const {isLoggedIn, logout} = useAuth();

	const handleLogout = () => {
		logout();
	};

	return (
		<div
			style={{
				height: "100px",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				maxWidth: "1200px",
				margin: "0 auto",
			}}
			className="px-4 lg:px-0"
		>
			<div>
				{/* LOGO */}
				<a href="https://halefinternational.com">
					<Logo
						styles={{height: "80px", paddingTop: "5px"}}
						halefLogo="https://halefinternational.com/wp-content/uploads/2023/08/Black-Versiion.png"
					/>
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

				{isLoggedIn ? (
					<button
						className="rounded-md uppercase px-4 py-2 border-red-300 border-2 ml-2"
						onClick={handleLogout}
					>
						Logout
					</button>
				) : null}
			</div>
		</div>
	);
};

export default Navbar;
