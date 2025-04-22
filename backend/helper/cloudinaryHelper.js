import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadImageCloudanary = async (filePath, foldername) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: foldername,
    });

    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      console.log("Failed to delete image from server");
    }

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    throw new Error(error);
  }
};
