import express from "express";
import Review from "../models/review.js";
import Gig from "../models/gig.js";
import { AccessDeniedError, BadRequestError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const getReviews = async (req, res) => {
  const { id } = req.params;
  const review = await Review.find({ gigId : id });
  res.status(StatusCodes.OK).json(review);
};
const deleteReview = async (req, res) => {
  console.log("review");
};
const creatReview = async (req, res) => {
  const { userId } = req;
  const { gigId, desc, star } = req.body;
  if (req.isSeller) {
    throw new AccessDeniedError("Sellers can not create a review");
  }
  if (!gigId || !desc || !star) {
    throw new BadRequestError("fill all fields");
  }
  const review = await Review.findOne({ userId, gigId, desc, star });

  if (review) {
    throw new AccessDeniedError("You have already created a review");
  }
  const newReview = await Review({ userId, gigId, desc, star });
  const savedReview = await newReview.save();
  await Gig.findByIdAndUpdate(gigId, { $inc: { totalStars: star, stars: 1 } });
  res.status(StatusCodes.CREATED).json(savedReview);
};

export { creatReview, getReviews, deleteReview };
