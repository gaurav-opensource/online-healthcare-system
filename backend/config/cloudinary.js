const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dznnyaj0z",
  api_key: "784338889414318",
  api_secret: "rc36OPAira2qTQNfRtyovWE8hB8",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Healthcare",
    resource_type: "auto",
    allowed_formats: ["jpg", "png", "jpeg", "pdf"],
  },
});

const upload = multer({ storage });

module.exports = { upload, cloudinary };
