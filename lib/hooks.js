import {auth, firestore} from './firebase'
import { useEffect, useState } from 'react'
import { doc, addDoc, getDoc, deleteDoc, updateDoc, collection , onSnapshot} from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

import {getAuth, GoogleAuthProvider} from 'firebase/auth'

export function useUserData() {
    const [user] = useAuthState(auth);
    const usersRef = collection(firestore, 'users');
    console.log(user)
    const userRef = doc(usersRef, user.uid);

    useEffect( () => {
    let unsubscribe;


    if (user) {
        onSnapshot(userRef, (data) => {
        setUsername(data.data()?.username)
        })
    } else {
        setUsername(null)
    }

    }, [user]
    )

    };
