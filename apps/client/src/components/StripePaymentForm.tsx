"use client"

import { useAuth } from "@clerk/nextjs";
import { CartItemsType, ShippingFormInputs } from "@repo/types";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import useCartStore from "@/stores/cartStore";
const stripe = loadStripe("pk_test_51SlWVHLcGyPLZMruRgmp8NtwjRHsI5mtmv71IpIi7FnVeoJXeaNlvDuJULnd6wlvnheRI7GdpyI7Ea4sYAG4MqZY00pCsbUXkx");


const fetchClientSecret = async (cart:CartItemsType,token:String) => {
    return fetch(`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`, {
      method: 'POST',
      body:JSON.stringify(cart),
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => res.json())
      .then((json) => json.checkoutSessionClientSecret);
  }


const StripePaymentForm=({shippingForm}:{shippingForm:ShippingFormInputs})=>{
    const {cart}=useCartStore()
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
           fetchClientSecret:()=>fetchClientSecret(cart,token)
          }}
        >
        <CheckoutForm shippingForm={shippingForm}/>
        </CheckoutProvider>
    
    )

}
export default StripePaymentForm 