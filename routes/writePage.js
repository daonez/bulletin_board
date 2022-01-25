const express = require("express")
const router = express.Router()
const Posts = require("../schemas/post")

router.get("/", async (req, res) => {
  res.render("writePage")
})
// app.get("/post", async (req, res) => {
//   const { postId, title, body, createdAt, updatedAt } = req.query
//   const writtenPosts = await Posts.find({ postId, title, body, createdAt, updatedAt })
//   res.render("index", {})
// })

router.post("/new", async (req, res) => {
  const { postId, title, body, createdAt, updatedAt } = req.body
  const posts = await Posts.create({ postId, title, body, createdAt, updatedAt })

  res.send({ posts })
})

module.exports = router
