ig.module(
    'game.fader'
).requires(
	'game.base'
).
defines(function() {

Fader = Base.extend({ 

    text: 'game_over',
    col: '200,000,00',
    time: 1,
    callback: null,
    timer: new ig.Timer(),

    init: function() {
    
        var settings = ig.global.fader || {};
        this.col = settings.col || this.col;
        this.time = settings.time || this.time;
        this.callback = settings.callback || Splash;

        this.timer.set(this.time);
        
    },

    update: function() {
    
        if (this.timer.delta() > 0) {
             ig.global.fader = {};
             ig.system.setGame(this.callback);
        }

    },

    draw: function() {

        ig.system.context.fillStyle = 'rgba('+this.col+',0.05)';
        ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
    }

});

});


