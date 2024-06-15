const Message = require('../models/Message')
const User = require('../models/User')
const getMessages = async(req,resp)=>{
    try{
              const messages = await Message.find({ chat: req.params.chatId })
                .populate("sender", "username profilePicture email")
                .populate("chat");

              resp.json({
                status:200,
                success:false,
                msg:messages                
              });
            }catch(err){
        console.log(err.msg);
        return resp.json({
            status:400,
            success:false,
            error:err.msg,
            message:"Problem while fetching messages of users"
        })
    }
}

const sendMessage = async (req, resp) => {
    const { content, chatId } = req.body;
  
    if (!content || !chatId) {
     return resp.json({
        msg:"Please give all the fields",
        success:false,
        status:400        
     })
    }

  
    const newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
  
    try {
      const message = await Message.create(newMessage);
  
      message = await message.populate("sender", "username profilePicture");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: "username profilePicture email",
      });
  
      await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
  
      resp.json(message);
    } catch (error) {
      resp.json({
        msg:"Problem while sending messages",
        error:err.msg,
        success:false,
        status:400
      })
    }
  }
  

module.exports = {getMessages,sendMessage}