import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { clerkMiddleware } from '@hono/clerk-auth'
import sessionRoute from './routes/session.route.js'
import { cors } from 'hono/cors'
import webhookRoutes from './routes/webhooks.routs.js'
import { consumer, producer } from './utils/kafka.js'


const app = new Hono()

app.use('*',clerkMiddleware())

app.use(cors({
  origin:['http://localhost:3002'],
  }))

app.get('/health', (c) => {
  return c.json({
    status:"ok",
    upTime: process.uptime(),
    timeStamp:Date.now()
  })
})


app.route("/sessions",sessionRoute)

app.route("/webhooks", webhookRoutes)


// app.post('/create-stripe-product',async (c) => {
//    const res=await stripe.products.create({
//     id:"123",
//     name:"Test Product",
//     default_price_data:{
//       currency:"usd",
//       unit_amount:10*100
//     }
//    })
//    return c.json(res)
// })

// app.get('/stripe-product-price',async (c) => {
//    const res=await stripe.prices.list({
//     product:"123",
//    })
   
//    return c.json(res)
// })

const start=async ()=>{
  try{
    Promise.all([,await producer.connect(),await consumer.connect()])

    serve({
      fetch: app.fetch,
      port: 8002
    }, (info) => {
      console.log(`Payment Service is running on 8002`)
    })

  }catch(err){
    console.log(err)
    process.exit(1)

  }

}

start()
