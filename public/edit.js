function makeEditable() {
  const inputEl = document.querySelectorAll("input, textarea")
  inputEl.forEach((el) => {
    el.readOnly = false
  })
  document.getElementById("editBtn").style.display = "inline-block"
  document.getElementById("makeEditable").style.display = "none"
  console.log("makeEditable")
}
