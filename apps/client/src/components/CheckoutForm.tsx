"use client"

import { ShippingFormInputs } from "@repo/types"
import { PaymentElement } from "@stripe/react-stripe-js"
import { useCheckout } from "@stripe/react-stripe-js"
import { ConfirmError } from "@stripe/stripe-js"
import { useState } from "react"

const CheckoutForm=({shippingForm}:{shippingForm:ShippingFormInputs})=>{
    const checkout=useCheckout()
    const [loading,setLoading]= useState(false)
    const [error,setError]= useState<ConfirmError | null >(null)
    const handleClick= async ()=>{
        setLoading(true)
        await checkout.updateEmail(shippingForm.email)
        await checkout.updateShippingAddress({
            name:"shipping_address",
            address:{
                line1:shippingForm.address,
                city:shippingForm.city,
                country:"US"
            }
        })

       
    }

    return(
        <form>
            <PaymentElement options={{layout:'accordion'}}/>
            <button disabled={loading} onClick={handleClick}>
                Pay
            </button>

        </form>
    )
}
export default CheckoutForm