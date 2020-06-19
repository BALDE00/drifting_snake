//variables and default values
var player = document.getElementById("player");
var target = document.getElementById("target");
var vel_x = -1;
var vel_y = -1;
var propulsion_intensity_default = 0.2;
var propulsion_intensity = propulsion_intensity_default;
var angle = 0;
var max_speed = 12;
var score = 0;
var timer = Date.now();
var max_time = 6000;
window.a_key_down = false;
window.d_key_down = false;
window.s_key_down = false;
window.w_key_down = false;

//<FUNCTION>
function reset_player_position(){
    player.style.top = JSON.stringify(document.getElementById("container").offsetHeight/2 - player.offsetWidth) + "px";
    player.style.left = JSON.stringify(document.getElementById("container").offsetWidth/2 - player.offsetWidth) + "px";
    angle = Math.random()*6.28;
    vel_x = -1;
    vel_y = -1;
    
}
function funzione(e){
    if (e.keyCode == 87){ //W
        window.w_key_down = true;
    }
    if (e.keyCode == 65){ //A
        window.a_key_down = true;
    }
    if (e.keyCode == 83){ //S
        window.s_key_down = true;
    }
    if (e.keyCode == 68){ //D
        window.d_key_down = true;
    }
    if (e.keyCode == 32){ //SPACE
        reset_player_position();
    }

}

function funzione2(e){
    if (e.keyCode == 87){ //W
        window.w_key_down = false;
    }
    if (e.keyCode == 65){ //A
        window.a_key_down = false;
    }
    if (e.keyCode == 83){ //S
        window.s_key_down = false;
   
    }
    if (e.keyCode == 68){ //D
        window.d_key_down = false;
    }    
}

function reset(){
    target.style.top = JSON.stringify(Math.random()*(document.getElementById("container").offsetHeight - target.offsetWidth)) + "px";
    target.style.left = JSON.stringify(Math.random()*(document.getElementById("container").offsetWidth - target.offsetWidth)) + "px";
    timer = Date.now();
}



//</FUNCTIONS>


//main loop
setInterval(function(){ 
    //movement
    player.style.top = JSON.stringify(player.offsetTop + vel_x) + "px";
    player.style.left = JSON.stringify(player.offsetLeft + vel_y) + "px";
    player.style.transform = "rotate(" + JSON.stringify(-angle/6.28*360) + "deg)";

    vel_x -= propulsion_intensity*Math.cos(angle);
    vel_y -= propulsion_intensity*Math.sin(angle);

    var speed = Math.sqrt(vel_x*vel_x + vel_y*vel_y);

    if (speed > max_speed){
        vel_x += propulsion_intensity*Math.cos(angle);
        vel_y += propulsion_intensity*Math.sin(angle);
    }

    //brake and turbo
    if (window.s_key_down === true){
        propulsion_intensity = 0;
    }
    if (window.s_key_down === false){
        propulsion_intensity = propulsion_intensity_default;
    }
    
    if (window.w_key_down === true && speed > 3){
        propulsion_intensity = propulsion_intensity_default + 0.2;
    }
    if (window.w_key_down === false && window.s_key_down === false){
        propulsion_intensity = propulsion_intensity_default;
    }   

    //keybinds and indicators
    document.addEventListener("keydown", funzione, false);
    document.addEventListener("keyup", funzione2, false);

    document.getElementById("debug").innerHTML = JSON.stringify(angle/6.28*360);
    document.getElementById("speed").innerHTML = JSON.stringify(speed);

    
}, 20);

//time-target loop
reset();
/*
setInterval(function(){ 
    reset();
}, 6000);*/

setInterval(function(){ 
    
    var radius = target.offsetWidth / 2;
    var distance_x = (player.offsetLeft + player.offsetWidth/2) - (target.offsetLeft + radius);
    var distance_y = (player.offsetTop + player.offsetWidth/2) - (target.offsetTop + radius);
    var distance = Math.sqrt(Math.pow(distance_x, 2) + Math.pow(distance_y, 2))  - player.offsetWidth/2;
    document.getElementById("indicator").innerHTML = JSON.stringify(distance);
    if (distance < radius){
        reset();
        score++;
        document.getElementById("score").innerHTML = JSON.stringify(score);
    }

    if(Date.now() - timer > max_time){
        //alert();
        reset();
    }
    
}, 10);  

//controls loop
setInterval(function(){ 
    if (window.a_key_down === true){
        angle += 0.05;
    }
    if (window.d_key_down === true){
        angle -= 0.05;
    }
}, 10);





















//BACKUP
/*
//main loop
setInterval(function(){ 
    player.style.top = JSON.stringify(player.offsetTop + vel*Math.cos(angle)) + "px";
    player.style.left = JSON.stringify(player.offsetLeft + vel*Math.sin(angle)) + "px";
    player.style.transform = "rotate(" + JSON.stringify(-angle/6.28*360) + "deg)";

    document.addEventListener("keydown", funzione, false);
    document.addEventListener("keyup", funzione2, false);

    document.getElementById("debug").innerHTML = JSON.stringify(angle);

    
}, 20);

//controls loop
setInterval(function(){ 
    if (window.a_key_down === true){
        angle += 0.15;
    }
    if (window.d_key_down === true){
        angle -= 0.15;
    }
}, 30);
*/