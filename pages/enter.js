import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {auth} from '../lib/firebase'
import {GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import { useState, useEffect, useContext, useCallback } from 'react'
import {AuthContext} from '../lib/context'
import { firestore } from '../lib/firebase'

import { getDoc, addDoc, doc, collection, getFirestore, writeBatch, setDoc, FieldValue } from 'firebase/firestore'
import debounce from 'lodash.debounce'

const usernameRef = collection( firestore, 'username' )
const userRef = collection( firestore, 'users' )


export default function Enter({}) {
  const {user , username} =  useContext(AuthContext);
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
  const [formValue, setFormValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(false)

  const {user, username} = useContext(AuthContext)

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue])

  const onChange = (e) => {
    const val = e.target.value.toLowerCase()
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    
    if ( val.length < 3 ) {
      setFormValue(val)
      setLoading(false)
      setIsValid(false)
    }

    if (re.test(val)){
      setFormValue(val)
      setLoading(true)
      setIsValid(false)
    }

  }

  const onSubmit = async (e) => {
    e.preventDefault();

    // const userDoc = doc(firestore, `users/${user.uid}`)
    // const usernameDoc = doc(firestore, `username/${formValue}`)
    console.log(user.uid)
    const batch = writeBatch(firestore);
    batch.set(doc(firestore, `users/${user.uid}`), {username: formValue, photoURL:user.photoURL, displayName: user.displayName})
    batch.set(doc(firestore, `username/${formValue}`), {uid: user.uid})

    await batch.commit();

  }

  const checkUsername = useCallback( 
    debounce(async (username) => {
    if (username.length >= 3 ) {
      const docRef= doc(firestore, `username/${username}`)
      const { exists } = await docRef;  
      console.log('Firestore read executed')
      setIsValid(!exists)
      setLoading(false)
    }
  }, 500),
  []
  ) 

  return(
    <section>
      <h3> Choose Username </h3>
      <form onSubmit={onSubmit}>
        <input type= 'text' placeholder='Username' name='username' value={formValue} onChange={onChange} />
        < UsernameMessage username={formValue} isValid={isValid} loading={loading} />
        < button type='submit' className='btn-green' disabled= { !isValid } >
          Choose
        </button>

      <h3>Debug State</h3>
      < div>
       Username: { formValue }
       < br />
       Loading: {loading.toString()}
       <br />
       Username valid: {isValid.toString}
      </div>
      </form>
    </section>
  )
  
}





function UsernameMessage({ username, loading, isValid}) {
  if (loading){
    return <p>Checking...</p>
  } else if (isValid) {
    return <p className='text-success'>{username} is available!</p>
  } else if (username && !isValid) {
    return <p className='text-danger'>{username} is available!</p>
  } else {
    return <p></p>
  }
}