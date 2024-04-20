import databaseConnection from "../../datasource/datasource";
import express, { Request, Response } from "express";
import { Relationship } from "../../entities/relationship";
import { Members } from "../../entities/members";

interface Child {
  id: number;
  label:string
  // Include other child properties as needed
  children: Child[];
}

interface Parent {
  id: number;
  label:string
  // Include other parent properties as needed
  children: Child[];
}

const route = express.Router();

route.get("/", async (req: Request, res: Response) => {
  try {
    const relationRepo = databaseConnection.getRepository(Relationship);
    const membersRepo = databaseConnection.getRepository(Members);

    // Fetch all relationships
    const relationships = await relationRepo.find({ relations: ['parent', 'child'] });

    // Get unique member IDs involved in relationships
    const memberIds = new Set<number>();
    relationships.forEach(relationship => {
      memberIds.add(relationship.parent.id);
      memberIds.add(relationship.child.id);
    });

    // Fetch only members involved in relationships
    const members = await membersRepo.findByIds(Array.from(memberIds));

    // Initialize an empty hierarchy object
    const hierarchy: Parent[] = [];

    // Function to recursively build the hierarchy
    const buildHierarchy = (parentId: number | null): Parent => {
      const parent = members.find(member => member.id === parentId);

      if (!parent) throw new Error("Parent not found");

      const children: Child[] = relationships
        .filter(relationship => relationship.parent.id === parentId)
        .map(relationship => {
          const child = members.find(member => member.id === relationship.child.id);
          if (!child) throw new Error("Child not found");
          return {
            id: child.id,
            label: child.firstname+" "+child.lastname,
            // Include other child properties as needed
            children: buildHierarchy(child.id).children,
          };
        });

      return {
        id: parent.id,
        label: parent.firstname+" "+parent.lastname,
        children,
      };
    };

    // Build the hierarchy starting from root parents (parents without parents)
    const rootParents = members.filter(member => !relationships.some(relationship => relationship.child.id === member.id));
    rootParents.forEach(parent => {
      hierarchy.push(buildHierarchy(parent.id));
    });

    res.status(200).json({
      status: true,
      code: 200,
      message: "Hierarchy fetched successfully",
      data: hierarchy,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = route;
