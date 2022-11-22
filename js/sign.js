const loginBtn = document.getElementById("toggle-login");
const signupBtn = document.getElementById("toggle-signup");
const toggleDiv = document.getElementById("toggle-div");
const loginForm = document.forms["login-form"];
const signupForm = document.forms["signup-form"];
// loginForm["user-id"].value       ("user-id" - (name property))

loginBtn.addEventListener("click", login);
signupBtn.addEventListener("click", signup);

function signup() {
  loginForm.style.left = "-400px";
  signupForm.style.left = "50px";
  z.style.left = "110px";
}
function login() {
  x.style.left = "50px";
  signupForm.style.left = "450px";
  z.style.left = "0px";
}
