import databaseConnection from "../../datasource/datasource";
import express, { Request, Response } from "express";
import { Members } from "../../entities/members";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Import jwt, not jwttoken
import axios from "axios";

const route = express.Router();


route.post("/", async (req: Request, res: Response) => {
    try {
        const { email, password, rememberMe } = req.body;

        const accesslevelroute = process.env.ACCESS_LEVEL_ENDPOINT;

        const profileimageEndpoint = process.env.PROFILE_IMAGE_ENDPOINT

        const membersRepo = databaseConnection.getRepository(Members);

        const user = await membersRepo.findOne({ where: { email: email } });

        if (!user) {
            return res.status(401).json({
                code: 401,
                status: false,
                message: "User not found",
            });

        }else if(user){

        let usersid = user?.id;
        let userslabel = `${user?.firstname} ${user?.lastname}`

        const accessResponse = await axios.post(String(accesslevelroute), {
            id:String(usersid),
            label:userslabel
        })

        const accessLevelData = accessResponse?.data?.data;

        const profileImageRes = await axios.post(String(profileimageEndpoint), {req_id:user.id});


        bcrypt.compare(password, user.password, (err, isPassword) => {
            if (err) {
                return res.status(500).json({
                    code: 500,
                    status: false,
                    message: "Error comparing passwords",
                });
            }

            if (isPassword) {
                const token = jwt.sign(
                    {
                        userid: user.id,
                        fullname: `${user.firstname} ${user.lastname}`,
                        email: user.email,
                        phonenumber: user.phonenumber,
                        dateofbirth: user.dateofbirth,
                        gender: user.gender,
                        nationality: user.nationality,
                        // accesslevel: accessLevelData ? {accessLevelData} : {},
                        image: profileImageRes?.data?.data ? profileImageRes?.data?.data : ""
                    },
                    "validate12345",
                    { expiresIn: rememberMe === 1 ? 3600 : 1800 }
                );

                res.status(200).json({
                    code: 200,
                    status: true,
                    message: "Login successful",
                    token: token
                });

            } else {
                res.status(400).json({
                    code: 400,
                    status: false,
                    message: "Failed to login",
                });
            }
        });
     }   

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            code: 500,
            status: false,
            message: "Sorry network issues, try again",
        });
    }
});

export default route;
