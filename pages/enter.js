import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {auth} from '../lib/firebase'
import {GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import google from '../public/google.webp'
import { async } from '@firebase/util'

export default function Login({}) {
  const user= null
  const username = null
  return (
  <main>
      {
        user ? username ? <SignOutButton /> : <UsernameForm />
        : <SignInButton />
      }
  </main>);
};

function SignInButton() {
  const SignInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
    // // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // // The signed-in user info.
    // const user = result.user;
    // // ...
    console.log(result)
  }).catch((error) => {
    // // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // // The email of the user's account used.
    // const email = error.email;
    // // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);
    // // ...
    console.log(error)
  });
  }     
  return(
    <button className='btn-google' onClick={ SignInWithGoogle }>
      <img src={'/google.webp'}/>
    </button>
  )

}

function SignOutButton() {
  return(
    <button onClick={ signOut}>
      Sign Out
    </button>
  )
}

function UsernameForm() {
  
}