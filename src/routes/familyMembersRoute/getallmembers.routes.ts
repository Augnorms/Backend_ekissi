import databaseConnection from "../../datasource/datasource";
import express, {Request, Response} from "express";
import { Members } from "../../entities/members";

const route = express.Router();

route.get("/", async(req:Request, res:Response)=>{

    try{
        const membersRepo = databaseConnection.getRepository(Members);

        let response = await membersRepo.find();

        if(response){
          res.status(200).json({
            code:200,
            message:"sucessfully resolved data",
            data:response
          });
        }else{
            res.status(400).json({
            code:400,
            message:"Failed to fetch data no data available"
          });
        }

    }catch{
        res.status(200).json({
            code:500,
            message:"Sorry network challenges try again"
       });
    }

});

module.exports = route;