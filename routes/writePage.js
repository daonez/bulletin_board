const express = require("express")
const router = express.Router()
const Posts = require("../schemas/post")

// app.get("/post", async (req, res) => {
//   const { postId, title, body, createdAt, updatedAt } = req.query
//   const writtenPosts = await Posts.find({ postId, title, body, createdAt, updatedAt })
//   res.render("index", {})
// })

router.post("/new", async (req, res) => {
  const { title, body } = req.body
  // const posts = await Posts.create({ title, body })
  await Posts.create({ title, body })

  // res.send({ posts })
  res.redirect("/")
})

module.exports = router
