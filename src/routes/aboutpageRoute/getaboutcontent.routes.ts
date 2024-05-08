import databaseConnection from "../../datasource/datasource";
import express, { Response, Request } from "express";
import { About } from "../../entities/about";

const route = express.Router();

route.get("/", async(req:Request, res:Response)=>{
   try{

    const aboutRepo = databaseConnection.getRepository(About);

    const response = await aboutRepo.find()

    if(response){
        res.status(200).json({
            code:200,
            status:true,
            data:response
        })
    }else{
         res.status(400).json({
            code:400,
            status:false,
            data:[]
        })
    }

   }catch(error){
     console.error("Error :", error);
     return res.status(500).json({ message: "Internal server error" });
   }
});

export default route;