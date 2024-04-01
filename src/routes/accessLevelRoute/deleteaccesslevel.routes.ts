import databaseConnection from "../../datasource/datasource";
import express, { Request, Response } from "express";
import { AccessLevel } from "../../entities/accesslevel";

const route = express.Router();

route.post("/", async(req:Request, res:Response)=>{

    try{
        const {user_id} = req.body

        let accesslevelRepo = databaseConnection.getRepository(AccessLevel);

        let memberToDelete =  await accesslevelRepo.findOne({where:{id:user_id}});

    if (!memberToDelete) {
        return res.status(404).json({ message: "Member not found" });
    }

    let response = await databaseConnection
    .createQueryBuilder()
    .delete()
    .from(AccessLevel)
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

module.exports = route;