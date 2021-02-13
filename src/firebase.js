
  import firebase from 'firebase'

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBtgOU-dQCTUc5hMoGqqAeM8fpHVo4g2hQ",
    authDomain: "task-tracker-2e6d8.firebaseapp.com",
    projectId: "task-tracker-2e6d8",
    storageBucket: "task-tracker-2e6d8.appspot.com",
    messagingSenderId: "769147077936",
    appId: "1:769147077936:web:0b4107ec1c006132b534f5",
    measurementId: "G-8VDMSCRZQ2"
  });

  const db = firebaseApp.firestore()

export default db;
