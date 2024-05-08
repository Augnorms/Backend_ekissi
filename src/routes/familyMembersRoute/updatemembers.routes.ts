import databaseConnection from "../../datasource/datasource";
import express, { Request, Response } from "express";
import { Members } from "../../entities/members";

const route = express.Router();

route.put("/",async(req:Request, res:Response)=>{

    try{

        const {
        updated_id,    
        firstname,
        lastName,
        email,
        gender,
        dateofbirth,
        placeofbirth,
        occupation,
        nationality,
        phonenumber,
        mothersname,
        fathersname,
        maritalstatus,
        numberofchildren,
        primaryeducation,
        secondaryeducation,
        tertiaryeducation,
        hometown
    } = req.body;

    let memberRepo = databaseConnection.getRepository(Members);

    let memberToUpdate =  await memberRepo.findOne({where:{id:updated_id}});

    if (!memberToUpdate) {
        return res.status(404).json({ message: "Member not found" });
    }

        memberToUpdate.firstname = firstname;
        memberToUpdate.lastname = lastName;
        memberToUpdate.email = email;
        memberToUpdate.gender = gender;
        memberToUpdate.dateofbirth = dateofbirth;
        memberToUpdate.placeofbirth = placeofbirth;
        memberToUpdate.occupation = JSON.stringify(occupation);
        memberToUpdate.nationality = nationality;
        memberToUpdate.phonenumber = phonenumber;
        memberToUpdate.mothersname = mothersname;
        memberToUpdate.fathersname = fathersname;
        memberToUpdate.maritalstatus = maritalstatus;
        memberToUpdate.numberofchildren = numberofchildren;
        memberToUpdate.primaryeducation = primaryeducation;
        memberToUpdate.secondaryeducation = secondaryeducation;
        memberToUpdate.tertiaryeducation = tertiaryeducation;
        memberToUpdate.hometown = hometown;

       // Save the updated member to the database
        await memberRepo.save(memberToUpdate);

        return res.status(200).json({ 
            code:200,
            message: "Member updated successfully", 
            member: memberToUpdate 
        });

    }catch(error){
      console.error("Error updating member:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

});

export default route;