import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
});

mongoose.models = {};
export const UserModel = mongoose.model("users", userSchema);

export async function mongooseConnect() {
  if (mongoose.connections[0].readyState) {
    return true;
  }
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@group1dbs311.akbgg.mongodb.net/"
    );
    return true;
  } catch (err) {
    throw new Error(err);
  }
}
