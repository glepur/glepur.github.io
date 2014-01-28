
var control = { w:false, a:false, s:false, d:false };

/////////////////   CONTROLS  /////////////////////

var keydown = function(e){
    if(e.keyCode == 87){
        control.w = true;
    }
    if(e.keyCode == 65){
        control.a = true;
    }
    if(e.keyCode == 83){
        control.s = true;
    }
    if(e.keyCode == 68){
        control.d = true;
    }
};

var keyup = function(e){
    if(e.keyCode == 87){
        control.w = false;
    }
    if(e.keyCode == 65){
        control.a = false;
    }
    if(e.keyCode == 83){
        control.s = false;
    }
    if(e.keyCode == 68){
        control.d = false;
    }
};

document.addEventListener("keydown",keydown,false);
document.addEventListener("keyup",keyup,false);
document.addEventListener("mouseup",function(){ shoot=true; },false);

