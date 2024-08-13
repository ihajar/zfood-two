
import app from "./app";
import env from "./util/validateEnv"; 
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";


const port = env.PORT


mongoose
  .connect(env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connected");
    app.listen(port, () => {
      console.log("server running on port:" + port);
    });
  })
  .catch(console.error);


cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});