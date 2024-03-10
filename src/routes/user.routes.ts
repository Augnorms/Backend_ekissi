import databaseConnection from "../datasource/datasource";
import  express, {Response, Request}  from "express";
import { User } from "../entities/user";

const router = express.Router();

router.post("/",async(req:Request, res:Response)=>{
   const {firstName, lastName, age, role} = req.body;
   
   let userRepo = databaseConnection.getRepository(User);

   const creatUser = new User();
   creatUser.firstName = firstName;
   creatUser.lastName = lastName;
   creatUser.age = age;
   creatUser.role = role;

   let response = await userRepo.save(creatUser);

   if(response){
     res.status(200).json({
       code:200,
       message:"user created successfully",
       data:response
     })
   }else{
    res.status(401).json({
       code:401,
       message:"Failed to create user",
     })
   }
 
});

module.exports = router;