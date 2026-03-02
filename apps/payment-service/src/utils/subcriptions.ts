import { create } from "domain"
import { consumer } from "./kafka"
import { createStripeProduct, deleteStripeProduct } from "./srtipeProduct"

export const runKafkaSubcriptions= async()=>{
    // consumer.subscribe("product.created",async(message)=>{

    // })

    // consumer.subscribe("product.deleted",async(message)=>{
    //    
    // })

    consumer.subscribe([
        {
            topicName:"product.created",topicHandler:async(message)=>{
                const product= message.value
                console.log("Received message: product.created ",product)
                await createStripeProduct(product)
            }
        },
        {
            topicName:"product.deleted",topicHandler:async(message)=>{
                const productId= message.value
                console.log("Received message: product.deleted ",productId)
                await deleteStripeProduct(productId)
            }
        }
    ])
}