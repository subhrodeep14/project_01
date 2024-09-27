const jwt=require("jsonwebtoken");
const {JWT_USER_PASSWORD}=require("../config");

function authUser(req,res,next){
    const token =req.heders.token;

    const decoded=jwt.verify(token,JWT_USER_PASSWORD);

    if(decoded){
        req.userId=decoded.id;
        next()
    }else{
        res.status(403).json({
            message:"you are not sign in"
        })
    }
}

module.exports={
    authUser:authUser
}