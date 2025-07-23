import mongoose from "mongoose";

export interface IItem extends Document {
  name: string;
  description: string;
  owner: mongoose.Schema.Types.ObjectId;
}

const ItemSchema = new mongoose.Schema<IItem>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Item = mongoose.model("Items", ItemSchema);
