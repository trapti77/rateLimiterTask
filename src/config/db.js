import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb Connected Successfully!");
  } catch (error) {
    console.error("Mongodb Connection Error : ", error);
    process.exit(1);
  }
};
