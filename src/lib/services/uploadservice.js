import cloudinary from "./cloudinary";

export const uploadToCloudinary = async (file, folder = "products") => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (result) resolve(result);
        else reject(error);
      })
      .end(buffer);
  });
};
