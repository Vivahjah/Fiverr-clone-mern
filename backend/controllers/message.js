
import Message from "../models/message.js";
import Conversation from "../models/conversation.js";
import { StatusCodes } from "http-status-codes";

export const createMessage = async (req, res) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });

  const savedMessage = await newMessage.save();
  await Conversation.findOneAndUpdate(
    { id: req.body.conversationId },
    {
      $set: {
        readBySeller: req.isSeller,
        readByBuyer: !req.isSeller,
        lastMessage: req.body.desc,
      },
    },
    { new: true }
  );

  res.status(StatusCodes.OK).json(savedMessage);
};
export const getMessages = async (req, res) => {
  const messages = await Message.find({ conversationId: req.params.id });
  res.status(StatusCodes.OK).send(messages);
};
