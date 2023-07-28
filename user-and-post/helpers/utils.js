const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({

    destination: "uploads",
    filename: (req, file, cb) => {
      return cb(null,`${file.originalname.split(".")[0]}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });

const upload = multer({
    storage:storage,
    limits: {
      fileSize: 1024*1024*1000,
    },
  });
  module.exports = upload;
