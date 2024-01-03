const gameBoard=document.querySelector("#gameBoard");
const ctx=gameBoard.getContext("2d");
const scoreText=document.querySelector("#scoreText");
const resetBtn=document.querySelector("#resetBtn");
const gameWidth=gameBoard.width;
const gameheight=gameBoard.height;
const boardBackground="white";
const snakecolor="lightyellow";
const snakeborder="black";
const foodcolor="blue";
const unitsize=25;
let running=false;
let xvelocity=unitsize;
let yvelocity=0;
let foodx;
let foody;
let score=0;
let snake=[
    {x:unitsize*4,y:0},
    {x:unitsize*3,y:0},
    {x:unitsize*2,y:0},
    {x:unitsize,y:0},
    {x:0,y:0}
];
window.addEventListener("keydown",changedirection);
resetBtn.addEventListener("click",resetgame);
gamestart();

function gamestart(){
    running=true;
    scoreText.textContent=score;
    createfood();
    drawfood();
    nexttick();
};
function nexttick(){
    if(running){
        setTimeout(()=>{
            clearboard();
            drawfood();
            movesnake();
            drawsnake();
            checkgameover();
            nexttick();

        },100);
    }
    else{
        displaygameover();
    }
};
function clearboard(){
    ctx.fillStyle=boardBackground;
    ctx.fillRect(0,0,gameWidth,gameheight);
};
function createfood(){
    function randomfood(min,max){
       const randnum=Math.round(Math.random()*((max-min)+min)/unitsize)*unitsize;
       return randnum;
    }
    foodx=randomfood(0,gameWidth-unitsize);
    foody=randomfood(0,gameWidth-unitsize);

};
function drawfood(){
    ctx.fillStyle=foodcolor;
    ctx.fillRect(foodx,foody,unitsize,unitsize);
};
function movesnake(){
    const head={x: snake[0].x+xvelocity,
    y:snake[0].y+yvelocity};
    snake.unshift(head);
    if(snake[0].x==foodx&&snake[0].y==foody){
        score++;
        scoreText.textContent=score;
        createfood();
    }
    else{
        snake.pop();
    }
};
function drawsnake(){
    ctx.fillStyle=snakecolor;
    ctx.strokeStyle=snakeborder;
    snake.forEach(snakePart=>{
        ctx.fillRect(snakePart.x,snakePart.y,unitsize,unitsize );
        ctx.strokeRect(snakePart.x,snakePart.y,unitsize,unitsize );
    });
};
function changedirection(event){
    const keypressed=event.keyCode;
    const LEFT=37;
    const RIGHT=39;
    const UP=38;
    const DOWN=40;


    const goingup=(yvelocity==-unitsize);
    const goingdown=(yvelocity==unitsize);
    const goingright=(xvelocity==unitsize);
    const goingleft=(xvelocity==-unitsize);
    switch(true){
        case(keypressed==LEFT&&!goingright):
           xvelocity=-unitsize;
           yvelocity=0;
           break;
        case(keypressed==UP&&!goingdown):
           xvelocity=0;
           yvelocity=-unitsize;
           break;
        case(keypressed==RIGHT&&!goingleft):
           xvelocity=unitsize;
           yvelocity=0;
           break;
        case(keypressed==DOWN&&!goingup):
           xvelocity=0;
           yvelocity=unitsize;
           break;
    }

};
function checkgameover(){
    switch(true){
        case (snake[0].x<0):
            running=false;
            break;
        case (snake[0].x>=gameWidth):
            running=false;
            break;
        case (snake[0].y<0):
            running=false;
            break;  
        case (snake[0].y>=gameheight):
            running=false;
            break;  
    }
    for(let i=1;i<snake.length;i++){
        if(snake[i].x==snake[0].x&&snake[i].y==snake[0].y){
            running=false;
        }
    }
};
function displaygameover(){
    ctx.font="50px MV Boli";
    ctx.fillStyle="black";
    ctx.textAlign="center";
    ctx.fillText("GAME OVER!!",gameWidth/2,gameheight/2);
    running=false;
};
function resetgame(){
    score=0;
    xvelocity=unitsize;
    yvelocity=0;
    snake=[
        {x:unitsize*4,y:0},
        {x:unitsize*3,y:0},
        {x:unitsize*2,y:0},
        {x:unitsize,y:0},
        {x:0,y:0}
    ];
    gamestart();

};
