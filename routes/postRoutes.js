const multer = require("multer");
const { protect } = require("../controllers/authController");
const { savePost, getPosts } = require("../controllers/postController");

const router = require("express").Router();

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .route("/")
  .post(protect, upload.single("image"), savePost)
  .get(protect, getPosts);

module.exports = router;
