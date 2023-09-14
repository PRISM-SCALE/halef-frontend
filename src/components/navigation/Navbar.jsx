import {Link, NavLink} from "react-router-dom";
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
	const {isLoggedIn, logout} = useAuth();

	const [isHovered, setIsHovered] = useState(null);

	const handleMouseEnter = (index) => {
		setIsHovered(index);
	};

	const handleMouseLeave = () => {
		setIsHovered(null);
	};

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

			<div className="lg:flex items-center gap-2 hidden">
				{navigations?.length !== 0 &&
					navigations?.map(({pathname, url, active}, index) => {
						return (
							<div className="relative px-5 py-2" key={pathname}>
								<Link
									to={url}
									// onMouseEnter={(event) => handleMouseEnter(event, index)}
									className={`${
										active
											? "active-menu_item text-[#595959] font-barlow font-semibold"
											: "text-[#171717] uppercase text-base  hover:text-[#595959] hover-menu_item font-barlow font-semibold"
									}`}
								>
									{pathname}
								</Link>
								{/* {children?.length !== 0 && isHovered === index ? (
									<Menu
										id={`basic-menu-${pathname}`}
										open={Boolean(isHovered)}
										onClose={handleMouseLeave}
										anchorOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										transformOrigin={{
											vertical: "top",
											horizontal: "left",
										}}
									>
										{children?.map(({pathname, url}) => {
											return (
												<div className="relative px-5 py-2" key={pathname}>
													<NavLink
														to={url}
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
									</Menu>
								) : null} */}
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
				<IconButton>
					<Icon
						icon="ci:menu-alt-05"
						width={32}
						height={32}
						style={{color: "#DD3333"}}
						className="cursor-pointer"
					/>
				</IconButton>
			</div>
		</div>
	);
};

export default Navbar;
