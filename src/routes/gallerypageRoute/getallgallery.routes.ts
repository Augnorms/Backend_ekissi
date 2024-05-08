import databaseConnection from "../../datasource/datasource";
import express, { Request, Response } from "express";
import { Gallery } from "../../entities/gallery";

const route = express.Router();

route.get("/",async(req:Request, res:Response)=>{
  try{

    const galleryRepo = databaseConnection.getRepository(Gallery);

    const fetchResponse = await galleryRepo.find();

    if(fetchResponse){
       res.status(200).json({
        code:200,
        status:true,
        message:"data fetched successfully",
        data:fetchResponse
       });
    }else{
        res.status(400).json({
        code:400,
        status:false,
        message:"Failed to get data",
        data:[]
       });
    }

  }catch(error){
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default route;