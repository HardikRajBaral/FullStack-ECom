import { Hono } from "hono";
import Stripe from "stripe";
import stripe from "../utils/stripe";
import { producer } from "../utils/kafka";
import { ProductScalarFieldEnum } from "../../../../packages/product-db/generated/prisma/internal/prismaNamespace";


const webhookSecret= process.env.STRIPE_WEBHOOK_SECRET as string;
const webhookRoutes=new Hono()


webhookRoutes.post('/stripe',async(c)=>{
    const body= await c.req.text();
    const sig =c.req.header('Stripe-Signature') as string;
    let event :Stripe.Event   
    
    try{
        event = Stripe.webhooks.constructEvent(body,sig!,webhookSecret)
    }catch(error){
        console.log('Webhook signature verification failed.')
        return c.json({error:'Webhook signature verification failed.'},400)
    }
    switch (event.type) {
        case "checkout.session.completed":
            const session =event.data.object as Stripe.Checkout.Session;
            const lineItems= await stripe.checkout.sessions.listLineItems(session.id)
            // TODO:create Order
            producer.send("payment.successful",{value:{
                userId:session.client_reference_id,
                email:session.customer_details?.email,
                amount:session.amount_total,
                status:session.payment_status==="paid"?"success":"failed",
                products:lineItems.data.map((items)=>({
                    name:items.description,
                    quantity:items.quantity,
                    price:items.price?.unit_amount
                }))

            }})
            break;
    
        default:
            break;
    }
    return c.json({received:true})
})

export default webhookRoutes