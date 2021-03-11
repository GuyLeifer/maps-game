export const getRandomLocation = (onlyBigCities, bigCities, Locations, knownLocations, unknownLocations) => {
    if (!onlyBigCities) {
        const location = bigCities[Math.floor(Math.random() * bigCities.length)]
        if (knownLocations.find(knownLocation => knownLocation === location.MGLSDE_L_4) || unknownLocations.find(unknownLocation => unknownLocation === location.MGLSDE_L_4)) {
            getRandomLocation(onlyBigCities, bigCities, Locations, knownLocations, unknownLocations)
        } else {
            return location
        }
    }
    else {
        const location = Locations[Math.floor(Math.random() * Locations.length)]
        if (knownLocations.find(knownLocation => knownLocation === location.MGLSDE_L_4) || unknownLocations.find(unknownLocation => unknownLocation === location.MGLSDE_L_4)) {
            getRandomLocation(onlyBigCities, bigCities, Locations, knownLocations, unknownLocations)
        } else {
            return location
        }
    }
};