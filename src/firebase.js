import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

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

function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

initFirebase();

export { firebase };
