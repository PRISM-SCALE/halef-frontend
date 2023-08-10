import PropTypes from "prop-types";

// * COMPONENTS
import Logo from "./Logo";

const Footer = () => {
	return (
		<div className="bg-[#171717]">
			<div style={{maxWidth: "1200px", margin: "0 auto"}} className="py-14">
				<div>
					{/* LOGO */}
					<a href="https://halefinternational.com">
						<Logo
							halefLogo="https://halefinternational.com/wp-content/uploads/2023/07/New-Logos-White.png"
							styles={{height: "160px"}}
						/>
					</a>
				</div>
				<div className="widget widget_nav_menu text-left ">
					<div className="relative px-5 py-2">
						<h5 className="active-menu_item text-white uppercase text-base font-barlow font-semibold">
							Halef Hub
						</h5>
					</div>
					<div className="menu-footer-menu-container">
						<ul id="menu-footer-menu" className="menu">
							<li
								id="menu-item-723"
								className="menu-item menu-item-type-post_type menu-item-object-page menu-item-723"
							>
								<a href="https://halefinternational.com/about-us/">About Us</a>
							</li>
							<li
								id="menu-item-7078"
								className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7078"
							>
								<a href="https://halefinternational.com/contact-us/">Contact Us</a>
							</li>
							<li
								id="menu-item-4926"
								className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4926"
							>
								<a href="https://halefinternational.com/faq-2/">FAQ</a>
							</li>
							<li
								id="menu-item-7882"
								className="menu-item menu-item-type-custom menu-item-object-custom menu-item-7882"
							>
								<a href="#">Pay Now</a>
							</li>
							<li
								id="menu-item-7883"
								className="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-7883"
							>
								<a rel="privacy-policy" href="https://halefinternational.com/privacy-policy-3/">
									Privacy Policy
								</a>
							</li>
							<li
								id="menu-item-8541"
								className="menu-item menu-item-type-post_type menu-item-object-page menu-item-8541"
							>
								<a href="https://halefinternational.com/services-and-pricings/">
									Services and Pricings
								</a>
							</li>
							<li
								id="menu-item-8542"
								className="menu-item menu-item-type-post_type menu-item-object-page menu-item-8542"
							>
								<a href="https://halefinternational.com/refund-policy/">Refund Policy</a>
							</li>
							<li
								id="menu-item-8546"
								className="menu-item menu-item-type-post_type menu-item-object-page menu-item-8546"
							>
								<a href="https://halefinternational.com/terms-and-conditions/">
									Terms and Conditions
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div>{/* SERVICES */}</div>
				<div>{/* GET IN TOUCH */}</div>
			</div>
		</div>
	);
};

Footer.propTypes = {};

export default Footer;
