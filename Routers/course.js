const {Router}=require("express");
const{courseModel}=require("../db")

const courseRouter=Router();


courseRouter.post('/purchase',(req,res)=>{

});

courseRouter.get('/preview',(req,res)=>{

});

module.exports={
    courseRouter:courseRouter
}