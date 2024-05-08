import databaseConnection from "../../datasource/datasource";
import express, { Request, Response } from "express";
import { Members } from "../../entities/members";

const route = express.Router();

route.post("/", async(req:Request, res:Response)=>{
  try{

    const {user_id} = req.body;

    let memberRepo = databaseConnection.getRepository(Members);

    let memberToDelete =  await memberRepo.findOne({where:{id:user_id}});

    if (!memberToDelete) {
        return res.status(404).json({ message: "Member not found" });
    }

    let response = await databaseConnection
    .createQueryBuilder()
    .delete()
    .from(Members)
    .where("id = :user_id", {user_id})
    .execute()

    if(response){
        res.status(200).json({
            code:200,
            message:"Deleted member successfully",
            status:true
        })
    }

  }catch(error){
      console.error("Error updating member:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
});

export default route;