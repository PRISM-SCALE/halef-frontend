import {Link, NavLink} from "react-router-dom";
//
import Logo from "../Logo";
// HOOKS
import useAuth from "../../hooks/useAuth";

//
import {navigations} from "./navConfig";
import {Icon} from "@iconify-icon/react";
import {IconButton} from "@mui/material";
import {useState} from "react";
import Sidebar from "./Sidebar";

const Navbar = () => {
	const {isLoggedIn, logout} = useAuth();
	const [isOpen, setIsSidebarOpen] = useState(false);
	const [isHovered, setIsHovered] = useState(null);

	const handleSidebarOpen = () => {
		setIsSidebarOpen(true);
	};

	const handleSidebarClose = () => {
		setIsSidebarOpen(false);
	};

	const handleMouseEnter = (index) => {
		setIsHovered(index);
	};

	// const handleMouseLeave = () => {
	// 	setIsHovered(null);
	// };

	const handleLogout = () => {
		logout();
	};

	return (
		<div className="bg-white p-4">
			<div className="container mx-auto max-w-7xl flex justify-between items-center">
				<div>
					<a href="https://halefinternational.com">
						<Logo
							styles={{height: "80px", paddingTop: "5px"}}
							halefLogo="https://halefinternational.com/wp-content/uploads/2023/08/Black-Versiion.png"
						/>
					</a>
				</div>

				<div className="hidden lg:flex items-center gap-2">
					{navigations?.map(({pathname, url, active, children}, index) => (
						<div className="relative" key={pathname}>
							<Link
								to={url}
								onMouseEnter={() => handleMouseEnter(index)}
								className={`${
									active
										? "text-[#595959] font-barlow font-semibold"
										: "text-[#171717] uppercase text-base hover:text-[#595959] hover-menu_item font-barlow font-semibold"
								} px-5 py-2`}
							>
								{pathname}
							</Link>
							{children?.length !== 0 && isHovered === index && (
								<div className="absolute left-0 mt-2 bg-white  w-60 py-2">
									{children?.map(({pathname, url}) => (
										<div className="relative px-5 py-2" key={pathname}>
											<NavLink
												to={url}
												className={({isActive}) =>
													isActive
														? "text-[#595959] font-barlow font-semibold"
														: "text-[#171717] uppercase text-base hover:text-[#595959] hover-menu_item font-barlow font-semibold"
												}
											>
												{pathname}
											</NavLink>
										</div>
									))}
								</div>
							)}
						</div>
					))}

					<div>
						<button className="py-3 px-8 bg-[#DD3333] text-white">GET QUOTE</button>
					</div>

					{isLoggedIn ? (
						<button className="rounded-md uppercase px-4 py-2  ml-2" onClick={handleLogout}>
							Logout
						</button>
					) : null}
				</div>

				<div className="lg:hidden ">
					<IconButton>
						<Icon
							icon="ci:menu-alt-05"
							onClick={handleSidebarOpen}
							width={32}
							height={32}
							style={{color: "#DD3333"}}
							className="cursor-pointer"
						/>
					</IconButton>
					<div className="relative">
						<Sidebar isOpen={isOpen} handleDropdownClose={handleSidebarClose} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
