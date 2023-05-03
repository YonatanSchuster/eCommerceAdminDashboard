import {mongooseConnect} from "@/lib/mongoose";
import {Order} from "@/models/Order";

export default async function handler(req,res) {
  await mongooseConnect();

  if (method === 'GET') {
    if (req.query) {
        res.json(await Order.find().sort({createdAt:-1}));
    } else {
      res.json(await Product.find());
    }
  }
}