import databaseConnection from "../../datasource/datasource";
import express, { Request, Response } from "express";
import { Members } from "../../entities/members";

const route = express.Router();

route.get("/", async (req: Request, res: Response) => {
  try {
    const membersRoute = databaseConnection.getRepository(Members);

    const response = await membersRoute.find({where:{gender:"Male"}});

    if (!response) {
      res.status(400).json({
        code: 400,
        status: false,
        count: 0,
      });
    }else{
       res.status(200).json({
        code: 200,
        status: true,
        count: response.length,
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
