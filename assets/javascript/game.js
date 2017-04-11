var tid = setInterval(function() {
	if (document.readyState !== 'complete') return;
	clearInterval(tid);
	Main();
}, 100);

// Imperative Control Flow
// Main operations executed here
function Main() {

	var { controller, RandomGenerator, State } = Controller();

	document.onkeypress = function(e) 
	{
		var userInput = String.fromCharCode(e.keyCode).toLowerCase();
		if (!/^[a-z]+$/.test(userInput)) return;
		controller.processTurn(userInput);
	};
};


function Controller() {
	return new Controller.init();
};

Controller.init = function() {

	var State = function() {
		var randomWord, remainingGuesses, alreadyGuessed, gameOver, wordBlanks;
		var generator = Generator();

		var DOMElements = function() {
			return {
				"word-blanks": {
					id: document.getElementById('word-blanks'),
					value: wordBlanks
				},
				"remaining-guesses": {
					id: document.getElementById('remaining-guesses'),
					value: remainingGuesses
				},
				"already-guessed": {
					id: document.getElementById('already-guessed'),
					value: Array.from(alreadyGuessed)
				}
			}
		};

		return {
			// Helper functions
			initializeState: function() {
				randomWord = generator.generateRandomWord();
				console.log(randomWord);
				wordBlanks = generator.generateUnderscore(randomWord);
				alreadyGuessed = new Set();
				remainingGuesses = 12;
				gameOver = {
					status: false,
					message: ''
				};

				// Initialize DOMElements
				this.renderHTML();
			},
			resetState: function() {
				this.initializeState();
			},
			indexOf: function(letter) {
				var indexes = [];
				for (var i = 0; i < randomWord.length; i++) {
					if (letter === randomWord.toLowerCase()[i]) indexes.push(i);
				}
				return indexes;
			},

			// Getters & Setters
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
			getRandomWord: function() {
				return randomWord;
			},
			getRemainingGuesses: function() {
				return remainingGuesses;
			},

			// Per-turn methods
			addLetterGuesses: function(letter) {
				this.decrementGuesses();
				alreadyGuessed.add(letter);
				var indexes = this.indexOf(letter);
				for (var i = 0; i < indexes.length; i++) {
					wordBlanks[indexes[i]] = randomWord[indexes[i]];
				}
				this.renderHTML();
				return alreadyGuessed;
			},
			isGameOver: function() {
				var guess = Array.from(alreadyGuessed).join('');
				gameOver.status = (guess === randomWord.toLowerCase() || remainingGuesses === 0);
				if (guess === randomWord.toLowerCase()) {
					gameOver.message = "Congratulations, you won!";
				}
				else if (remainingGuesses === 0) {
					gameOver.message = "You lost!";
				}

				return gameOver;
			},
			renderHTML: function() {
				elements = new DOMElements();
				for (var key in elements) {
					elements[key].id.innerHTML = elements[key].value;
				}
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
				return underscores;
			};

			return this;
		};

		return new RandomGenerator();
	};

	this.processTurn = function(userInput) {
		console.log('userInput:', userInput);
		this.State.addLetterGuesses(userInput);
		if (this.State.isGameOver().status) {
			this.State.resetState();
		}
	};

	this.State = new State();
	this.RandomGenerator = Generator();
	this.controller = this;
	this.State.initializeState();

	return this;
};

Controller.init.prototype = Controller.prototype;
