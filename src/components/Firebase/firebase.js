import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/storage'


const myFirebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
    constructor(){
      app.initializeApp(myFirebaseConfig);

      this.auth = app.auth();
      this.db = app.firestore();
      this.storage = app.storage();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
 
    doSignInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);
  
    doSignOut = () => this.auth.signOut();
  
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  
    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);
    
    doGetUserUId = () => this.auth.currentUser.uid;

    users = (fullname, email, id) => this.db.collection('users').doc(id).set({
      fullname,
      email
    })

    saveImage = (imageURL, id) => this.db.collection('users').doc(id).collection('images').add({
      imageURL
    })

    doUploadFile = (fileName, file) => this.storage.ref(`images/${fileName}`).put(file)
   
}

export default Firebase;