var lvl=0;
var started = false;

var buttonColors = (["red", "blue", "green", "yellow"]);
var userClickedPattern =([]);
var gamePattern =([]);

$(document).keypress(function(event){
    if(!started){
        $("h1").text("Level " + lvl);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatepress(userChosenColor);
    playsound(userChosenColor); 
    var recentans = userClickedPattern.length-1;
    checkanswer(recentans);

});

function checkanswer(currentlevel){

    console.log(currentlevel+1);
    var rigtans = gamePattern[currentlevel]
    var yourans = userClickedPattern[currentlevel];
    console.log(yourans);
    console.log(userClickedPattern);
    console.log(rigtans);
    console.log(gamePattern);
    if(rigtans===yourans){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
                setTimeout(function() {
                    nextSequence();
                }, 1000);      
        }
    }
    else{
        playsound("wrong");
        console.log("fail");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startover();

    }
    
}

function nextSequence(){
    userClickedPattern.length=0
    lvl++;
    $("h1").text("Level " + lvl);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColor);
}

function startover(){
    lvl=0;
    gamePattern=[];
    started=false;
    setTimeout(function() {
        location.reload();
    }, 700);

}

function playsound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatepress(currentcolor){
    $("#"+ currentcolor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentcolor).removeClass('pressed');
    }, 100);
}

