//Rock paper scissors html

const rockPaperScissorsHtml = 
'<section class="game-container"> <><div id="scores"><div id="player"><div id="playerScore"></div><div id="playerPlayed">are you ready?</div></div><div id="computer"><div id="computerScore"></div><div id="computerPlayed">🐔</div></div></div><div id="result">First to score 5 points wins the game</div><div class="gameContainer"><span class="choose"> Choose your weapon:</span><div id="buttons"><button id="rock" class="btn">✊</button><button id="paper" class="btn">🖐</button><button id="scissor" class="btn">✌️</button></div></section>';



//The Title of the game will be updated 
//Ranking will be updated 


//Select all game containers and create an array
// let gamesArray  = Array.from(document.querySelectorAll('[id*="Game"'));
let containerArray = [...document.querySelectorAll("#snakeGame > img , #puzzleGame > img, #rockGame > img")];



//Add Event Listener to the array of links with the games and loop trough all of them and depending on the game clicked 

containerArray.forEach(function(container) { 
    container.addEventListener("click" ,function() {
        let id = container.alt;
        if(id.includes("puzzle")) {
            console.log("puzzle pressed");
            localStorage.setItem("script",'./Puzzle/sketch.js');
            localStorage.setItem("gameName",'Puzzle Game');
        }
        else if(id.includes("snake")) {
            console.log("snake pressed");
            localStorage.setItem("script",'./SnakeGame/snake.js');
            localStorage.setItem("gameName",'Snake Game');
        }
        else if(id.includes("stone")){
            console.log("rps pressed");
            localStorage.setItem("gameName",'Rock Paper Scissors Game');
            localStorage.setItem("htmlData",rockPaperScissorsHtml);
            localStorage.setItem("script",'./Rock-Papper-Scissors/script.js');
            
        }
        else (alert("Error Game not Available"));
    });
});









