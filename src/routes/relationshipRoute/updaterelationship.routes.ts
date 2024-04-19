import databaseConnection from "../../datasource/datasource";
import express, { Request, Response } from "express";
import { Relationship } from "../../entities/relationship";

const route = express.Router();

route.put("/", async(req:Request, res:Response)=>{

   try{

        const {update_id, parent_id, child_id} = req.body;

    const relationRepo = databaseConnection.getRepository(Relationship);

    const fetchRelation = await relationRepo.findOne({where:{id:update_id}});

    if(!fetchRelation){
        res.status(400).json({
            status:false,
            code:400,
            message:"No data available"
        })
    }else{

     fetchRelation.parent_id = parent_id;
     fetchRelation.child_id = child_id;

     relationRepo.save(fetchRelation);

     return res.status(200).json({ 
            code:200,
            message: "Member updated successfully", 
            member: relationRepo 
        });
    }

   }catch(error){
     console.error("Error updating member:", error);
     return res.status(500).json({ message: "Internal server error" });
   }

});

module.exports = route;