import databaseConnection from "../../datasource/datasource";
import express, {Request, Response} from "express";
import { Members } from "../../entities/members";
import axios from "axios";

const route = express.Router();

route.get("/", async(req:Request, res:Response)=>{
    const imageendpoint = process.env.ALLPROFILE_IMAGES_ENDPOINT;
    try{
        const membersRepo = databaseConnection.getRepository(Members);

        let response = await membersRepo.find({
          order:{
            id:"DESC"
          }
        });

    const imageResponse = await axios.get(String(imageendpoint));
    const images = imageResponse?.data?.data;

    // Create a map of member IDs to their images
    const imageMap = images.reduce((acc: { [key: number]: string }, image: any) => {
      acc[image.id] = image.image;
      return acc;
    }, {});

    // Attach images to members
    const membersWithImages = response.map((member: Members) => ({
      ...member,
      image: imageMap[member.id] || ""
    }));

    res.status(200).json({
      code: 200,
      status: true,
      message: "Members fetched successfully",
      data: membersWithImages
    });

    }catch{
        res.status(500).json({
            code:500,
            message:"Sorry network challenges try again"
       });
    }

});

module.exports = route;