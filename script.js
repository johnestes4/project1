$(document).ready(function(){
  console.log("Good to go!")
  var gameOn = false;

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  $('#begin').click(function(){
    console.log('START');
    var turn = 1;
    var quadrantsLit = 0;
    var cpuSequence = [];
    var userSequence = [];

    if (gameOn == true); {
      //CPU TURN
      if (turn > quadrantsLit) {
        console.log('turn > quadrants')
        for (i = 0; i < turn; i++) {
          console.log('for loop executing')
          var whichQuadrant = getRandomInt(0,3);
          if (whichQuadrant == 0) {
            cpuSequence.push('green');
          }
          else if (whichQuadrant == 1) {
            cpuSequence.push('red');
          }
          else if (whichQuadrant == 2) {
            cpuSequence.push('blue');
          }
          else if (whichQuadrant == 3) {
            cpuSequence.push('yellow');
          }
          console.log(cpuSequence);
        }
      }
      console.log(cpuSequence)
        userSequence = [];

      $('.simon').click(function(){
        var placeInUserSequence = 0;
        var newColor = $(this).attr('id');
        $(this).css('background-color', newColor);
        userSequence.push(newColor);
        setTimeout(function(){
          $(this).css('background-color', 'pink');
        }, 500);
        if (userSequence[placeInUserSequence] == cpuSequence[placeInUserSequence]) {
          setTimeout(function() {
            turn++;
          }, 2000)
        }
        else {
          gameOn = false;
        }
      });
    }
  });
});
