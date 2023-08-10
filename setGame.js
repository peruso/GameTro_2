/// DEFINING GAMES SCRIPTS //////

/// DEFINING GAMES TITLES //////

// getting Game's name
let gameName = localStorage.getItem("gameName");



// setting Games title
document.querySelector("#game-title").textContent = gameName;


// getting script from local storage
let scriptGame = localStorage.getItem("script");

// inserting script on the DOM with the game selected in the library page
function load_script() {
   var head = document.getElementsByTagName('head')[0];
   var script = document.createElement('script');
   script.setAttribute("defer", "defer");
   script.src = scriptGame;
   head.appendChild(script);
}



/// SETTING HTML FOR ROCK PAPER SCISSORS GAME//

// getting html 
let rockPaperScissorsHtml = localStorage.getItem("htmlData");



// filling game container text content with html data
//selecting game container
if (gameName.includes('Rock Paper Scissors Game')) {
   document.querySelector("#gameCanvas").innerHTML += rockPaperScissorsHtml;
}

load_script();




