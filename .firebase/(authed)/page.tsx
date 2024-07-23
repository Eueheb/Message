'use client';

import {useAuthState} from "react-firebase-hooks/auth";

import {useState, FormEvent} from "react";
import { auth, firestore } from "@/app/firebase/config";
import {doc, query, getDocs, setDoc, deleteDoc, updateDoc, arrayUnion} from "firebase/firestore";
import React from 'react';
import {collection, where} from "firebase/firestore";
import {RequestInterface, UserInterface} from "@/app/lib/interfaces";

import Button from "@/app/components/Button";
import {useCollectionData} from "react-firebase-hooks/firestore";
export default function Home() {
    const [user, loading] = useAuthState(auth);
    const [email, setEmail] = useState("");
    const [incomingRequests] = useCollectionData(query(collection(firestore, "incomingRequests"), where ("receiverID", "==",user?.uid!)))
    const [outGoingRequests] = useCollectionData(query(collection(firestore, "outGoingRequests"), where ("senderID", "==",user?.uid!)))
    const sendRequest = async () => {
        const userQuery = query(collection(firestore, "user"), where("email", "==", email));
        const data = await getDocs(userQuery);
        const {uid: receiverID, displayName: receiverDisplayName} = data.docs[0].data() as UserInterface;
        const {uid: senderID, displayName: senderDisplayName} = user!;
        const docData = {
            senderID,
            senderDisplayName,
            receiverID,
            receiverDisplayName
        } as RequestInterface;
        console.log(data);
        await setDoc(doc(firestore, "requests", `${senderID}-${receiverID}`), docData)


    };
    const accepctRequest = async (senderID: string, receiverID: string) => {
        await deleteDoc(doc(firestore, "requests", `${senderID}/${receiverID}`));
        await updateDoc(doc(firestore, "user", senderID), {friends:arrayUnion(receiverID)});
        await updateDoc(doc(firestore, "user", receiverID), {friends:arrayUnion(senderID)});
    }
    return (
        <article className="flex flex-col min-h-screen bg-primary items-center justify-between p-24">

                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Button text ="Add User" onClick={sendRequest}/>

            <h3>INCOMING INVITES</h3>
            {incomingRequests?.map((data) =>{

                const {senderDisplayName, senderID} = data as RequestInterface;
                return (
                    <p key={senderID}> Request to {senderDisplayName} Sent </p>
                )
            })}
            {outGoingRequests?.map((data) =>{
                const {receiverID, receiverDisplayName} = data as RequestInterface;
                return (
                    <p key={receiverID}> Request to {receiverDisplayName} Sent </p>
                )
            })}
            <h3>INCOMING INVITES</h3>
        </article>
    );
}
