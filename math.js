
var cursorX,cursorY;

var currTime=0, timeDiff=0;

//////////////////  MOUSE  //////////////////////

document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY;
};

////////////////// MATH  //////////////

function nthroot(number, n) {
    try {
        var negate = n % 2 == 1 && number < 0;
        if(negate)
            number = -number;
        var possible = Math.pow(number, 1 / n);
        n = Math.pow(possible, n);
        if(Math.abs(number - n) < 1 && (number > 0 == n > 0))
            return negate ? -possible : possible;
    } catch(e){}
}

function cAngle(x,y,cx,cy){
    dx=cx-x;
    dy=cy-y;
    return Math.atan2(dy,dx);
}

function distance(x1,y1,x2,y2){
    dx = Math.abs(x1-x2);
    dx *= dx;
    dy = Math.abs(y1-y2);
    dy *= dy;
    return Math.sqrt(dx+dy);
}

//////////////  CLOCK  /////////////////

function clock(){
    timeDiff = (new Date().getTime()-currTime)*60/1000;
    currTime = new Date().getTime();
}



