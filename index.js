buttonColours = ["red", "blue", "green", "yellow"];


var gameStarted = false;
$(document).keydown(function(event){
    startOver();

    setTimeout(function () {
                nextSequence();
              }, 1000);
})

function startOver(){
    gameStarted = true;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}

function nextSequence(){
if (gameStarted == true){
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    randomNumber = Math.floor(Math.random()* 3);

    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //to flash the selected element & play the sound
    playSound(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
}
    
}

$(".btn").click(function(){
    
    var userChoseColour = this.id;
    userClickedPattern.push(userChoseColour);
    console.log(userClickedPattern);

    //to flash the selected element & play the sound
    animatePress(userChoseColour);
    playSound(userChoseColour);
    
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(colour){
    var selectedSound = "sounds/" + colour + ".mp3";
    var audio = new Audio(selectedSound);
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (gameStarted === true){
    console.log(gamePattern);
    console.log(userClickedPattern);
    console.log(currentLevel);
    console.log(gamePattern.length);
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(currentLevel === (gamePattern.length - 1)) {
            setTimeout(function () {
                nextSequence();
              }, 1000);
           
        }
    }else{
        gameStarted = false;
        
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
          

        $("#level-title").text("Game over, Press Any Key to Restart");
    }
    }
}

