import databaseConnection from "../../datasource/datasource";
import express, { Response, Request } from "express";
import { Profileimage } from "../../entities/profileimage";

const route = express.Router();

route.post("/", async(req:Request, res:Response)=>{
  try{
    const {req_id} = req.body;

    const fetchprofileRepo = databaseConnection.getRepository(Profileimage);

    const getimage = await fetchprofileRepo.findOne({where:{member:{id:req_id}}});

    if(!getimage){
        return res.status(404).json({
            code: 404,
            status: false,
            message: "Member not found",
        });
    }

    res.status(200).json({
            code: 200,
            status: true,
            message: "Profile images fetched successfully",
            data: getimage.image,
            imageid: getimage.id
    });

  }catch(error){
     console.error("Error:", error);
     return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = route;