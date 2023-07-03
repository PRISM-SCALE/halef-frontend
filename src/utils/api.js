export async function getAllServices() {
	const response = await fetch("http://localhost:3001/api/services");

	if (!response.ok) {
		throw {message: "Failed to fetch all services.", status: 500};
	}
	return response.json();
}
