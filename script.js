$(document).ready(function(){
  console.log("Good to go!")
  //two arrays that keep track of the patterns from the CPU and the player. They're compared to make sure the player is duplicating properly.
  var cpuSequence = [];
  var userSequence = [];
  var userTurn = false;
  var colors = ['green', 'red', 'blue', 'yellow']
  //a variable that will later be used to hold an interval
  var intervalRun;
  var score = 0;
  //A variable that's used to speed up the intervals and timeouts in order to make the game go faster as it progresses
  var placeInUserSequence = 0;
  var speed = 1;
  //A function that randomly generates a number between 0 and 3, used to randomly pick the next color to light up
  var highScores = [0, 0, 0, 0, 0]

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //A function to run the animation during the CPU's turn
  function animateBoard() {
    //Push the random number into the array that keeps track of the sequence
    cpuSequence.push(getRandomInt(0,3));
    //Resets the variable used later when comparing the two arrays
    var i = 0;
    //This interval is stored in a variable, largely so I can clear it when needed
    intervalRun = setInterval(function(){
      //Runs through all the contents of the array and lights up the corresponding quadrant, and when it reaches the last one it stops the interval loop
      //It's done with an if statement rather than a for loop so that it executes timed with the interval
      if (i < cpuSequence.length) {
        $('.simon').eq(cpuSequence[i]).css('opacity', 1);
        window.setTimeout(function(){
          $('.simon').css('opacity', .2);
        }, (500 * speed));
        i++;
      }
      else if (i == cpuSequence.length) {
        clearInterval(intervalRun);
      };
    }, (1000 * speed));
    if (speed > 0.5) {
      speed = speed - 0.05;
    }
    userTurn = true;
  }

  //A function to compare the two arrays
  function checkPatterns() {
    //uses the
    //every time the user clicks a quadrant and a color is added to their sequence, it checks if it matches the color in the same place on the CPU's sequence
    if (userSequence[placeInUserSequence] == cpuSequence[placeInUserSequence]) {
      placeInUserSequence++;
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
  function updateHighScores(numIn){
    num = parseInt(numIn);
      if (num > highScores[0]) {
        highScores.splice(0, 0, num);
      }
      else if (num > highScores[1]) {
        highScores.splice(1, 0, num);
      }
      else if (num > highScores[2]) {
        highScores.splice(2, 0, num);
      }
      else if (num > highScores[3]) {
        highScores.splice(3, 0, num);
      }
      else if (num > highScores[4]) {
        highScores.splice(4, 0, num);
      }
    for (i = 0; i < 5; i++) {
      if (highScores[i] < 10) {
        $('.highscore').eq(i).text('0' + highScores[i])
      }
      else {
        $('.highscore').eq(i).text(highScores[i])
      }
    }
  }

  function youLose(){
    userTurn = false;
    speed = 1;
    $('#lose').css('opacity', 1);
    updateHighScores(score);
    score = 0;
    updateScore(score);
    placeInUserSequence = 0;
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
      $('#lose').css('opacity', 0);
      animateBoard();
      userTurn = true;
    }
  });

  //When the user clicks a quadrant, this executes as appropriate
  $('.simon').click(function(){
    //Makes sure it's the user's turn - if it's the CPU's turn (or the game hasn't started yet) nothing will happen
    if (userTurn == true) {
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
});
