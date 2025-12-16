import { serve } from '@hono/node-server'
import { time, timeStamp } from 'console'
import { Hono } from 'hono'

const app = new Hono()

app.get('/health', (c) => {
  return c.json({
    status:"ok",
    upTime: process.uptime(),
    timeStamp:Date.now()
  })
})
const start=async ()=>{
  try{

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
