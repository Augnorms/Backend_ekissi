import databaseConnection from "../../datasource/datasource";
import express, { Request, Response } from "express";
import { AccessLevel } from "../../entities/accesslevel";

const route = express.Router()

route.get("/", async(req:Request, res:Response)=>{
   try{

    const accesslevelRepo = databaseConnection.getRepository(AccessLevel);

    let response = await accesslevelRepo.find();

    if(response){
        res.status(200).json({
            code:200,
            status:true,
            message:"all user found",
            data:response
        })
    }else{
        res.status(404).json({
            code:404,
            status:true,
            message:"users not found",
            data:[]
        })
    }

   }catch(error){
      console.error("Error updating member:", error);
      return res.status(500).json({ message: "Internal server error" });
   }
});

module.exports = route;