const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;

$(".btn").prop("disabled",true);

/******************EVENT LISTENERS******************/

//set timeout syntax store
//remove this later on
setTimeout(() => {
  console.log("this is timeout of 5 second");
}, 5000);

//FIRST THING THAT STARTS THE GAME
$(document).keypress(function(){
  console.log(level);
  if(level == 0){
    $(".btn").disabled = false;
    nxtSeq();
  }
});

$(".btn").on("click",handleClick);

//function to handle click by user
function handleClick(){
  var color = this.id;
  //play sound for that colour, and flash
  playSound(color);
  //add that colour in userPattern and check with gamePattern
  userPattern.push(color);
  var ans = checkInput(); //checks the LAST ENTERED user input
  console.log(ans); //ans is true if correct last input
  if(ans == false){
    //stop the game here and reset
    gameReset();
  }
  else{ //if everything was correct, we continue with the game
    if(userPattern.length == level){
      userPattern.length = 0;
      setTimeout(() => {
        nxtSeq();
      }, 1000);
    }
  }
}

function checkInput(){
  var n = userPattern.length;
  //int m = gamePattern.length;
  if(userPattern[n-1] == gamePattern[n-1]){
    return true;
  }
  else{
    return false;
  }

}

//function to add the nxt sequence through random chosen colour
function nxtSeq(){
  //make changes to the h1
  level++;
  $("h1").text("Level "+level);
  //generate random number
  var randomNum = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNum];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);

}

//function to reset the game if wrong answer is entered
function gameReset(){
  $(".btn").disabled = true;
  $("h1").text("Game Over ! Press any key to start");
  //play "wrong" audio here !!
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', 'sounds/wrong.mp3');
  audioElement.addEventListener("canplay", function(){
    this.play();
  });

  $("body").toggleClass("incorrect");
  $("body").toggleClass("reset");
  setTimeout(() => {
    $("body").toggleClass("incorrect");
    $("body").toggleClass("reset");
  }, 200);
  level = 0;
  gamePattern.length = 0;
  userPattern.length = 0;
}



//function to play sounds through the color,
//and also flashes the colour
function playSound(color){
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', 'sounds/'+color+'.mp3');
  console.log(audioElement.src);
  var s = "." + color;
  console.log(s);
  $(s).fadeOut(100).fadeIn(100);
  $(s).addClass("pressed");
  audioElement.addEventListener("canplay", function(){
    this.play();
  });
  setTimeout(() => {
    $(s).removeClass("pressed");
  }, 100);
}
