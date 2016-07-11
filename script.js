$(document).ready(function(){
  console.log("Good to go!")
  var turn = 1;
  var quadrantsLit = 0;
  var cpuSequence = [];
  var userSequence = [];
  var placeInUserSequence = 0;
  var userTurn = false;

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  $('#begin').click(function(){
    animateBoard();
    userTurn = true;
  });
  function animateBoard() {
    cpuSequence.push(getRandomInt(0,3));
    var i = 0;
    setInterval(function(){
      if (i < cpuSequence.length) {
        if (cpuSequence[i] == 0) {
          $('#green').css('background-color', 'green');
        }
        else if (cpuSequence[i] == 1) {
          $('#red').css('background-color', 'red')
        }
        else if (cpuSequence[i] == 2) {
          $('#blue').css('background-color', 'blue');
        }
        else if (cpuSequence[i] == 3) {
          $('#yellow').css('background-color', 'yellow');
        }
      }
      setTimeout(function(){
        $('.simon').css('background-color', 'white');
      }, 500);
      i++;
    }, 1000);
  }


});
