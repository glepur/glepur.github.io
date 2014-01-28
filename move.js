
var x = 300;
var y = 400;
var accX=0, accY=0;
var moveX=0, moveY=0;

scoutX = 0;
scoutY = 0;

//////////////////  MOVEMENT  //////////////////

function setMovement(){

    accDiff = 6;
    max = 90;

    if(accX>max) accX = max;
    if(accX<-max) accX = -max;
    if(accY>max) accY = max;
    if(accY<-max) accY = -max;

    if(accX<=max&&accX>=-max){
        if(control.d) accX += accDiff;
        if(control.a) accX -= accDiff;
        moveX = nthroot(accX,3)*timeDiff;
    }
    if(accY<=max&&accY>=-max){
        if(control.w) accY -= accDiff;
        if(control.s) accY += accDiff;
        moveY = nthroot(accY,3)*timeDiff;
    }

    if(accX>0&&!control.d&&!control.a) accX -= accDiff;
    if(accX<0&&!control.d&&!control.a) accX += accDiff;
    if(accY>0&&!control.w&&!control.s) accY -= accDiff;
    if(accY<0&&!control.w&&!control.s) accY += accDiff;

    if(accX<50&&accX>-50&&!control.d&&!control.a) accX = 0;
    if(accY<50&&accY>-50&&!control.w&&!control.s) accY = 0;
}

function playerMoveX(){
    if(control.d||control.a||moveX>3.5||moveX<-3.5) { //console.log(moveX);
        if(!control.w&&!control.s&&!accY) x +=moveX;
        else x += moveX*0.7;
    }
}

function playerMoveY(){
    if(control.w||control.s||moveY>3.5||moveY<-3.5) { //console.log(moveY);
        if(!control.a&&!control.d&&!accX) y +=moveY;
        else y += moveY*0.7;
    }
}

function mapMovement(){
    if(x>(c.width/2)&&mapX>=(c.width-1560)&&accX>0){
        mapX -= moveX;
        if(mapX<(c.width-1560))
            mapX = c.width-1560;

        if(mapX!==(c.width-1560))
            x= c.width/2;
    }
    if((x<=(c.width/2))&&(mapX<=0)&&(accX<0)){
        mapX -= moveX;
        if(mapX>0)
            mapX = 0;

        if(mapX!==0)
            x= c.width/2;
    }

    if(y<(c.height/2)&&mapY<=0&&accY<0){
        mapY -= moveY;
        if(mapY>0)
            mapY = 0;

        if(mapY!==0)
            y= c.height/2;
    }
    if((y>=(c.height/2))&&mapY>=(c.height-1024)&&(accY>0)){
        mapY -= moveY;
        if(mapY<(c.height-1024))
            mapY = c.height-1024;

        if(mapY!==(c.height-1024))
            y= c.height/2;
    }
}

function walkEffect(walk){
    if(control.w||control.a||control.s||control.d){
        if(walk.val>=0.12){ walk.val= 0.12; walk.is = false; }
        if(walk.val<=-0.12){ walk.val= -0.12; walk.is = true; }
        if(walk.is==false) walk.val-=0.03;
        if(walk.is==true) walk.val+=0.03;
    }
    return walk;
}

function camera(){

}