// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User";
import connectDb from "../../utils/db";

connectDb();

export default (req, res) => {
  res.status(400).json({});
};
