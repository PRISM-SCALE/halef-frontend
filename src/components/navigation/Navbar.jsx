import {Link, useNavigate} from "react-router-dom";
import Logo from "../Logo";
import useLocalStorage from "../../hooks/useLocalStorage";
import {useState} from "react";

const Navbar = () => {
	const navigate = useNavigate();
	const [values] = useLocalStorage("userData");
	const [isLoggedOut, setIsLoggedOut] = useState(false);

	console.log("NAVBAR", values);

	// useEffect(() => {
	// 	if (isLoggedOut && Boolean(values)) {
	// 		localStorage.removeItem("userData");
	// 	}
	// }, [isLoggedOut, values]);

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

				{!isLoggedOut && Boolean(values) ? (
					<button
						className="rounded-md uppercase px-4 py-2 border-red-300 border-2 ml-2"
						onClick={() => {
							localStorage.removeItem("userData");
							setIsLoggedOut(true);
							navigate({pathname: "/"}, {replace: true});
						}}
					>
						Logout
					</button>
				) : null}
			</div>
		</div>
	);
};

export default Navbar;
