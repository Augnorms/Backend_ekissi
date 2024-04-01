import databaseConnection from "../../datasource/datasource";
import express, { Request, Response } from "express";
import { AccessLevel } from "../../entities/accesslevel";

const route = express.Router()

route.post("/", async(req:Request, res:Response)=>{

    try{

        const {
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

        const accessleveRepo = databaseConnection.getRepository(AccessLevel);

        const uniqueaccesslevel = await accessleveRepo.findOne({where:{accesslevelname:accesslevelname}});
        
        if(uniqueaccesslevel){
            res.status(404).json({
                code:404,
                status:false,
                message:"Access Level Aready Exist"
            });
        }else{

         let createMember = new AccessLevel()

        createMember.accesslevelname = accesslevelname;
        createMember.accessleveldescription = accessleveldescription;
        createMember.AccesslevelView = AccesslevelView;
        createMember.AccesslevelManage = AccesslevelManage;
        createMember.UserverificationView = UserverificationView;
        createMember.UserverificationManage = UserverificationManage;
        createMember.AddmembersView = AddmembersView;
        createMember.AddmembersManage = AddmembersManage;
        createMember.ManageaboutView = ManageaboutView;
        createMember.ManageaboutViewManage = ManageaboutViewManage;
        createMember.ManagegalleryView =  ManagegalleryView;
        createMember.ManagegalleryManage = ManagegalleryManage;
        createMember.ManageaccountView = ManageaccountView;
        createMember.ManageaccountManage = ManageaccountManage;
        createMember.ManagebioView = ManagebioView;
        createMember.ManagebioManage = ManagebioManage;
        createMember.users = users;

        let response = await accessleveRepo.save(createMember);

        if(response){
            res.status(200).json({
                code:200,
                status:true,
                message:"access level created successfully",
                data:response
            });
        }
    }

    }catch(error){
      console.error("Error updating member:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

});

module.exports = route;