const User = require('../models/User');

const getUser = async(req,resp)=>{
    try{
        const {searchParam} = req.body;
        const users = await User.find({
            $or: [
                { email: { $regex: new RegExp(searchParam, 'i') } },
                { username: { $regex: new RegExp(searchParam, 'i') } }
            ]
        });
        return resp.json({
            msg:"User data sent successfully",
            users:users,
            status:200,
            success:true            
        })
    }catch(err){
console.log(err);
        return resp.json({
            msg:"Error while fetching users",
            status:400,
            success:false    
        })
    }
}

const allUser = async(req,resp)=>{
    try{    
        const user = await User.find();
        return resp.json({
            msg:"All users fetched successfully",
            status:200,
            success:true,
            users:user
        })
    }catch(err){
        console.log(err);
        return resp.json({
            msg:"Problem while fetching all users",
            status:500,
            success:false,
            error:err.msg
        })
    }
}


module.exports = {getUser,allUser}