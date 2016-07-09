$(document).ready(function(){
  console.log("Good to go!")
  var gameOn = false;

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  $('.simon').click(function(){

    if (gameOn == true) {
      var newColor = $(this).attr('id');
      console.log(newColor);
      $(this).css('background-color', newColor);
    }

  });

  $('#begin').click(function(){
    alert('START');
    gameOn = true;
    var turn = 1;
    var quadrantsLit = 0;
    setInterval(function(){
      if (gameOn == true && quadrantsLit < turn); {

        var whichQuadrant = getRandomInt(0,3);
        console.log(whichQuadrant);
        if (whichQuadrant == 0) {
          $(green).css('background-color', 'green');
        }
        else if (whichQuadrant == 1) {
          $(red).css('background-color', 'red');
        }
        else if (whichQuadrant == 2) {
          $(blue).css('background-color', 'blue');
        }
        else if (whichQuadrant == 3) {
          $(yellow).css('background-color', 'yellow');
        }
      }
    }, 1000);
  });
});
