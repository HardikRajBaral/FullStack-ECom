import { Hono } from "hono";
import stripe from "../utils/stripe";
import { shouldBeUser } from "../middleware/authMiddleware";
import { CartItemsType } from "@repo/types";
import { getStripeProductPrice } from "../utils/srtipeProduct";

const sessionRoute=new Hono()

sessionRoute.post("/create-checkout-session",shouldBeUser, async (c) => {
  const {cart}:{cart:CartItemsType}= await c.req.json();
  const user = c.get("userId");
  
  const lineItems=await Promise.all(
    cart.map(async (item)=>{
      const unitAmount= await getStripeProductPrice(item.id);
      return{
        price_data:{
          currency:"usd",
          product_data:{
            name:item.name
          },
          unit_amount:unitAmount as number,
        },
        quantity: item.quantity,
      }
    })
  )
  try {
    
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      client_reference_id:user,
    mode: 'payment',
    ui_mode:"custom",
    return_url: `http://localhost:3002/complete.html?session_id={CHECKOUT_SESSION_ID}`,
  });

  return c.json({ checkoutSessionClientSecret: session.client_secret });
} catch (error) {
  console.log(error)
  return c.json({ error })
}
});

sessionRoute.get("/:session_id", async (c) => {
  const { session_id } = c.req.param();
  const session= await stripe.checkout.sessions.retrieve(session_id as string)
  console.log(session)
  return c.json(session)
})

export default sessionRoute