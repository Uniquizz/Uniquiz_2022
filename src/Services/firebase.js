import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: 'AIzaSyAnxwk-ryq1GCdz8f5SKmkiuDg0vrKnHQw',
  authDomain: 'quizapp-39c91.firebaseapp.com',
  databaseURL: 'https://quizapp-39c91.firebaseio.com',
  projectId: 'quizapp-39c91',
  storageBucket: 'quizapp-39c91.appspot.com',
  messagingSenderId: '199863734003',
  appId: '1:199863734003:web:a385f0c943587ea480f186',
  measurementId: 'G-4HFTJQD8ZR',
};

const firebaseApp = initializeApp(firebaseConfig);

const database = getDatabase();

export { firebaseApp }
export { database }

export const checkAuth = () =>{
    const auth = getAuth();
    let usuario = null;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        usuario = user.displayName;
        console.log(usuario);
        // ...
      } else {
        // User is signed out
        usuario = null;
      }
    });
    return usuario;
}

export const logOut = () =>{
  const auth = getAuth();
  signOut(auth).then(() => {
    console.log("Sign out")
    window.location.replace("/")
  }).catch((error) => {
    // An error happened.
  });
}