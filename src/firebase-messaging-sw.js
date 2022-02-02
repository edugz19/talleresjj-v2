// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    apiKey: "AIzaSyDtDVHGBdzMMb21NFNCr7P_H4_PYuDuPEs",
    authDomain: "talleres-jj-v2-c4254.firebaseapp.com",
    projectId: "talleres-jj-v2-c4254",
    storageBucket: "talleres-jj-v2-c4254.appspot.com",
    messagingSenderId: "306693900419",
    appId: "1:306693900419:web:6c11339f3a9133930e33b6",
    measurementId: "G-C0QCEFDG5X"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();