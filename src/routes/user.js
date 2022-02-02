const express = require("express")
const router = express.Router()
const User = require("../models/user")
const auth = require("../middleware/auth")

//로그인페이지 보여주기
router.get("/users/login", (req, res) => {
  res.render("login")
})

//회원가입페이지 보여주기
router.get("/users/signup", (req, res) => {
  res.render("register")
})

//회원가입 시켜주기
router.post("/users/signup", async (req, res) => {
  console.log(req.body)
  const user = new User(req.body)
  const token = await user.makeAuthToken()
  try {
    await user.save({ user, token })
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

//로그인 시켜주기
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.makeAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

//로그아웃
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

//모든기기 로그아웃
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

//내정보
router.get("/users/me", auth, async (req, res) => {
  // await User.find({})
  // console.log(User)
  res.send(req.user)
})

//내정보 수정
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ["author", "password", "email"]
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidUpdate) {
    return res.status(400).send({ error: "수정 할 수있는 내용이 없습니다" })
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]))
    await req.user.save()
    res.send(req.user)
  } catch (e) {
    res.status(400).send(e)
  }
})
//회원 탈퇴
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove()
    res.status(204).send(user)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
