var sea = ["A1"];
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

var player1 = new Player(generateSea(), shipsPosition);


$(document).ready(function () {
    $('#u1tableContainer').html(generateTable("U1"))
    $('#u2tableContainer').html(generateTable("U2"))
    $("#position").keypress(function (e) {
        var ENTER = 13;
        if(e.keyCode == ENTER) {

            var enteredPosition = $("#position").val()
            if(isHit(enteredPosition)) {
                showHit($(enteredPosition));
            }

        }
    })
});


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


var position = "B1";

var showHit = function (element) {
    element.html("Hit");
}

var isHit = function(position ){
    return shipsPosition.indexOf(position)>=0
}



console.log(generateTable())