var tid = setInterval(function() {
	if (document.readyState !== 'complete') return;
	clearInterval(tid);
	gameLogic();
}, 100);


function gameLogic() {
	var RG = RandomGenerator();
	var randomWord = RG.generateRandomWord();
	document.getElementById('word-blanks').innerHTML = RG.generateUnderscore(randomWord);
	document.onkeypress = function(e) {
		var userInput = String.fromCharCode(e.keyCode).toLowerCase();
		if (!/[a-z]/.test(userInput)) return;

	};
};

var State = function() {
	var numberOfGuesses;
	var lettersGuessed;
	var gameOver;

	return {
		initializeState: function() {
			// implement hard/easy mode, which changes numberOfGuesses
			// Create HTML input to allow user to choose level of difficulty
			numberOfGuesses = 12;
			lettersGuessed = [];
			gameOver = false;
		},
		resetState: function() {
			this.initializeState();
		}
		isGameOver: function() {
			return gameOver;
		},
		decrementGuesses: function() {
			numberOfGuesses--;
			return numberOfGuesses;
		},
		addLetterGuesses: function(letter) {
			if (this.isGameOver()) {
				alert('Game over');
				return;
			}
			lettersGuessed.push(letter);
			return lettersGuessed;
		}
	}
};

var RandomGenerator = function() {
	return new RandomGenerator.init();
}

RandomGenerator.init = function() {
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
	}

	return this;
};

