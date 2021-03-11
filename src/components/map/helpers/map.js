import Swal from "sweetalert2";

// after user clicks his location
export function onMapClick(
    a, b,
    userLocation,
    showCorrectLocation,
    setChosenLocation,
    getDistanceFromLatLonInKm,
    randomLocation,
    setDistanceFromTarget,
    cumulativeScore,
    setScore,
    setKnownLocations,
    knownLocations,
    setUnknownLocations,
    unknownLocations,
    setShowCorrectLocation,
    alertByDistance
) {
    if (!showCorrectLocation) {
        setChosenLocation({
            lat: userLocation.latLng.lat(),
            lng: userLocation.latLng.lng(),
        });
        let distance = getDistanceFromLatLonInKm(
            userLocation.latLng.lat(),
            userLocation.latLng.lng(),
            randomLocation.lat,
            randomLocation.lng
        );

        distance = Math.round(distance);
        setDistanceFromTarget(distance);

        // Cumulative score
        cumulativeScore(distance, setScore, setKnownLocations, knownLocations, randomLocation, setUnknownLocations, unknownLocations)

        // alert the score as the user gets in this round
        setShowCorrectLocation(true);
        alertByDistance(distance)
    } else {
        Swal.fire("You've been already played", "Please continue to the next step", "error");
    }
}