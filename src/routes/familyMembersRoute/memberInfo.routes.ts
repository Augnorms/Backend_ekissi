import databaseConnection from "../../datasource/datasource";
import express, { Request, Response } from "express";
import { Members } from "../../entities/members";
import bcrypt from 'bcrypt';
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";

const route = express.Router();

route.post("/", async(req:Request, res:Response)=>{
  try{  
    const {
        firstname,
        lastName,
        email,
        password,
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

    const hashpassword = await bcrypt.hash(password, 10);
    
    //connecting to database table
    let membersRepo = databaseConnection.getRepository(Members);

    // Check if member already exists
    let existingMember = await membersRepo.findOne({ where: { firstname: firstname, lastname: lastName } });

    if(existingMember){
      return res.status(401).json({
        code: 401,
        status: false,
        message: "Sorry Name already exist"
      });
    }

    let createMember = new Members();
    createMember.firstname = firstname;
    createMember.lastname = lastName;
    createMember.email = email;
    createMember.password = hashpassword;
    createMember.gender = gender;
    createMember.dateofbirth = dateofbirth;
    createMember.placeofbirth = placeofbirth;
    createMember.occupation = JSON.stringify(occupation);
    createMember.nationality = nationality;
    createMember.phonenumber = phonenumber;
    createMember.mothersname = mothersname;
    createMember.fathersname = fathersname;
    createMember.maritalstatus = maritalstatus;
    createMember.numberofchildren = numberofchildren;
    createMember.primaryeducation = primaryeducation;
    createMember.secondaryeducation = secondaryeducation;
    createMember.tertiaryeducation = tertiaryeducation;
    createMember.hometown = hometown;

    let response = await membersRepo.save(createMember);

    // Send success response immediately after member creation
    res.status(200).json({
      code: 200,
      message: "Member created successfully, email sending in progress",
      data: response
    });

    // Email sending process
    try {
      const mailtemplate = path.join(__dirname, "../../emailNotification.html");
      const templateContent = fs.readFileSync(mailtemplate,"utf-8");
      const emailContent = templateContent
        .replace("{{firstname}}", firstname)
        .replace("{{lastname}}", lastName)
        .replace("{{password}}", password);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "augustinenormanyo98@gmail.com",
          pass: "wiis zzwv uglo rbgo", 
        },
      });

      // Define email options
      const mailOptions = {
        from: "augustinenormanyo98@gmail.com",
        to: email,
        subject: "Account Creation Notification",
        html: emailContent,
      };

      await transporter.sendMail(mailOptions);
  
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
    }
    
  } catch (error) {
    console.error("Error creating member:", error);
    res.status(500).json({
      code: 500,
      status: false,
      message: "Failed to create member due to server error"
    });
  }
});

export default route;
