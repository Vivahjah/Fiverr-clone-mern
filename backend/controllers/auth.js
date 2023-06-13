import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const register = async (req, res) => {
  if(!req.body){
    throw new BadRequestError("fill in all field")
  }

  const saltRounds = 10; // Number of rounds for salt generation
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);


  const newUser = new User({ ...req.body, password: hashedPassword });
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
  const TOKEN = jwt.sign(
    { id: user._id,  isSeller :user.isSeller },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  const { password, ...info } = user._doc;
  res.cookie("accessToken", TOKEN, {httpOnly : true}).status(StatusCodes.OK).json(info);
};
const logout = (req,res) => {
  res.clearCookie("accessToken", {
    sameSite : "none", secure : true
  }).status(StatusCodes.OK).send("User have been logged out")
};
export { login, register, logout };
