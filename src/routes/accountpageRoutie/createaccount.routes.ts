import databaseConnection from "../../datasource/datasource";
import express, { Response, Request } from "express";
import { Members } from "../../entities/members"; 
import { Account } from "../../entities/account";

const route = express.Router();

route.post("/", async(req:Request, res:Response)=>{
   try{
    const {memberid, date, name, amount} = req.body;

    const accountRepo = databaseConnection.getRepository(Account);
    const memberRepo = databaseConnection.getRepository(Members);

    const member = await memberRepo.findOne({where:{id:memberid}})

    if(!member){
       res.status(404).json({
            code: 404,
            status: false,
            message: "Member not found",
       });
    }

    const createaccount = new Account();

    if(member){
        createaccount.date = date;
        createaccount.name = name;
        createaccount.amount = amount;
        createaccount.member = member;
    }

    const saveAccount = await accountRepo.save(createaccount);

     res.status(200).json({
            code: 200,
            status: true,
            message: "Created account successfully",
            data: saveAccount,
        });

   }catch(error){
     console.error("Error:", error);
     return res.status(500).json({ message: "Internal server error" });
   }
});

export default route;