async function checkToken() {
  const token = localStorage.getItem("token")
  console.log(token)
  if (!token) {
    window.alert("please log in")
  } else {
    return token
  }
}
async function writeComment(comment, comments_id, _id) {
  try {
    const token = localStorage.getItem("token")
    const res = await axios.post(
      "/comments",
      { comment, comments_id, _id },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )

    if (res.status === 201) {
      window.location.reload()
    }
  } catch (err) {
    console.log(err)
  }
}

async function deleteComment(_id, owner) {
  try {
    checkToken()
    const token = localStorage.getItem("token")
    const res = await axios.delete(`/comments/${_id}`, {
      data: { id, owner },
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    // if (res.status === 204) {
    //   window.location.replace("/")
    // }
  } catch (err) {
    console.log(err)
  }
}

async function editComment(_id, owner, comment) {
  checkToken()
  const token = localStorage.getItem("token")
  try {
    const res = await axios.patch(
      `/comments/${_id}`,
      { _id, owner, comment },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )

    // if (res.status === 200) {
    //   window.location.reload()
    // }
  } catch (err) {
    console.log(err)
  }
}
