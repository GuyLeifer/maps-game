import Swal from "sweetalert2";

export function endGame(
    onlyBigCities,
    score,
    bigCitiesHighScore,
    setBigCitiesHighScore,
    startRound,
    setScore,
    setRoundCounter,
    highScore,
    setHighScore,
    knownLocations,
    unknownLocations,
    setKnownLocations,
    setUnknownLocations
) {
    const alertWithRecord = () => {
        let alertKnown = "";
        let alertUnknown = "";
        knownLocations.forEach(knownLocation => alertKnown += knownLocation + ", ")
        unknownLocations.forEach(unknownLocation => alertUnknown += unknownLocation + ", ")
        Swal.fire("Wow", "New Record", "success").then(() =>
            Swal.fire("You've Been Finished The Game").then(() =>
                Swal.fire("Known Locations", alertKnown.slice(0, -2)).then(() =>
                    Swal.fire("Unknown Locations", alertUnknown.slice(0, -2))
                )))
    }

    const alertWithoutRecord = () => {
        let alertKnown = "";
        let alertUnknown = "";
        knownLocations.forEach(knownLocation => alertKnown += knownLocation + ", ")
        unknownLocations.forEach(unknownLocation => alertUnknown += unknownLocation + ", ")
        Swal.fire("You've Been Finished The Game").then(() =>
            Swal.fire("Known Locations", alertKnown.slice(0, -2)).then(() =>
                Swal.fire("Unknown Locations", alertUnknown.slice(0, -2))
            ))
    }


    if (onlyBigCities) {
        if (score > bigCitiesHighScore || !bigCitiesHighScore) {
            setBigCitiesHighScore(score);
            localStorage.setItem("bigCitiesHighScore", score);
            alertWithRecord()
            startRound()
            setScore(0);
            setRoundCounter(0);
            setKnownLocations([]);
            setUnknownLocations([]);
        } else {
            alertWithoutRecord()
            startRound()
            setScore(0);
            setRoundCounter(0);
            setKnownLocations([]);
            setUnknownLocations([]);
        }
    } else {
        if (score > highScore || !highScore) {
            setHighScore(score);
            localStorage.setItem("highScore", score);
            alertWithRecord()
            startRound()
            setScore(0);
            setRoundCounter(0);
            setKnownLocations([]);
            setUnknownLocations([]);
        } else {
            alertWithoutRecord()
            startRound()
            setScore(0);
            setRoundCounter(0);
            setKnownLocations([]);
            setUnknownLocations([]);
        }

    }
}

export function alertByDistance(distance) {
    if (distance < 20) {
        Swal.fire(
            "Great",
            "Your Distance From The Target Was: " + String(distance) + " Kilometers, You Got 100 Points!",
            "success"
        );
    } else if (distance < 40) {
        Swal.fire(
            "Very Good",
            "Your Distance From The Target Was: " + String(distance) + " Kilometers, You Got 90 Points!",
            "success"
        );
    } else if (distance < 55) {
        Swal.fire(
            "Good",
            "Your Distance From The Target Was: " + String(distance) + " Kilometers, You Got 80 Points!",
            "success"
        );
    } else if (distance < 80) {
        Swal.fire(
            "Well Done",
            "Your Distance From The Target Was: " + String(distance) + " Kilometers, You Got 60 Points!",
            "success"
        );
    } else if (distance < 100) {
        Swal.fire(
            "Better Next Time",
            "Your Distance From The Target Was: " + String(distance) + " Kilometers, You Got 40 Points!",
            "warning"
        );
    }
    else {
        Swal.fire(
            "Wrong",
            "Your Distance From The Target Was: " + String(distance) + " Kilometers",
            "error"
        );
    }
}