const mongoose = require("mongoose")

const postsSchema = new mongoose.Schema({
  postNum: {
    type: Number,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  updatedAt: {
    type: Date,
    default: () => new Date(),
  },
})

module.exports = mongoose.model("Posts", postsSchema)
