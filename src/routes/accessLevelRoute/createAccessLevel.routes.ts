import express from "express";
import databaseConnection from "../../datasource/datasource";
import { AccessLevel } from "../../entities/accesslevel";

const route = express.Router();

route.post("/", async (req, res) => {
  try {
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
      users,
    } = req.body;

    const accessLevelRepo = databaseConnection.getRepository(AccessLevel);

    let existingAccesslevel  = await accessLevelRepo.findOne({where:{accesslevelname:accesslevelname}});

    if(existingAccesslevel){
      res.status(401).json({
        code:401,
        status:false,
        message:"Sorry access level already exist"
      })
      
    }else{
        let createAccesslevel = new AccessLevel();

        createAccesslevel.accesslevelname = accesslevelname;
        createAccesslevel.accessleveldescription = accessleveldescription;
        createAccesslevel.AccesslevelView = AccesslevelView;
        createAccesslevel.AccesslevelManage = AccesslevelManage;
        createAccesslevel.UserverificationView = UserverificationView;
        createAccesslevel.UserverificationManage = UserverificationManage;
        createAccesslevel.AddmembersView = AddmembersView;
        createAccesslevel.AddmembersManage = AddmembersManage;
        createAccesslevel.ManageaboutView = ManageaboutView;
        createAccesslevel.ManageaboutViewManage = ManageaboutViewManage;
        createAccesslevel.ManagegalleryView = ManagegalleryView;
        createAccesslevel.ManagegalleryManage = ManagegalleryManage;
        createAccesslevel.ManageaccountView = ManageaccountView;
        createAccesslevel.ManageaccountManage = ManageaccountManage;
        createAccesslevel.ManagebioView = ManagebioView;
        createAccesslevel.ManagebioManage = ManagebioManage;
        createAccesslevel.users = users;

        let response = await accessLevelRepo.save(createAccesslevel);

        if(response){
            res.status(200).json({
                code:200,
                message:"access level created successfully",
                data:response
            })
        }

    }
    
  } catch (error) {
    console.error("Error creating access level:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default route;
