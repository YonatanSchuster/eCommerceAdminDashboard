import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';
import { getServerSession } from 'next-auth';
import { authOption, isAdminRequest } from './auth/[...nextauth]';

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  await isAdminRequest(req, res);

  if (method === 'POST') {
    const { name, parentCategory, properties } = req.body;
    const categoryDoc = await Category.create({
      name,
      parent: parentCategory || undefined,
      properties,
    });
    res.json(categoryDoc);
  }

  if (method === 'GET') {
    res.json(await Category.find().populate('parent'));
  }

  if (method === 'PUT') {
    const { name, parentCategory, properties, _id } = req.body;
    const categoryDoc = await Category.updateOne(
      //the first obj is, we want to specify an obj of what do we want to update/ (will define how we can find this document insde our db)
      //and then the obj of the data we want to update with/ (will be the new data for this obj )
      { _id },
      { name, parent: parentCategory || undefined, properties }
    );
    res.json(categoryDoc);
  }

  if (method === 'DELETE') {
    const { _id } = req.query;
    await Category.deleteOne({ _id });
    res.json('ok');
  }
}
