import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/storage'

const config = {
  apiKey: 'AIzaSyCFTZGtcsxDOkREs_LT8flaYdhIIOkVvyA',
  authDomain: 'devhacks2018.firebaseapp.com',
  databaseURL: 'https://devhacks2018.firebaseio.com',
  projectId: 'devhacks2018',
  storageBucket: 'devhacks2018.appspot.com',
  messagingSenderId: '927064402255'
}

const firebaseApp = firebase.initializeApp(config)

export default firebaseApp
