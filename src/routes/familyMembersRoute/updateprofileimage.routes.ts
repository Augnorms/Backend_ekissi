import databaseConnection from "../../datasource/datasource";
import express, { Response, Request } from "express";
import { Profileimage } from "../../entities/profileimage";

const route = express.Router();

route.put("/",async(req:Request, res:Response)=>{
    try{

        const { updateId, image } = req.body;

        const profileRepo = databaseConnection.getRepository(Profileimage);
        const updateprofile = await profileRepo.findOne({where:{id:updateId}})

        if(!updateprofile){
            return res.status(404).json({
                code: 404,
                status: false,
                message: "Member not found",
            });
        }

        updateprofile.image = image;

        await profileRepo.save(updateprofile);

        res.status(200).json({
            code:200,
            status: true,
            message: "profile image updated successfully",
            data:updateprofile
        })


    }catch(error){
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = route;