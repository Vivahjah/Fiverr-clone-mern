import express from "express";
import Gig from "../models/gig.js";
import { AccessDeniedError, BadRequestError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";


const createGig = async (req, res) => {
  
if(!req.isSeller){
    throw new AccessDeniedError("only sellers can create gig")
}
if (!req.body) 
{
    throw new BadRequestError("fill all fields")
}
  const newGig =  new Gig({
    userId : req.userId, ...req.body
  })
  const gig = await newGig.save()
  res.status(StatusCodes.CREATED).json(gig)
};
const getSingleGig = async () => {
  console.log("gig");
};
const getGigs = async () => {
  console.log("gig");
};
const deleteGig = async () => {
  console.log("gig");
};
export { createGig, getGigs, getSingleGig, deleteGig };
