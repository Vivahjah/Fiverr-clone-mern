import { UnauthenticatedError, NotFoundError } from "../errors/index.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new NotFoundError("User not Found");
  }

  if (req.userId !== user._id.toString()) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json("You can only delete your account");
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json("Account deleted sucessfully");
};

export { deleteUser };
