$(document).ready(function(){
  console.log("Good to go!")
  //two arrays that keep track of the patterns from the CPU and the player. They're compared to make sure the player is duplicating properly.
  var cpuSequence = [];
  var userSequence = [];
  //a variable used to govern whether the player can interact with the quadrants or not, disabled during the CPU's turn and when the game hasn't started yet
  var userTurn = false;
  //an array used to determine which number to assign to the user's sequence when a quadrant is clicked - see that function for more
  var colors = ['green', 'red', 'blue', 'yellow']
  //a variable that will later be used to hold an interval
  var intervalRun;
  var score = 0;
  //variables used to track progress when looping through the arrays
  var placeInUserSequence = 0;
  var placeInCPUSequence = 0;
  //A variable that's used to speed up the intervals and timeouts in order to make the game go faster as it progresses
  var speed = 1;
  //Pulls the high scores array from local storage. If this is the first time playing and no high scores array exists, it instead initializes it with zeros.
  var highScores = JSON.parse(localStorage.getItem("scoreStorage"));
  var highScoreInitials = JSON.parse(localStorage.getItem("initialStorage"));

  //initialize an array of the sound effects to be used
  var sounds = [new Audio('audio/greenSound.wav'), new Audio('audio/redSound.wav'), new Audio('audio/blueSound.wav'), new Audio('audio/yellowSound.wav'), new Audio('audio/loseSound.wav')];
  for (i = 0; i < sounds.length; i++) {
    sounds[i].volume = 0.1;
  }

  checkHighScores()

  function checkHighScores(){
    if (highScoreInitials == null || highScores == null) {
      highScoreInitials = ['WDI', 'WDI', 'WDI', 'WDI', 'WDI'];
      highScores = [0, 0, 0, 0, 0];
      //Runs the update high scores function to push the scores on to the HTML
      updateHighScores(0);
    }
    else {
      updateHighScores(0);
    }
  }

  //A function that randomly generates a number between 0 and 3, used to randomly pick the next color to light up
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function intializeSound() {

  }

  //A function to run the animation during the CPU's turn
  function animateBoard() {
    userTurn = false;
    //Push the random number into the array that keeps track of the sequence
    cpuSequence.push(getRandomInt(0,3));
    //Resets the variable used later when comparing the two arrays
    placeInCPUSequence = 0;
    //This interval is stored in a variable, largely so I can clear it when needed
    intervalRun = setInterval(function(){
      //Runs through all the contents of the array and lights up the corresponding quadrant, and when it reaches the last one it stops the interval loop
      //It's done with an if statement rather than a for loop so that it executes timed with the interval
      if (placeInCPUSequence < cpuSequence.length) {
        $('.simon').eq(cpuSequence[placeInCPUSequence]).css('opacity', 1);
        var whichAudio = cpuSequence[placeInCPUSequence];
        sounds[whichAudio].play();
        window.setTimeout(function(){
          $('.simon').css('opacity', .2);
          sounds[whichAudio].pause();
          sounds[whichAudio].currentTime = 0;
        }, (500 * speed));
        placeInCPUSequence++;
      }
      else if (placeInCPUSequence == cpuSequence.length) {
        userTurn = true;
        clearInterval(intervalRun);
      };
    }, (1000 * speed));
    if (speed > 0.5) {
      speed = speed - 0.05;
    }
  }

  //A function to compare the two arrays
  function checkPatterns() {
    //uses the
    //every time the user clicks a quadrant and a color is added to their sequence, it checks if it matches the color in the same place on the CPU's sequence
    if (userSequence[placeInUserSequence] == cpuSequence[placeInUserSequence]) {
      var whichAudio = userSequence[placeInUserSequence];
      sounds[whichAudio].play();
      placeInUserSequence++;
      setTimeout(function(){
        sounds[whichAudio].pause();
        sounds[whichAudio].currentTime = 0;
      }, (500 * speed));
      //once the user's sequence is as long as the CPU's and no mistakes have been made, it ends the user's turn, increases their score, resets the variables, and starts the CPU's next turn
      if (userSequence.length == cpuSequence.length) {
        userTurn = false;
        userSequence = [];
        score++;
        updateScore(score);
        placeInUserSequence = 0;
        animateBoard();
      }
    }
    //If the user clicks the wrong color, it ends the user's turn, displays a message that they lose, and resets their score and both arrays
    else {
      sounds[4].play();
      youLose();
    }
  }

  //A basic function to update score - if the user's score is under 10, it adds a 0 in front of it so that the score is still displayed using 2 digits
  function updateScore(num){
    if (num < 10) {
      $('#score').text("0" + num);
    }
    else {
      $('#score').text(num);
    }
  }

  //Handles the high score board - it runs through all the options to see where to place your new score, then splices it into the array where appropriate
  //Now also grabs your intials and plugs them into their own array
  function updateHighScores(numIn){
    num = parseInt(numIn);
      //Might these if statements be replaced with a for loop?
      //replacedAt = function getReplaceValue{
        //for (i in highScores){
          //if (num > highScores[i]){
            //return i
        //}
        //}
    //}
    //var initialsIn = prompt("New High Score! Enter your initials:").substring(0,3);
    //highScoreInitials.splice(replacedAt, 0, initialsIn.toUpperCase());
    //highScores.splice(replacedAt, 0, num);

      if (num > highScores[0]) {
        var initialsIn = prompt("New High Score! Enter your initials:").substring(0,3);
        highScoreInitials.splice(0, 0, initialsIn.toUpperCase());
        highScores.splice(0, 0, num);
      }
      else if (num > highScores[1]) {
        var initialsIn = prompt("New High Score! Enter your initials:").substring(0,3);
        highScoreInitials.splice(1, 0, initialsIn.toUpperCase());
        highScores.splice(1, 0, num);
      }
      else if (num > highScores[2]) {
        var initialsIn = prompt("New High Score! Enter your initials:").substring(0,3);
        highScoreInitials.splice(2, 0, initialsIn.toUpperCase());
        highScores.splice(2, 0, num);
      }
      else if (num > highScores[3]) {
        var initialsIn = prompt("New High Score! Enter your initials:").substring(0,3);
        highScoreInitials.splice(3, 0, initialsIn.toUpperCase());
        highScores.splice(3, 0, num);
      }
      else if (num > highScores[4]) {
        var initialsIn = prompt("New High Score! Enter your initials:").substring(0,3);
        highScoreInitials.splice(4, 0, initialsIn.toUpperCase());
        highScores.splice(4, 0, num);
      }
    for (i = 0; i < 5; i++) {
      if (highScores[i] < 10) {
        $('.scoreName').eq(i).text(highScoreInitials[i]);
        $('.highScoreNumber').eq(i).text('0' + highScores[i]);
      }
      else {
        $('.scoreName').eq(i).text(highScoreInitials[i]);
        $('.highScoreNumber').eq(i).text(highScores[i]);
      }
    }
    //runs through the high scores array and trims out everything below the top 5, this prevents the array from getting unreasonably large over time
    for (i = (highScores.length - 1); i > 4; i--) {
        highScores.splice((highScores.length-1), 1);
    }
    localStorage.setItem("scoreStorage", JSON.stringify(highScores));
    localStorage.setItem("initialStorage", JSON.stringify(highScoreInitials));
  }

  function youLose(){
    userTurn = false;
    speed = 1;
    $('#lose').css('opacity', 1);
    updateHighScores(score);
    score = 0;
    updateScore(score);
    placeInUserSequence = 0;
    $('#begin').css('opacity', 0.5);
    userSequence = [];
    cpuSequence = [];
  }

  //A basic fade in for the instructions - when the text on top is hovered over, the list of instructions appears
  $('#instruction-start').hover(function(){
    $('.instructions').css('opacity', 1);
    }, function(){
    $('.instructions').css('opacity', 0);
  });

  //When the green button is clicked, as long as it's not currently the user's turn, it starts a new game
  $('#begin').click(function(){
    if (userTurn == false){
      clearInterval(intervalRun);
      $('#lose').css('opacity', 0);
      $('#begin').css('opacity', 1);
      animateBoard();
    }
  });

  //When the user clicks a quadrant, this executes as appropriate
  $('.simon').click(function(){
    //Stop the animation - to try and prevent bugs where animations start triggering out of sequence
    if (userTurn == true) {
      //Makes sure it's the user's turn - if it's the CPU's turn (or the game hasn't started yet) nothing will happen
      clearInterval(intervalRun);
      //reset the opacity of all quadrants, so if the user's clicking through their pattern faster than the code is illuminating them, it ensures only one is lit at a time
      $('.simon').css('opacity', .2);
      //Max out the opacity of the quadrant the user clicked
      $(this).css('opacity', 1);
      //Store the quadrant clicked's color, then use an array to find the corresponding number that will go into the sequence array
      var thisColor = $(this).attr('id');
      var thisNumber = colors.indexOf(thisColor);
      //resets all quadrants' opacity after a short delay
      setTimeout(function(){
        $('.simon').css('opacity', .2);
      }, (500 * speed));
      //add the number corresponding with the quadrant clicked to the user's sequence
      userSequence.push(thisNumber);
      //And finally, run the checkPatterns function to see if the arrays match up
      checkPatterns();
    }
  });

  $('#clearScores').click(function(){
    if (confirm('Are you SURE you want to reset the high scores?')) {
      highScores = [0, 0, 0, 0, 0];
      highScoreInitials = ['WDI', 'WDI', 'WDI', 'WDI', 'WDI'];
      updateHighScores(0);
    }
  });
});
