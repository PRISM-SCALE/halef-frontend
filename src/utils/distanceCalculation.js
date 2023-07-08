export const calculateDistance = (pickupAutocomplete, dropoffAutocomplete, setDistance) => {
	if (pickupAutocomplete && dropoffAutocomplete) {
		const origin = pickupAutocomplete.getPlace().geometry.location; // * || .formatted_address
		const destination = dropoffAutocomplete.getPlace().geometry.location; // * || .formatted_address

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
};
