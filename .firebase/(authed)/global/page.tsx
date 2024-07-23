'use client';

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState, useEffect } from "react";
import { auth, firestore } from "@/app/firebase/config";
import { addDoc, collection, query, orderBy } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import React from 'react';

export default function Home() {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    const [text, setText] = useState("");


    // Correctly reference the Firestore collection and order by timestamp
    const messagesCollection = collection(firestore, "messages");
    const messagesQuery = query(messagesCollection, orderBy("timestamp"));
    const [messages] = useCollectionData(messagesQuery, { snapshotListenOptions: { includeMetadataChanges: true } });

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    const sendMessage = async (event: React.FormEvent) => {
        event.preventDefault();
        if (text.trim() === "") {
            return;
        }
        await addDoc(messagesCollection, {
            text,
            timestamp: new Date(),
            photoURL: user?.photoURL || ""
        });
        setText("");
    };



    if (loading) return <p>Loading...</p>;

    return (
        <main className="flex flex-col min-h-screen bg-primary items-center justify-between p-24">
            <div className="w-full max-w-lg flex-grow mb-20">
                <div className="flex flex-col-reverse overflow-auto h-full">
                    {messages && messages.map((msg, index) => (
                        <div key={index} className="flex items-center bg-secondary p-2 rounded my-2">
                            {msg.photoURL && <img src={msg.photoURL} alt="User" className="w-8 h-8 rounded-full mr-2" />}
                            <span>{msg.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full max-w-lg fixed bottom-0 bg-white p-4">
                <form onSubmit={sendMessage} className="w-full flex mb-4">
                    <input
                        className="bg-primary w-full p-2 rounded-l mb-0"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type your message here..."
                    />
                    <Button text="Send" submit style="px-4 py-2 rounded-r mb-0" />
                </form>
                <div className="flex justify-between">

                    <Button
                        text="Sign Out"
                        style="px-4 py-2 w-full"
                        onClick={async () => {
                            await signOut(auth);
                            router.push("/login");  // Navigate to the login page after sign out
                        }}
                    />
                </div>
            </div>
        </main>
    );
}
