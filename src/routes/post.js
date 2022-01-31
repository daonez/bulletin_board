const express = require("express")
const router = express.Router()
const Posts = require("../models/post")

router.get("/write", async (req, res) => {
  res.render("createPost")
})

router.get("/:id", async (req, res) => {
  const _id = req.params.id

  try {
    const results = await Posts.findOne({ _id, ...Posts })

    if (!results) {
      res.status(404).send()
    }
    res.render("post", { posts: results })
  } catch (e) {
    res.status(500).send()
  }
})

router.post("/post", async (req, res) => {
  const post = new Posts({
    ...req.body,
  })

  try {
    await post.save()
    res.status(204).send(post)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

router.patch("/:id", async (req, res) => {
  const _id = req.params.id
  const { title, content, password } = req.body
  try {
    const originalPost = await Posts.findOne({ _id })

    if (originalPost.password === password) {
      const post = await Posts.findOneAndUpdate({ _id }, { title, content })
      res.status(204).send(post)
    } else {
      res.status(403).send()
    }
  } catch (error) {
    res.status(500).send()
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const { password } = req.body
    const _id = req.params.id

    const originalPost = await Posts.findOne({ _id })

    if (originalPost.password === password) {
      const post = await Posts.findOneAndDelete({ _id: _id })
      res.status(204).send(post)
    } else {
      res.status(403).send()
    }
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
