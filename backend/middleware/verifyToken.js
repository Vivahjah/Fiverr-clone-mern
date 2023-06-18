import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { AccessDeniedError, UnauthenticatedError } from "../errors/index.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  
  if (!token) {
    throw new UnauthenticatedError("You are not authenticated");
  }


  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      req.userId = payload.id
      req.isSeller = payload.isSeller
    
      
    })
    next()
  } catch (err) {
    throw new AccessDeniedError("Authentication Failed")
  }
};
