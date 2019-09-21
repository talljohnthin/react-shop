import firebase from 'firebase';
import "firebase/firestore";

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
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

db.collection("users").add({
    first: "Johnrel",
    last: "Limpag",
    phone: 090909,
    role: 'user',
    username: 'asdf',
    pass:'asdf'
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
