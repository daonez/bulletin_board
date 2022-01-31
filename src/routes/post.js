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

router.post("/posts", async (req, res) => {
  const post = new Posts(req.body)

  try {
    await post.save()
    res.status(201).send(post)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

router.patch("/posts/:id", async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ["title", "content"]
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidUpdate) {
    return res.status(400).send({ error: "수정 할 수있는 내용이 없습니다" })
  }

  try {
    const post = await Posts.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!post) {
      return res.status(404).send()
    }
    res.send(post)
  } catch (e) {
    res.status(400).send(e)
  }
})

// router.delete("/:id", async (req, res) => {
//   try {
//     const { password } = req.body
//     const _id = req.params.id

//     const originalPost = await Posts.findOne({ _id })

//     if (originalPost.password === password) {
//       const post = await Posts.findOneAndDelete({ _id: _id })
//       res.status(204).send(post)
//     } else {
//       res.status(403).send()
//     }
//   } catch (e) {
//     res.status(500).send()
//   }
// })

router.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Posts.findByIdAndDelete(req.params.id)
    if (!post) {
      return res.status(404).send()
    }
    res.status(204).send(post)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
