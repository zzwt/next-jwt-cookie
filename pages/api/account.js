// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User";
import connectDb from "../../utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDb();

export default async (req, res) => {
  try {
    // 1. get and check if token in header
    if (!("authorization" in req.headers))
      return res.status(401).send("No Authorization code.");
    // 2. verify jwt token to get user id
    const { userId } = await jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    // 3. find user by user id
    const user = await User.findOne({ _id: userId });
    // 4. send back user
    if (!user) res.status(404).send("User not found");
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Invalid Token. Please login again.");
  }
};
