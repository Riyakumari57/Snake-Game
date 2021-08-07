
//Game vars
let inputDir = { x: 0, y: 0 };
const foods = new Audio('food.wav');
const gameover = new Audio('game-over.wav');
const moves = new Audio('move.wav');
const music = new Audio('bg.wav');
let score = 0;
let speed = 5;
let lastPaintTime = 0;
let board = document.getElementById('board');
let scoreBox = document.getElementById('scoreBox');
let HighscoreBox = document.getElementById('highscoreBox');
let highscoreVal = 0;
let snakeArray =
    [
        {
            x: 13,
            y: 15
        }
    ]
let food = { x: 6, y: 7 };
// game loop


//game functions


// ctime property is an inbuilt application programming interface of the 
// fs. Stats class that is used to get the timestamp when the file status has been changed last time. Syntax: stats.ctime.

// Last Paint time : tym when screen got printed lastly 
function main(ctime) {
    window.requestAnimationFrame(main);
   // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }

    lastPaintTime = ctime;
    gameengine();
    // console.log(ctime);
}

function isCollide(snake)
{
    // if snake bump itself

    for (let i= 1; i < snakeArray.length; i++) {
        //const element = array[index];
        if(snake[i].x == snake[0].x  && snake[i].y == snake[0].y)
        {
            return true;
        }
    }
        
        if(snake[0].x>18 || snake[0].x<0 || snake[0].y>18 || snake[0].y<0 ) 
        {
            return true;
        }
        
            return false;
        
    
}

function gameengine() {
    //part 1 : Upadting the snake variable and food

       
    if(isCollide(snakeArray))
    {
        music.pause();
        gameover.play();
        
        inputDir = { x: 0, y: 0 };
        alert("Game Over . Press any key to play again");
        snakeArray =  [
            {
                x: 13,
                y: 15
            }
        ];
        music.play();
        score = 0;
    }
    

    //if eaten food
    if(snakeArray[0].y == food.y && snakeArray[0].x == food.x)
    {
        foods.play();
        score++;
        if(score>highscoreVal)
        {
            highscoreVal = score;
            localStorage.setItem("Highscore" , JSON.stringify(highscoreVal));
            HighscoreBox.innerHTML = "High Score: "+ highscoreVal;
        }
        scoreBox.innerHTML ="Score: " + score;
        snakeArray.unshift({x:snakeArray[0].x+inputDir.x , y : snakeArray[0].y + inputDir.y});
        let a = 2;
        let b = 16 ;
        //generating random number between a and b
        food = { x : 2+ Math.round(a+(b-a)*Math.random()) ,  y : 2+ Math.round(a+(b-a)*Math.random())};
    }


   //moving snake

   for (let i = snakeArray.length - 2; i>=0; i--) {
     //  const element = array[i];
       snakeArray[i+1] = {...snakeArray[i]};
       
   }
    snakeArray[0].x +=inputDir.x;
    snakeArray[0].y +=inputDir.y;

    //Part 2 : Display the snake and food

    //Display snake
    board.innerHTML = "";
    snakeArray.forEach((ele, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = ele.y;
        snakeElement.style.gridColumnStart = ele.x;
        if (index == 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });


    //Display food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



let  highScore = localStorage.getItem("Highscore");
if(highScore == null)
{
    highscoreVal = 0;
    localStorage.setItem("Highscore" , JSON.stringify(highscoreVal));
}
else
{
    highscoreVal = JSON.parse(highScore);
    HighscoreBox.innerHTML = "High Score: "+ highscoreVal;
}


// Main logic statrts from here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } // start the game
    moves.play();
    music.play();
    switch (e.key) {
        case "ArrowUp": console.log('Arrow up');
        inputDir.x = 0;
        inputDir.y = -1;
            break;
        case "ArrowDown": console.log('Arrow down');
        inputDir.x = 0;
        inputDir.y = 1;
            break;
        case "ArrowLeft": console.log('Arrow Left');
        inputDir.x = -1;
        inputDir.y = 0;
            break;
        case "ArrowRight": console.log('Arrow Right');
        inputDir.x = 1;
        inputDir.y = 0;
            break;
        default: console.log('Hey please check');
            break;
    }
});
