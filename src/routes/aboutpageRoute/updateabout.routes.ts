import databaseConnection from "../../datasource/datasource";
import express, { Response, Request } from "express";
import { About } from "../../entities/about";

const route = express.Router();

route.put("/", async (req: Request, res: Response) => {

    try {

        const { id, aboutcontent } = req.body;

        const response = await databaseConnection
            .createQueryBuilder()
            .update(About)
            .set({ history: aboutcontent })
            .where("id = :id", { id: id })
            .execute()

        if (response) {
            res.status(200).json({
                code: 200,
                status: true,
                message: "updated content successfully"
            })

        } else {
            res.status(404).json({
                code: 404,
                status: false,
                message: "Failed to updated content"
            })
        }


    } catch (error) {
        console.error("Error updating member:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

);

export default route;
