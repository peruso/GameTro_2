let welcomeBackModal = document.querySelector(".wb-overlay");
let welcomeModal = document.querySelector(".welcome-overlay");
let userNameSpan = document.querySelector("#welcomeBack");

let userName = localStorage.getItem("gametroUserName");
let form = document.getElementById('askNameForm');




//form submit function
function formAction(e) {
    window.localStorage.setItem("gametroUserName", form.name.value);
    e.preventDefault();
}


(function setUser() {
    if (userName == null) { // validate if the user name is set
        welcomeModal.style.display = "block"; // display welcome modal
        

    } else {
        userNameSpan.textContent = userName; // Set user name on span element
        welcomeBackModal.style.display = "block"; // display modal
        document.querySelector(".front").addEventListener("click",function(e){ //event listener to play button to close modal
            e.preventDefault();
            welcomeBackModal.style.display = "none";}); 
    }
})();