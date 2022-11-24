
const logInSubmit = document.getElementById("submit-login-btn");

logInSubmit.addEventListener("click", logInCheck);

function Player(x, y) {
  this.x = x;
  this.y = y;
}


function logInCheck(event) {
  let flag = 0;
  let username = loginForm["user-id"].value;
  let password = loginForm["password"].value;
  const usersSignIn = JSON.parse(localStorage.getItem("users"));
  if (username.length == 0) {
    alert("your user name or password are invalid");
  }
  for (let i = 0; i < usersSignIn.length; i++) {
    console.log(usersSignIn[i].username);
    console.log(username, password);
    if (username == usersSignIn[i].username) {
      if (password == usersSignIn[i].password) {
        event.preventDefault();
        welcomePage(username, password);
        flag = 1;
      }
    }
  }
  if (flag == 0) {
    alert("your user name or password are invalid");
  }
}

function welcomePage(username, password) {
  let currentUser = { username: username, password: password, highScore: null };
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  location.replace("../pages/main.html");
}

