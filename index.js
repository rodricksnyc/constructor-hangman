let inquirer = require('inquirer')
let isLetter = require('is-letter')
let Word = require('./word.js')
let Game = require('./game.js')

let hangManDisplay = Game.animal.hangman;

let wordBank = Game.animal.wordList;
let guessesRemaining = 10;
let guessedLetters = [];
let display = 0;
let currentWord;

function startGame() {
    console.log('Welcome to Hangman. The words are animals')
    if (guessedLetters.length > 0) {
        guessedLetters = []
    }

    inquirer.prompt([
        {
            name: 'play',
            type: 'confirm',
            message: "Let's begin!"
        }
    ]).then(function (answer) {
        if (answer.play) {
            console.log('')
            console.log('You have 10 guesses to guess the correct animal')
            newGame()
        } else {
            console.log('Sorry you don"t want to play')
        }
    })
}
startGame()

function newGame() {
    if (guessesRemaining === 10) {

        let randNum = Math.floor(Math.random() * wordBank.length)
        currentWord = new Word(wordBank[randNum])
        currentWord.getLetters();
        console.log(currentWord.animalWord())
        promptUser();
    } else {
        resetGuessesRemaining();

        newGame();
    }
}

function resetGuessesRemaining() {
    guessesRemaining = 10
}

function promptUser() {
    inquirer.prompt([
        {
            name: 'chosenLetter',
            type: 'input',
            message: 'Choose a letter',
            validate: function(value) {
                if (isLetter(value)) {
                    return true
                } else {
                    return false
                }
            }
        }
    ]).then(function(ltr) {

        let letterReturned = (ltr.chosenLetter).toUpperCase()
        let guessedAlready = false
        console.log(letterReturned)
        //   console.log(guessedLetters)
        // for (let i = 0; i < guessedLetters.length; i++) {
            // if(ltr.chosenLetter.toUpperCase() === guessedLetters[i]) {
            //     guessedAlready = true
            // }
            if (guessedLetters.indexOf(letterReturned) > -1) {
                guessedAlready = true

            }


        // }

        if (guessedAlready === false) {

            guessedLetters.push(letterReturned)

            let found = currentWord.checkIfLetterFound(letterReturned)

            if (found === 0) {
                console.log('Sorry, wrong guess')
                guessesRemaining--;
                display++
                console.log('You have ' + guessesRemaining + ' guesses remaining.')
                console.log(currentWord.animalWord())
                console.log('Letters guessed: ' + guessedLetters)

            } else {
                console.log('You"re correct')

                if (currentWord.checkWord() === true) {
                    console.log(currentWord.animalWord())
                    console.log('You won!');
                    startGame();
                } else {
                    console.log('Guesses remaining: ' + guessesRemaining)
                    console.log(currentWord.animalWord())
                    console.log('Letters guessed: ' + guessedLetters)
                    promptUser();
                }
            }

            if (guessesRemaining > 0 && currentWord.wordFound === false) {
                promptUser();
            } else if (guessesRemaining === 0) {
                console.log('Sorry, the game is over!');
                console.log('The correct word was: ' + currentWord.word);
                newGame();
            }
        } else {
            console.log('You have already guessed that letter')
            guessedAlready = false;
            promptUser();
        }
    })
}
