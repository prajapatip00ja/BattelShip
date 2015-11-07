
var generateTable = function(){
    var table = "<table class='mytable'>";

    for(i = 0; i<=5 ; i++){
        var row = "<tr class='row' >";

        for(j=0 ; j<= 5; j++){
            row = row+ "<td class = 'column'></td>"
        }

        row = row+"</row>";
        table += row;
    }
    table = table+"</<table>"
    return table;
}

console.log(generateTable())