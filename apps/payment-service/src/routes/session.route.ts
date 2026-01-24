import { Hono } from "hono";
import stripe from "../utils/stripe";
import { shouldBeUser } from "../middleware/authMiddleware";

const sessionRoute=new Hono()

sessionRoute.post("/create-checkout-session",shouldBeUser, async (c) => {
  try {
    
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
        price_data:{
          currency:"usd",
          product_data:{
            name:"Test Product"
          },
          unit_amount:2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    return_url: `http://localhost:3002/complete.html?session_id={CHECKOUT_SESSION_ID}`,
  });

  c.json({ clientSecret: session.client_secret });
} catch (error) {
  console.log(error)
  return c.json({ error })
}
});

export default sessionRoute