import databaseConnection from "../../datasource/datasource";
import express, { Request, Response } from "express";
import { Verification } from "../../entities/verification";

const route = express.Router();

route.get("/", async (req: Request, res: Response) => {
  try {
    const verificationRoute = databaseConnection.getRepository(Verification);

    const response = await verificationRoute.find({
          order:{
            id:"DESC"
          }
        });

    if (!response) {
      res.status(400).json({
        code: 400,
        status: false,
        data: [],
      });
    }else{
       res.status(200).json({
        code: 200,
        status: true,
        data: response,
      }); 
    }
  } catch (err: any) {
    res.status(500).json({
      code: 500,
      message: "Sorry network challenges try again",
    });
  }
});

module.exports = route;
