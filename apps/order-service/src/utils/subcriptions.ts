import { consumer } from "./kafka"
import { createOrder } from "./order"

export const runKafkaSubcriptions= async()=>{
    consumer.subscribe("payment.successful",async(message)=>{
        const product= message.value
        console.log("Received message: payment.successful ",message)

        const order=message.value
        await createOrder(order)
    })
}