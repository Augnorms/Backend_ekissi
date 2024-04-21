import databaseConnection from "../../datasource/datasource";
import express, { Request, Response } from "express";
import { Members } from "../../entities/members";
import bcrypt from 'bcrypt';

const route = express.Router();

route.put("/", async(req: Request, res: Response) => {
    try {
        const { user_id, password } = req.body;

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password in the database
        const memberRepo = databaseConnection.getRepository(Members);
        const user = await memberRepo.findOne({where:{id:user_id}});

        if (!user) {
            return res.status(404).json({ code: 404, message: "User not found" });
        }

        user.password = hashedPassword;
        await memberRepo.save(user);

        res.status(200).json({ code: 200, status:true, message: "Password updated successfully", data:user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, message: "Internal server error" });
    }
});

module.exports = route;
