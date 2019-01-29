var Word = require("./word.js");
var inquirer = require("inquirer");

var letterArray = "abcdefghijklmnonpqrstuvwxyz";

var mamalsInAZoo = [
    "gorilla",
    "elephant",
    "tiger",
    "lion",
    "zebra",
    "giraffe",
    "wolf",
    "lama",
    "polar bear",
    "jaguar",
    "cheetah",
    "emu",
    "monkey",
    "leopard",
    "camel",
    "koala",
    "rhinoceros",
    "lemurs"
];

var randomIndex = Math.floor(Math.random() * mamalsInAZoo);
var randomWord = mamalsInAZoo[randomIndex];

var computerWord = new Word(randomWord);

var requireNewWord = false;
var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 10;

function theLogic() {
    if (requireNewWord) {
        var randomIndex = Math.floor(Math.random() * mamalsInAZoo.length);
        var randomWord = mamalsInAZoo[randomIndex];

        computerWord = new Word(randomIndex);

        requireNewWord = false;
    }

    var workComplete = [];

    if (wordComplete.includes(false)) {
        inquirer.prompt([
            {
                type: "input",
                message: "Select letter from A to Z",
                name: "userinput"
            }
        ])
            .then(function (input) {
                if (
                    letterArray.includes(input.userinput) ||
                    input.userinput.length > 1
                ) {
                    console.log("\nPlease try again\n");
                    theLogic();
                }
                else {
                    if (
                        incorrectLetters.includes(input.userinput) ||
                        correctLetters.includes(input.userinput) ||
                        input.userinput === ""
                    ) {
                        console.log("\nAlready Guessed or Nothing was Entered\n");
                        theLogic();
                    }
                    else {
                        var wordCheckArray = [];
                        computerWord.userGuess(input.userinput);
                        computerWord.objArray.forEach(wordcheck);
                        if (wordCheckArray.join("") === wordComplete.join("")) {
                            console.log("\nIncorrect\n");
                            correctLetters.push(input.userinput);
                        }
                        computerWord();

                        console.log("Guesses Left: " + guessesLeft + "\n");
                        console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");

                        if (guessesLeft > 0) {
                            theLogic();
                        }
                        else {
                            console.log("You have lost\n")
                        }
                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            });
    } else {
        console.log("You won!")
    }
    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }
function restartGame () {
    inquirer.prompt ([
        {
            type: "list",
            message: "Would you like to:",
            choices: ["play again", "exit"],
            name: "restart"
        }
    ])
    .then(function(input) {
        if (input.restart === "play again") {
            requireNewWord = true;
            incorrectLetters = [];
            correctLetters = [];
            guessesLeft = 10;
            theLogic();
        }
        else {
            return;
        }
    })
}
}
theLogic();
