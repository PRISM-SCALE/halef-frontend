// export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
export const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001/api";
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

export async function getTruckingVehicleRange() {
	const response = await fetch(`${BASE_URL}/vehiclerange`);

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
// * PAY NOW
export async function createPayment(data) {
	const response = await fetch(`${BASE_URL}/customer_payments`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

	return response.json();
}

export async function resendPaymentOTP(phone) {
	const POST_DATA = {
		phone: Number(phone),
	};

	const response = await fetch(`${BASE_URL}/otp/payment/resend`, {
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

export async function verifyPaymentOtp(data) {
	const response = await fetch(`${BASE_URL}/otp/verify_payment`, {
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
// * USER INFO
export async function createUser(data) {
	const response = await fetch(`${BASE_URL}/user/create`, {
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

export async function resendUserOTP(phone) {
	console.log("USER NOT VERIFIED, OTP SENT FOR VERIFICATION");
	const POST_DATA = {
		phone: Number(phone),
	};

	const response = await fetch(`${BASE_URL}/otp/user/resend`, {
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
	console.log("USER VERIFIED");

	const response = await fetch(`${BASE_URL}/otp/verify_user`, {
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

export const getLocalStorage = (key) => {
	const storedValue = localStorage.getItem(key);

	try {
		return JSON.parse(storedValue);
	} catch (error) {
		console.log(error);
		return undefined;
	}
};

export async function relocationCalculationService(data, serviceId, userId) {
	const estimates = {
		pickup: data?.pickup,
		dropoff: data?.dropoff,
		insurance: data?.insurance,
		vehicle: data?.vehicle,
		houseCapacity: data?.houseCapacity,
		packing: data?.packing,
		distance: data?.distance,
		goodsValue: data?.goodsValue,
		isDifferentState: data?.isDifferentState,
	};

	const POST_DATA = {
		distance: Math.round(data.distance),
		goodsValue: Number(data.goodsValue),
		houseType: data.houseCapacity,
		requireInsurance: data.insurance,
		packageType: data.packing,
		vehicle: data.vehicle,
		serviceId: serviceId,
		userId: userId,
		estimates: JSON.stringify(estimates),
	};

	if (userId) {
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
	} else {
		throw new Error("User Id not available");
	}
}

export async function courierCargoCalculationService(data, serviceId, userId) {
	const POST_DATA = {
		weight: Number(data.weight),
		length: Number(data.length),
		width: Number(data.width),
		height: Number(data.height),
		carrierCode: data.shipmentService,
		docType: data.docType,
		serviceId: serviceId,
		userId: userId,
		estimates: JSON.stringify(data),
	};

	if (userId) {
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
	} else {
		throw new Error("User Id not available");
	}
}

export async function truckingCalculationService(data, serviceId, userId) {
	const estimates = {
		pickup: data?.pickup,
		dropoff: data?.dropoff,
		vehicle: data?.vehicle,
		goodsType: data?.goodsType,
		distance: data?.distance,
		isDifferentState: data?.isDifferentState,
	};

	const POST_DATA = {
		distance: Math.round(data.distance),
		vehicle: data.vehicle,
		serviceId: serviceId,
		userId: userId,
		isDifferentState: data.isDifferentState,
		estimates: JSON.stringify(estimates),
	};
	if (userId) {
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
	} else {
		throw new Error("User Id not available");
	}
}

export async function warehouseCalculationService(data, serviceId, userId) {
	const POST_DATA = {
		cft: Number(data.area),
		packageType: data.packing,
		durationInDays: Number(data.durationInDays),
		serviceId: serviceId,
		userId: userId,
		estimates: JSON.stringify(data),
	};

	if (userId) {
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
	} else {
		throw new Error("User Id not available");
	}
}

export async function airAmbulanceCalculationService(data, serviceId, userId) {
	const POST_DATA = {
		destinationCity: data.dropoff,
		sourceCity: data.pickup,
		isPackingRequired: data.isPackingRequired,
		region: data.region,
		weight: data.weight,
		serviceId: serviceId,
		userId: userId,
		estimates: JSON.stringify(data),
	};

	if (userId) {
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
	} else {
		throw new Error("User Id not available");
	}
}
