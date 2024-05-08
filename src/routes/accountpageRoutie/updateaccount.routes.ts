import databaseConnection from "../../datasource/datasource";
import express, { Response, Request } from "express";
import { Account } from "../../entities/account";

const route = express.Router();

route.put("/", async(req:Request, res:Response)=>{
    try{

        const {updateid, date, amount} = req.body;

        const accountRepo = databaseConnection.getRepository(Account);

        const findUsersaccount = await accountRepo.findOne({where:{id:updateid}})
        
        console.log(findUsersaccount)

        if(!findUsersaccount){
            return res.status(404).json({
                code: 404,
                status: false,
                message: "account not found",
            });
        }

        findUsersaccount.amount = amount;
        findUsersaccount.date = date

        await accountRepo.save(findUsersaccount);

        res.status(200).json({
            code: 200,
            status: true,
            message: "account updated successfully",
            data: findUsersaccount
        });

    }catch(error){
     console.error("Error:", error);
     return res.status(500).json({ message: "Internal server error" });
    }
});

export default route;