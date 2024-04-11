import databaseConnection from "../../datasource/datasource";
import express, { Response, Request } from "express";
import { Profileimage } from "../../entities/profileimage";
import { Members } from "../../entities/members"; 

const route = express.Router();

route.post("/", async (req: Request, res: Response) => {
    try {
        const { memberId, image } = req.body; 

        const profileImageRepo = databaseConnection.getRepository(Profileimage);
        const memberRepo = databaseConnection.getRepository(Members); // Get the repository for Members

        // Fetch the member entity by its ID
        const member = await memberRepo.findOne({where:{id:memberId}});

        if (!member) {
            return res.status(404).json({
                code: 404,
                status: false,
                message: "Member not found",
            });
        }

        // Create a new Profileimage entity
        const createImage = new Profileimage();
        createImage.image = image;
        createImage.member = member; // Assign the member entity

        // Save the Profileimage entity
        const savedImage = await profileImageRepo.save(createImage);

        res.status(200).json({
            code: 200,
            status: true,
            message: "Created image successfully",
            data: savedImage, // Optionally, you can send the saved image data back to the client
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = route;
