function player1Name(name) {
    document.getElementById("username").innerHTML = name;
}
player1Name(JSON.parse(localStorage.getItem("currentUser")).username);