import firebase from 'firebase/app';
import 'firebase/firestore'; // for the db
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAHYY98IekAiElobIG7aa25UX46KLx3rpA",
  authDomain: "ecart2-64a53.firebaseapp.com",
  databaseURL: "https://ecart2-64a53-default-rtdb.firebaseio.com",
  projectId: "ecart2-64a53",
  storageBucket: "ecart2-64a53.appspot.com",
  messagingSenderId: "547989019796",
  appId: "1:547989019796:web:b62e564fdec94ec3df2881"

}

firebase.initializeApp(config);

const firestore = firebase.firestore();
const auth = firebase.auth();

const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) { return };

  const userRef = firestore.doc(`users/${userAuth.uid}`) //users/uniq26535
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
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

export {
  firestore,
  createUserProfileDocument,
  auth,
}