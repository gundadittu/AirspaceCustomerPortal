import app from 'firebase';
import 'firebase/auth';
import 'firebase/functions';
// const app = require("firebase");
// require("firebase/functions");

const prodConfig = {
    apiKey: "AIzaSyBPUBLiY-FCuqpJLVibdr-RoiUt4wzbaLE",
    authDomain: "airspace-management-app.firebaseapp.com",
    databaseURL: "https://airspace-management-app.firebaseio.com",
    projectId: "airspace-management-app",
    storageBucket: "airspace-management-app.appspot.com",
    messagingSenderId: "927508779333"
  };
  
// User this when I want to set up a dev version
//   const devConfig = {
//     apiKey: process.env.REACT_APP_DEV_API_KEY,
//     authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
//     projectId: process.env.REACT_APP_DEV_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
//   };
//  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

var config = prodConfig;

class Firebase {

  constructor() {

    if (!app.apps.length) {
      app.initializeApp(config);
    } 
    this.auth = app.auth();
    this.functions = app.functions();     
  }
}

export default Firebase;