// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User";
import connectDb from "../../utils/db";
import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import jwt from "jsonwebtoken";
connectDb();

const validate = (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;
  if (!name) return res.status(422).send("Name is empty");
  if (!email) return res.status(422).send("Email is empty");
  if (!password) return res.status(422).send("Password is empty");
  if (!passwordConfirm)
    return res.status(422).send("Password Confirmation is empty");

  if (!isEmail(email)) return res.status(422).send("Email is not valid");
  if (!isLength(password, { min: 6 }))
    return res.status(422).send("Password at least 6 characters long");
  if (passwordConfirm !== password)
    return res.status(422).send("Password and Confirmation is not the same");
};

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // 1. validate data
    validate(req, res);
    // 2. check if user existed already
    const userExisted = await User.findOne({ email });
    if (userExisted) {
      return res.status(422).send("Email already existed.");
    }
    // 3. if not hash the password
    const hash = await bcrypt.hash(password, 10);
    // 4. save the user with hashed password
    const newUser = new User({
      name,
      email,
      password: hash,
    });
    await newUser.save();
    // 5. sign the saved user id with jwt token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 6. send back jwt token
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error signing up user. Please try again later");
  }
};
