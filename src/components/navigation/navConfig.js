export const navigations = [
	{
		pathname: "HOME",
		url: "https://halefinternational.com/",
		hover: false,
	},
	{
		pathname: "SERVICES",
		// url: "https://halefinternational.com/services/compassionate-deceased-body-transportation/",
		hover: true,
		children: [
			{
				pathname: "RELOCATIONS",
				url: "https://halefinternational.com/service/relocations/",
			},
			{
				pathname: "WAREHOUSING",
				url: "https://halefinternational.com/service/storage-and-warehousing/",
			},
			{
				pathname: "TRUCKING",
				url: "https://halefinternational.com/service/trucking/",
			},
			{
				pathname: "COURIER & CARGO",
				url: "https://halefinternational.com/service/courier-cargo/",
			},
			{
				pathname: "DECEASED BODY TRANSPORTATION",
				url: "https://halefinternational.com/service/compassionate-deceased-body-transportation/",
			},
			{
				pathname: "LIQUIDATION",
				url: "https://halefinternational.com/service/liquidation/",
			},
			{
				pathname: "SCRAP MANAGEMENT",
				url: "https://halefinternational.com/service/scrap/",
			},
		],
	},
	{
		pathname: "TESTIMONIALS",
		url: "https://halefinternational.com/#", //"https://calculator.halefinternational.com",
		hover: false,
	},
	// {
	// 	pathname: "PAY ONLINE",
	// 	url: "/pay-online", //"https://calculator.halefinternational.com",
	// 	hover: false,
	// },
	{
		pathname: "TRACK SHIPMENT",
		url: "https://halefinternational.com/track-shipment/",
		hover: false,
	},
	{
		pathname: "HALEF HUB",
		// url: "https://halefinternational.com/track-shipment/",
		hover: true,
		children: [
			{pathname: "ABOUT US", url: "https://halefinternational.com/about-us/"},
			{pathname: "CONTACT US", url: "https://halefinternational.com/contact-us/"},
			{pathname: "FROM THE CEO", url: "https://halefinternational.com/from-the-ceo/"},
			{pathname: "FAQ", url: "https://halefinternational.com/faq-2/"},
			{pathname: "PAY NOW", url: "/pay-online"},
		],
	},
];
