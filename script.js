
var c=document.getElementById("Canvas");
var ctx=c.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var playerRadius = 30;
var playerWalk = {val:-0.35,is:true};

var playerImage = new Image();
playerImage.src = "img/player.png";

var arrowImage = new Image();
arrowImage.src = "img/arrow.png";

var cursorImage = new Image();
cursorImage.src = "img/target.gif";

var mapImage = new Image();
mapImage.src = "img/map.jpg";

var mapX = 0;
var mapY = c.height-1024;

///////////////  SIZE  ////////////////////////////

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

/////////   ANIMATION   ///////////////

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

(function animloop(){
    ctx.clearRect ( 0 , 0 , c.width , c.height );
    requestAnimFrame(animloop);
    clock();
    camera();
    playerMove();
    draw();
})();


//////////// DRAW STUFF  ///////////////////

function draw(){

    drawMap();
    drawPlayer();
    secureArrHit();
    drawCursor();
}

function drawMap(){
    ctx.save();
    ctx.drawImage(mapImage,mapX-scoutX,mapY-scoutY);
    ctx.restore();
}

function drawPlayer(){
    ctx.save();
    ctx.translate(x-scoutX,y-scoutY);

    angle = cAngle(x,y,cursorX,cursorY);

    ctx.rotate(angle+1.57079633+playerWalk.val);

    ctx.drawImage(playerImage,-28,-28);

    ctx.restore();
}

function drawArrow(arrX,arrY,r,distance){
    ctx.save();
    ctx.translate(arrX+mapX-scoutX, arrY+mapY-scoutY);
    ctx.rotate(r);
    ctx.drawImage(arrowImage,distance-50,-7);

    ctx.restore();
}

function drawCursor(){
    ctx.save();
    ctx.translate(cursorX,cursorY);
    ctx.drawImage(cursorImage,-10,-10);
    ctx.restore();
}

//////////////////  MOVEMENT  //////////////////

function playerMove(){

    playerWalk = walkEffect(playerWalk);

    playerObjHit();

    setMovement();

    mapMovement();

    if(areaLimitX()){
        playerMoveX();
    }
    if(areaLimitY()){
        playerMoveY();
    }
}

