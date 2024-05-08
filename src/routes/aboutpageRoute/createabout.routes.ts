import databaseConnection from "../../datasource/datasource";
import express, { Response, Request } from "express";
import { About } from "../../entities/about";

const route = express.Router();

route.post("/", async (req: Request, res: Response) => {
    try {
        const { aboutcontent } = req.body;

        // Create an instance of the About entity
        const about = new About();
        about.history = aboutcontent;

        // Save the entity to the database
        const aboutRepo = databaseConnection.getRepository(About);
        const createcontent = await aboutRepo.save(about);

        if (createcontent) {
            res.status(200).json({
                code: 200,
                status: true,
                message: "created content successfully"
            });
        } else {
            res.status(404).json({
                code: 404,
                status: false,
                message: "Failed to create content"
            });
        }

    } catch (error) {
        console.error("Error updating member:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default route;
