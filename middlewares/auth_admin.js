
const jwt=require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD}=require("../config");


function authAdmin(req,res,next){
    const token =req.headers.token;

    const decoded=jwt.verify(token,JWT_ADMIN_PASSWORD);

    if(decoded){
        req.adminId=decoded.id;
        next()
    }else{
        res.status(403).json({
            message:"you are not sign in"
        })
    }
}

module.exports={
    authAdmin:authAdmin
}