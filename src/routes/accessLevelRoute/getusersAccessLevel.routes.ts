import databaseConnection from "../../datasource/datasource";
import express, { Request, Response } from "express";
import { AccessLevel } from "../../entities/accesslevel"; // Assuming this import is correct

const route = express.Router()

route.post("/", async(req: Request, res: Response) => {
    try {
        const { id, label } = req.body;

        // Retrieve the access level repository
        const accessLevelRepo = databaseConnection.getRepository(AccessLevel)

        let response = await accessLevelRepo.find();


        let mapRes = response?.find((level) => {
     
            let user = level.users.find((user:any) => {
                return user.id === String(id) && user.label === label;
            });

            return user;
        });

      

        if (mapRes) {
            // Extract only the necessary fields from mapRes
            const accessLevelData = {
                accesslevelname: mapRes.accesslevelname,
                accessleveldescription: mapRes.accessleveldescription,
                AccesslevelView: mapRes.AccesslevelView,
                AccesslevelManage: mapRes.AccesslevelManage,
                UserverificationView: mapRes.UserverificationView,
                UserverificationManage: mapRes.UserverificationManage,
                AddmembersView: mapRes.AddmembersView,
                AddmembersManage: mapRes.AddmembersManage,
                ManageaboutView: mapRes.ManageaboutView,
                ManageaboutViewManage: mapRes.ManageaboutViewManage,
                ManagegalleryView: mapRes.ManagegalleryView,
                ManagegalleryManage: mapRes.ManagegalleryManage,
                ManageaccountView: mapRes.ManageaccountView,
                ManageaccountManage: mapRes.ManageaccountManage,
                ManagebioView: mapRes.ManagebioView,
                ManagebioManage: mapRes.ManagebioManage
            };

            // Send only the access level data as a response
            return res.status(200).json({ 
                code: 200,
                status: true,
                data: accessLevelData
            });
            
        } else {
            // If the access level is not found, return appropriate message
            return res.status(404).json({ message: "Access level not found for the specified user." });
        }
       
    } catch(error){
        console.error("Error retrieving access level:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default route;
