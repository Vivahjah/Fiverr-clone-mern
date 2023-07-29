import Order from "../models/orders.js";
import Gig from "../models/gig.js";
import { StatusCodes } from "http-status-codes";
// const https = require("https");
import https from "https";

const pay = async (req, res) => {
  const gig = await Gig.findById(req.params.id);

  const params = JSON.stringify({
    email: req.body.email,
    amount: gig.price * 100,
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  const clientReq = https
    .request(options, (apiRes) => {
      let data = "";

      apiRes.on("data", (chunk) => {
        data += chunk;
      });

      apiRes.on("end", async () => {
        // const reference = JSON.parse(data.data.reference) 
        const newOrder = new Order({
          gigId: gig._id,
          img: gig.cover,
          title: gig.title,
          buyerId: req.userId,
          sellerId: gig.userId,
          price: gig.price,
          // payment_reference: "aaa"
        });
        await newOrder.save();
        // console.log(reference);
        res.status(StatusCodes.OK).json(data);
      });
    })
    .on("error", (error) => {
      console.error(error);
    });

  clientReq.write(params);
  clientReq.end();
};

// const createOrder = async (req, res) => {
//   const gig = await Gig.findById(req.params.id);
//   const newOrder = new Order({
//     gigId: gig._id,
//     img: gig.cover,
//     title: gig.title,
//     buyerId: req.userId,
//     sellerId: gig.userId,
//     price: gig.price,
//     payment_intent: "xxxxxxx",
//   });

//   await newOrder.save();
//   res.status(StatusCodes.OK).json("successful");
// };

const getOrders = async (req, res) => {
  const orders = await Order.find({
    ...(req.seller ? { sellerId: req.userId } : { buyerId: req.userId }),
    isCompleted: true,
  });
  res.status(StatusCodes.OK).json(orders);
};

export { getOrders, pay };
