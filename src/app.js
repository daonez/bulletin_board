const path = require("path")
const express = require("express")
const connect = require("./models")
const app = express()
const port = 3000
const Posts = require("./models/post")
const User = require("./models/user")
const Comments = require("./models/comment")

const postsRouter = require("./routes/post")
const usersRouter = require("./routes/user")
const commentsRouter = require("./routes/comment")

connect()

// ejs세팅 (templates 폴더에서 필요한 내용들 읽기)
const viewsPath = path.join(__dirname, "../templates/views")

app.set("view engine", "ejs")
app.set("views", viewsPath)

// public 폴더의 우리의 css,js등 볼수 있게 하는 설정
app.use("/", express.static(path.join(__dirname, "../public")))

//body 읽기
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Router Middleware
app.use("/api", [postsRouter, usersRouter, commentsRouter])

app.get("/", async (req, res) => {
  const results = await Posts.find({ ...Posts }).sort({ _id: -1 })

  res.render("index", { posts: results })
})

app.get("/users", async (req, res) => {
  const results = await User.find({})
  try {
    res.send(results)
  } catch (e) {
    res.status(500).send()
  }
})

app.get("/comments", async (req, res) => {
  const results = await Comments.find({})
  try {
    res.send(results)
  } catch (e) {
    res.status(500).send()
  }
})

app.listen(port, () => {
  console.log("running on port", port)
})
