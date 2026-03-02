import sendMail from "../utilis/mailer"
import { createConsumer, createKafkaClient } from "@repo/kafka"


const kafka=createKafkaClient("email-service")
const consumer=createConsumer(kafka,"email-service")


const start = async () => {
    await consumer.connect()
    try {
        await consumer.subscribe([
            {topicName:"user-created",topicHandler:async(message)=>{
                const {userName,email}=message.value

                if(email){
                    await sendMail({
                        email,
                        subject:"Welcome to our E-commerce platform",
                        text:`Hi ${userName},\n\nWelcome to our E-commerce platform! We're excited to have you on board. If you have any questions or need assistance, feel free to reach out to our support team.\n\nBest regards,\nEcom Team`
                    })
                }
            }},
            {topicName:"order-created",topicHandler:async(message)=>{
                 const {email,amount,status}=message.value

                if(email){
                    await sendMail({
                        email,
                        subject:"Order Confirmation",
                        text:`Hello! Your order has been created.\n\nOrder Details:\nAmount: ${amount/100}\nStatus: ${status}\n\nThank you for shopping with us! If you have any questions about your order, please contact our support team.\n\nBest regards,\nEcom Team`
                    })
                }
            }}
        ])
    } catch (error) {
        console.log("Failed to start email service", error)
    }
}
start()