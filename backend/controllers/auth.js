import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  const hashPassword = bcrypt.hashSync(req.body.password, 5);
  const newUser = new User({ ...req.body, password: hashPassword });
  await newUser.save();

  res.status(StatusCodes.CREATED).json("New User Created");
};
const login = async (req, res) => {
  const { email } = req.body;
  if (!req.body.email || !req.body.password) {
    throw new BadRequestError("please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const doPasswordMatch = bcrypt.compareSync(req.body.password, user.password);
  if (!doPasswordMatch) {
    throw new UnauthenticatedError("Incorrect password or username");
  }

  const { password, ...info } = user._doc;
  res.status(StatusCodes.OK).json(info);
};
const logout = () => {};
export { login, register, logout };
