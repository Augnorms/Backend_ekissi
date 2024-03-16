import "reflect-metadata";
import * as dotenv from "dotenv";
import express from 'express';
import databaseConnection from "./datasource/datasource";

//initialize router here
const createMember = require("./routes/familyMembersRoute/memberInfo.routes");

dotenv.config();
const app = express()
app.use(express.json());
const port = process.env.PORT_NUMBER

//database connection
databaseConnection.initialize().then(()=>{
    console.log('database connection established');
}).catch((err)=>{
   console.log('failed to connect to database' +err);
});
  
//accessing the routes here
app.use("/createmember", createMember);

app.listen(port, ()=>{
 console.log(`Server running on port ${port}`);
})
