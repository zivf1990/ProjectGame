const headingEl = document.querySelector(".heading");

let currentUser = {};

function init() {
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  headingEl.style.color = `rgba(11, 127, 171,0.5)`
  headingEl.textContent = `Welcome ${currentUser.username}`
}

init()
