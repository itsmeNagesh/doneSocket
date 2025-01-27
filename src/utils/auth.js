// auth.js
import {
    GoogleAuthProvider,
    GithubAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
  } from 'firebase/auth';
  import { auth } from '../lib/firebase';
  
  // Google Login
  export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google User:', result.user);
    } catch (error) {
      console.error('Google Login Error:', error);
    }
  };
  
  // GitHub Login
  export const loginWithGithub = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('GitHub User:', result.user);
    } catch (error) {
      console.error('GitHub Login Error:', error);
    }
  };
  
  // Facebook Login
  export const loginWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Facebook User:', result.user);
    } catch (error) {
      console.error('Facebook Login Error:', error);
    }
  };
  