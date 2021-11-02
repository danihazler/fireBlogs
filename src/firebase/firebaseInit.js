import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIRE_BASE_API_KEY,
    authDomain: "fireblogsyt-tutorial.firebaseapp.com",
    projectId: "fireblogsyt-tutorial",
    storageBucket: "fireblogsyt-tutorial.appspot.com",
    messagingSenderId: process.env.VUE_APP_FIRE_BASE_SENDER_ID,
    appId: process.env.VUE_APP_FIRE_BASE_APP_ID
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
