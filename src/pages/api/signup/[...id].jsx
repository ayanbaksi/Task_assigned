import mongoose from 'mongoose';
import connectDB from '../../../lib/mongoose.jsx';
import Users from '../../../model/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';


export default async function handler(
	req,
	res
) {
	const method = req.method
	const id = req.query.id
	console.log(id)
	let jsonresult;
	let op = null
	if (method === 'GET' && id[0] === 'list') op = 'list';
	if (method === 'POST' && id[0] === 'regt') op = 'regt'
	switch (op) {
		case 'list': jsonresult = await list(); res.status(200).json(jsonresult, req.method); break;
		case 'regt': jsonresult = await signup(req.body); res.status(200).json(jsonresult); break;
		default: res.status(200).json(jsonresult)
	}
}

async function list() {
	await connectDB();
	try {
		const result = await Users.find({});
		return { message: 'success', result };
	} catch (e) {
		return { error: e.message };
	}
}
async function signup(jsondata, method) {
	await connectDB();
	let { username, email, password } = jsondata;

	try {
		const existingUser = await Users.findOne({ $or: [{ username }, { email }] });

		if (existingUser) {
			return { error: 'User already exists' };
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		password = hashedPassword;

		const newUser = new Users({
			username,
			email,
			password,
		});

		const result = await newUser.save();
		return { results: result, message: 'success' };
	} catch (error) {
		console.error('Error in registration:', error);
		return { error: 'error' };
	}
}

