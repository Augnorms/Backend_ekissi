import databaseConnection from "../../datasource/datasource";
import express, { Request, Response } from "express";
import { AccessLevel } from "../../entities/accesslevel";

const route = express.Router()

route.post("/", async(req: Request, res: Response) => {
    try {
        const { id, name } = req.body;

        const accessLevelRepo = databaseConnection.getRepository(AccessLevel);

        // Query the database to find access levels that include the specified user
        const accessLevel = await accessLevelRepo.createQueryBuilder("accessLevel")
            .where("JSON_CONTAINS(accessLevel.users, :user)", { user: JSON.stringify({ id, name }) })
            .getOne();

        // Check if access level was found
        if (!accessLevel) {
            return res.status(404).json({ message: "Access level not found for the specified user" });
        }
        
        let useraccessLevel = {
            AccesslevelView: accessLevel.AccesslevelView,
            AccesslevelManage: accessLevel.AccesslevelManage,
            UserverificationView: accessLevel.UserverificationView,
            UserverificationManage: accessLevel.UserverificationManage,
            AddmembersView: accessLevel.AddmembersView,
            AddmembersManage: accessLevel.AddmembersManage,
            ManageaboutView: accessLevel.ManageaboutView,
            ManageaboutViewManage: accessLevel.ManageaboutViewManage,
            ManagegalleryView: accessLevel.ManagegalleryView,
            ManagegalleryManage: accessLevel.ManagegalleryManage,
            ManageaccountView: accessLevel.ManageaccountView,
            ManageaccountManage: accessLevel.ManageaccountManage,
            ManagebioView: accessLevel.ManagebioView,
            ManagebioManage: accessLevel.ManagegalleryManage,
        }

        // Respond with the found access level object
        return res.status(200).json({ code: 200, status: true, message: "Access level found", data: useraccessLevel });
        
    } catch(error){
        console.error("Error retrieving access level:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = route;
