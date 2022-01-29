async function writePost(title,password, author, body, ) {
  try {
    const res = await axios.post("/post", { title, password, author, body })

    if (res.status === 204) {
      window.location.replace("/")
    }
  } catch (err) {
    console.log(err)
  }
}

async function deletePost(id, password) {
  try {
    const res = await axios.delete(`/${id}`, { data: { password } })

    if (res.status === 204) {
      window.location.replace("/")
    }
  } catch (err) {
    if (password === "") {
      window.alert("비밀번호를 입력해주세요, 최소5글자 최대 20글자입니다!")
    }
    console.log(err)
  }
}

async function editPost(_id, title, body, password) {
  try {
    const res = await axios.patch(`/${_id}`, { title, body, password })

    if (res.status === 204) {
      window.location.reload()
    }
  } catch (err) {
    window.alert("비밀번호를 입력해주세요")
    console.log(err)
  }
}
