require("dotenv").config()
console.log(process.env.MONGO_URL);


const express =require("express");
const mongoose=require("mongoose");
const app=express();
const {userRouter}=require("./Routers/user");
const {courseRouter}=require("./Routers/course");
const {adminRouter}=require("./Routers/admin");


app.use(express.json());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course",courseRouter);

async function main() {
    
    mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
    console.log("cholche vai");
     
}

main();