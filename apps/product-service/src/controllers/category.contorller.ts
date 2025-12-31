import { Prisma, prisma } from "@repo/product-db";
import { Request,Response } from "express";

export const createCategory=async (req:Request,res:Response)=>{
         const data:Prisma.CategoryCreateInput=req.body;
    
     console.log('req.body:', req.body);
     console.log('data:', data);
     console.log('data.name:', data?.name);
     
     if (!data || !data.name) {
        return res.status(400).json({ error: "Category name is required" });
     }

     try {
        const category =await prisma.category.create({data})
        res.status(201).json(category)
     } catch (error) {
        console.error('Create category error:', error);
        res.status(500).json({ error: "Failed to create category", details: (error as any).message });
     }
};
export const updateCategory=async (req:Request,res:Response)=>{};
export const deleteCategory=async (req:Request,res:Response)=>{};
export const getCategories=async (req:Request,res:Response)=>{};