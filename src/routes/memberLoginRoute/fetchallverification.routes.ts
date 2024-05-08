import databaseConnection from "../../datasource/datasource";
import express, { Request, Response } from "express";
import { Verification } from "../../entities/verification";

const route = express.Router();

route.get("/", async(req:Request, res:Response)=>{
   try{

     const verificationRepo = databaseConnection.getRepository(Verification);

     const findAll = await verificationRepo.find();

     if(!findAll){
        res.status(400).json({ code: 400, message: "Failed to fetch data" , data:[]});
     }else{
        res.status(200).json({ code: 200, message: "Found data successfully", data:findAll });
     }

   }catch(error){
    res.status(500).json({ code: 500, message: "Internal server error" });
   }
});

export default route;