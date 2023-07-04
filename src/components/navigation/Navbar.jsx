import Logo from "../Logo";

const Navbar = () => {
	return (
		<div
			style={{
				height: "80px",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<div>
				{/* LOGO */}
				<a href="https://halefinternational.com">
					<Logo styles={{height: "80px"}} />
				</a>
			</div>
			<div className="flex items-center gap-2">
				<div className="relative px-5 py-2">
					<a
						href="#"
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
					</a>
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
