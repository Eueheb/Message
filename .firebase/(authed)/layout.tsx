'use client'


import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect} from "react";
import {auth} from "@/app/firebase/config";
import {useRouter} from "next/navigation";
import React from "react";

export default function  RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const[user,loading,error] = useAuthState(auth);
    const router = useRouter();
    useEffect(() =>{
        if(!user && !loading){
            router.push("/login");
        }
    },[user, loading])
    return (
        (!loading && user) && children
    );
}
