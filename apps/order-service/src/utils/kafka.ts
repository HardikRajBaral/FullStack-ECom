import { createConsumer, createKafkaClient,createProducer } from "@repo/kafka";

const kafkaClient=createKafkaClient("orders-service");

export const producer =createProducer(kafkaClient)
export const consumer = createConsumer(kafkaClient,"orders-group")