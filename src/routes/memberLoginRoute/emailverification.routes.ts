import databaseConnection from "../../datasource/datasource";
import express, { Request, Response } from "express";
import { Verification } from "../../entities/verification";
import { Members } from "../../entities/members";
import nodemailer from "nodemailer";

const route = express.Router();

route.post("/", async(req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const memberRepo = databaseConnection.getRepository(Members);
    const verificationRepo = databaseConnection.getRepository(Verification);
     
    // Find the user by email
    const member = await memberRepo.findOne({ where: { email } });

    if (!member) {
      return res.status(404).json({ code: 404, message: "User not found" });
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 15); 

    // Save verification code to the database
    const verification = new Verification();
    verification.userId = member.id;
    verification.code = verificationCode;
    verification.expirationTime = expirationTime;
    await verificationRepo.save(verification);

    // Send verification email
    await sendVerificationEmail(email, member.firstname, verificationCode);

    res.status(200).json({ code: 201, message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, message: "Internal server error" });
  }
});

// Function to generate a random verification code
function generateVerificationCode(): string {
  return Math.random().toString(36).substring(2, 8); 
}

// Function to send verification email
async function sendVerificationEmail(email: string, firstname: string, verificationCode: string) {
    const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "augustinenormanyo98@gmail.com",
              pass: "wiis zzwv uglo rbgo", 
       },
    });


  const mailOptions = {
    from: "augustinenormanyo98@gmail.com",
    to: email,
    subject: "Email Verification",
    html: `
      <p>Hello ${firstname},</p>
      <p>Your verification code is: <strong>${verificationCode}</strong></p>
      <p>This code will expire in 15 minutes.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = route;
