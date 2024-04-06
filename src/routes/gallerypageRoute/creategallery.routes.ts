import databaseConnection from "../../datasource/datasource";
import express, { Request, Response } from "express";
import { Gallery } from "../../entities/gallery";

const route = express.Router();

route.post("/", async (req: Request, res: Response) => {
    try {
        const { filename, fileurl, original_file_name, resource_type } = req.body;

        const galleryRepo = databaseConnection.getRepository(Gallery);

        // Check if filename already exists
        const fetchUniquename = await galleryRepo.findOne({ where: { filename } });

        if (fetchUniquename) {
            return res.status(400).json({
                code: 400,
                status: false,
                message: "Filename already exists"
            });
        }

        // Create new gallery item
        const insertIntoGallery = new Gallery();
        insertIntoGallery.filename = filename;
        insertIntoGallery.fileurl = fileurl;
        insertIntoGallery.fileoriginalname = original_file_name;
        insertIntoGallery.resourcetype = resource_type;

        const response = await galleryRepo.save(insertIntoGallery);

        if (response) {
            return res.status(200).json({
                code: 200,
                status: true,
                message: "File created successfully"
            });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = route;
