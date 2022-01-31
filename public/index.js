async function writePost(title, content) {
  try {
    const res = await axios.post("/posts", { title, content })

    if (res.status === 201) {
      window.location.replace("/")
    }
  } catch (err) {
    console.log(err)
  }
}

async function deletePost(id) {
  try {
    const res = await axios.delete(`/posts/${id}`, { data: { id } })

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

async function editPost(_id, title, content) {
  try {
    const res = await axios.patch(`/posts/${_id}`, { title, content })

    if (res.status === 200) {
      window.location.reload()
    }
  } catch (err) {
    window.alert("비밀번호를 입력해주세요")
    console.log(err)
  }
}
