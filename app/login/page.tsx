'use client';

import {useAuthState, useSignInWithGoogle} from "react-firebase-hooks/auth";


import { auth, firestore } from "@/app/firebase/config";
import {doc, setDoc} from "firebase/firestore";

import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import React from 'react';

export default function Login() {
    const [signInWithGoogle, error] = useSignInWithGoogle(auth);
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    const signIn = async () => {
        const res = await signInWithGoogle();
        const {uid, displayName, photoURL, email} = res?.user!;
        const docData = {
            uid,
            displayName,
            photoURL,
            email
        }
        await setDoc(doc(firestore, "user", uid), docData);
        if (user) {
            console.log("User signed in:", user);
            router.push("/");
        }


        return (
            /*<div className="flex items-center bg-primary justify-center min-h-screen">
                <div className="w-80 p-12 rounded shadow-md bg-drawer">
                    <h2 className="mb-4 text-4xl font-bold text-center flex justify-center items-center">Fiscord</h2>
                    <Button text="Log in with Google" onClick={signIn} loading={loading}/>
                    {error && (
                        <p className="text-sn text-warning flex items-center justify-center">
                            Sign in failed. Please try again.
                        </p>
                    )}
                </div>
            </div>*/
            <h1>HI</h1>
        );
    }
}