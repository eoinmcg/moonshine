ig.module('plugins.touch')
.defines(function() {

ig.Touch = function() {


    var l = window.addEventListener,
        self = this;

    this.x = -100;
    this.y = -100;
    this.startX = null;
    this.startY = null;
    this.down = false;
    this.released = false;
    this.power = false;

    l('mousedown', function(e) {
        self.down = 1;
    }, false);


    l('mouseup', function(e) {
        self.down = 0;
        self.released = 1;
    }, false);


    l('mousemove', function(e) {
        self.trackMove(e);
    }, false);

    l('touchstart', function(e) {
        self.down = 1;
    }, false);


    l('touchmove', function(e) {
        e.preventDefault();
        self.trackMove(e.touches[0]);
    }, false);

    l('touchend', function(e) {
        self.down = 0;
        self.released = 1;
    }, false);

    this.trackMove = function(e) {
    
    };

};

});

