let playerScore = 0;
let computerScore = 0;
let roundNum = 0;
let userWins = 0;
let gamesPlayed = 0;
let winRate = 0;

//Selecting score box
scoreText = document.querySelector("#gameScore");



// Naming User and Computer Scores to update
const resultPlayer = document.querySelector('#playerScore');
resultPlayer.textContent = "Player Score: " + playerScore;
const resultComputer = document.querySelector('#computerScore');
resultComputer.textContent = "Computer Score: " + computerScore;


// Selecting the inapp message for the game
const inApp = document.querySelector('#inApp');
const finalResult = document.querySelector('.finalResult');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');



// Selecting the player's choice
let selection = document.querySelector('#buttons');
selectionListen = selection.addEventListener('click', function (e) {
    roundNum++;
    console.log(roundNum);
    // const playAgainBtn = document.querySelector('.btn');
    // playAgainBtn.addEventListener('click', restartGame);
 // openModal();
    if (e.target.id === 'buttons') {
        return;
    }
    playerSelection = e.target.id;
    computerSelection = getComputerChoice();
    playRound(playerSelection, computerSelection);

    // End game if any score 5
    if (playerScore == 5 || computerScore == 5) {
        game();
        return;
    }
});



//Generating the random selection for computer
function getComputerChoice() {
    let arr = ['rock', 'paper', 'scissor'];
    let randomARR = arr[Math.floor(Math.random() * arr.length)];
    return randomARR;
}

/// Play the round and display the result
const result = document.querySelector('#result');
const playerPlayed = document.querySelector('#playerPlayed');
const computerPlayed = document.querySelector('#computerPlayed');



function playRound(playerSelection, computerSelection) {
    function played() {
        playerPlayed.textContent = `You played : ${playerSelection}`;
        computerPlayed.textContent = `Computer played : ${computerSelection}`;
    }

    if (playerSelection === computerSelection) {
        result.textContent = "Hey! It's a tie, let's try one more time";
        played();
    } else if (playerSelection === 'rock' && computerSelection === 'scissor') {
        result.textContent = "You Win! Rock beats Scissor";
        playerScore++;
        resultPlayer.textContent = "Player Score: " + playerScore;
        played();
    } else if (playerSelection === 'paper' && computerSelection === 'rock') {
        result.textContent = "You Win! Paper beats Rock";
        playerScore++;
        resultPlayer.textContent = "Player Score: " + playerScore;
        played();
    } else if (playerSelection === 'scissor' && computerSelection === 'paper') {
        result.textContent = "You Win! Scissor beats Paper";
        playerScore++;
        resultPlayer.textContent = "Player Score: " + playerScore;
        played();
    } else {
        result.textContent = `You lose! ${computerSelection} beats ${playerSelection}`;
        computerScore++;
        resultComputer.textContent = "Computer Score: " + computerScore;
        played();
    }
}




function game() {
    if (playerScore > computerScore) {
        result.textContent = "You Win 😄";
        userWins++;
        gamesPlayed++;
    } else if (playerScore === computerScore) {
        result.textContent = "It's a tie 😬";
        gamesPlayed++;
    } else if (playerScore < computerScore) {
        result.textContent = "You Lose 🥺";
        gamesPlayed++;
    }
    scoreText.textContent = Math.round((userWins/gamesPlayed)*100,2)+"%";
    window.localStorage.setItem("rpsScore", scoreText.textContent);
    playerScore = 0;
    computerScore = 0;
    roundNum = 0;
    resultPlayer.textContent = "Player Score: 0";
    resultComputer.textContent = "Computer Score: 0 ";
    return;

}

function openModal() {

    overlay.style.display = "block";
    modal.style.display = "block";
}


function restartGame() {
    window.location.reload();
}


function timeFunction() {
    setTimeout(function () {
        return;
    }, 2000);
}