const express = require("express")
const router = express.Router()
const Posts = require("../schemas/post")

// app.get("/post", async (req, res) => {
//   const { postId, title, body, createdAt, updatedAt } = req.query
//   const writtenPosts = await Posts.find({ postId, title, body, createdAt, updatedAt })
//   res.render("index", {})
// })
router.get("/write", async (req, res) => {
  res.render("createPost")
})

router.get("/:id", async (req, res) => {
  const _id = req.params.id
  //res.send(`this page ${id} is`)
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
  const { title, body, author, password } = req.body
  // const posts = await Posts.create({ title, body })
  await Posts.create({ title, body, author, password })

  // res.send({ posts })
  res.redirect("/")
})

router.patch("/:id", async (req, res) => {
  const _id = req.params.id
  const { title, body, password } = req.body
  try {
    const originalPost = await Posts.findOne({ _id })

    if (originalPost.password === password) {
      const post = await Posts.findOneAndUpdate({ _id }, { title, body })
      res.status(204).send(post)
    } else {
      res.status(403).send()
    }
  } catch (error) {
    res.status(500).send()
  }

  //res.redirect("/")
})

router.delete("/:id", async (req, res) => {
  try {
    const { password } = req.body
    const _id = req.params.id
    console.log(req.params)
    const originalPost = await Posts.findOne({ _id })
    console.log(originalPost)
    if (originalPost.password === password) {
      const post = await Posts.findOneAndDelete({ _id: _id })
      res.status(204).send(post)
    } else {
      res.status(403).send()
    }

    // res.redirect("/")
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
