export const BASE_URL = "http://localhost:3001/api";

export async function getAllServices() {
	const response = await fetch(`${BASE_URL}/services`);

	if (!response.ok) {
		throw {message: "Failed to fetch all services.", status: 500};
	}

	return response.json();
}

export async function getRelocationHouseType() {
	const response = await fetch(`${BASE_URL}/housetypes`);

	if (!response.ok) {
		throw {message: "Failed to fetch house types.", status: 500};
	}

	return response.json();
}

export async function getPackageTypes() {
	const response = await fetch(`${BASE_URL}/packagetypes`);

	if (!response.ok) {
		throw {message: "Failed to fetch package types.", status: 500};
	}

	return response.json();
}

export async function relocationCalculationService(data) {
	console.log(data);

	const POST_DATA = {
		distance: data.distance,
		goodsValue: data.goodsValue,
		houseType: data.houseCapacity,
		requireInsurance: data.insurance,
		packageType: data.packing,
		vehicle: data.vehicle,
	};

	console.log(POST_DATA);

	// const response = await fetch(`${BASE_URL}/calculate/relocation`, {
	// 	method: "POST",
	// 	body: JSON.stringify(POST_DATA),
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 	},
	// });

	// console.log(await response.json());

	// if (!response.ok) {
	// 	throw {message: "Failed to send data.", status: 500};
	// }
}
