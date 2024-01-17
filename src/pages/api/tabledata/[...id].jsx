import connectDB from '../../../lib/mongoose.jsx';
import moment from 'moment';
import TableData from "../../../model/Tabledata.js";

export default async function handler(
	req,
	res
) {
	const method = req.method
	const id = req.query.id
	let op ;
	if (id[0] === 'list' && method === 'GET') {
        op = "list";
      } else if (id[0] === 'create' && method === 'POST') {
        op = 'add';
      } else if (id[0] === 'update' && method === 'PUT') {
        op = 'update';
      } else if (id[0] === 'remove' && method === 'DELETE') {
        op = 'remove';
      } else if (id[0] === 'get_one' && method === 'GET') {
        op = 'get_one';
      }
	let jsonresult = {error_code: 1001, message: 'Invalid command', result: []}
	console.log('id, op, method', id, op, method);

	switch(op) {
		case 'list': jsonresult = await list(res); res.status(200).json(jsonresult); break;
		case 'add': jsonresult = await add(req.body); res.status(200).json(jsonresult); break;
		case 'update': jsonresult = await update(req.body); res.status(200).json(jsonresult); break;
		case 'remove': jsonresult = await remove(req.body.id); res.status(200).json(jsonresult); break;
		case 'get_one': jsonresult = await getOne(id[1]); res.status(200).json(jsonresult); break;
		default: res.status(404).json(jsonresult);
	}
}
async function list(res) {
	await connectDB();
	try {
		let data = await TableData.find({is_deleted: false});
		return {error_code: 0, message: 'Success', result: data};
	} catch (error) {
		console.error('Error fetching Tabledata:', error);
		res.status(500).json({ message: 'Internal Server Error' });
		return {error_code: 1002, message: 'DB Error', result: []};
	} 
}

async function add(jsondata) {
	await connectDB();
	const now_time = moment().unix();
	let new_table_data = {
	  time: jsondata.time,
	  location: {
		latitude: jsondata.latitude,
		longitude: jsondata.longitude,
	  },
	  alarm: jsondata.alarm,
	  is_active: true,
	  is_deleted: false,
	  created_at: now_time,
	  updated_at: now_time,
	};
  
	try {
	  const data = new TableData(new_table_data);
	  await data.save();
	  return { error_code: 0, message: 'add', result: data };
	} catch (e) {
	  console.log('ERROR:', e);
	  return { error_code: 1002, message: 'DB Error', result: [] };
	}
  }
  
//   async function update(jsondata) {
// 	await connectDB();
// 	console.log('id, jsondata', jsondata);
// 	const now_time = moment().unix();
// 	try {
// 	  let existing_table_data = await TableData.findById(jsondata.id);
  
// 	  existing_table_data.time = jsondata.time;
// 	  existing_table_data.location = {
// 		latitude: jsondata.latitude,
// 		longitude: jsondata.longitude,
// 	  };
// 	  existing_table_data.alarm = jsondata.alarm;
// 	  existing_table_data.is_active = jsondata.is_active;
// 	  existing_table_data.updated_at = now_time;
  
// 	  existing_table_data.save();
// 	  return {
// 		error_code: 0,
// 		message: 'updated successfully',
// 		result: [existing_table_data],
// 	  };
// 	} catch (error) {
// 	  console.error('Error updating table data:', error);
// 	  return { error_code: 1002, message: 'DB Error', result: [] };
// 	}
//   }
  
//   async function remove(id) {
// 	await connectDB();
// 	try {
// 	  let existing_table_data = await TableData.findById(id);
// 	  if (existing_table_data.is_deleted) return { message: 'The request you are making does not exist' };
// 	  if (existing_table_data.is_deleted !== true) existing_table_data.is_deleted = true;
// 	  existing_table_data.save();
// 	  return { error_code: 0, message: 'removed successfully' };
// 	} catch (error) {
// 	  console.error('Error fetching table data:', error);
// 	  return { error_code: 1002, message: 'DB Error', result: [] };
// 	}
//   }
  
//   async function getOne(id) {
// 	await connectDB();
// 	console.log(id);
// 	try {
// 	  let Tabledata = await TableData.findById(id);
// 	  console.log('id, Tabledata', id, Tabledata); // Log the id and Tabledata
// 	  return { error_code: 0, message: 'table data fetched successfully', result: Tabledata };
// 	} catch (error) {
// 	  console.error('Error fetching table data:', error);
// 	  return { error_code: 1002, message: 'DB Error', result: [] };
// 	}
//   }