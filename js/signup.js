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
signupForm.addEventListener("submit", registerUser);

function registerUser(event) {
  event.preventDefault();

  const username = signupForm["username"];
  const password = signupForm["password"];
  const email = signupForm["email"];

  const user = {
    username: username.value,
    password: password.value,
    email: email.value,
  };

  // No users at all.
  if (JSON.parse(localStorage.getItem("users") === null)) {
    if (signupForm.checkValidity()) {
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      window.location.href = "../pages/main.html";
    }
  } else {
    users = JSON.parse(localStorage.getItem("users"));
    //user with the same username already exists in localStorage
    const checkIfUsernameExists = users.some(
      (user) => user.username === username.value
    );

    if (checkIfUsernameExists) {
      console.log(username.value);

      response.textContent = "Username is already exists";

      console.log(username.reportValidity());
    } else {
      //user does not exist in users(create new user)

      users.push(user);

      localStorage.setItem("users", JSON.stringify(users));

      window.location.href = "../pages/main.html";
    }
  }

  // signupForm.reportValidity();
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
