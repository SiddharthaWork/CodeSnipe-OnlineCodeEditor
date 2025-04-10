const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/codesnipe');

const projectSchema = new mongoose.Schema({
    title: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    userId: String,
    htmlCode: {
        type: String,
        default: "<h1>Hello World</h1>"
    },
    cssCode: {
        type: String,
        default: "h1{color:blue}"
    },
    jsCode: {
        type: String,
        default: "console.log('Hello World')"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Project", projectSchema);