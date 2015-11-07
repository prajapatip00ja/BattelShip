var Player = function (sea, ship) {
    this.sea = sea;
    this.ship = ship;
};

Player.prototype = {
    isHit: function (seaCoOrdinate) {
        return ship.indexOf(seaCoOrdinate) > -1;
    },

    isSunk: function () {

    }

}

