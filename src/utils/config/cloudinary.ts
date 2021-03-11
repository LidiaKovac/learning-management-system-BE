const cloudinary = require("cloudinary").v2
const multer = require("multer");
const {CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} = process.env
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})
//STORAGES
const storage_img = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "lms_images",
  },
});
const storage_pdf = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "lms_pdf",
  },
});
const storage_video = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "lms_video",
  },
});
const storage_audio = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "lms_audio",
  },
});

//MULTER

export const cloudinaryMulter_img = multer({storage: storage_img });

export const cloudinaryMulter_pdf = multer({storage: storage_pdf })

export const cloudinaryMulter_video = multer({storage: storage_video })

export const cloudinaryMulter_audio = multer({storage: storage_audio })




