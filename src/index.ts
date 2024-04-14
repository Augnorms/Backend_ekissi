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
const createaboutpagecontenet = require("./routes/aboutpageRoute/createabout.Routes");
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

app.listen(port, ()=>{
 console.log(`Server running on port ${port}`);
})
