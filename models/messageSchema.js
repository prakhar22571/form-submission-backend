import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: [3, "Title must contain at least 3 characters!"],
    maxLength: [50, "Title can contain at most 50 characters!"],
  },
  description: {
    type: String,
    required: true,
    minLength: [15, "Description must contain at least 15 characters!"],
  },
});

export const Message = mongoose.model("Message", messageSchema);
