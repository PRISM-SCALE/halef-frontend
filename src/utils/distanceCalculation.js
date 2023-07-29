export const calculateDistance = (pickupAutocomplete, dropoffAutocomplete, setDistance) => {
	if (pickupAutocomplete && dropoffAutocomplete) {
		const pickupPlace = pickupAutocomplete.getPlace();
		const dropoffPlace = dropoffAutocomplete.getPlace();

		if (pickupPlace?.geometry && dropoffPlace?.geometry) {
			const origin = pickupPlace.geometry.location;
			const destination = dropoffPlace.geometry.location;

			const service = new window.google.maps.DistanceMatrixService();
			service.getDistanceMatrix(
				{
					origins: [origin],
					destinations: [destination],
					travelMode: "DRIVING",
				},
				(response, status) => {
					if (status === "OK") {
						const result = response.rows[0].elements[0];

						if (result.status === "OK") {
							setDistance(result.distance.text);
						}
					} else {
						console.log("Error calculating distance:", status);
					}
				}
			);
		}
	}
};
