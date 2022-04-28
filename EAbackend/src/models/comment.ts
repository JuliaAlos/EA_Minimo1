import mongoose, { Document } from "mongoose";
import Dates from "./dates.js";
import { User } from "./user.js";

const Schema = mongoose.Schema;
const model = mongoose.model;

export interface Comment extends Document, Dates {
  user: User;
  message: String;
  edited: Boolean;
  likes: Number;
  date: Date;
}

const commentSchema = new Schema<Comment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    edited: { type: String, required: true, default: false },
    likes: { type: Number, required: true, default: 0 },
    date: { type: Date, default: new Date() },
  },
  { timestamps: true }
);
export const CommentModel = mongoose.model("Comment", commentSchema);

