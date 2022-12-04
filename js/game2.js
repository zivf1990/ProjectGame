
//settings scores to 0
let scorePlayer1 = 0;
let scorePlayer2 = 0;
document.getElementById("scorePlayer1").innerHTML = scorePlayer1;
document.getElementById("scorePlayer2").innerHTML = scorePlayer2;

const userName = JSON.parse(localStorage.getItem("currentUser")).username;
const win = new Audio('../audio/win.mp3');
const lose = new Audio('../audio/lose.mp3');
const backgroundAudio = new Audio('../audio/background-audio.mp3');
const cardsPath = ["url('../images/kd.png')", "url(`../images/kc.png`)", "url(`../images/ks.png`)", "url(`../images/js.png`)"]
let theFirstOpenCard = 1;

let startRowPlayer1Card = 15;
let startColumnPlayer1Card = 9;
let startRowPlayer2Card = 2;
let startColumnPlayer2Card = 9;
const MAXSPEED = 1500;
const MINSPEED = 800;
const numOfCards = 20;
const numOfTypeCards = 4;
let counter = numOfCards;
let myTimeout;

const cardsOfPlayer1 = cards();
const cardsOfPlayer2 = cards();

const openCardsPlayer1 = document.getElementById("openCardsPlayer1");
const openCardsPlayer2 = document.getElementById("openCardsPlayer2");

const currentNumberOfCards = document.getElementById("currentNumOfCards");
const play = document.getElementById("playBtn");
const cardNum1 = document.getElementById("cardNum1");
const cardNum2 = document.getElementById("cardNum2");
const stick = document.getElementById("fuckingStick");

play.addEventListener("click", openCard);
stick.addEventListener("click", checkValid);
currentNumberOfCards.innerHTML = counter;

//every open card player 1 as a random time between 1-3s until player2 win
function randomTimeOfPlayer2() {
    return (Math.floor(Math.random() * (MAXSPEED - MINSPEED) + MINSPEED));
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

//player 1 move card for open
const moveCard = (startRowPlayer1Card) => {
    openCardsPlayer1.style.gridRow = `${startRowPlayer1Card}/${startRowPlayer1Card + 5}`;
    if (startRowPlayer1Card > 11) {
        setTimeout(() => moveCard(startRowPlayer1Card - 1), 50);
    }
}
const moveCardX = (startColumnPlayer1Card) => {
    openCardsPlayer1.style.gridColumn = `${startColumnPlayer1Card}/${startColumnPlayer1Card + 2}`;
    if (startColumnPlayer1Card < 12) {
        setTimeout(() => moveCardX(startColumnPlayer1Card + 1), 50);
    }
}

//player 2 move card
const moveCard2 = (startRowPlayer2Card) => {
    openCardsPlayer2.style.gridRow = `${startRowPlayer2Card}/${startRowPlayer2Card + 5}`;
    if (startRowPlayer2Card < 5) {
        setTimeout(() => moveCard2(startRowPlayer2Card + 1), 50);
    }
}
const moveCard2X = (startColumnPlayer2Card) => {
    openCardsPlayer2.style.gridColumn = `${startColumnPlayer2Card}/${startColumnPlayer2Card + 2}`;
    if (startColumnPlayer2Card < 12) {
        setTimeout(() => moveCard2X(startColumnPlayer2Card + 1), 50);
    }
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

    openCardsPlayer1.setAttribute("class", "card" + cardsOfPlayer1[numOfCards - counter]);
    setTimeout(() => moveCardX(startColumnPlayer1Card), 50);
    setTimeout(() => moveCard(startRowPlayer1Card), 50);

    openCardsPlayer2.setAttribute("class", "card" + cardsOfPlayer2[numOfCards - counter]);
    setTimeout(() => moveCard2X(startColumnPlayer2Card), 50);
    setTimeout(() => moveCard2(startRowPlayer2Card), 50);

    if (cardsOfPlayer1[numOfCards - counter] == cardsOfPlayer2[numOfCards - counter]) {
        play.removeEventListener("click", openCard);
        let random = randomTimeOfPlayer2();
        myTimeout = setTimeout(addPlayer2Score, random);
    }
    counter--;
    currentNumberOfCards.innerHTML = counter;
}


//the function start music at the first open card and forever
function startBackgroundMusic() {
    backgroundAudio.play();
}
backgroundAudio.addEventListener('ended', function () { //if background audio stop continue
    this.currentTime = 0; //if background audio stop continue
    this.play(); //if background audio stop continue
}, false); //if background audio stop continue

//the function add to player 2 5 points if you dont press the "fuckingStick" in time 
function addPlayer2Score() {
    scorePlayer2 += 5;
    document.getElementById("scorePlayer2").innerHTML = scorePlayer2;
    stick.disabled = true;
    stick.style.gridRow = "2/6";
    stick.style.gridColumn = "6/8";
    play.addEventListener("click", openCard);
    if (scorePlayer2 >= 20) {
        backgroundAudio.pause();
        lose.play();
        alert("Player 2 win you fucking shit! score of player 2 > 20");
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
            backgroundAudio.pause();
            win.play();
            alert(userName + " Is the winner!!!");
            location.reload();
        }
    }
    else {
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
        backgroundAudio.pause();
        win.play();
        alert(userName + " Is the winner!!!");
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
