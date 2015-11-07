var shipsPosition = ["B1","B2","B3"];


var generateSea = function(){
    var rows = ["A", "B", "C", "D", "E"]

    var sea = [];

    for(i = 0; i<rows.length ; i++){

        for(j=1 ; j<=5; j++){
            var rowNum = rows[i] + j;
            sea.push(rowNum)
        }
    }
    return sea;
}

var generateTable = function(userId){
    var table = "<table class='mytable' id=" + userId + ">";

    var rows = ["A", "B", "C", "D", "E"]

    for(i = 0; i<rows.length ; i++){
        var row = "<tr class='row' >";

        for(j=1 ; j<=5; j++){
            var rowNum = rows[i] + j;
            row = row+ "<td class = 'column' id=" + rowNum+ ">" + rowNum +"</td>"
        }

        row = row+"</row>";
        table += row;
    }
    table = table+"</<table>"
    return table;
}

var show = function (element, feedback) {
    element.html(feedback);
}

var getPlayerPosition = function (tableContainer, otherPlayerPosition) {
  var player1Sea = document.getElementById(tableContainer)
  var positionId = "#" + otherPlayerPosition;
  return $(player1Sea.querySelectorAll(positionId))
}

$(document).ready(function () {
    var battleshipFB = new Firebase('https://fb-chat-try.firebaseio.com/');
    battleshipFB.remove()

    var position = $("#position");
    var nameField = $("#username");

    // Generate a sea
    $('#u1tableContainer').html(generateTable("U1"))

    // User 2 sea
    var opponentPlayerSea = generateTable("U2")
    $("#u2tableContainer").html(opponentPlayerSea)


    // Added new player
    var player = new Player(generateSea(), shipsPosition);
    var opponent = new Player(opponentPlayerSea, ["A1", "A2", "A3"]);

    $("#position").keypress(function (e) {
        var ENTER = 13;
        if(e.keyCode == ENTER) {
            var userName = nameField.val()
            var enteredPosition = position.val()
            //SAVE DATA TO FIREBASE AND EMPTY FIELD
            battleshipFB.push({name: userName, position: enteredPosition});
            position.val('');
        }
    });

    battleshipFB.on('child_added', function (snapshot) {
      //GET DATA
      var data = snapshot.val();
      var username = data.name;
      var otherPlayerPosition = data.position;

      //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
      if (username != nameField.val()) {
        var onInputFeedback = opponent.onInput(otherPlayerPosition);
        if(onInputFeedback != "Sunk") {
          show(getPlayerPosition("u1tableContainer", otherPlayerPosition), onInputFeedback)
        }
      }
      else {
        var onInputFeedback = opponent.onInput(otherPlayerPosition);
        if(onInputFeedback != "Sunk") {
          show(getPlayerPosition("u2tableContainer", otherPlayerPosition), onInputFeedback)
        }
      }
    });

});
