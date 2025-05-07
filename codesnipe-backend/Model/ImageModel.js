const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://siddhartha:lnstc000@codesnipe.afdb0lv.mongodb.net/?retryWrites=true&w=majority&appName=Codesnipe');


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