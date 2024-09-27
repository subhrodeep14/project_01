const {Router}=require("express");
const{adminModel}=require("../db");
const adminRouter=Router();
const z=require("zod");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");


adminRouter.post("/signup",async(req,res)=>{

    const requireBody=z.object({
        email:z.string().max(30).min(5),
        firstName:z.string().max(20).min(1),
        password:z.string().max(20).min(5),
        lastName:z.string().max(20).min(1),
    });

    const parseDataWithSuccess=requireBody.safeParse(req.body);

    if(!parseDataWithSuccess.success){
        res.json({
            message:"incorrect format"
        });
        return
    }

    const {email,password,firstName,lastName}= req.body;
    const hashPassword=await bcrypt.hash(password,5);

try{
    await adminModel.create({
        email:email,
        password:hashPassword,
        firstName:firstName,
        lastName:lastName
    });

    res,json({
        message:"you are sign up"
    });
}catch(e){
        res.status(500).json({
            message:"something went wrong"
        })
    }
});

adminRouter.post("/signin",(req,res)=>{

});

adminRouter.post("/course",(req,res)=>{

});

adminRouter.get("/course/bulk",(req,res)=>{

});

module.exports={
adminRouter:adminRouter
}