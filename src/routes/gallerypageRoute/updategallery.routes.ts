import databaseConnection from "../../datasource/datasource";
import express, { Response, Request } from "express";
import { Gallery } from "../../entities/gallery";

const route = express.Router();

route.put("/", async(req:Request, res:Response)=>{
   try{
     const {id, filename, fileurl, original_file_name, resource_type } = req.body;
     
     const response = await databaseConnection
            .createQueryBuilder()
            .update(Gallery)
            .set({ 
                filename: filename,
                fileurl: fileurl,
                fileoriginalname: original_file_name,
                resourcetype: resource_type
             })
            .where("id = :id", { id: id })
            .execute()

        if (response) {
            res.status(200).json({
                code: 200,
                status: true,
                message: "updated gallery successfully"
            })

        } else {
            res.status(404).json({
                code: 404,
                status: false,
                message: "Failed to updated gallery"
            })
        }

   }catch(error){
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
   }
});

export default route;