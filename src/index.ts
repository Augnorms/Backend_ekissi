// Instead of import statements
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import databaseConnection from "./datasource/datasource"; 


//initialize router here
import createMember from "./routes/familyMembersRoute/memberInfo.routes";
import fetchallMembers from "./routes/familyMembersRoute/getallmembers.routes";
import fetchmemberbyId from "./routes/familyMembersRoute/getmemberById.routes";
import login from "./routes/memberLoginRoute/loginroute.routes";
import updateMember from "./routes/familyMembersRoute/updatemembers.routes";
import deletemember from "./routes/familyMembersRoute/deletemembers.routes";
import createAccesslevel from "./routes/accessLevelRoute/createAccessLevel.routes";
import getallaccessLevel from "./routes/accessLevelRoute/getallaccessLevel.routes";
import getUsersaccessLevel from "./routes/accessLevelRoute/getusersAccessLevel.routes";
import updateAccessLevel from "./routes/accessLevelRoute/updateAccessLevel.routes";
import deleteAccessLevel from "./routes/accessLevelRoute/deleteaccesslevel.routes";
import createaboutpagecontenet from "./routes/aboutpageRoute/createabout.routes";
import updatedaboutpagecontent from "./routes/aboutpageRoute/updateabout.routes";
import getaboutcontent from "./routes/aboutpageRoute/getaboutcontent.routes";
import creategallery from "./routes/gallerypageRoute/creategallery.routes";
import getallgallery from "./routes/gallerypageRoute/getallgallery.routes";
import updategallery from "./routes/gallerypageRoute/updategallery.routes";
import deletegallery from "./routes/gallerypageRoute/deletegallery.routes";
import creatememberprofileimage from "./routes/familyMembersRoute/createprofileimage.routes";
import updatememberprofileimage from "./routes/familyMembersRoute/updateprofileimage.routes";
import fetchmemberprofileimage from "./routes/familyMembersRoute/fetchprofileimagebyid.routes";
import fetchallimages from "./routes/familyMembersRoute/fetchallprofileimages.routes";
import createaccount from "./routes/accountpageRoutie/createaccount.routes";
import updateaccount from "./routes/accountpageRoutie/updateaccount.routes";
import getallaccounts from "./routes/accountpageRoutie/getallaccounts.routes";
import createrelation from "./routes/relationshipRoute/createrelationship.routes";
import getallrelation from "./routes/relationshipRoute/fetchallrelationship.routes";
import verifiemail from "./routes/memberLoginRoute/emailverification.routes";
import checkverificationcodes from "./routes/memberLoginRoute/verificodes.routes";
import resetpassword from "./routes/memberLoginRoute/resetpassword.routes";
import getallverification from "./routes/memberLoginRoute/fetchallverification.routes";
import allmemberscount from "./routes/familySummaryRoute/allfamilyCount.routes";
import femalecount from "./routes/familySummaryRoute/femalecount.routes";
import malecount from "./routes/familySummaryRoute/malecount.routes";
import allverification from "./routes/verificationRoute/verification.routes";


dotenv.config();
const app = express()
app.use(express.json());
app.use(cors());//used to configure which origin needs to access a resources from this server.
const port = process.env.PORT_NUMBER || 8080;

//database connection
databaseConnection.initialize().then(()=>{
    console.log('database connection established');
}).catch((err: Error)=>{
   console.log('failed to connect to database ' +err);
});

  
//accessing the routes here
app.use("/createmember", createMember);
app.use("/fetchallmembers", fetchallMembers);
app.use("/getmemberbyid", fetchmemberbyId);
app.use("/login", login);
app.use("/updatemembers", updateMember);
app.use("/deletemember", deletemember);
app.use("/createaccesslevel", createAccesslevel);
app.use("/getallaccesslevel", getallaccessLevel);
app.use("/getusersaccesslevel", getUsersaccessLevel);
app.use("/updateaccesslevel", updateAccessLevel);
app.use("/deletaccesslevel", deleteAccessLevel);
app.use("/createaboutcontent", createaboutpagecontenet);
app.use("/updatedaboutpagecontent", updatedaboutpagecontent)
app.use("/getaboutcontent", getaboutcontent);
app.use("/creategallery", creategallery);
app.use("/getallgallery", getallgallery);
app.use("/updategallery", updategallery);
app.use("/deletegallery", deletegallery);
app.use("/createprofileimage", creatememberprofileimage);
app.use("/updateprofileimage", updatememberprofileimage);
app.use("/fetchmemberprofileimage", fetchmemberprofileimage);
app.use("/fetchallimages", fetchallimages);
app.use("/createaccount", createaccount);
app.use("/updateaccount", updateaccount);
app.use("/getallaccounts", getallaccounts);
app.use("/createrelation", createrelation);
app.use("/getallrelation", getallrelation);
app.use("/verifiemail", verifiemail);
app.use("/checkverificationcodes", checkverificationcodes);
app.use("/resetpassword", resetpassword);
app.use("/getallverification", getallverification);
app.use("/allmemberscount", allmemberscount);
app.use("/femalecount", femalecount);
app.use("/malecount", malecount);
app.use("/allverification", allverification);

app.listen(port, ()=>{
 console.log(`Server running on port ${port}`);
})
