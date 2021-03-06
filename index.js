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

    // Player 1 Sea
    $('#playerTableContainer').html(generateTable("U1"))

    // Player 2 sea
    var opponentPlayerSea = generateTable("U2")
    $("#opponenTableContainer").html(opponentPlayerSea)

    // Added new player
    // var playerShipPosition = {"s1":["B1","B2","B3"],"s2":["D1","D2","D3"]}
    // var opponentShipPosition = {"s1":["B1","B2","B3"],"s2":["D1","D2","D3"]}

    var player = new Player(generateSea(), ["B1","B2","B3"]);
    var opponent = new Player(opponentPlayerSea, ["A1", "A2", "A3"]);

    $("#position").keypress(function (e) {
        var ENTER = 13;
        if(e.keyCode == ENTER) {
            var userName = nameField.val()
            var enteredPosition = position.val()
            //SAVE DATA TO FIREBASE AND EMPTY FIELD
            if (!player.isAlreadyAttempted(enteredPosition)) {
              battleshipFB.push({name: userName, position: enteredPosition});
              player.setAttemptedPosition(enteredPosition);
              return position.val('');
            }

            alert("You have already entered this position");
        }
    });

    battleshipFB.on('child_added', function (snapshot) {
      //GET DATA
      var data = snapshot.val();
      var opponentName = data.name;
      var playerName = nameField.val()
      var otherPlayerPosition = data.position;

      //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
      if (opponentName != playerName) {
        var onInputFeedback = opponent.onInput(otherPlayerPosition);
        if(onInputFeedback != "Sunk") {
          show(getPlayerPosition("playerTableContainer", otherPlayerPosition), onInputFeedback)
        }
      }
      else {
        var onInputFeedback = opponent.onInput(otherPlayerPosition);
        if(onInputFeedback != "Sunk") {
          show(getPlayerPosition("opponenTableContainer", otherPlayerPosition), onInputFeedback)
        }
      }

      if(opponent.isAllShipSunk()) {
        var message = opponentName + " Won";
        $("#player-feedback").html(message)

        $("#username").attr("disabled", true)
        $("#position").attr("disabled", true)
      }
    });

});
