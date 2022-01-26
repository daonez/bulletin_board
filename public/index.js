const deletePostBtn = document.getElementById("delBtn")
let id = deletePostBtn.dataset.id
console.log(id)
console.log(typeof id)
async function deletePost(id) {
  try {
    await axios.delete(`/${id}`)
    console.log(id)
  } catch (err) {
    console.log(err)
  }
}
if (deletePostBtn) {
  deletePostBtn.addEventListener("click", deletePost)
}
