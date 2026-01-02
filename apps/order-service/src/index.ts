import Fastify from 'fastify';
import { clerkPlugin, getAuth } from '@clerk/fastify'
import { shouldBeUser } from './middleware/authMiddleware.js';
import { connectOrderDB } from '@repo/order-db';
import { orderRoute } from './routes/order.js';

const fastify =Fastify();

fastify.register(clerkPlugin)

fastify.get('/health',async (request,reply)=>{
    return reply.status(200).send({
        status:"ok",
        upTime: process.uptime(),
        timeStamp:Date.now()
    }) 
}
);

fastify.get('/test',{preHandler:shouldBeUser},async (request,reply)=>{
    
      return reply.send({message:"Order Service is authenticated",userId:request.userId})
}
);

fastify.register(orderRoute)

const start = async () => {
    try{
        await connectOrderDB()
        fastify.listen({port : 8001})
        console.log("Order service is running at port 8001");
    }
    catch(err){
        console.log(err)
        process.exit(1);
    }
}

start();