import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

import firbaseConfig from "./firebase.json"

const appFirebase = firebase.initializeApp(firbaseConfig);

export const auth = appFirebase.auth();
export const storage = appFirebase.storage();
export const db = appFirebase.firestore();

export const loginWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider).then(function (result) {
  }).catch(function (error) {
    return error
  });
}
export const loginWithFacebook = async () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider).then(function (result) {
  }).catch(function (error) {
    return error
  });
}

export default appFirebase;