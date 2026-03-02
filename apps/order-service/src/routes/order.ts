import { FastifyInstance } from "fastify";
import { shouldBeAdmin, shouldBeUser, } from "../middleware/authMiddleware";
import { Order } from "@repo/order-db";
import { startOfMonth, subMonths } from "date-fns";

export const orderRoute= async (fastify:FastifyInstance)=>{
    fastify.get('/user-orders',{preHandler:shouldBeUser},async(request,reply)=>{
        const orders= await Order.find({userId:request.userId});
        return reply.send(orders);
    })

    fastify.get('/orders',{preHandler:shouldBeAdmin},async(request,reply)=>{
        const orders= await Order.find();
        return reply.send(orders);
    })

    fastify.get('/order-chart',{preHandler:shouldBeAdmin},async(request,reply)=>{
        const now= new Date()
        const sixMonthsAgo= startOfMonth(subMonths(now,5))
        //{ month: "June", total: 214, successful: 140 }
        const raw= await Order.aggregate([
            {
                $match:{
                    createdAt:{$gte:sixMonthsAgo,$lte:now}
                }
            },
            {
                $group:{
                    _id:{
                        year:{$year:"$createdAt"},
                        month:{$month:"$createdAt"},
                    },
                    total:{$sum:1},
                    successful:{
                        $sum:{
                            $cond:[{$eq:["status","success"]},1,0]
                        }
                    }
                }
            },
            {
                $project:{
                    _id:0,
                    year:"$_id.year",
                    month:"$_id.month",
                    total:1,
                    successful:1
                }
            },
            {
                $sort:{
                    year:1,
                    month:1
                }
            }
        ])

    })
    

}