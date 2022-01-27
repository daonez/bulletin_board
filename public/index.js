async function writePost(title, author, body, password) {
  try {
    const res = await axios.post("/post", { title, author, password, body })

    if (res.status === 204) {
      window.location.replace("/")
    }
  } catch (err) {
    if (err === 400) {
      window.alert("작성할 내용을 입력해주세요")
    } else if (author === "") {
      window.alert("작성자를 입력해주세요")
    } else if (body === "") {
      window.alert("작성할 내용이 없습니다")
    } else if (password === "") {
      window.alert("비밀번호를 입력해주세요")
    } else if (title === "") {
      window.alert("제목이 없습니다")
    } else {
      window.alert("작성글이 없습니다")
      console.log(err)
    }
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
    } else if (password.length <= 5) {
      window.alert("비밀번호의 길이는 최소 5글자 최대 20글자입니다")
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
