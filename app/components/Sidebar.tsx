import {useAuthState} from "react-firebase-hooks/auth";
import { auth, firestore } from "@/app/firebase/config";
import {useDocumentData} from "react-firebase-hooks/firestore";
import {doc} from "firebase/firestore";
import {UserInterface} from "@/app/lib/interfaces";

export default function SideBar() {
    const [user] = useAuthState(auth)
    const[userData] = useDocumentData((doc(firestore,"users",user?.uid!)))
    return(
        <section className="w-1/4 h-screen bg-secondary">
            {(userData as UserInterface).friends?.map((uid)=>{
                return(
                    <FriendCard key={uid} uid={uid}/>
                )
            }}
        </section>
    )
}

function FriendCard({uid}: {uid: string}) {
    const[userData] = useDocumentData((doc(firestore,"users",user?.uid!)))
    return(
        <p>{userData?.displayName}</p>
    )
}