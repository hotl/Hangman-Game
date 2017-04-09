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
		var userInput = e.which || e.keyCode;
		userInput = String.fromCharCode(userInput);
		alert(userInput + ' was pressed');
	}
};

var State = function() {
	var numberOfGuesses = 12;
	var lettersGuessed = [];
	var gameOver = false;

	return {
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

