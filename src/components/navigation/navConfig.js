export const navigations = [
	{
		pathname: "HOME",
		url: "https://halefinternational.com/",
	},
	{
		pathname: "SERVICES",
		url: "https://halefinternational.com/services/compassionate-deceased-body-transportation/",
		children: [
			{
				pathname: "COMPASSIONATE DECEASED BODY TRANSPORTATION",
				url: "https://halefinternational.com/service/compassionate-deceased-body-transportation/",
			},
			{
				pathname: "COURIER & CARGO",
				url: "https://halefinternational.com/service/courier-cargo/",
			},
			{
				pathname: "TRUCKING",
				url: "https://halefinternational.com/service/trucking/",
			},
			{
				pathname: "SCRAP MANAGEMENT",
				url: "https://halefinternational.com/service/scrap/",
			},
			{
				pathname: "WAREHOUSING",
				url: "https://halefinternational.com/service/storage-and-warehousing/",
			},
			{
				pathname: "LIQUIDATION",
				url: "https://halefinternational.com/service/liquidation/",
			},
			{
				pathname: "RELOCATIONS",
				url: "https://halefinternational.com/service/relocations/",
			},
		],
	},
	{
		pathname: "COST CALCULATOR",
		url: "/", //"https://calculator.halefinternational.com",
		active: true,
	},
	{
		pathname: "PAY ONLINE",
		url: "/pay-online", //"https://calculator.halefinternational.com",
		active: false,
	},
	{
		pathname: "TRACK SHIPMENT",
		url: "https://halefinternational.com/track-shipment/",
	},
	{
		pathname: "HALEF HUB",
		url: "https://halefinternational.com/track-shipment/",
		children: [
			{pathname: "ABOUT US", url: "https://halefinternational.com/about-us/"},
			{pathname: "CONTACT US", url: "https://halefinternational.com/contact-us/"},
			{pathname: "CONTACT US", url: "https://halefinternational.com/from-the-ceo/"},
			{pathname: "FAQ", url: "https://halefinternational.com/faq-2/"},
			{pathname: "PAY NOW", url: "https://halefinternational.com/track-shipment/#"},
		],
	},
];
