import express from "express";
import Gig from "../models/gig.js";
import {
  AccessDeniedError,
  BadRequestError,
  NotFoundError,
} from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const createGig = async (req, res) => {
  if (!req.isSeller) {
    throw new AccessDeniedError("only sellers can create gig");
  }
  if (!req.body) {
    throw new BadRequestError("fill all fields");
  }
  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });
  const gig = await newGig.save();
  res.status(StatusCodes.CREATED).json(gig);
};

const getSingleGig = async (req, res) => {
  const gig = await Gig.findById(req.params.id);

  if (!gig) {
    throw new NotFoundError(`Gig not found with Id ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json(gig);
};

const getGigs = async (req, res) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
  res.status(StatusCodes.OK).json(gigs);
};

const deleteGig = async (req, res) => {
  const gig = await Gig.findById(req.params.id);
  if (!gig) {
    throw new NotFoundError(`Gig not found with Id ${req.params.id}`);
  }

  if (gig.userId !== req.userId) {
    throw new AccessDeniedError("You can only delete your gig");
  }
  await Gig.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json("Gig have been deleted");
};
export { createGig, getGigs, getSingleGig, deleteGig };
