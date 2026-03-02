import { consumer } from "./kafka"
import { createOrder } from "./order"

export const runKafkaSubcriptions= async()=>{

    consumer.subscribe([
    {topicName:"payment.successful",topicHandler:async(message)=>{
            const order=message.value
            await createOrder(order)
        }
    }
    ])
}