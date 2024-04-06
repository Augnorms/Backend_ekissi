import databaseConnection from "../../datasource/datasource";
import express, { Response, Request } from "express";
import { Gallery } from "../../entities/gallery";

const route = express.Router();

route.post("/", async(req:Request, res:Response)=>{
   try{

    const {id} = req.body

    let galleryRepo = databaseConnection.getRepository(Gallery);

    let memberToDelete =  await galleryRepo.findOne({where:{id:id}});

    if (!memberToDelete) {
        return res.status(404).json({ message: "File not found" });
    }

    let response = await databaseConnection
    .createQueryBuilder()
    .delete()
    .from(Gallery)
    .where("id = :id", {id})
    .execute()

    if(response){
        res.status(200).json({
            code:200,
            message:"Deleted File successfully",
            status:true
        })
    }

   }catch(error){
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
   }
});

module.exports = route;