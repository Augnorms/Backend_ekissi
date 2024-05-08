import databaseConnection from "../../datasource/datasource";
import express,{Request, Response}  from "express";
import { Members } from "../../entities/members";

const route = express.Router();

route.post("/", async(req:Request, res:Response)=>{
  try{
    const {user_id} = req.body;

    const membersRepo = databaseConnection.getRepository(Members);

    const response = await membersRepo.findOne({where:{id:user_id}});

    if(response){
        res.status(200).json({
            code:200,
            status:true,
            message:"successfully fetched data for user",
            data:response
        })
    }else{
        res.status(400).json({
            code:400,
            status:false,
            message:"Sorry no data for this user",
            data:[]
        })
    }

  }catch{
        res.status(200).json({
          code:500,
          message:"Sorry network challenges try again"
       });
  }
});

export default route;