import {useState} from "react";
import PropTypes from "prop-types";
import {Link, NavLink} from "react-router-dom";
import {Icon} from "@iconify-icon/react";

import {navigations} from "./navConfig";
import {IconButton} from "@mui/material";

const Sidebar = ({isOpen, handleDropdownClose}) => {
	const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
	const [halefHubDropdownOpen, setHalefHubDropdownOpen] = useState(false);

	const handleServiceDropdownToggle = () => {
		setServiceDropdownOpen(!serviceDropdownOpen);
		setHalefHubDropdownOpen(false);
	};

	const handleHalefHubDropdownToggle = () => {
		setHalefHubDropdownOpen(!halefHubDropdownOpen);
		setServiceDropdownOpen(false);
	};

	const handleClose = () => {
		setHalefHubDropdownOpen(false);
		setServiceDropdownOpen(false);
		handleDropdownClose();
	};

	return (
		<div
			className={`fixed w-96 right-0 top-0 bottom-0 bg-white z-50 transition-transform duration-300  ${
				isOpen ? "-translate-x-0" : "translate-x-full"
			}`}
		>
			<div className="w-full flex justify-end">
				<IconButton sx={{m: 1}} onClick={handleDropdownClose}>
					<Icon
						icon="octicon:x-12"
						width={32}
						height={32}
						style={{color: "#d40035"}}
						className="cursor-pointer"
					/>
				</IconButton>
			</div>

			<div className="flex justify-between p-4 flex-col">
				<div className="flex flex-col h-full mb-96">
					{navigations?.map(({pathname, url, active, children}) => (
						<div className="relative " key={pathname}>
							<div
								className={`flex items-center justify-between`}
								onClick={() => {
									pathname === "SERVICES"
										? handleServiceDropdownToggle()
										: pathname === "HALEF HUB"
										? handleHalefHubDropdownToggle()
										: null;
								}}
							>
								<Link
									to={url}
									className={`${
										active
											? "text-[#595959] font-barlow font-semibold"
											: "text-[#171717] uppercase text-base hover:text-[#595959] hover-menu_item font-barlow font-semibold"
									} px-5 py-2`}
								>
									{pathname}
								</Link>
								{children && (
									<Icon
										width={24}
										height={24}
										icon="icon-park-solid:down-one"
										style={{color: "#d40035"}}
										className="cursor-pointer"
									/>
								)}
							</div>
							{children && (
								<div
									className={`mt-2 bg-white w-full py-2 transition-transform duration-300 ${
										pathname === "SERVICES"
											? serviceDropdownOpen
												? ""
												: "hidden"
											: pathname === "HALEF HUB"
											? halefHubDropdownOpen
												? ""
												: "hidden"
											: "hidden"
									}`}
								>
									{children?.map(({pathname, url}) => (
										<div
											className="relative px-5 py-2 mb-2 bg-[#fafafa]"
											key={pathname}
											onClick={handleClose}
										>
											<NavLink
												to={url}
												className={({isActive}) =>
													isActive
														? "text-[#595959] font-barlow font-semibold "
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
				</div>
				<div>
					<button className="py-3 px-8 bg-[#d40035] text-white w-full mx-1">GET QUOTE</button>
				</div>
			</div>
		</div>
	);
};

Sidebar.propTypes = {
	handleDropdownClose: PropTypes.func,
	isOpen: PropTypes.bool,
};

export default Sidebar;
