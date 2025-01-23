const express = require("express");
const multer = require("multer");
const {
  getEmailLayout,
  uploadImage,
  uploadEmailConfig,
  renderAndDownloadTemplate,
} = require("../controllers/emailController");

const router = express.Router();

// Multer setup
// const upload = multer({ dest: "uploads/" });

// Routes
router.get("/getEmailLayout", getEmailLayout);
// router.post("/uploadImage", upload.single("image"), uploadImage);

router.post("/uploadImage", uploadImage);
router.post("/uploadEmailConfig", uploadEmailConfig);
router.post("/renderAndDownloadTemplate", renderAndDownloadTemplate);

module.exports = router;
