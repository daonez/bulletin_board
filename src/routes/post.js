const express = require("express")
const router = express.Router()
const Posts = require("../models/post")
const auth = require("../middleware/auth")

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

router.post("/posts", auth, async (req, res) => {
  const post = new Posts({ ...req.body, owner: req.user._id })

  try {
    await post.save()
    res.status(201).send(post)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

router.patch("/posts/:id", auth, async (req, res) => {
  // 변경할수 있는 내용을 제한했다, 몽구스 스키마에없는것을 저장할수는 없다, 그러나 수정불가라고 알려주지도 않는다
  //그래서 변경가능한것들을 지정해주었고, 그것을 배열에 넣어서 검증을 하게 하였다
  const updates = Object.keys(req.body)
  const allowedUpdates = ["title", "content"]
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidUpdate) {
    return res.status(400).send({ error: "수정 할 수있는 내용이 없습니다" })
  }

  try {
    // 위에 변경 가능한것들을 적용했으니 수정가능한 내용이 맞게 들어야하기 때문에 findById를 사용하여 매번 업데이트 할때마다
    //맞게 저장되게 설정해두었다.
    const post = await Posts.findById({ _id: req.params.id, owner: req.user._id })

    if (!post) {
      return res.status(404).send()
    }

    //forEach 는 forloop과 같지만, 아무것도 리턴하지않는다, 단지 제공된 함수로 array를 호출한다.
    // forEach 자체는 아무것도 리턴하지않기 때문에  undefinded가 뜨니 req.body에 업데이트 내용을 저장해둔다
    updates.forEach((update) => (post[update] = req.body[update]))

    await post.save()

    res.send(post)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete("/posts/:id", auth, async (req, res) => {
  try {
    const post = await Posts.findByIdAndDelete({ _id: req.params.id, owner: req.user._id })
    if (!post) {
      return res.status(404).send()
    }
    res.status(204).send(post)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
