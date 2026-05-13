import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAOLfFLOZbGylgYPDvTZV5xm6m5KZbSjmk",
  authDomain: "fei-net.firebaseapp.com",
  databaseURL: "https://fei-net-default-rtdb.firebaseio.com",
  projectId: "fei-net",
  storageBucket: "fei-net.firebasestorage.app",
  messagingSenderId: "172807760134",
  appId: "1:172807760134:web:4caaa4ca1d95a1d0799687"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;