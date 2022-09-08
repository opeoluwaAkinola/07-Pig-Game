'use strict';
//Selecting Score
const playerEL1 = document.querySelector('.player--0');
const playerEL2 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

const scores = [0, 0];
const changePlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  playerEL1.classList.toggle('player--active');
  playerEL2.classList.toggle('player--active');
};
let currentScore = 0;
let activePlayer = 0;
let playing = true;
//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  //Generate randon dice roll, display dice and
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // check for rolled 1:if true switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //currentScore0.textContent = currentScore;
    } else {
      changePlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to score of the active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.Check if score if up to 100
    if (scores[activePlayer] === 100) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      changePlayer();
    }
  }
});
btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  playing = true;
});
