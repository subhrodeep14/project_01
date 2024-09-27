const {Router}=require("express");
const{userModel}=require("../db")
const userRouter=Router();
const z=require("zod");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const JWT_USER_PASSWORD="BDEIUOF";




userRouter.post("/signup",async function(req,res){
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

    await userModel.create({
        email:email,
        password:hashPassword,
        firstName:firstName,
        lastName:lastName
    });

    res.json({
        message:"you are sign up"
    });

});

userRouter.post("/signin",async function(req,res){
    const {email,password}=req.body;

    const user=await userModel.findOne({
        email,
        password
    });
    if(user){
       const token=jwt.sign({
        id:user._id
       },JWT_USER_PASSWORD)
    
    res.json({
        token:token
    })
    }else{
        res.status(403).json({
            message:"incorect"
        })
    }
});

userRouter.get("/purchases",function(req,res){

});

module.exports={
    userRouter:userRouter
}