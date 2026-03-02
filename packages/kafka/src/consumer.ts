import type { Kafka, Consumer } from "kafkajs";

export const  createConsumer=(kafka:Kafka,groupId:string)=>{
    const consumer :Consumer = kafka.consumer({groupId});

    const connect=async()=>{
        await consumer.connect();
        console.log("Consumer connected to "+ groupId);
    }

    const subscribe=async(topics:{
        topicName:string,
        topicHandler:(message:any)=>Promise<void>
    }[]
    )=>{
        await consumer.subscribe({
        topics: topics.map(topic=>topic.topicName),
        fromBeginning: true,
    });
     await consumer.run({
        eachMessage:async({topic,partition,message})=>{
            try{
                const topicConfig= topics.find(t=>t.topicName===topic)
                if(topicConfig){

                
                const value= message.value?.toString()
                if(value){
                    await topicConfig.topicHandler(JSON.parse(value))
                }
            }
            }catch(err){
                console.error("Error processing message:", err);
            }
        }
     })

    }

    const disconnect=async()=>{
        await consumer.disconnect();    
    }
    return {
        connect,
        disconnect,
        subscribe
    }
}