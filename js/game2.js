
//settings scores to 0
let scorePlayer1 = 0;
let scorePlayer2 = 0;
document.getElementById("scorePlayer1").innerHTML = scorePlayer1;
document.getElementById("scorePlayer2").innerHTML = scorePlayer2;

const userName = JSON.parse(localStorage.getItem("currentUser")).username;
const win = new Audio('../audio/win.mp3');
const lose = new Audio('../audio/lose.mp3');
const backgroundAudio = new Audio('../audio/background-audio.mp3');
const cardsPath = ["../images/kd.png", "../images/kc.png", "../images/ks.png", "../images/js.png"]
let theFirstOpenCard = 1;

const numOfCards = 20;
const numOfTypeCards = 4;
let counter = numOfCards;
let myTimeout;

const cardsOfPlayer1 = cards();
const cardsOfPlayer2 = cards();

const stickWhenWinPlayer1 = document.getElementById("stickWhenWinPlayer1");
const stickWhenWinPlayer2 = document.getElementById("stickWhenWinPlayer2");
const play = document.getElementById("playBtn");
const cardNum1 = document.getElementById("cardNum1");
const cardNum2 = document.getElementById("cardNum2");
const stick = document.getElementById("fuckingStick");

play.addEventListener("click", openCard);
stick.addEventListener("click", checkValid);

//every open card player 1 as a random time between 1-3s until player2 win
function randomTimeOfPlayer2() {
    return (Math.floor(Math.random() * 1500) + 700);
}
//setting user name in game
function player1Name(name) {
    document.getElementById("player1Name").innerHTML = name;
    document.getElementById("WelcomeUserName").innerHTML = name;
}
player1Name(userName);

//init array of cards for the players
function cards() {
    let cards = [];
    let cardsPhoto = [];
    for (let i = 0; i < numOfCards; i++) {
        cards[i] = Math.ceil(Math.random() * numOfTypeCards);
    }
    return cards;
}
//open cards for both players
function openCard() {
    startBackgroundMusic();
    stick.disabled = false;
    stick.style.gridRow = "9/13";
    stick.style.gridColumn = "8/10";

    clearTimeout(myTimeout);
    let flag = 0;
    if (counter == 0) {
        endGame();
        return;
    }
    //cardsPath[cardsOfPlayer1[numOfCards - counter]];
    //cardNum1.style.backgroundImage = cardsPath[cardsOfPlayer1[numOfCards - counter]];
    //cardNum1.style.backgroundSize = "cover";
    cardNum1.innerHTML = cardsOfPlayer1[numOfCards - counter];
    cardNum2.innerHTML = cardsOfPlayer2[numOfCards - counter];
    if (cardsOfPlayer1[numOfCards - counter] == cardsOfPlayer2[numOfCards - counter]) {
        play.removeEventListener("click", openCard);
        let random = randomTimeOfPlayer2();
        console.log(random);
        myTimeout = setTimeout(addPlayer2Score, random);
    }
    counter--;
}
//the function start music at the first open card and forever
function startBackgroundMusic() {
    if (theFirstOpenCard) {
        backgroundAudio.load();
        backgroundAudio.play();
    }
    theFirstOpenCard = 0;
    if (backgroundAudio.paused) {
        backgroundAudio.play();
    }
}

//the function add to player 2 5 points if you dont press the "fuckingStick" in time 
function addPlayer2Score() {
    scorePlayer2 += 5;
    stick.disabled = true;
    stick.style.gridRow = "2/6";
    stick.style.gridColumn = "6/8";
    play.addEventListener("click", openCard);
    document.getElementById("scorePlayer2").innerHTML = scorePlayer2;
    if (scorePlayer2 >= 20) {
        alert("Player 2 win you fucking shit!");
        location.reload();
    }
}

//check if you press the "fuckingStick" in the write time and add/dec 5 points
function checkValid() {
    stick.disabled = true;
    clearTimeout(myTimeout);
    if (cardsOfPlayer1[numOfCards - counter - 1] == undefined) {
        return;
    }
    if (cardsOfPlayer1[numOfCards - counter - 1] == cardsOfPlayer2[numOfCards - counter - 1]) {
        scorePlayer1 += 5;
        stick.style.gridRow = "16/20";
        stick.style.gridColumn = "6/8";
        play.addEventListener("click", openCard);
        if (scorePlayer1 >= 20) {
            alert(userName + " Is the winner!!!");
            location.reload();
        }
    }
  document.getElementById("scorePlayer1").innerHTML = scorePlayer1;
}

//tell the winner and reload the game
function endGame() {
    if (scorePlayer1 > scorePlayer2) {
        backgroundAudio.pause();
        win.play();
        alert("inon" + " Is the winner!!!");
    }
    else if (scorePlayer1 < scorePlayer2) {
        backgroundAudio.pause();
        lose.play();
        alert("Player 2 win you fucking shit!");
    }
    else {
        alert("tie!");
    }
    location.reload();
}
