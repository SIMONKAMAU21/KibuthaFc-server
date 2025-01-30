import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {  type: String, required: true, unique: true },
  name: { type: String, required: true },
  photo: { type: String },
  password: { type: String, required: true  },
  phone: { type: String },
  role: {type: String,  enum: ['admin', 'prayer', 'fun'], required: true },
  createdAt: {type: Date,default: Date.now}
});

const User = mongoose.model("User",userSchema)
export default User;