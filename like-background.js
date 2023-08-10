$(document).ready(function () {

    // Background color change if already exist
    if (localStorage.getItem("color")) {
        $("#play-env").css("background-color", localStorage.getItem("color"));
        // checking if color is dark to change the font color
        if (localStorage.getItem("color") == "#000000") {
            $("#game-title").css("color", "white");
            $("#like-num").css("color", "white");
            $("#game-author").css("color", "white");
        }
    }
    // Background change button - reveal color selector
    $("#fillBtn").click(function () {
        // display color selector
        $("#background").toggle();
        $("#remove-bkg").toggle();
        // toggling image change (cross and button: if one - set second)
        $(this).attr("src", (_, attr) => attr == "images/fill-button.png" ? "images/close-btn.png" : "images/fill-button.png");

    });

    // Change background color according to selected color
    $("#background").change(function () {
        // get color value
        var color = $(this).val();
        // save color value to local storage
        localStorage.setItem("color", color);


        // check if color is dark to change the font color (sorry, very primitive way. Works well with Safari)
        if (color == "#000000" || color == "#232323" || color == "#444444" || color == "#00364a" || color == "#11053b" || color == "#1a0a53" || color == "#001e57" || color == "#002e7a" || color == "#2c1376" || color == "#371a94" || color == "#2e073e" || color == "#450e59" || color == "#3c081b" || color == "#561029") {
            $("#game-title").css("color", "white");
            $("#like-num").css("color", "white");
            $("#game-author").css("color", "white");
        } else {
            $("#game-title").css("color", "black");
            $("#like-num").css("color", "black");
            $("#game-author").css("color", "black");
        }

        // change background color
        $("#play-env").css("background-color", color);
    });


    // Reset background color
    $("#remove-bkg").click(function () {
        $("#play-env").css("background-color", "white");
        $("#game-title").css("color", "black");
        $("#like-num").css("color", "black");
        $("#game-author").css("color", "black");
        localStorage.removeItem("color");
    }
    );

    // Like button
    $("#likeBtn").click(function () {
        // calculate likes
        var likeNum = $("#like-num").text();
        likeNum = parseInt(likeNum);


        // change image
        if ($(this).attr("src") == "images/like-button.png") {
            $(this).attr("src", "images/liked-button.png");
            $("#like-num").text(likeNum + 1);
        } else {
            $(this).attr("src", "images/like-button.png");
            $("#like-num").text(likeNum - 1);
        }



    }


    );
});