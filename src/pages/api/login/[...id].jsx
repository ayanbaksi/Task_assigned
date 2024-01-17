import mongoose from 'mongoose';
import connectDB from '../../../lib/mongoose.jsx';
import Users from '../../../model/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export default async function handler(req, res) {
  const method = req.method;
  const id = req.query.id;
  let jsonresult;
  let op = null;

  if (method === 'POST' && id[0] === 'checkuser') op = 'checkuser';

  switch (op) {
    case 'checkuser':
      jsonresult = await checkuser(req.body);
      res.status(200).json(jsonresult, req.method);
      break;
    default:
      res.status(200).json(jsonresult);
  }
}

async function checkuser(jsondata) {
  const { email, password } = jsondata;

  await connectDB();

  try {
    const user = await Users.findOne({ email });

    if (user) {
      const logged_in = await bcrypt.compare(password, user.password);
      if (logged_in) {
        const token = jwt.sign({ username: user.username }, process.env.NEXT_PUBLIC_TOKEN_SECRET_KEY, { expiresIn: '1h' });
        console.log(token);
        return { message: 'Successfully logged in', is_logged_in: true, token: token };
      } else {
        return { message: 'Incorrect password', is_logged_in: false };
      }
    } else {
      return { message: 'User not found', is_logged_in: false };
    }
  } catch (e) {
    return { error: e.message };
  }
}