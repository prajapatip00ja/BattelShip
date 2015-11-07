var Player = function (sea, ship) {
    this.sea = sea;
    this.ship = ship;
};

Player.prototype = {
    isHit: function (seaCoOrdinate) {
        return this.ship.indexOf(seaCoOrdinate) > -1;
    },

    onInput : function(input) {
        if(this.isHit(input)){
          this.markPosition(input);
          if(this.isSunk()) return "Sunk";
          return "Hit";
        }

        return "Miss";
    },

    isSunk: function () {
      return this.ship.length == 0
    },
    markPosition : function (position) {
        var index = this.ship.indexOf(position);
        this.ship.splice(index, 1)
    }
}
