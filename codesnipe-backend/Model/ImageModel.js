const mongoose = require("mongoose");


const imageSchema = new mongoose.Schema({
    name: String,
    projectId: String,
    userId: String,
    title: String,
    image: {
      data: Buffer,
      contentType: String,
    },
  });

module.exports = mongoose.model("Image", imageSchema);