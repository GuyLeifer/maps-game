import React, { useState, useCallback } from 'react';
import Swal from "sweetalert2";
import "./GameControl.css";
import Draggable from 'react-draggable';

function GameControl({
  reset,
  score,
  distance,
  location,
  roundCounter,
  hintSetter,
  highScore,
  bigCitiesSetter,
  bigCitiesHighScore,
  bigCities
}) {

  //states
  const [numOfHints, setNumOfHints] = useState(1);
  const [selectedMode, setSelectedMode] = useState("allPlaces")

  const handleHints = useCallback(() => {
    if (numOfHints > 0) {
      setNumOfHints((prev) => prev - 1);
      hintSetter((prev) => !prev);
    } else {
      Swal.fire("Wrong", "No More Hints", "error");
    }
  }, [numOfHints]);

  const handleReset = useCallback(
    (e, modeChanged) => {
      if (roundCounter === 9) {
        setNumOfHints(1);
        reset(e, true, modeChanged);
      } else {
        reset(e, false, modeChanged);
      }
    },
    [roundCounter, reset]
  );

  const allPlacesHandler = () => {
    if (selectedMode !== "allPlaces") {
      bigCitiesSetter(false)
      setSelectedMode("allPlaces")
      setNumOfHints(1);
      hintSetter(false);
      handleReset("", true);
    }
  }
  const bigCitiesHandler = () => {
    if (selectedMode !== "bigCities") {
      bigCitiesSetter(true)
      setSelectedMode("bigCities")
      setNumOfHints(1);
      hintSetter(false);
      handleReset("", true);
    }
  }

  return (
    <Draggable>
      <div className='controls'>
        <div>
          <h1 id="controllerH1">Game Controller</h1>
          <div id="modeDiv">
            <h2>Mode : {selectedMode === "allPlaces" ? 'Hard' : 'Easy'}</h2>
            <p id="pdrag">(You Can Drag It Wherever you want)</p>
            <h2>{selectedMode === "allPlaces" ? 'All Places' : 'Big Cities'}</h2>
          </div>
        </div>
        <div className='responsiveDiv'>
          <div className="btns">
            <button className={selectedMode === "allPlaces" ? 'btn selected' : 'btn'} onClick={allPlacesHandler}>
              <span>All Places</span>
            </button>
            <button className={selectedMode === "bigCities" ? 'btn selected' : 'btn'} onClick={bigCitiesHandler}>
              <span>Big Cities</span>
            </button>
          </div>
          <div className='responsiveDiv'>
            <div>
              <div>
                <h2 id="score">Score: <span id="scoreSpan">{score}</span> Points</h2>
              </div>
              <div>
                <h2 id="target">Target: {location}</h2>
              </div>
            </div>
            <div>
              <div id="controller-grid">
                {distance && (<h2>Last Round Distance: {distance} KM</h2>)}
                <h2>Round: {roundCounter + 1}/10</h2>
                {bigCities ?
                  bigCitiesHighScore && <h2>High Score: {bigCitiesHighScore}</h2>
                  :
                  highScore && (<h2>High Score: {highScore}</h2>)
                }
                <h2>Hints Left: {numOfHints}</h2>
              </div>
            </div>
          </div>
          <div className="btns">
            <button className={numOfHints === 0 ? 'hint-btn btn selected' : 'hint-btn btn'} onClick={handleHints}>
              <span>Get a Hint</span>
            </button>
            <button className='next-turn-btn btn' onClick={handleReset}>
              <span>{roundCounter === 9 ? "End Game" : "Next Turn"}</span>
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default GameControl;