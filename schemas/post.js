const mongoose = require("mongoose")
const autoIncrement = require("mongoose-auto-increment")
autoIncrement.initialize(mongoose.connection)

const postsSchema = new mongoose.Schema({
  postId: mongoose.SchemaTypes.ObjectId,
  postNum: {
    type: Number,
    default: 0,
  },

  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    
  },
  author: {
    type: String,
    required: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
})

postsSchema.pre("save", function (next) {
  this.updatedAt = Date.now()

  next()
})
postsSchema.plugin(autoIncrement.plugin, {
  model: "posts", //모델명
  field: "postNum", //자동증가할 db컬럼명
  startAt: 1, //시작
  increment: 1, // 증가
})

module.exports = mongoose.model("Posts", postsSchema)
