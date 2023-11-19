//board
let board;
let boardWidth = 750;
let boardHeight = 250;
let context; 

//singel 
let snigelWidth = 88;
let snigelHeight = 94; 
let snigelX = 50;
let snigelY = boardHeight - snigelHeight;
let snigelImg;


let snigel = { 
    x : snigelX,
    y : snigelY,
    width : snigelWidth,
    height : snigelHeight    
}

//staket
let staketArray=[];

let staketWidth = 34;

let staketHeight = 70;
let staketX = 700;
let staketY = boardHeight - staketHeight;

let staketImg;

//Physics
let velocityX = -8;
let velocityY = 0;
let gravity = .4;

let gameOver = false
let score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");///used for drawing on the board 

    //draw initial singel 
    //context.fillStyle="green";
    // context.fillRect(snigel.x, snigel.y, snigel.width, snigel.height);

   snigelImg = new Image();
   snigelImg.src = "C:/Users/sanas/OneDrive/Desktop/ling_ling/img/snail_00.png"; 
   snigelImg.onload = function() { 
       context.drawImage(snigelImg, snigel.x, snigel.y, snigel.width, snigel.height);
   }
   staketImg = new Image();
   staketImg.src ="C:/Users/sanas/OneDrive/Desktop/ling_ling/img/snigel-wood-fence.png";

   requestAnimationFrame(update);
   setInterval(placeStaket, 1000);
   document.addEventListener("keydown", moveSnigel);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver){
        return;
    }
    context.clearRect(0, 0, board.Width, board.Height);

    //snigel
    velocityY += gravity;
    snigel.y = Math.min(snigel.y + velocityY, snigelY);
    context.drawImage(snigelImg, snigel.x, snigel.y, snigel.width, snigel.height);

    //staket
    for (let i = 0; i < staketArray.length; i++) {
        let staket = staketArray[i];
        staket.x += velocityX;
        context.drawImage(staket.img, staket.x, staket.y, staket.width, staket.height);
         
        if (detectCollision(snigel, staket)) {
            gameOver = true;
            snigelImg.src = "C:/Users/sanas/OneDrive/Desktop/ling_ling/img/snail_00.png";
            snigelImg.onload = function(){
                context.drawImage(snigelImg, snigel.x, snigel.y, snigel.width, snigel.height);
            }
        }
    }
    //score 
    context.fillStyle="black";
    context.font="20px coourier";
    score++;
    context.fillText(score, 5, 20);
}
function rorsnigel(e){
    if (gameOver){
        return;
    }
    if ((e.code == "Space" || e.code == "ArrowUp") && snigel.y == snigelY) {
        //
        velocityY = -10;
    }
    else if (e.code == "ArrowDown" && snigel.y == snigelY){
        //duck 
    }

}
function placeStaket() {
    if (gameOver) {
        return;
    }

    //place cactus
    let staket = {
        img : null,
        x : staketX,
        y : staketY,
        width : null,
        height: staketHeight
    }

    let placeStaketChance = Math.random(); //0 - 0.9999...

    if (placeStaketChance > 1) { //10% you get cactus3
        staket.img = staketImg;
        staket.width = staketWidth;
        staketArray.push(staket);
    }

    if (staketArray.length > 5) {
        staketArray.shift(); //remove the first element from the array so that the array doesn't constantly grow
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
         
}
