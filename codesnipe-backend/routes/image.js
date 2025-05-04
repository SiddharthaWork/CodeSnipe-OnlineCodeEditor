const express = require("express");
const multer = require("multer");
const Image = require("../Model/ImageModel");
const Project = require("../Model/ProjectModel");

const router = express.Router();

// Multer setup to store in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST: Upload image
router.post("/upload", upload.single("photo"), async (req, res) => {
  try {
    const newImage = new Image({
      name: req.body.name,
      projectId: req.body.projectId,
      userId: req.body.userId,
      title: req.body.title,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });
    
    // Save the image
    const savedImage = await newImage.save();
    
    // Update the project with the image ID
    if (req.body.projectId) {
      await Project.findByIdAndUpdate(
        req.body.projectId,
        { imageId: savedImage._id },
        { new: true }
      );
    }
    
    res.status(200).json({success: true, message: "Image uploaded successfully" });
  } catch (err) {
    console.error("Error uploading image:", err);
    res.status(500).json({ success: false, error: "Image upload failed" });
  }
});

// GET: Check if an image exists for a project
router.get("/check/:projectId", async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const existingImage = await Image.findOne({ projectId: projectId });
    
    if (existingImage) {
      res.json({
        exists: true,
        imageId: existingImage._id
      });
    } else {
      res.json({
        exists: false
      });
    }
  } catch (err) {
    console.error("Error checking image:", err);
    res.status(500).json({ error: "Failed to check for existing image" });
  }
});

// PUT: Update an existing image
router.put("/update/:id", upload.single("photo"), async (req, res) => {
  try {
    const imageId = req.params.id;
    
    // Ensure file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    
    // Update the image
    const updatedImage = await Image.findByIdAndUpdate(
      imageId,
      {
        name: req.body.name || "Updated Screenshot",
        image: {
          data: req.file.buffer,
          contentType: req.file.mimetype
        },
      },
      { new: true } // Return the updated document
    );
    
    if (!updatedImage) {
      return res.status(404).json({ error: "Image not found" });
    }
    
    // Update the project if needed (in case image ID changed)
    if (updatedImage.projectId) {
      await Project.findByIdAndUpdate(
        updatedImage.projectId,
        { imageId: imageId },
        { new: true }
      );
    }
    
    res.status(200).json({ 
      success: true,
      message: "Image updated successfully" 
    });
  } catch (err) {
    console.error("Error updating image:", err);
    res.status(500).json({ error: "Failed to update image" });
  }
});

// GET: Get all images
router.get("/", async (req, res) => {
  try {
    // First find all projects that have an imageId set
    const projectsWithImages = await Project.find({ imageId: { $ne: null } });
    
    // Extract the image IDs from these projects
    const imageIds = projectsWithImages.map(project => project.imageId);
    
    // Find only those images that are referenced in projects
    const images = await Image.find({ _id: { $in: imageIds } });
    
    res.json({
      success: true, 
      message: "Images fetched successfully", 
      images: images
    });
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// GET: Get image by ID
router.get("/:id", async (req, res) => {
  try {
    const img = await Image.findById(req.params.id);
    if (!img) return res.status(404).send("Image not found");

    res.set("Content-Type", img.image.contentType);
    res.send(img.image.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

module.exports = router;