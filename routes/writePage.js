const express = require("express")
const router = express.Router()
const Posts = require("../schemas/post")

// app.get("/post", async (req, res) => {
//   const { postId, title, body, createdAt, updatedAt } = req.query
//   const writtenPosts = await Posts.find({ postId, title, body, createdAt, updatedAt })
//   res.render("index", {})
// })
router.get("/post/:id", async (req, res) => {
  const _id = req.params.id
  //res.send(`this page ${id} is`)
  const results = await Posts.findOne({ _id, ...Posts })

  res.render("post", { posts: results })
})

router.post("/post", async (req, res) => {
  const { title, body } = req.body
  // const posts = await Posts.create({ title, body })
  await Posts.create({ title, body })

  // res.send({ posts })
  res.redirect("/")
})

router.patch("/post/:id", async (req, res) => {
  const _id = req.params.id
  const { title, body } = req.body
  await Posts.findByIdAndUpdate({ _id }, { title, body })
  res.send({ posts })
  //res.redirect("/")
})

module.exports = router
