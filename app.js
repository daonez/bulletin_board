const path = require("path")
const express = require("express")
const connect = require("./schemas")
const app = express()
const port = 3000
connect()
// ejs세팅 (templates 폴더에서 필요한 내용들 읽기)
const viewsPath = path.join(__dirname, "./templates/views")
app.set("view engine", "ejs")
app.set("views", viewsPath)

// public 폴더의 우리의 css,js등 볼수 있게 하는 설정
app.use("/", express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
  res.send("This is Main")
})

app.listen(port, () => {
  console.log("running on port", port)
})
