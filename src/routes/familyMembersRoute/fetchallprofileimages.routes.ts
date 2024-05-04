import databaseConnection from "../../datasource/datasource";
import express, { Request, Response } from "express";
import { Profileimage } from "../../entities/profileimage";

const route = express.Router();

route.get("/", async (req: Request, res: Response) => {
    try {
        const profileRepo = databaseConnection.getRepository(Profileimage);

        // Use TypeORM query builder to join the Profileimage entity with the Members entity
        const findAllProfImages = await profileRepo.createQueryBuilder("profileimage")
            .leftJoinAndSelect("profileimage.member", "member")
            .orderBy("profileimage.id", "DESC")
            .getMany();

        if (!findAllProfImages) {
            res.status(400).json({
                code: 400,
                status: false,
                message: "Failed to fetch users images"
            });
        } else {
            res.status(200).json({
                code: 200,
                status: true,
                message: "images fetched successfully",
                data: findAllProfImages
            });
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Sorry network challenges try again " + error
        });
    }
});

module.exports = route;
