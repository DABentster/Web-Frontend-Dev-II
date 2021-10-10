let gameEnd = false;

function placeMark(cellNum) {
    let player = document.getElementById("currentPlayer").innerHTML;
    if (gameEnd == false) {
        if (document.getElementById(cellNum).innerHTML != "O" &&
            document.getElementById(cellNum).innerHTML != "X") {
            document.getElementById(cellNum).innerHTML = player;
            checkWin();
            if (player == "X" && gameEnd == false) document.getElementById("currentPlayer").innerHTML = "O";
            else if (player == "O" && gameEnd == false) document.getElementById("currentPlayer").innerHTML = "X";
            else document.getElementById("currentPlayer").innerHTML = "";
        }
    }
}

const boxes = document.getElementsByClassName("box");

function checkWin() {
    if (
        boxes[0].innerHTML == boxes[1].innerHTML &&
        boxes[1].innerHTML == boxes[2].innerHTML &&
        boxes[0].innerHTML.trim() != ""
    ) {
        victor(boxes[0].innerHTML);
    } else if (
        boxes[3].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[5].innerHTML &&
        boxes[3].innerHTML.trim() != ""
    ) {
        victor(boxes[3].innerHTML);
    } else if (
        boxes[6].innerHTML == boxes[7].innerHTML &&
        boxes[7].innerHTML == boxes[8].innerHTML &&
        boxes[6].innerHTML.trim() != ""
    ) {
        victor(boxes[6].innerHTML);
    } else if (
        boxes[0].innerHTML == boxes[3].innerHTML &&
        boxes[3].innerHTML == boxes[6].innerHTML &&
        boxes[0].innerHTML.trim() != ""
    ) {
        victor(boxes[0].innerHTML);
    } else if (
        boxes[1].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[7].innerHTML &&
        boxes[1].innerHTML.trim() != ""
    ) {
        victor(boxes[1].innerHTML);
    } else if (
        boxes[2].innerHTML == boxes[5].innerHTML &&
        boxes[5].innerHTML == boxes[8].innerHTML &&
        boxes[2].innerHTML.trim() != ""
    ) {
        victor(boxes[2].innerHTML);
    } else if (
        boxes[0].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[8].innerHTML &&
        boxes[0].innerHTML.trim() != ""
    ) {
        victor(boxes[0].innerHTML);
    } else if (
        boxes[2].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[6].innerHTML &&
        boxes[2].innerHTML.trim() != ""
    ) {
        victor(boxes[2].innerHTML);
    } else if (
        boxes[0].innerHTML != "" &&
        boxes[1].innerHTML != "" &&
        boxes[2].innerHTML != "" &&
        boxes[3].innerHTML != "" &&
        boxes[4].innerHTML != "" &&
        boxes[5].innerHTML != "" &&
        boxes[6].innerHTML != "" &&
        boxes[7].innerHTML != "" &&
        boxes[8].innerHTML != ""
    ) {
        document.getElementById("message").innerHTML = "Tie Game";
        gameEnd = true;
    }
}

function victor(player) {
    document.getElementById("message").innerHTML = "Player " + player + " WON!";
    gameEnd = true;
}

function resetGame() {
    document.getElementById("0").innerHTML="";
    document.getElementById("1").innerHTML="";
    document.getElementById("2").innerHTML="";
    document.getElementById("3").innerHTML="";
    document.getElementById("4").innerHTML="";
    document.getElementById("5").innerHTML="";
    document.getElementById("6").innerHTML="";
    document.getElementById("7").innerHTML="";
    document.getElementById("8").innerHTML="";

    document.getElementById("currentPlayer").innerHTML = "X";
    document.getElementById("message").innerHTML = " ";
    gameEnd = false;
}