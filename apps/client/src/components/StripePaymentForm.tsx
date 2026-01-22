"use client"

import { useAuth } from "@clerk/nextjs";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
const stripe = loadStripe("pk_test_51SlWVHLcGyPLZMruRgmp8NtwjRHsI5mtmv71IpIi7FnVeoJXeaNlvDuJULnd6wlvnheRI7GdpyI7Ea4sYAG4MqZY00pCsbUXkx");


const fetchClientSecret = async (token:String) => {
    return fetch(`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((json) => json.checkoutSessionClientSecret);
  }


const StripePaymentForm=()=>{
    const[token,setToken]= useState<string | null>(null)
    const {getToken}= useAuth()

    useEffect(()=>{
        getToken().then((token)=>setToken(token))
    },[])

    if(!token){
        return <div className="">  Loading.... </div>
    }

    return(
         <CheckoutProvider
          stripe={stripe}
          options={{
           fetchClientSecret:()=>fetchClientSecret(token)
          }}
        >
        
        </CheckoutProvider>
    
    )

}
export default StripePaymentForm 