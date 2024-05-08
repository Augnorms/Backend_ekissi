import databaseConnection from "../../datasource/datasource";
import express, { Request, Response } from "express";
import { Verification } from "../../entities/verification";
import { Members } from "../../entities/members";

const route = express.Router();

route.post("/", async(req: Request, res: Response) => {
    try {
        const { verification_code } = req.body;

        const verificationRepo = databaseConnection.getRepository(Verification);

        // Find the verification record by code
        const verification = await verificationRepo.findOne({ where: { code: verification_code } });

        if (!verification) {
            return res.status(404).json({ code: 404, message: "Verification code not found" });
        }

        // Check if the verification code has expired
        if (new Date() > verification.expirationTime) {
            return res.status(400).json({ code: 400, message: "Verification code has expired" });
        }

        // Find the user associated with the verification code
        const memberRepo = databaseConnection.getRepository(Members);
        const member = await memberRepo.findOne({ where: { id: verification.userId } });

        if (!member) {
            return res.status(404).json({ code: 404, message: "User not found" });
        }

        // You can perform additional actions here if needed, such as updating the user's verification status

        res.status(200).json({ code: 200, status:true, message: "Verification code is valid", user:member.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, message: "Internal server error" });
    }
});

export default route;