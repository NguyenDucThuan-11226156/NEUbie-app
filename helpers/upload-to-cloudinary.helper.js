const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const dotenv = require("dotenv");
dotenv.config();
// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "ducidtc83",
  api_key: process.env.CLOUD_KEY || "864582785275927",
  api_secret: process.env.CLOUD_SECRET || "05KbWmBr0oYZN17i78NpAhwFsYU",
});
// End cloudinary

let streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = async (buffer) => {
  let result = await streamUpload(buffer);
  return result.url;
};
