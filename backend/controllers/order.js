import Order from "../models/orders.js";
import Gig from "../models/gig.js";
import { StatusCodes } from "http-status-codes";

const createOrder = async (req, res) => {
  const gig = await Gig.findById(req.params.id);
  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: "xxxxxxx",
  });

  await newOrder.save();
  res.status(StatusCodes.OK).json("successful");
};

const getOrders = async (req, res) => {
  const orders = await Order.find({
    ...(req.seller ? { sellerId: req.userId } : { buyerId: req.userId }),
    isCompleted: true,
  });
  res.status(StatusCodes.OK).json(orders);
};

export { createOrder, getOrders };
