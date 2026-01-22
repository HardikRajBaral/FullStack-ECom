"use client"

import { ShippingFormInputs } from "@repo/types"
import { useCheckout } from "@stripe/react-stripe-js/checkout"
import { ConfirmError } from "@stripe/stripe-js"
import { useState } from "react"

const CheckoutForm=({shippingForm}:{shippingForm:ShippingFormInputs})=>{
    const checkout=useCheckout()
    const [loading,setLoading]= useState(false)
    const [error,setError]= useState<ConfirmError | null >(null)
    return(<></>)
}
export default CheckoutForm