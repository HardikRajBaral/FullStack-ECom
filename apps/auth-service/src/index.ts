import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express'
import { shouldBeAdmin } from './middleware/authMiddleware.js';

const app =express();
app.use(express.json())

app.use(cors({
    origin:['http://localhost:3003'],
    credentials:true
}))

app.use(clerkMiddleware())

app.get('/health',(req:Request,res:Response)=>{
    return res.status(200).json({
        status:"ok",
        upTime: process.uptime(),
        timeStamp:Date.now()
    })
})


app.use('/users',shouldBeAdmin)

app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
    console.log(err)
    return res.status(err.status || 500).json({
        message:err.message || 'Internal Server Error',
        
    })
})

const start = async()=>{
    try{
       
        app.listen(8003,()=>{
            console.log("auth service is running on port 8003")
        })
    }catch(err){
        console.log("Error starting the server",err)
    }
}

start()