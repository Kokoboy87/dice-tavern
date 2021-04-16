'use strict';
// Selecting Elements
const popWindow0EL = document.querySelector('.pop-player--0');
const popWindow1EL = document.querySelector('.pop-player--1');
const overlayEL = document.querySelector('.overlay');
const content0EL = document.querySelector('.content-0');
const content1EL = document.querySelector('.content-1');
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current-score--0');
const current1EL = document.getElementById('current-score--1');
const dice1EL = document.querySelector('.dice.dice-1');
const dice2EL = document.querySelector('.dice.dice-2');
const life0EL = document.querySelector('.life-0');
const life1EL = document.querySelector('.life-1');
const damage0EL = document.querySelector('.damage-0');
const damage1EL = document.querySelector('.damage-1');
const defence0EL = document.querySelector('.defence-0');
const defence1EL = document.querySelector('.defence-1');
const btnCloseWindow0 = document.querySelector('.window-0');
const btnCloseWindow1 = document.querySelector('.window-1');
const btnRestart = document.querySelector('.btn--restart');
const btnRoll = document.querySelector('.btn--roll');
const btnKeep = document.querySelector('.btn--keep');
const btnLife0 = document.querySelector('.btn-life-0');
const btnLife1 = document.querySelector('.btn-life-1');
const btnDamage0 = document.querySelector('.btn-damage-0');
const btnDamage1 = document.querySelector('.btn-damage-1');
const btnDefence0 = document.querySelector('.btn-defence-0');
const btnDefence1 = document.querySelector('.btn-defence-1');
const btnAttack0 = document.querySelector('.btn-attack-0');
const btnAttack1 = document.querySelector('.btn-attack-1');

let scores,
	lifes,
	damages,
	defences,
	currentScore,
	activePlayer,
	playing,
	diceRoll1,
	diceRoll2,
	actionP1,
	actionP2;
// Starting condition
const init = function () {
	scores = [0, 0];
	lifes = [50, 50];
	damages = [5, 5];
	defences = [5, 5];
	currentScore = 0;
	activePlayer = 0;
	playing = true;
	diceRoll1 = true;
	diceRoll2 = true;
	actionP1 = true;
	actionP2 = true;

	score0EL.textContent = 0;
	score1EL.textContent = 0;
	current0EL.textContent = 0;
	current1EL.textContent = 0;
	life0EL.textContent = 50;
	life1EL.textContent = 50;
	damage0EL.textContent = 5;
	damage1EL.textContent = 5;
	defence0EL.textContent = 5;
	defence1EL.textContent = 5;

	dice1EL.classList.add('hidden');
	dice2EL.classList.add('hidden');
	player0EL.classList.remove('player--winner');
	player1EL.classList.remove('player--winner');
	content0EL.classList.add('content--active');
	content1EL.classList.remove('content--active');
};
init();

const closeWindow = function () {
	overlayEL.classList.add('hidden');
	popWindow0EL.classList.add('hidden');
	popWindow1EL.classList.add('hidden');
	init();
};

const switchPlayer = function () {
	diceRoll1 = true;
	diceRoll2 = true;
	actionP1 = true;
	actionP2 = true;
	document.getElementById(`current-score--${activePlayer}`).textContent = 0;
	currentScore = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	content0EL.classList.toggle('content--active');
	content1EL.classList.toggle('content--active');
};

let dice1, dice2;
const dices = function () {
	if (diceRoll1 == true) {
		dice1 = Math.trunc(Math.random() * 6) + 1;
		diceRoll1 = true;
	}
	if (diceRoll2 == true) {
		dice2 = Math.trunc(Math.random() * 6) + 1;
		diceRoll2 = true;
	}
};
dices();

const attacks = function () {};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
	if (playing) {
		// 1. Generating a random dice rolling
		dices();
		// 2. Display dice
		dice1EL.classList.remove('hidden');
		dice1EL.src = `/static/images/dice-${dice1}.png`;
		dice2EL.classList.remove('hidden');
		dice2EL.src = `/static/images/dice-${dice2}.png`;
		//3.Check for rolled 1: if true,
		if (dice1 !== 1 && dice2 !== 1) {
			//Add dice to current score
			currentScore += dice1 + dice2;
			document.getElementById(
				`current-score--${activePlayer}`
			).textContent = currentScore;
		} else if (dice1 === 1 && dice2 === 1) {
			// Switch to next player
			switchPlayer();
			// Lock the dice that hit 1
		} else {
			if (dice1 === 1) {
				//that the lines to zero the points, From here
				if (diceRoll1) {
					diceRoll1 = false;
					currentScore = 0;
				} else {
					currentScore += dice2;
				} // To here
				document.getElementById(
					`current-score--${activePlayer}`
				).textContent = currentScore;
			}
			if (dice2 === 1) {
				//that the lines to zero the points, From here
				if (diceRoll2) {
					diceRoll2 = false;
					currentScore = 0;
				} else {
					currentScore += dice1;
				} // To here
				document.getElementById(
					`current-score--${activePlayer}`
				).textContent = currentScore;
			}
		}
	}
});

