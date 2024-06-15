const Chat = require('../models/Chat');
const createGroupChat = async (req, resp) => {
   
    try{
        const {name,users} = req.body;
        if(!name || !users)
            return resp.json({
        status:400,
        success:false,
        message:"Please fill all the fields"
            })
        if(users.length<2)
            return resp.json({
                status:400,
                success:false,
                message:"Less than 2 users in a group is not allowed"
        })
        users.push(req.user.id);
        console.log(users);
        const groupChat = await Chat.create({
            chatName: name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user.id,
          });
          return resp.json({
            status:200,
            success:true,
            chat:groupChat
          })

    }catch(err){
        return resp.json({
            status:500,
            success:false,
            error:err.message,
            message:"Error while creating group"
        })
    }
};


//fetch all chats of a particular user
const fetchChats = async (req, resp) => {
    try {
        let results = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        console.log(results);
        return resp.json({
            status:200,
            success:false,
            chats:results,
            message:"Chats fETCHED SUCCESSFULLY"
        })
    
    } catch (error) {
      return resp.json({
        status:500,
        msg:"Error while ftching chats",
        success:false,
        error:err.msg
      })
    }
  };

 
  module.exports = {createGroupChat,fetchChats};