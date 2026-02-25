"use client"

import { useAuth } from "@clerk/nextjs"

const Page=()=>{
    const {signOut}=useAuth()
    return (
        <div>
            <h1>You Are Unauthorized </h1>
            <button onClick={()=>signOut()}>SignOut</button>
        </div>
    )
}

export default Page