btnKeep.addEventListener('click', function () {
	if (playing) {
		// 1. Add current score to active player score
		scores[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent =
			scores[activePlayer];
		switchPlayer();
	}
});

btnCloseWindow0.addEventListener('click', closeWindow);

btnCloseWindow1.addEventListener('click', closeWindow);

btnRestart.addEventListener('click', init);

//  PLAYER 1 BUTTON
btnLife0.addEventListener('click', function () {
	if (playing) {
		if (activePlayer == 0 && actionP1 == true) {
			lifes[activePlayer] += scores[activePlayer];
			document.getElementById(`life--${activePlayer}`).textContent =
				lifes[activePlayer];
			document.getElementById(`score--${activePlayer}`).textContent = 0;

			actionP1 = false;
			scores[activePlayer] = 0;
		}
	}
});

btnDamage0.addEventListener('click', function () {
	if (playing) {
		if (activePlayer == 0 && actionP1 == true) {
			damages[activePlayer] += scores[activePlayer];
			document.getElementById(`damage--${activePlayer}`).textContent =
				damages[activePlayer];
			document.getElementById(`score--${activePlayer}`).textContent = 0;

			actionP1 = false;
			scores[activePlayer] = 0;
		}
	}
});

btnDefence0.addEventListener('click', function () {
	if (playing) {
		if (activePlayer == 0 && actionP1 == true) {
			defences[activePlayer] += scores[activePlayer];
			document.getElementById(`defence--${activePlayer}`).textContent =
				defences[activePlayer];
			document.getElementById(`score--${activePlayer}`).textContent = 0;

			actionP1 = false;
			scores[activePlayer] = 0;
		}
	}
});

btnAttack0.addEventListener('click', function () {
	if (playing) {
		if (activePlayer == 0 && actionP1 == true) {
			if (damages[activePlayer] > defences[1]) {
				let lifeDmg = damages[activePlayer] - defences[1];
				let newLife = lifes[1] - lifeDmg;
				lifes[1] = newLife;
				defences[1] = 0;
				document.getElementById(`defence--${1}`).textContent = 0;
				document.getElementById(`life--${1}`).textContent = newLife;
			}
			if (damages[activePlayer] == defences[1]) {
				document.getElementById(`defence--${1}`).textContent = 0;
			}
			if (damages[activePlayer] < defences[1]) {
				let newDefense = defences[1] - damages[activePlayer];
				document.getElementById(
					`defence--${1}`
				).textContent = newDefense;
			}

			actionP1 = false;
			scores[activePlayer] = 0;
		}
	}
	if (life1EL.textContent <= 0) {
		playing = false;
		dice1EL.classList.add('hidden');
		dice2EL.classList.add('hidden');
		popWindow0EL.classList.remove('hidden');
		overlayEL.classList.remove('hidden');
	}
});

// PLAYER 2 BUTTON
btnLife1.addEventListener('click', function () {
	if (playing) {
		if (activePlayer == 1 && actionP2 == true) {
			lifes[activePlayer] += scores[activePlayer];
			document.getElementById(`life--${activePlayer}`).textContent =
				lifes[activePlayer];
			document.getElementById(`score--${activePlayer}`).textContent = 0;

			actionP2 = false;
			scores[activePlayer] = 0;
		}
	}
});

btnDamage1.addEventListener('click', function () {
	if (playing) {
		if (activePlayer == 1 && actionP2 == true) {
			damages[activePlayer] += scores[activePlayer];
			document.getElementById(`damage--${activePlayer}`).textContent =
				damages[activePlayer];
			document.getElementById(`score--${activePlayer}`).textContent = 0;

			actionP2 = false;
			scores[activePlayer] = 0;
		}
	}
});

btnDefence1.addEventListener('click', function () {
	if (playing) {
		if (activePlayer == 1 && actionP2 == true) {
			defences[activePlayer] += scores[activePlayer];
			document.getElementById(`defence--${activePlayer}`).textContent =
				defences[activePlayer];
			document.getElementById(`score--${activePlayer}`).textContent = 0;

			actionP2 = false;
			scores[activePlayer] = 0;
		}
	}
});

btnAttack1.addEventListener('click', function () {
	if (playing) {
		if (activePlayer == 1 && actionP2 == true) {
			if (damages[activePlayer] > defences[0]) {
				let lifeDmg = damages[activePlayer] - defences[0];
				let newLife = lifes[0] - lifeDmg;
				lifes[0] = newLife;
				defences[0] = 0;
				document.getElementById(`defence--${0}`).textContent = 0;
				document.getElementById(`life--${0}`).textContent = newLife;
			}
			if (damages[activePlayer] == defences[0]) {
				document.getElementById(`defence--${0}`).textContent = 0;
			}
			if (damages[activePlayer] < defences[0]) {
				let newDefense = defences[0] - damages[activePlayer];
				document.getElementById(
					`defence--${0}`
				).textContent = newDefense;
			}

			actionP2 = false;
			scores[activePlayer] = 0;
		}
	}
	if (life0EL.textContent <= 0) {
		playing = false;
		dice1EL.classList.add('hidden');
		dice2EL.classList.add('hidden');
		popWindow1EL.classList.remove('hidden');
		overlayEL.classList.remove('hidden');
	}
});
