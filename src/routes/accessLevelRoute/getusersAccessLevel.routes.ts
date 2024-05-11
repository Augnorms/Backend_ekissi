import { Request, Response, Router } from "express";
import databaseConnection from "../../datasource/datasource";
import { AccessLevel } from "../../entities/accesslevel";

const route = Router();

// Function to extract necessary fields from an access level object
const extractAccessLevelData = (level: AccessLevel) => ({
    accesslevelname: level.accesslevelname,
    accessleveldescription: level.accessleveldescription,
    AccesslevelView: level.AccesslevelView,
    AccesslevelManage: level.AccesslevelManage,
    UserverificationView: level.UserverificationView,
    UserverificationManage: level.UserverificationManage,
    AddmembersView: level.AddmembersView,
    AddmembersManage: level.AddmembersManage,
    ManageaboutView: level.ManageaboutView,
    ManageaboutViewManage: level.ManageaboutViewManage,
    ManagegalleryView: level.ManagegalleryView,
    ManagegalleryManage: level.ManagegalleryManage,
    ManageaccountView: level.ManageaccountView,
    ManageaccountManage: level.ManageaccountManage,
    ManagebioView: level.ManagebioView,
    ManagebioManage: level.ManagebioManage
});

// Function to check if a user has a specific access level
const hasAccessLevel = (level: AccessLevel, id: number, label: string) => {
    return level.users.some(user => user.id === id && user.name === label.trim());
};

route.post("/", async (req: Request, res: Response) => {
    try {
        const { id, label } = req.body;

        // Retrieve the access level repository
        const accessLevelRepo = databaseConnection.getRepository(AccessLevel);

        // Fetch all access levels
        const allAccessLevels = await accessLevelRepo.find();

        // Find the access level that matches the specified user
        const userAccessLevel = allAccessLevels.find(level => hasAccessLevel(level, id, label));

        if (userAccessLevel) {
            // Extract necessary fields from the access level
            const accessLevelData = extractAccessLevelData(userAccessLevel);

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
    } catch (error) {
        console.error("Error retrieving access level:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default route;
