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
  bigCitiesHighScore
}) {

//states
const [numOfHints, setNumOfHints] = useState(1);

const handleHints = useCallback(() => {
    if (numOfHints > 0) {
        setNumOfHints((prev) => prev - 1);
        hintSetter((prev) => !prev);
    } else {
        Swal.fire("Wrong", "No More Hints", "error");
    }
}, [numOfHints]);

const handleReset = useCallback(
    (e) => {
        if (roundCounter === 9) {
            setNumOfHints(1);
            reset(e, true);
        } else {
        reset(e, false);
        }
    },
    [roundCounter, reset]
);

  return (
      <Draggable>
            <div className='controls'>
                <div>
                  <h1>Game Controller</h1>
                  <p>(You Can Drag It Wherever you want)</p>
                </div>
                <div>
                    <button className='btn' onClick={() => bigCitiesSetter(false)}>
                      <span>All Places</span>
                    </button>
                    <button className='btn' onClick={() => bigCitiesSetter(true)}>
                      <span>Big Cities</span>
                    </button>
                </div>
                <div>
                    <h2 id="score">Score: <span id="scoreSpan">{score}</span> Points</h2>
                </div>
                <div>
                  <h2 id="target">Target: {location}</h2>
                </div>
                <div>
                    <div id="controller-grid">
                        {distance && (<h2>Last Round Distance: {distance} KM</h2>)}
                        <h2>Round: {roundCounter + 1}/10</h2>
                        {highScore && (<h2>High Score: {highScore}</h2>)}
                        {bigCitiesHighScore && (<h2>High Score: {bigCitiesHighScore}</h2>)}
                        <h2>Hints Left: {numOfHints}</h2>

                    </div>
                    <button className='hint-btn btn' onClick={handleHints}>
                      <span>Get a Hint</span>
                    </button>
                    <button className='next-turn-btn btn' onClick={handleReset}>
                      <span>Next Turn</span>
                    </button>
                </div>
            </  div>
        </Draggable>
  );
}

export default GameControl;