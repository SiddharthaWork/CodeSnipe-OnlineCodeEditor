const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://siddharthashrestha2345_db_user:B6X1HulcHxSVA9Nf@cluster0.igvr0hu.mongodb.net/');


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