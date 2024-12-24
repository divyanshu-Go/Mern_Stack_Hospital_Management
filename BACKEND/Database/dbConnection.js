import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "HOSPITAL_MANAGEMENT_PROJECT",
    })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((error) => {
      console.log(`Some error occured while connecting to database : ${error}`);
    });
};
