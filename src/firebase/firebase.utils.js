import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCik00DkZ2XKwj2ax10MEOvGnu3v-LIsR4",
  authDomain: "crown-db-cdfe0.firebaseapp.com",
  projectId: "crown-db-cdfe0",
  storageBucket: "crown-db-cdfe0.appspot.com",
  messagingSenderId: "762199850136",
  appId: "1:762199850136:web:236890b7db0f9c9c6064ed",
  measurementId: "G-R28GQ08TD4"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;