async function checkToken() {
  const token = localStorage.getItem("token")
  console.log(token)
  if (!token) {
    window.alert("please log in")
  } else {
    return token
  }
}

async function writeComment(_id, comment) {
  try {
    const token = localStorage.getItem("token")
    const res = await axios.post(
      "/comments",
      { _id, comment },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )

    if (res.status === 201) {
      window.location.replace("/")
    }
  } catch (err) {
    console.log(err)
  }
}

async function deleteComment(id, owner) {
  try {
    checkToken()
    const token = localStorage.getItem("token")
    const res = await axios.delete(`/posts/${id}`, {
      data: { id, owner },
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    if (res.status === 204) {
      window.location.replace("/")
    }
  } catch (err) {
    console.log(err)
  }
}

async function editComment(_id, title, content) {
  checkToken()
  const token = localStorage.getItem("token")
  try {
    const res = await axios.patch(
      `/posts/${_id}`,
      { title, content },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )

    if (res.status === 200) {
      window.location.reload()
    }
  } catch (err) {
    console.log(err)
  }
}
