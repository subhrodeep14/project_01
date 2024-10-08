const {Router}=require("express");
const{adminModel,courseModel}=require("../db");
const adminRouter=Router();
const z=require("zod");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const {JWT_ADMIN_PASSWORD}=require("../config");
const {authAdmin}=require("../middlewares/auth_admin");


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
    console.log("created");
    
    res.json({
        message:"you are sign up"
    });
}catch(e){
        res.status(500).json({
            message:"something went wrong"
        })
    }
});

adminRouter.post("/signin",async(req,res)=>{
    const {email,password}=req.body;

    const admin=await adminModel.findOne({
        email
    });
    console.log(admin.password);
    
    const response=bcrypt.compare(password,admin.password);
    if(response){
       const token=jwt.sign({
        id:response._id
       },JWT_ADMIN_PASSWORD)
    
    res.json({
        token:token
    })
    }else{
        res.status(403).json({
            message:"incorect"
        })
    }
});

adminRouter.post("/course",authAdmin,async(req,res)=>{
    const adminId=req.adminId;

    const{ title, description,price,imageUrl, createrId}=req.body;

    const course= await courseModel.create({
        title,
        description,
        price,
        imageUrl,
        createrId:adminId
    });

    res.json({
        message: "Course created",
        courseId: course._id
    })
});



adminRouter.put("/course",authAdmin,async(req,res)=>{
    const adminId=req.adminId;

    const{ title, description,price,imageUrl, courseId}=req.body;

    const course= await courseModel.updateOne({
        _id:courseId,
        createrId:adminId
    },{
        title,
        description,
        price,
        imageUrl
    });

    res.json({
        message: "Course updated",
        courseId: course._id
    })
});


adminRouter.get("/course/bulk",authAdmin,async(req,res)=>{
    const adminId=req.adminId;


    const course= await courseModel.find({
        createrId:adminId
    });
    res.json({
        message:"your all courses",
        course
    })

});

module.exports={
adminRouter:adminRouter
}