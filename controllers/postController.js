const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Post = require("../models/postModel");

exports.savePost = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return new AppError("Please upload an image", 400);
  }

  // Generate a unique filename
  const uniqueFilename = Date.now() + "-" + Math.round(Math.random() * 1e9);

  const uploadsFolder = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsFolder)) {
    fs.mkdirSync(uploadsFolder);
  }

  // Use sharp to convert the image to WebP format
  const imagePath = path.join(
    process.cwd(),
    "uploads",
    `${uniqueFilename}.webp`
  );
  await sharp(req.file.buffer).toFormat("webp").toFile(imagePath);

  // Save the image path in the database (replace with your actual database code)
  await Post.create({
    image: `${uniqueFilename}.webp`,
    user: req.user._id,
  });

  res.status(200).json({ msg: "Image converted and saved successfully" });
});

exports.getPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ user: req.user._id });

  res.json({ posts });
});
