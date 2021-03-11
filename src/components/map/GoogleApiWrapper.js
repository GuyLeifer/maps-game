import React, { useCallback, useEffect, useState } from 'react';
import './GoogleApiWrapper.css';

// packages
import { Map, InfoWindow, Marker, Circle, GoogleApiWrapper } from 'google-maps-react';
import Swal from "sweetalert2";

// local
import Locations from "../../cities.json";
import greenMarker from './green-marker.png';
import GameControl from '../game/GameControl';
import { mapStyles, mapNoLabels } from './style';

// helpers
import { getDistanceFromLatLonInKm } from './helpers/distance';
import { modeChanger } from './helpers/mode';
import { cumulativeScore } from './helpers/score';
import { alertByDistance, endGame } from './helpers/alerts';
import { getRandomLocation } from './helpers/locations';

import { apiKey } from '../../apikey.json'

// MAP COMPONENT
function MapContainer(props) {

  // states
  const [showingInfoWindow, setShowingInfoWindow] = useState(true); // Hides or shows the InfoWindow
  const [activeMarker, setActiveMarker] = useState({}); // Shows the active marker upon click

  const [selectedPlace, setSelectedPlace] = useState({}); // Shows the InfoWindow to the selected place upon a marker
  const [randomLocation, setRandomLocation] = useState({}); // choose random location from the list
  const [chosenLocation, setChosenLocation] = useState({}); // chosen location of user
  const [showCorrectLocation, setShowCorrectLocation] = useState(false); // show the real correct location


  // states for game controller
  const [score, setScore] = useState(0); // Cumulative Score
  const [highScore, setHighScore] = useState(null); // high score for local storage
  const [bigCitiesHighScore, setBigCitiesHighScore] = useState(null); // high score of easy mode for local storage

  const [hint, setHint] = useState(false); // hint setter
  const [roundCounter, setRoundCounter] = useState(0); // round amount counter

  const [distanceFromTarget, setDistanceFromTarget] = useState(); // distance from target

  const [onlyBigCities, setOnlyBigCities] = useState(false); // option for easy mode

  const [knownLocations, setKnownLocations] = useState([]);
  const [unknownLocations, setUnknownLocations] = useState([]);

  const bigCities = Locations.filter((location) => location.MGLSDE_L_1 >= 40000)

  // useEffect 
  //- check the high score from local storage
  useEffect(() => {
    const savedHighScore = localStorage.getItem("highScore");
    if (savedHighScore) setHighScore(savedHighScore);
  }, []);

  // callbacks
  // start a new round
  const startRound = useCallback(() => {
    const location = getRandomLocation(onlyBigCities, bigCities, Locations, knownLocations, unknownLocations);
    setRandomLocation({
      lng: location.X,
      lat: location.Y,
      name: location.MGLSDE_L_4,
    });
  }, [onlyBigCities]);

  // reset map after round or game ended
  const resetMap = useCallback(
    (e, ended = false, modeChanged) => {
      if (showCorrectLocation || ended) {
        setHint(false);
        setRoundCounter((prev) => prev + 1);
        setShowCorrectLocation(false);
        setChosenLocation({});
        if (ended) {
          endGame(onlyBigCities, score, bigCitiesHighScore, setBigCitiesHighScore, startRound, setScore, setRoundCounter, highScore, setHighScore, knownLocations, unknownLocations, setKnownLocations, setUnknownLocations)
        } else {
          startRound();
        }
      } else {
        if (modeChanged) {
          setKnownLocations([]);
          setUnknownLocations([]);
          startRound();
        } else {
          Swal.fire("Error", "Finish The Current Round Before Going To The Next Round", "error");
        }
      }
    },
    [showCorrectLocation, highScore, score, startRound, onlyBigCities]
  );


  // after user clicks his location
  const onMapClick = (a, b, userLocation) => {
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

  const onMarkerClick = (props, marker) => {
    setShowingInfoWindow(true);
    setActiveMarker(marker);
    setSelectedPlace(props);
  }

  const onInfoWindowClose = (props) => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
    }
  };

  async function bigCitiesSetter(boolean) {
    if (onlyBigCities !== boolean) {
      setOnlyBigCities(boolean);
      modeChanger(onlyBigCities, setBigCitiesHighScore, setHighScore, setScore, setRoundCounter, startRound);
    }
  }

  return (
    <div>
      <GameControl
        highScore={highScore}
        bigCitiesHighScore={bigCitiesHighScore}
        reset={resetMap}
        score={score}
        distance={distanceFromTarget}
        location={randomLocation.name}
        roundCounter={roundCounter}
        hintSetter={setHint}
        bigCitiesSetter={bigCitiesSetter}
        bigCities={onlyBigCities}
      />

      <Map className="map"
        google={props.google}
        style={mapStyles}
        zoom={8}
        initialCenter={{ lat: 31.7797373515185, lng: 35.2095537973513 }}
        onClick={onMapClick}
        mapType="satellite"
        onReady={(mapProps, map) => {
          mapNoLabels(mapProps, map);
          startRound();
        }}
      >
        <Marker position={chosenLocation} />

        {showCorrectLocation && (
          <Marker
            position={randomLocation}
            visible={true}
            onClick={onMarkerClick}
            name={randomLocation.name}
            options={{ icon: greenMarker }}
          />
        )}

        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
          onClose={onInfoWindowClose}
        >
          <div>
            <h4>{selectedPlace.name}</h4>
          </div>
        </InfoWindow>

        {hint && (
          <Circle
            radius={100000}
            center={{
              lat: randomLocation.lat + Math.random() / 1.6,
              lng: randomLocation.lng + Math.random() / 1.6,
            }}
            clickable={false}
            strokeColor='transparent'
            strokeOpacity={1}
            strokeWeight={5}
            fillColor='#008800'
            fillOpacity={0.2}
          />
        )}

      </Map>

    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer)