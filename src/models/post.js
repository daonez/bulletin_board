const mongoose = require("mongoose")
const Comments = require("./comment")

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
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  updatedAt: {
    type: Date,
    default: () => new Date(),
  },
})

postsSchema.virtual("posts", {
  // 레퍼런스 글쓰기 , _id를 기준으로 주인확인
  ref: "User",
  localField: "_id",
  foreignField: "owner",
})

postsSchema.virtual("posts", {
  // 레퍼런스 글쓰기 , _id를 기준으로 주인확인
  ref: "Comment",
  localField: "_id",
  foreignField: "_id",
})

const Posts = mongoose.model("Posts", postsSchema)
module.exports = Posts
