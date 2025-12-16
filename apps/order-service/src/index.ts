import Fastify from 'fastify';

const fastify =Fastify();


fastify.get('/health',async (request,reply)=>{
    return reply.status(200).send({
        status:"ok",
        upTime: process.uptime(),
        timeStamp:Date.now()
    }) 
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