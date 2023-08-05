// export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
export const BASE_URL = import.meta.env.PROD
	? "https://halef-calculator-api.onrender.com/api"
	: "http://localhost:3001/api";
export const CALCULATE_URL = `${BASE_URL}/calculate`;

export async function getAllServices() {
	try {
		const response = await fetch(`${BASE_URL}/services`);

		if (!response.ok) {
			throw {message: "Failed to fetch all services.", status: 500};
		}

		return response.json();
	} catch (error) {
		console.error(error);
	}
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

export async function getVehicles() {
	const response = await fetch(`${BASE_URL}/vehicles`);

	if (!response.ok) {
		throw {message: "Failed to fetch vehicles.", status: 500};
	}

	return response.json();
}

export async function getAllCities() {
	const response = await fetch(`${BASE_URL}/cities`);

	if (!response.ok) {
		throw {message: "Failed to fetch all services.", status: 500};
	}

	return response.json();
}

// * -------------------------------------------------------------------------
// * -------------------------------------------------------------------------
// * USER INFO
export async function createUser(data) {
	const POST_DATA = {
		name: data.name,
		email: data.email,
		phone: Number(data.phone),
		service: data.service,
	};

	const response = await fetch(`${BASE_URL}/user/create`, {
		method: "POST",
		body: JSON.stringify(POST_DATA),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw {message: "Failed to create a user.", status: 500};
	}

	return response.json();
}

export async function resendOTP(phone) {
	const POST_DATA = {
		phone: Number(phone),
	};

	const response = await fetch(`${BASE_URL}/otp/resend`, {
		method: "POST",
		body: JSON.stringify(POST_DATA),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw {message: "Failed to create a user.", status: 500};
	}

	return response.json();
}

export async function verifyOtp(data) {
	const response = await fetch(`${BASE_URL}/otp/verify`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw {message: "Failed to create a user.", status: 500};
	}

	return response.json();
}
// * -------------------------------------------------------------------------
// * -------------------------------------------------------------------------

// * -------------------------------------------------------------------------
// * -------------------------------------------------------------------------
// * CALCULATOR APIs

export async function relocationCalculationService(data) {
	const POST_DATA = {
		distance: Math.round(data.distance),
		goodsValue: Number(data.goodsValue),
		houseType: data.houseCapacity,
		requireInsurance: data.insurance,
		packageType: data.packing,
		vehicle: data.vehicle,
	};

	const response = await fetch(`${CALCULATE_URL}/relocation`, {
		method: "POST",
		body: JSON.stringify(POST_DATA),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw {message: "Failed to send data.", status: 500};
	}

	return response.json();
}

export async function courierCargoCalculationService(data) {
	const POST_DATA = {
		weight: Number(data.weight),
		length: Number(data.length),
		width: Number(data.width),
		height: Number(data.height),
		carrierCode: data.shipmentService,
		docType: data.docType,
	};

	const response = await fetch(`${CALCULATE_URL}/couriercargo`, {
		method: "POST",
		body: JSON.stringify(POST_DATA),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw {message: "Failed to send data.", status: 500};
	}

	return response.json();
}

export async function truckingCalculationService(data) {
	const POST_DATA = {
		distance: Math.round(data.distance),
		vehicle: data.vehicle,
	};

	const response = await fetch(`${CALCULATE_URL}/trucking`, {
		method: "POST",
		body: JSON.stringify(POST_DATA),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw {message: "Failed to send data.", status: 500};
	}

	return response.json();
}

export async function warehouseCalculationService(data) {
	const POST_DATA = {
		cft: Number(data.area),
		packageType: data.packing,
		durationInDays: Number(data.durationInDays),
	};

	const response = await fetch(`${CALCULATE_URL}/warehouse`, {
		method: "POST",
		body: JSON.stringify(POST_DATA),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw {message: "Failed to send data.", status: 500};
	}

	return response.json();
}

export async function airAmbulanceCalculationService(data) {
	const POST_DATA = {
		destinationCity: data.dropoff,
		sourceCity: data.pickup,
		isPackingRequired: data.isPackingRequired,
		region: data.region,
		weight: data.weight,
	};

	const response = await fetch(`${CALCULATE_URL}/airambulance`, {
		method: "POST",
		body: JSON.stringify(POST_DATA),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw {message: "Failed to send data.", status: 500};
	}

	return response.json();
}
