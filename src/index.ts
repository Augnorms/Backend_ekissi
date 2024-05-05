import "reflect-metadata";
import * as dotenv from "dotenv";
import express from 'express';
import databaseConnection from "./datasource/datasource";
import cors from "cors";

//initialize router here
const createMember = require("./routes/familyMembersRoute/memberInfo.routes");
const fetchallMembers = require("./routes/familyMembersRoute/getallmembers.routes");
const fetchmemberbyId = require("./routes/familyMembersRoute/getmemberById.routes");
const login = require("./routes/memberLoginRoute/loginroute.routes");
const updateMember = require("./routes/familyMembersRoute/updatemembers.routes");
const deletemember = require("./routes/familyMembersRoute/deletemembers.routes");
const createAccesslevel = require("./routes/accessLevelRoute/createAccessLevel.routes");
const getallaccessLevel = require("./routes/accessLevelRoute/getallaccessLevel.routes");
const getUsersaccessLevel = require("./routes/accessLevelRoute/getusersAccessLevel.routes");
const updateAccessLevel = require("./routes/accessLevelRoute/updateAccessLevel.routes");
const deleteAccessLevel = require("./routes/accessLevelRoute/deleteaccesslevel.routes");
const createaboutpagecontenet = require("./routes/aboutpageRoute/createabout.routes");
const updatedaboutpagecontent = require("./routes/aboutpageRoute/updateabout.routes");
const getaboutcontent = require("./routes/aboutpageRoute/getaboutcontent.routes");
const creategallery = require("./routes/gallerypageRoute/creategallery.routes");
const getallgallery = require("./routes/gallerypageRoute/getallgallery.routes");
const updategallery = require("./routes/gallerypageRoute/updategallery.routes");
const deletegallery = require("./routes/gallerypageRoute/deletegallery.routes");
const creatememberprofileimage = require("./routes/familyMembersRoute/createprofileimage.routes");
const updatememberprofileimage = require("./routes/familyMembersRoute/updateprofileimage.routes");
const fetchmemberprofileimage = require("./routes/familyMembersRoute/fetchprofileimagebyid.routes");
const fetchallimages = require("./routes/familyMembersRoute/fetchallprofileimages.routes");
const createaccount = require("./routes/accountpageRoutie/createaccount.routes");
const updateaccount = require("./routes/accountpageRoutie/updateaccount.routes");
const getallaccounts = require("./routes/accountpageRoutie/getallaccounts.routes");
const createrelation = require("./routes/relationshipRoute/createrelationship.routes");
const getallrelation = require("./routes/relationshipRoute/fetchallrelationship.routes");
const verifiemail = require("./routes/memberLoginRoute/emailverification.routes");
const checkverificationcodes = require("./routes/memberLoginRoute/verificodes.routes");
const resetpassword = require("./routes/memberLoginRoute/resetpassword.routes");
const getallverification = require("./routes/memberLoginRoute/fetchallverification.routes");
const allmemberscount = require("./routes/familySummaryRoute/allfamilyCount.routes");
const femalecount = require("./routes/familySummaryRoute/femalecount.routes");
const malecount = require("./routes/familySummaryRoute/malecount.routes");
const allverification = require("./routes/verificationRoute/verification.routes");


dotenv.config();
const app = express()
app.use(express.json());
app.use(cors());//used to configure which origin needs to access a resources from this server.
const port = process.env.PORT_NUMBER

//database connection
databaseConnection.initialize().then(()=>{
    console.log('database connection established');
}).catch((err)=>{
   console.log('failed to connect to database' +err);
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
