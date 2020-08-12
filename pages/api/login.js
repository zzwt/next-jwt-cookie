// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User";
import connectDb from "../../utils/db";
import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import jwt from "jsonwebtoken";
connectDb();

const validate = (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(422).send("Email is empty");
  if (!password) return res.status(422).send("Password is empty");

  if (!isEmail(email)) return res.status(422).send("Email is not valid");
  if (!isLength(password, { min: 6 }))
    return res.status(422).send("Password at least 6 characters long");
};

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1. validate data
    validate(req, res);
    // 2. check if user existed already
    const userExisted = await User.findOne({ email }).select("+password");
    if (!userExisted) {
      return res.status(422).send("Email is not registered.");
    }
    // 3. if yes, check the password
    const match = await bcrypt.compare(password, userExisted.password);
    if (!match) {
      return res
        .status(422)
        .send("Email and password combination is not correct.");
    }
    // 4. sign the saved user id with jwt token
    const token = await jwt.sign(
      { userId: userExisted._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    // 5. send back jwt token
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error login user. Please try again later");
  }
};
