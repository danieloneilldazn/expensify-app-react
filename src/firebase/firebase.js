import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA6J1eosByQQBZcpiR0HVl4ORWMMMsqsBA",
    authDomain: "expensify-d3977.firebaseapp.com",
    databaseURL: "https://expensify-d3977-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "expensify-d3977",
    storageBucket: "expensify-d3977.appspot.com",
    messagingSenderId: "175380344246",
    appId: "1:175380344246:web:33944032e14bf6be686517"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database()

database.ref().set({
    name: 'Daniel ONeill'
}).then(() => {
    console.log('Data is saved')
}).catch((e) => {
    console.log('failed:', e)
});
