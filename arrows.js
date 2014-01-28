
var shoot = false;
var arrows = new Array();
var arrowSpeed = 9;

//////////////////  ARROWS  //////////////////

function shootArrow(){
    if(shoot){

        angle = cAngle(x,y,cursorX,cursorY);

        arrows.push({x:x-mapX,y:y-mapY,angle:angle,distance:0,maxDist:2000});

        shoot=false;
    }

    var arrNumber = arrows.length;
    for(i=0;i<arrNumber;i++){
        arrows[i].distance += arrowSpeed*timeDiff;
        if(arrows[i].distance>arrows[i].maxDist) {arrows.splice(i,1); arrNumber--;}
    }

}

function drawArrows(){
    var arrNumber = arrows.length;
    for(i=0;i<arrNumber;i++){
        drawArrow(arrows[i].x,arrows[i].y,arrows[i].angle,arrows[i].distance);
    }
}

function secureArrHit(){
    arrowObjHit();
    shootArrow();
    arrowObjHit();
    shootArrow();
    drawArrows();
}