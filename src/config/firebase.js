import firebase from 'firebase';
import "firebase/firestore";
import "firebase/storage"

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAdIkS1hC2HAdmzxvFZBSC4FY1SKytwMGM",
    authDomain: "shop-39810.firebaseapp.com",
    databaseURL: "https://shop-39810.firebaseio.com",
    projectId: "shop-39810",
    storageBucket: "",
    messagingSenderId: "218930931613",
    appId: "1:218930931613:web:e34792f2e97722b6433174"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const storage = firebase.storage()
export default firebase;

