let Letter = require('./letter.js')

function Word(realWord) {
    this.word = realWord
    this.letters = []
    this.wordFound = false
    this.getLetters = function () {
        for (let i = 0; i < this.word.length; i++) {
            let newLetter = new Letter(this.word[i]);
            this.letters.push(newLetter);
        }
    }
    this.checkWord = function () {
        if (this.letters.every(function (realLetter) {
            return realLetter.appear === true;
        })) {
            this.wordFound = true;
            return true;
        }
    }
    this.checkIfLetterFound = function (guessedLetter) {
        let whatToReturn = 0
        this.letters.forEach(function (realLetter) {
            if (realLetter.letter === guessedLetter) {
                realLetter.appear = true
                whatToReturn++
            }
        })
        return whatToReturn
    }

    this.animalWord = function () {
        let display = ''
        this.letters.forEach(function (realLetter) {
            let currentLetter = realLetter.letterRender()
            display += currentLetter
        })
        return display
    }
}

module.exports = Word
