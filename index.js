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
    
    mongoose.connect("mongodb+srv://subhrodeep14:Babi12345@cluster0.8v36z.mongodb.net/project-01");
    app.listen(3000);
    console.log("cholche vai");
     
}

main();