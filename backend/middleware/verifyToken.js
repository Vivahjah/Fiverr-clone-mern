import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { AccessDeniedError, UnauthenticatedError } from "../errors/index.js";

export const verifyToken = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    throw new UnauthenticatedError("You are not authenticated");
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      throw new AccessDeniedError("Token invalid");
    }
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
  });
};
