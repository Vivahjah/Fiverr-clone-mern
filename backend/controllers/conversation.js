import { StatusCodes } from "http-status-codes";
import Conversation from "../models/conversation.js";
import { NotFoundError } from "../errors/index.js";

const createConversation = async (req, res) => {
  const newConversation = new Conversation({
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  });

  const savedConversation = await newConversation.save();
  res.status(StatusCodes.CREATED).json(savedConversation);
};

const updateConversation = async (req, res) => {
  const updatedConversation = await Conversation.findOneAndUpdate(
    { id: req.params.id },
    {
      $set: {
        // readBySeller: true,
        // readByBuyer: true,
        ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
      },
    },
    { new: true }
  );

  res.status(StatusCodes.OK).json(updatedConversation);
};

const getSingleConversation = async (req, res) => {
  const conversation = await Conversation.findOne({ id: req.params.id });
  if (!conversation) {
    throw new NotFoundError("Not found");
  }
  res.status(StatusCodes.OK).json(conversation);
};

const getConversations = async (req, res) => {
  const conversations = await Conversation.find(
    req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
  )
  .sort({ updatedAt: -1 });
  res.status(StatusCodes.OK).json(conversations);
};

export {
  getConversations,
  getSingleConversation,
  updateConversation,
  createConversation,
};
