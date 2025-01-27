import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date,  default: Date.now },
  updatedAt: {  type: Date, default: Date.now }
});

const News = mongoose.model("News",newsSchema)
export default News;