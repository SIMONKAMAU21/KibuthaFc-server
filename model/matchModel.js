import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
    opponent: {  type: String,  required: true },
    matchDate: { type: Date, required: true},
    location: { type: String, required: true },
    status: { type: String, enum: ['upcoming', 'completed'], default: 'upcoming'  },
    createdAt: { type: Date, default: Date.now },
    updatedAt: {type: Date, default: Date.now}
});

const Match = mongoose.model("Match",matchSchema)
export default Match;