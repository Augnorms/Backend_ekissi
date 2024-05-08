import databaseConnection from "../../datasource/datasource";
import express, { Request, Response } from "express";
import { Relationship } from "../../entities/relationship";

const route = express.Router();

route.post("/", async (req: Request, res: Response) => {
    try {
        const { parent_id, child_id } = req.body;

        const relationRepo = databaseConnection.getRepository(Relationship);

        const createRelation = new Relationship();

        // Assign parent_id and child_id directly
        createRelation.child = child_id
        createRelation.parent = parent_id

        const response = await relationRepo.save(createRelation);

        if (response) {
            res.status(200).json({
                status: true,
                code: 200,
                message: "Relationship created successfully"
            });
        } else {
            res.status(400).json({
                status: false,
                code: 400,
                message: "Failed To Create Relationship"
            });
        }

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default route;
