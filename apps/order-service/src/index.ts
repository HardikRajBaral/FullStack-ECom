import Fastify from 'fastify';
import { clerkPlugin, getAuth } from '@clerk/fastify'

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

fastify.get('/test',async (request,reply)=>{
    const {userId}= getAuth(request)
    if(!userId){
       return reply.send({message:"You are not logged in"})
    }
      return reply.send({message:"Order Service is authenticated"})
}
);
const start = async () => {
    try{
        fastify.listen({port : 8001})
        console.log("Order service is running at port 8001");
    }
    catch(err){
        fastify.log.error(err)
        process.exit(1);
    }
}

start();