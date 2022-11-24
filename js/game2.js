//setting user name in game
function player1Name(name) {
  document.getElementById("player1Name").innerHTML = name;
}
player1Name(JSON.parse(localStorage.getItem("currentUser")).username);

//settings scores to 0
let scorePlayer1 = 0;
let scorePlayer2 = 0;
document.getElementById("scorePlayer1").innerHTML = scorePlayer1;
document.getElementById("scorePlayer2").innerHTML = scorePlayer2;

const audio = new Audio("../audio/win.mp3");
const backgroundAudio = new Audio("../audio/background-audio.mp3");
let theFirstOpenCard = 1;

const numOfCards = 20;
const timeForPlayer2 = 1500;
const numOfTypeCards = 5;
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

//init array of cards for the players
function cards() {
  let cards = [];
  for (let i = 0; i < numOfCards; i++) {
    cards[i] = Math.ceil(Math.random() * numOfTypeCards);
  }
  return cards;
}
//open cards for both players
function openCard() {
  startBackgroundMusic();
  stickWhenWinPlayer1.style.display = "none";
  stickWhenWinPlayer2.style.display = "none";
  stick.style.display = "block";
  clearTimeout(myTimeout);
  let flag = 0;
  if (counter == 0) {
    endGame();
    return;
  }
  cardNum1.innerHTML = cardsOfPlayer1[numOfCards - counter];
  cardNum2.innerHTML = cardsOfPlayer2[numOfCards - counter];
  if (
    cardsOfPlayer1[numOfCards - counter] == cardsOfPlayer2[numOfCards - counter]
  ) {
    myTimeout = setTimeout(addPlayer2Score, timeForPlayer2);
  }
  counter--;
}
//the function start music at the first open card and forever
function startBackgroundMusic() {
  if (theFirstOpenCard) {
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
  stickWhenWinPlayer2.style.display = "block";
  stick.style.display = "none";
  document.getElementById("scorePlayer2").innerHTML = scorePlayer2;
  if (scorePlayer2 >= 20) {
    alert("Player 2 win you fucking shit!");
    location.reload();
  }
}
//check if you press the "fuckingStick" in the write time and add/dec 5 points
function checkValid() {
  clearTimeout(myTimeout);
  if (cardsOfPlayer1[numOfCards - counter - 1] == undefined) {
    return;
  }
  if (
    cardsOfPlayer1[numOfCards - counter - 1] ==
    cardsOfPlayer2[numOfCards - counter - 1]
  ) {
    scorePlayer1 += 5;
    stickWhenWinPlayer1.style.display = "block";
    stick.style.display = "none";
    if (scorePlayer1 >= 20) {
      alert("inon" + " Is the winner!!!");
      location.reload();
    }
  } else {
    scorePlayer1 -= 5;
    if (scorePlayer1 < 0) {
      scorePlayer1 = 0;
    }
  }
  document.getElementById("scorePlayer1").innerHTML = scorePlayer1;
}

//tell the winner and reload the game
function endGame() {
  if (scorePlayer1 > scorePlayer2) {
    setTimeout(() => {
      backgroundAudio.pause();
      audio.play();
      document.getElementById("winner").innerHTML =
        "inon" + " Is the winner!!!";
    }, "3000");
    alert();
  } else if (scorePlayer1 < scorePlayer2) {
    alert("Player 2 win you fucking shit!");
  } else {
    alert("tie!");
  }
  location.reload();
}
