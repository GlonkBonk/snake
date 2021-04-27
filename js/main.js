

let boardSize = 13;
let board = document.getElementById("board");
let keyboardInput = document.getElementById("keyboardInput");
let direction = 0;
let foodIsEaten = true;
let snakePosition = { x: Math.floor(boardSize / 2), y: Math.floor(boardSize / 2) };
let foodPosition = { x: 0, y: 0 };

let snakePositions = [];
snakePositions.push("x" + snakePosition.x + "y" + snakePosition.y);

function drawBoard() {
    //de drawboard maakt het speelveld en geeft elke vakje een unieke id 
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            board.innerHTML += "<div id='x" + x + "y" + y + "' class='cell'>x" + x + "y" + y + "</div>";
        }
        board.innerHTML += "<br>";
    }
}

function clearBoard() {
    //clearBoard deze functie haald alle unieke divs uit de cell (deze is functie is nodig om het spel tespelen)
    /*
    for (let j = 0; j < boardSize; j++) {
        for (let i = 0; i < boardSize; i++) {
            let snakeId = "x" + i + "y" + j;
            document.getElementById(snakeId).className = "cell";
        }
    }
    */

    document.querySelectorAll('.cell').forEach(function (cell) {
        cell.className = "cell";
    });

}



function updatesnakePosition() {

     //deze functie geeft aan dat de snake in een van 4 posities moet bewegen als er een knop in gedrukt wordt

    if (direction == 1) {
        snakePosition.y = snakePosition.y - 1;
    }
    if (direction == 2) {
        snakePosition.y = snakePosition.y + 1;
    }
    if (direction == 3) {
        snakePosition.x = snakePosition.x + 1;
    }
    if (direction == 4) {
        snakePosition.x = snakePosition.x - 1;
    }

    snakePositions.shift();
    snakePositions.push("x" + snakePosition.x + "y" + snakePosition.y);

}



function resetGame() {
    //direction = [0,0]; //alternatief
    //deze functie zorgt er voor dat de directie de slang eerst had gerest wordt en wacht tot dat er een nieuwe directie ingevoerd wordt en de slang wordt naar het midden van het speel veld gestuurd
    direction = 0;
    snakePosition = { x: Math.floor((boardSize - 1) / 2), y: Math.floor((boardSize - 1) / 2) };
    snakePositions = [];
    snakePositions.push("x" + snakePosition.x + "y" + snakePosition.y);
}



function collisionCheck() {
    
    //deze functie checkt elke als de slang beweegt of hij buiten het speel veldt is, als dat gebeurd dan activeerd de reset game functie

    if (snakePosition.x < 0 || snakePosition.y < 0 || snakePosition.x > boardSize - 1 || snakePosition.y > boardSize - 1) { resetGame() }

    //deze functie checked of het hoofd van de slang het lijf aanraakt, als dat gebeurd dan gaat de resetgame functie aan

    let snakePositionControle = "x"+snakePosition.x+"y"+snakePosition.y;
    
    for(let i=0;i<snakePositions.length-1;i++)
    {
        if (snakePositionControle==snakePositions[i])
        {
            
            resetGame();
        }
    }


}

//drawSnake

function drawSnake()
   //deze functie zorgt ervoor dat de hoofd en staart van het slang in het spel komt
   {
    //let snakeHeadsnakePosition = "x" + snakePosition.x + "y" + snakePosition.y;
    //document.getElementById(snakeHeadsnakePosition).className += " bodySnake";
    for (let i = 0; i < snakePositions.length; i++) {
        if (i == 0) {
            
           
            //document.getElementById(snakePositions[i]).className += " bodyTail";
            //document.getElementById(snakePositions[i]).className += " bodyHeadDirection" + direction;
      
        }
        if (i == snakePositions.length - 1) {
            
            document.getElementById(snakePositions[i]).className += " bodyHead";
            document.getElementById(snakePositions[i]).className += " bodyHeadDirection" + direction;
        }
        //console.log(snakePositions[i]);
        document.getElementById(snakePositions[i]).className += " bodySnake";
    }

    document.getElementById("keyboardInput").innerHTML = snakePositions.length;

}

//drawFood

function drawFood()
//deze functie zorgt er voor dat er willekurig op het veldt een stuk eten voor de slang komt dit gebeurd elke keer dat de snake een punt eet   
{
    if (foodIsEaten) {
        //
        //
        let xRandom = Math.floor(Math.random() * (boardSize - 1));
        let yRandom = Math.floor(Math.random() * (boardSize - 1));
        foodPosition.x = xRandom;
        foodPosition.y = yRandom;
        foodIsEaten = false;
    }
    let foodPositionID = "x" + foodPosition.x + "y" + foodPosition.y;
    document.getElementById(foodPositionID).className += " food";
}

function snakeEatsFood() 
//deze functie zorgt ervoor dat als de snake een punt eet dat hij dan langer wordt
{
    if (snakePosition.x == foodPosition.x && snakePosition.y == foodPosition.y) {
      
        foodIsEaten = true;
        snakePositions.push("x" + snakePosition.x + "y" + snakePosition.y);
        //console.log(snakePositions);
    }
}



//gameLoop
let timeCounter = 0;
function gameLoop() {

    updatesnakePosition();
    collisionCheck();
    clearBoard();
    drawFood();
    drawSnake();
    snakeEatsFood();

    timeCounter++;
    var timeoutTime = 550 - snakePositions.length * 30 - timeCounter / 2;
    if (timeoutTime < 100) {
        timeoutTime = 100;
    }
    //console.log(timeoutTime);
    setTimeout(gameLoop, timeoutTime);
}



drawBoard();

// setInterVal werkt niet als je de slang sneller wilt laten gaan...
//setInterval(gameLoop, 550-snakePositions.length*100);//500 450 400 350 300



setTimeout(gameLoop, 0);



window.addEventListener("keydown", function (event) {
//deze functie zorgt er voor dat de pijltjes toetsen gelinked zijn aan de directie waarden de snake volgdt 
    if (event.key == "ArrowUp") {
        //direction = [0,-1]; //alternatief
        if (direction != 2) {
            direction = 1;
        }
    }
    if (event.key == "ArrowDown") {
        //direction = [0,1]; //alternatief
        if (direction != 1) {
            direction = 2;
        }
    }
    if (event.key == "ArrowRight") {
        //direction = [1,0]; //alternatief
        if (direction != 4) {
            direction = 3;
        }
    }
    if (event.key == "ArrowLeft") {
        //direction = [-1,0]; //alternatief
        if (direction != 3) {
            direction = 4;
        }

    }

   
    keyboardInput.innerHTML = "direction:" + direction;
}, true);