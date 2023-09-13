import {NavLink, useLocation} from "react-router-dom";
//
import Logo from "../Logo";
// HOOKS
import useAuth from "../../hooks/useAuth";

//
import {navigations} from "./navConfig";
import {Icon} from "@iconify-icon/react";
import {IconButton, Menu} from "@mui/material";
import {useState} from "react";

const Navbar = () => {
	const {pathname: urlName} = useLocation();
	const {isLoggedIn, logout} = useAuth();

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleLogout = () => {
		logout();
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
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

			<div className="lg:flex items-center gap-2 hidden">
				{navigations?.map(({pathname, url, active}) => {
					return (
						<div className="relative px-5 py-2" key={pathname}>
							<NavLink
								to={url}
								// className={`text-[#171717] hover:text-[#595959] hover-menu_item uppercase text-base font-barlow font-semibold`}
								className={({isActive}) =>
									isActive || active
										? "active-menu_item text-[#595959] font-barlow font-semibold"
										: "text-[#171717] uppercase text-base  hover:text-[#595959] hover-menu_item font-barlow font-semibold"
								}
							>
								{pathname}
							</NavLink>
						</div>
					);
				})}

				{isLoggedIn ? (
					<button
						className="rounded-md uppercase px-4 py-2 border-red-300 border-2 ml-2"
						onClick={handleLogout}
					>
						Logout
					</button>
				) : null}
			</div>

			<div className="lg:hidden">
				<IconButton onClick={handleClick}>
					<Icon
						icon="ci:menu-alt-05"
						width={32}
						height={32}
						style={{color: "#DD3333"}}
						className="cursor-pointer"
					/>
				</IconButton>
			</div>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
				slotProps={{
					paper: {
						style: {
							padding: 2,
							width: 240,
						},
					},
				}}
			>
				{navigations?.map(({pathname, url}) => {
					return (
						<div className="relative px-5 py-2" key={pathname}>
							<NavLink
								to={url}
								// className={`text-[#171717] hover:text-[#595959] hover-menu_item uppercase text-base font-barlow font-semibold`}
								className={({isActive}) =>
									isActive
										? "active-menu_item text-[#595959] font-barlow font-semibold"
										: "text-[#171717] uppercase text-base  hover:text-[#595959] hover-menu_item font-barlow font-semibold"
								}
							>
								{pathname}
							</NavLink>
						</div>
					);
				})}
				{isLoggedIn ? (
					<div
						className="rounded-md uppercase px-4 py-2 mx-2 my-2 font-barlow bg-[#dd3333] w-[92%] text-white text-center"
						onClick={handleLogout}
					>
						Logout
					</div>
				) : null}
			</Menu>
		</div>
	);
};

export default Navbar;
