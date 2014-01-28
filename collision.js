
var objects = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,2,2,2,0,0,0,0,0,0,2,2,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,2,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,2,2,2,2,2,2,0,0,0,0,0,0,2,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,2,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0],
    [0,0,0,0,2,0,0,0,0,0,0,0,2,2,0,0,0,0,0,2,2,0,0,0,0,0,0,2,0,0,0,0],
    [0,0,0,0,2,2,2,0,0,0,0,0,2,2,2,2,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0],
    [0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0]
];



/////////////  COLLISION ///////////////////


function areaLimitX(){
    if(x-playerRadius<0){ x=playerRadius+1; accX = 0; }
    if(x+playerRadius>c.width){ x=c.width-playerRadius; accX=0; }

    return x!=(playerRadius||(c.width-playerRadius))
}

function areaLimitY(){
    if(y-playerRadius<0) { y=playerRadius+1; accY = 0; }
    if(y+playerRadius>c.height) { y=c.height-playerRadius; accY = 0; }

    return y!=(playerRadius||(c.height-playerRadius))
}

function objCollide(clx,cly,rad){

    hit = {top:false,bottom:false,left:false,right:false};

    for(i=0;i<21;i++)
        for(j=0;j<32;j++)
            if(objects[i][j]==2){
                blockX = j*49+mapX;
                blockY = i*49+mapY;
                centerX = blockX+(49/2);
                centerY = blockY+(49/2);
                angle = cAngle(clx,cly,centerX,centerY);

               if((cly+rad)>blockY&&
                   (cly-rad)<(blockY+49)&&
                   (clx+rad)>blockX&&
                   (clx-rad)<(blockX+49)){

                   if(angle<0.785398163&&angle>-0.785398163) hit.left = blockX;

                   if(angle>2.35619449||angle<-2.35619449) hit.right = blockX;

                   if(angle>=0.785398163&&angle<=2.35619449) hit.top = blockY;

                   if(angle<-0.785398163&&angle>-2.35619449) hit.bottom = blockY;

                }

            }

    return hit;
}

function playerObjHit(){

    hit = objCollide(x,y,playerRadius);

    if(hit.top){
        y = hit.top-playerRadius-1; accY= 0;
        hit.top = false;
    }
    if(hit.bottom){
        y = hit.bottom+49+playerRadius+1; accY= 0;
        hit.bottom = false;
    }
    if(hit.left){
        x = hit.left-playerRadius-1; accX= 0;
        hit.left = false;
    }
    if(hit.right){
        x = hit.right+49+playerRadius+1; accX= 0;
        hit.right = false;
    }
}

function arrowObjHit(){
    num = arrows.length;
    for(a=0;a<num;a++){
        currX = arrows[a].x+mapX+(arrows[a].distance*Math.cos(arrows[a].angle));
        currY = arrows[a].y+mapY+(arrows[a].distance*Math.sin(arrows[a].angle));
        hits = objCollide(currX,currY,5);
        if(hits.top||hits.bottom||hits.right||hits.left){
            arrows[a].x = currX-mapX;
            arrows[a].y = currY-mapY;
            arrows[a].maxDist -= arrows[a].distance;
            arrows[a].distance = 0;
            if(hits.top||hits.bottom){
                arrows[a].angle = -arrows[a].angle;
                hits.top = hits.bottom = false;
            }
            if(hits.right||hits.left){
                arrows[a].angle = 3.14159265-arrows[a].angle;
                hits.top = false;
            }

        }
    }
}



