import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// import * as admin from 'firebase-admin';

const config = {
    apiKey: "AIzaSyDw-QyIJNIVeE0to2hNot8VDhVaZm7QDQE",
    authDomain: "martha-development.firebaseapp.com",
    databaseURL: "https://martha-development.firebaseio.com",
    projectId: "martha-development",
    storageBucket: "martha-development.appspot.com",
    messagingSenderId: "863123823716",
    appId: "1:863123823716:web:00a11f359cf83ffff25371"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();

    }
    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');


    // *** Tenant API ***

    tenant = uid => this.db.ref(`tenants/${uid}`);

    tenants = () => this.db.ref(`tenants`);

}


export default Firebase;
//   or environment file
// const prodConfig = {
//     apiKey: process.env.REACT_APP_PROD_API_KEY,
//     authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROD_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
//   };

//   const devConfig = {
//     apiKey: process.env.REACT_APP_DEV_API_KEY,
//     authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
//     projectId: process.env.REACT_APP_DEV_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
//   };

//   const config =
//     process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
