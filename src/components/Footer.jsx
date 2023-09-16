import PropTypes from "prop-types";

import {halefHub, services} from "../mock/footer";

// * COMPONENTS
import Logo from "./Logo";
import {Icon} from "@iconify-icon/react";
import SocialIcons from "./SocialIcons";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
	return (
		<footer className="bg-[#171717] px-8">
			<div
				style={{maxWidth: "1200px", margin: "0 auto"}}
				className="py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
			>
				<div className="my-auto">
					{/* LOGO */}
					<a href="https://halefinternational.com">
						<Logo halefLogo="/logo_white.webp" styles={{height: "160px"}} />
					</a>
				</div>

				<div className="mb-4 sm:mb-0">
					<h5 className="relative mb-8 pr-4 pl-4 inline-block footer-title text-xl">
						{halefHub.title}
					</h5>
					<div>
						<ul className="text-[#DD3333]">
							{halefHub.data.map(({href, name}, index) => (
								<LinkHref key={index} href={href} name={name} />
							))}
						</ul>
					</div>
				</div>

				<div className="mb-4 sm:mb-0">
					<h5 className="relative mb-8 pr-4 pl-4 inline-block footer-title text-xl">
						{services.title}
					</h5>
					<div>
						<ul className="text-[#DD3333]">
							{services.data.map(({href, name}, index) => (
								<LinkHref key={index} href={href} name={name} />
							))}
						</ul>
					</div>
				</div>

				<div className="mb-4 sm:mb-0">
					<h5 className="relative mb-8 pr-4 pl-4 inline-block footer-title text-xl">
						Get in touch
					</h5>
					<div className="mb-4">
						<p className="text-white">Need help?</p>
						<a href="tel:08029915864" className="text-[#DD3333]">
							08029915864
						</a>
					</div>

					<div className="mb-6">
						<p className="text-white">Email Us At:</p>
						<a href="mailto:enquiry@halefinternational.com" className="text-[#DD3333]">
							enquiry@halefinternational.com
						</a>
					</div>

					<div>
						<SocialIcons size={32} />
					</div>
				</div>
			</div>

			<div className="border border-gray-600" />

			<div className="text-center py-6">
				<p className="font-barlow text-white text-lg">
					© {year} Halef International Private Limited. All Rights Reserved. Designed by PrismScale
				</p>
			</div>
		</footer>
	);
};

Footer.propTypes = {};

const LinkHref = ({href, name}) => {
	return (
		<a href={href} className="text-white   cursor-pointer flex items-center gap-2 space-y-2">
			<Icon icon="radix-icons:dot-filled" width={20} height={20} style={{color: "#DD3333"}} />
			<li className="hover:text-[#DD3333] capitalize text-xl transition-all ease-in delay-200 ">
				{name}
			</li>
		</a>
	);
};

LinkHref.propTypes = {
	href: PropTypes.string,
	name: PropTypes.string,
};

export default Footer;
