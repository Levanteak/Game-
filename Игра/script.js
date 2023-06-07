"use strict";
// Elements selections
const score0Elememt = document.querySelector("#score--0");
const score1Element = document.querySelector("#score--1");
const diceElement = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");
const current0Element = document.querySelector("#current--0");
const current1Element = document.querySelector("#current--1");

//Game initialization
diceElement.classList.add("hidden");
let totalScores, currentScore, activePlayer, isPlaying;

const switchActivePlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle("player--active");
  player1Element.classList.toggle("player--active");
};

//Role the dice
btnRoll.addEventListener("click", function () {
  if (isPlaying) {
    //Random dice number
    let diceNumber = Math.floor(Math.random() * 6) + 1;
    diceElement.classList.remove("hidden");
    diceElement.src = `/Игра/images/dice${diceNumber}.png`;

    //Check if dice is rolled
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (isPlaying) {
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    if (totalScores[activePlayer] >= 100) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--acivet");
      diceElement.classList.add("hidden");
    } else {
      switchActivePlayer();
    }
  }
});

const initGame = function () {
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;
  score0Elememt.textContent = 0;
  score1Element.textContent = 0;

  current0Element.textContent = 0;
  current1Element.textContent = 0;
  player0Element.classList.remove("player--winner");
  player1Element.classList.remove("player--winner");
  player1Element.classList.remove("player--active");
  player1Element.classList.remove("player--active");
  player0Element.classList.add("player--active");
  diceElement.classList.add("hidden");
};
initGame();

btnNew.addEventListener("click", initGame);
