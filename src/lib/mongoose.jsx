import mongoose from 'mongoose';
//import mongodbConnectionString from '../../config'
const MONGODB_URI = 'mongodb://127.0.0.1:27017/task'; // Replace with your MongoDB URI

const connectDB = async () => {
  try {
    // console.log("mongo==========>", mongodbConnectionString.DB_URL)
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
  }
};

export default connectDB;
