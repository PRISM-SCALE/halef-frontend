export const BASE_URL = "http://localhost:3001/api";

export async function getAllServices() {
	const response = await fetch(`${BASE_URL}/services`);
	if (!response.ok) {
		throw {message: "Failed to fetch all services.", status: 500};
	}

	return response.json();
}

export async function getHousePackingTypes() {
	const houseTypesResponse = await fetch(`${BASE_URL}/housetypes`);
	const packingTypesResponse = await fetch(`${BASE_URL}/packagetypes`);

	if (!houseTypesResponse.ok && !packingTypesResponse.ok) {
		throw {message: "Failed to fetch all services.", status: 500};
	}

	const houseTypes = houseTypesResponse.json();
	const packingTypes = packingTypesResponse.json();

	return {houseTypes, packingTypes};
}

export async function getRelocationHouseType() {
	const response = await fetch(`${BASE_URL}/housetypes`);

	if (!response.ok) {
		throw {message: "Failed to fetch all services.", status: 500};
	}

	return response.json();
}

export async function getVehicles() {
	const response = await fetch(`${BASE_URL}/vehicles`);
	if (!response.ok) {
		throw {message: "Failed to fetch all services.", status: 500};
	}

	return response.json();
}

export async function getPackageTypes() {
	const response = await fetch(`${BASE_URL}/packagetypes`);

	if (!response.ok) {
		throw {message: "Failed to fetch all services.", status: 500};
	}

	return response.json();
}
