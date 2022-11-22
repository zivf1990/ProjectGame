const x = document.getElementById("login");
const y = document.getElementById("register");
const z = document.getElementById("btn");

const loginBtn = document.querySelector("#toggle-login");
const signupBtn = document.querySelector("#toggle-signup");
const loginForm = document.forms["login-form"];
const signupForm = document.forms["signup-form"];
// loginForm["user-id"].value       ("user-id" - (name property))

loginBtn.addEventListener("click", login);
signupBtn.addEventListener("click", signup);

function register() {
  x.style.left = "-400px";
  y.style.left = "50px";
  z.style.left = "110px";
}
function login() {
  x.style.left = "50px";
  y.style.left = "450px";
  z.style.left = "0px";
}
