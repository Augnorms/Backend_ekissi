import databaseConnection from "../../datasource/datasource";
import express, { Response, Request } from "express";
import { Account } from "../../entities/account";

const route = express.Router();

route.get("/", async(req:Request, res:Response)=>{
    try{

       const accountRepo = databaseConnection.getRepository(Account);

       const getallaccounts =  await accountRepo.createQueryBuilder('account')
            .leftJoinAndSelect('account.member', 'member') // Join Account table and Member tables
            .select([
                'account.id', 
                'account.date',
                'account.name',
                'account.amount',
                'member.id',
                'member.firstname', 
                'member.lastname',
                'member.email'
            ])
            .orderBy('account.id', 'DESC')
            .getMany();

       if(!getallaccounts){
          res.status(400).json({
            code: 400,
            status: false,
            data:[]
          })
       }else{
        res.status(200).json({
            code: 200,
            status: true,
            data: getallaccounts
          })
       } 
        
    }catch(error){
     console.error("Error:", error);
     return res.status(500).json({ message: "Internal server error" });
    }
});

export default route;