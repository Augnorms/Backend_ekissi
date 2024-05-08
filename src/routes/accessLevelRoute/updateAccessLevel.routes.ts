import databaseConnection from "../../datasource/datasource";
import express, { Request, Response } from "express";
import { AccessLevel } from "../../entities/accesslevel";

const route = express.Router();

route.put("/", async(req:Request, res:Response)=>{

 try{
        const {
            update_id,
            accesslevelname,
            accessleveldescription,
            AccesslevelView,
            AccesslevelManage,
            UserverificationView,
            UserverificationManage,
            AddmembersView,
            AddmembersManage,
            ManageaboutView,
            ManageaboutViewManage,
            ManagegalleryView,
            ManagegalleryManage,
            ManageaccountView,
            ManageaccountManage,
            ManagebioView,
            ManagebioManage,
            users
        } = req.body;

         const accessLevelRepo = databaseConnection.getRepository(AccessLevel);

         let accesslevelUpdate = await accessLevelRepo.findOne({where:{id:update_id}});

          if (!accesslevelUpdate) {
            return res.status(404).json({ message: "Member not found" });
          }

          accesslevelUpdate.accesslevelname = accesslevelname;
          accesslevelUpdate.accessleveldescription = accessleveldescription;
          accesslevelUpdate.AccesslevelView = AccesslevelView;
          accesslevelUpdate.AccesslevelManage = AccesslevelManage;
          accesslevelUpdate.UserverificationView = UserverificationView;
          accesslevelUpdate.UserverificationManage = UserverificationManage;
          accesslevelUpdate.AddmembersView = AddmembersView;
          accesslevelUpdate.AddmembersManage = AddmembersManage;
          accesslevelUpdate.ManageaboutView = ManageaboutView;
          accesslevelUpdate.ManageaboutViewManage = ManageaboutViewManage;
          accesslevelUpdate.ManagegalleryView = ManagegalleryView;
          accesslevelUpdate.ManagegalleryManage = ManagegalleryManage;
          accesslevelUpdate.ManageaccountView = ManageaccountView;
          accesslevelUpdate.ManageaccountManage = ManageaccountManage;
          accesslevelUpdate.ManagebioView = ManagebioView;
          accesslevelUpdate.ManagebioManage = ManagebioManage;
          accesslevelUpdate.users = users;

          await accessLevelRepo.save(accesslevelUpdate);

          return res.status(200).json({ 
            code:200,
            message: "Accesslevel updated successfully", 
            member: accesslevelUpdate 
        });


 }catch(error){
    console.error("Error updating member:", error);
    return res.status(500).json({ message: "Internal server error" });
 }

});

export default route;