import React, { useCallback, useEffect, useState } from 'react';
import {Map, InfoWindow, Marker, Circle, GoogleApiWrapper} from 'google-maps-react';
import Swal from "sweetalert2";
import GameControl from '../game/GameControl';
import greenMarker from './green-marker.png';
import Locations from "../../cities.json";
import './GoogleApiWrapper.css';


// https://stackoverflow.com/questions/3110020/google-maps-api-v3-no-labels

const mapNoLabels = (mapProps, map) => {
  const options = [
    {
      featureType: "all",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];

  map.set('styles', options);
}


  //  (https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates)

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {

    function deg2rad(deg) {
      const pie = Math.PI;
      return deg * (pie / 180);
    }

    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1); // deg2rad below
    let dLon = deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
  }

// general
const mapStyles = {
    width: '100%',
    height: '90%',
    position: "fixed",
    bottom: '0'
  } 


// map component
function MapContainer(props) {

  // states
  const [showingInfoWindow, setShowingInfoWindow] = useState(true); // Hides or shows the InfoWindow
  const [activeMarker, setActiveMarker] = useState({}); // Shows the active marker upon click
  const [selectedPlace, setSelectedPlace] = useState({}); // Shows the InfoWindow to the selected place upon a marker
  const [randomLocation, setRandomLocation] = useState({});
  const [chosenLocation, setChosenLocation] = useState({});
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(null);
  const [hint, setHint] = useState(false);
  const [roundCounter, setRoundCounter] = useState(0);
  const [showCorrectLocation, setShowCorrectLocation] = useState(false);
  const [distanceFromTarget, setDistanceFromTarget] = useState();
  const [onlyBigCities, setOnlyBigCities] = useState(false);
  const [locations, setLocations] = useState(Locations);
  
  // useEffect 
  //- check the high score from local storage
  useEffect(() => {
    const isHighScore = localStorage.getItem("highScore");
    if (isHighScore) setHighScore(isHighScore);
  }, []);

// PROBLEM!!
  useEffect(() => {
    if (onlyBigCities) {
      setLocations(locations.filter((location) => location.MGLSDE_L_1 > 40000));
    } else {
      setLocations(Locations);
    }
    console.log("locations: ", locations);
    startRound()
  }, [onlyBigCities])

  // callbacks
  const startRound = useCallback(() => {
      let checkerForLocation = "";
      let location = getRandomLocation();
      while (checkerForLocation.length === 0) {
        location = getRandomLocation();
        checkerForLocation = location.MGLSDE_LOC;
      }
      setRandomLocation({
        lng: location.X,
        lat: location.Y,
        name: location.MGLSDE_L_4,
      });
    }, []);

  const resetMap = useCallback(
    (e, ended = false) => {
      if (showCorrectLocation || ended) {
        setHint(false);
        setRoundCounter((prev) => prev + 1);
        setShowCorrectLocation(false);
        setChosenLocation({});
        if (ended) {
          if (score > highScore || !highScore) {
            setHighScore(score);
            localStorage.setItem("highScore", score);
            Swal.fire("Wow", "New Record", "success").then(() =>
            Swal.fire("You've been finished the Game").then(startRound())
          );
            setScore(0);
            setRoundCounter(0);
          } else {
            Swal.fire("You've been finished the Game").then(startRound());
            setScore(0);
            setRoundCounter(0);
          }
        } else {
          startRound();
        }
      } else {
        Swal.fire("Error", "Finish the current round before going to the next round", "error");
      }
    },
    [showCorrectLocation, highScore, score, startRound]
  );

  //functions
const getRandomLocation = () => {
    return locations[Math.floor(Math.random() * locations.length)];
};

    const onMapClick = (a, b, c) => {
      if (!showCorrectLocation) {
        setChosenLocation({
          lat: c.latLng.lat(),
          lng: c.latLng.lng(),
        });
        let distance = getDistanceFromLatLonInKm(
          c.latLng.lat(),
          c.latLng.lng(),
          randomLocation.lat,
          randomLocation.lng
        );

        distance = Math.round(distance);
        setDistanceFromTarget(distance);

        // score
        if (distance < 20) {
          setScore((prev) => prev + 100);
        } else if (distance < 40) {
          setScore((prev) => prev + 90);
        } else if (distance < 55) {
          setScore((prev) => prev + 80);
        } else if (distance < 80) {
          setScore((prev) => prev + 60);
        } else if (distance < 100) {
          setScore((prev) => prev + 40);
        }

        setShowCorrectLocation(true);
        if (distance < 20) {
          Swal.fire(
            "Great",
            "Your Distance from the target was: " + String(distance) +" Kilometers, You Got 100 Points!",
            "success"
          );
        } else if (distance < 40) {
          Swal.fire(
            "Very Good",
            "Your Distance from the target was: " + String(distance) +" Kilometers, You Got 90 Points!",
            "success"
          );
        } else if (distance < 55) {
          Swal.fire(
            "Good",
            "Your Distance from the target was: " + String(distance) +" Kilometers, You Got 80 Points!",
            "success"
          );
        } else if (distance < 80) {
          Swal.fire(
            "Well Done",
            "Your Distance from the target was: " + String(distance) +" Kilometers, You Got 60 Points!",
            "success"
          );
        } else if (distance < 100) {
          Swal.fire(
            "Better Next Time",
            "Your Distance from the target was: " + String(distance) +" Kilometers, You Got 40 Points!",
            "warning"
          );
        }
         else {
          Swal.fire(
            "Wrong",
            "Your Distance from the target was: " + String(distance) +" Kilometers",
            "error"
          );
        }
      } else {
        Swal.fire("You've been already played", "Please continue to the next step", "error");
      }
    }

    const onMarkerClick = (props, marker, e) => {
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

    function bigCitiesSetter(boolean) {
      setOnlyBigCities(boolean);
      // locations = locations.filter((location) => location.MGLSDE_L_1 > 40000);
    }
    
      return (
      <div>
        <GameControl
          highScore={highScore}
          reset={resetMap}
          score={score}
          distance={distanceFromTarget}
          location={randomLocation.name}
          roundCounter={roundCounter}
          hintSetter={setHint}
          bigCitiesSetter={bigCitiesSetter}
        />
  
        <Map className="map"
        google={props.google}
        style ={mapStyles} 
        zoom={8} 
        initialCenter={{lat: 31.7797373515185 , lng: 35.2095537973513}}
        onClick={onMapClick}
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
              radius={100200}
              center={{
                lat: randomLocation.lat + Math.random() / 1.6,
                lng: randomLocation.lng + Math.random() / 1.6,
              }}
              clickable={false}
              strokeColor='transparent'
              strokeOpacity={1}
              strokeWeight={5}
              fillColor='#FF0000'
              fillOpacity={0.2}
            />
          )}
  
        </Map>
  
      </div>
      );
    }

 
export default GoogleApiWrapper({
  apiKey: "AIzaSyCLi5v2f-vP-Xs7u59LIuY8lZ5mlaKERe0"
})(MapContainer)