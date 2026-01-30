import { Hono } from "hono";


const webhookSecret= process.env.STRIPE_WEBHOOK_SECRET as string;
const webhookRoutes=new Hono()


webhookRoutes.post('/stripe',async(c)=>{
    const body= await c.req.text();
    const sig =c.req.header('Stripe-Signature') as string;
    
})