var tid = setInterval(function() {
	if (document.readyState !== 'complete') return;
	clearInterval(tid);
	Main();
}, 100);

var DOMElements = {
	wordBlanks: document.getElementById('word-blanks'),
	remainingGuesses: document.getElementById('remaining-guesses'),
	alreadyGuessed: document.getElementById('already-guessed')
};

// Imperative Control Flow
function Main() {
	var controller = Controller();
	var rg = controller.RandomGenerator;
	var state = controller.State;

	document.onkeypress = function(e) 
	{
		var userInput = String.fromCharCode(e.keyCode).toLowerCase();
		if (!/^[a-z]+$/.test(userInput)) return;
		if (state.getGameOver()) {
			state.resetState();	
		}
		controller.processTurn(userInput);
	};
};

function Controller() {
	return new Controller.init();
};

Controller.init = function() {

	var State = function() {
		var randomWord, remainingGuesses, lettersGuessed, gameOver;
		var isGameOver = function() {
			var guess = Array.from(lettersGuessed).join('');
			gameOver = remainingGuesses === 0 || guess === randomWord;
			console.log('guess: ' + guess);
			console.log('remaining: ' + remainingGuesses);
			if (guess === randomWord) {
				// player won
				// Create new HTML element to update with text saying you won
			}
			else if (remainingGuesses === 0) {
				// player lost
			}
			
			return gameOver;
		};

		return {
			initializeState: function() {
				randomWord = Generator().generateRandomWord();
				remainingGuesses = 12;
				lettersGuessed = new Set();
				gameOver = false;

				// Initialize DOMElements
				DOMElements.wordBlanks.innerHTML = Generator().generateUnderscore(randomWord);
				DOMElements.remainingGuesses.innerHTML = remainingGuesses;
				DOMElements.alreadyGuessed.innerHTML = '';
			},
			resetState: function() {
				this.initializeState();
			},
			setGameOver: function(gameOver) {
				this.gameOver = gameOver;
			},
			getGameOver: function() {
				return gameOver;
			},
			decrementGuesses: function() {
				remainingGuesses--;
				return remainingGuesses;
			},
			addLetterGuesses: function(letter) {
				this.decrementGuesses();
				lettersGuessed.add(letter);
				if (isGameOver()) {
					this.resetState();
					alert('Game over');
					return;
				}
				return lettersGuessed;
			},
			getRandomWord: function() {
				return randomWord;
			},
			getRemainingGuesses: function() {
				return remainingGuesses;
			}
		}
	};

	var Generator = function() {
		var RandomGenerator = function() {
			this.wordChoices = ['Honda','Toyota','Lexus','BMW','Tesla'];
			this.generateRandomWord = function() {
				var wc = this.wordChoices;
				return wc[Math.floor(Math.random() * wc.length)];
			};
			this.generateUnderscore = function(word) {
				var underscores = [];
				for (var char in word) {
					underscores.push('_');
				}
				return underscores.join(' ');
			};

			return this;
		};

		return new RandomGenerator();
	};

	this.processTurn = function(userInput) {
		console.log(userInput);
		console.log(this.State.getGameOver());
		this.State.addLetterGuesses(userInput);
		// Re-render DOMElements
		// this.State.setGameOver(this.State.isGameOver() ? true : false);

		if (this.State.getGameOver()) this.State.resetState();
	};

	this.State = new State();
	this.RandomGenerator = Generator();
	this.State.initializeState();

	return this;
};

Controller.init.prototype = Controller.prototype;
