export const modeChanger = (onlyBigCities, setBigCitiesHighScore, setHighScore, setScore, setRoundCounter, startRound) => {
    if (onlyBigCities) {
        const savedBigCitiesHighScore = localStorage.getItem("bigCitiesHighScore");
        if (savedBigCitiesHighScore) setBigCitiesHighScore(savedBigCitiesHighScore);
        setHighScore(null);
    } else {
        const savedHighScore = localStorage.getItem("highScore");
        if (savedHighScore) setHighScore(savedHighScore);
        setBigCitiesHighScore(null);
    }

    setScore(0);
    setRoundCounter(0);
    startRound();
}