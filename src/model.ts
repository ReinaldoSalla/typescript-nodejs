import mongoose from "mongoose";

const NegotiationSchema = new mongoose.Schema({
    date: Date,
    amount: Number,
    value: Number,
    description: String
});

export const NegotiationModel = mongoose.model("Negotiation", NegotiationSchema);