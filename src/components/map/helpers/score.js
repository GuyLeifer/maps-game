export function cumulativeScore(distance, setScore, setKnownLocations, knownLocations, randomLocation, setUnknownLocations, unknownLocations) {
    if (distance < 20) {
        setScore((prev) => prev + 100);
        setKnownLocations([...knownLocations, randomLocation.name]);
    } else if (distance < 40) {
        setScore((prev) => prev + 90);
        setKnownLocations([...knownLocations, randomLocation.name]);
    } else if (distance < 55) {
        setScore((prev) => prev + 80);
        setKnownLocations([...knownLocations, randomLocation.name]);
    } else if (distance < 80) {
        setScore((prev) => prev + 60);
        setKnownLocations([...knownLocations, randomLocation.name]);
    } else if (distance < 100) {
        setScore((prev) => prev + 40);
        setKnownLocations([...knownLocations, randomLocation.name]);
    } else {
        setUnknownLocations([...unknownLocations, randomLocation.name]);
    }
}