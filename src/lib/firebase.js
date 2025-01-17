// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
apiKey: "AIzaSyDdUUt-HlzdFy21izKRztJANcBWwMS01ug",
authDomain: "chat-app-frontend-23321.firebaseapp.com",
projectId: "chat-app-frontend-23321",
storageBucket: "chat-app-frontend-23321.appspot.com",
messagingSenderId: "1038179002068",
appId: "1:1038179002068:web:f773e0526344cdc6c07d41",
measurementId: "G-BMG9RK0WPR",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
