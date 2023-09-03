import {useEffect} from "react";
import {useLocation} from "react-router-dom";

const imagePaths = [
	"https://i.ibb.co/p1mj42L/air-ambulance.webp",
	"https://i.ibb.co/2k3QkQp/cargo.webp",
	"https://i.ibb.co/nBTVDvr/relocation.webp",
	"https://i.ibb.co/mFynM5V/trucking.webp",
	"https://i.ibb.co/qB99swK/warehouse.webp",
];

const PreloadImages = () => {
	const location = useLocation();

	useEffect(() => {
		const imagePromises = imagePaths.map((path) => {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.src = path;
				img.onload = () => resolve();
				img.onerror = () => reject();
			});
		});

		Promise.all(imagePromises)
			.then(() => console.log("Images pre-loaded successfully"))
			.catch((error) => console.error("Error pre-loading images:", error));
	}, [location]);

	return null;
};

export default PreloadImages;
