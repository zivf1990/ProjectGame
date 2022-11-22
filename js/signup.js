const toggleDiv = document.getElementById("toggle-div");
const loginToggleBtn = document.getElementById("toggle-login");
const signupToggleBtn = document.getElementById("toggle-signup");
const submitSignupBtn = document.getElementById("submit-signup-btn");
const response = document.getElementById("response");

const loginForm = document.forms["login-form"];
const signupForm = document.forms["signup-form"];
// loginForm["user-id"].value       ("user-id" - (name property))

let users = [];

loginToggleBtn.addEventListener("click", login);
signupToggleBtn.addEventListener("click", signup);
// submitSignupBtn.addEventListener("click", registerUser);
signupForm.addEventListener("submit", registerUser);

function registerUser(event) {
  let username = signupForm["username-signup"];
  let password = signupForm["password-signup"].value;
  let email = signupForm["email-signup"].value;
  let user = { username: username.value, password: password, email: email };

  // No users at all.
  if (JSON.parse(localStorage.getItem("users") === null)) {
    if (signupForm.checkValidity()) {
      event.preventDefault();
      console.log(signupForm.checkValidity());
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      window.location.replace("../pages/main.html");
    }
  } else {
    // users already exists in localStorage
    users = JSON.parse(localStorage.getItem("users"));
    //user with the same username already exists in localStorage
    if (validateUser(username.value)) {
      event.preventDefault();
      username.setCustomValidity("user with the same username already exists");
      // response.textContent = "User already exists";
    } else {
      //user does not exist in users(create new user)

      users.push(user);
      JSON.stringify(localStorage.setItem("users", users));
      // event.preventDefault();
      window.location.href("../pages/main.html");
    }
  }

  function validateUser(username) {
    console.log(username);
    return users.some((user) => user.username === username);
  }
}

function signup() {
  loginForm.style.left = "-400px";
  signupForm.style.left = "50px";
  toggleDiv.style.left = "110px";
}

function login() {
  loginForm.style.left = "50px";
  signupForm.style.left = "450px";
  toggleDiv.style.left = "0px";
}
