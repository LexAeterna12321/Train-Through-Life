import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

var config = {
  apiKey: "AIzaSyD93VMBzfT0hdnyfSGYv6VFsTNb6SJV3Pw",
  authDomain: "train-through-life.firebaseapp.com",
  databaseURL: "https://train-through-life.firebaseio.com",
  projectId: "train-through-life",
  storageBucket: "train-through-life.appspot.com",
  messagingSenderId: "1024636187129"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

var storage = firebase.storage();

export { storage, firebase as default };
