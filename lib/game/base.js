ig.module( 
	'game.base' 
)
.requires(
	'impact.game',
	'impact.entity',
	'impact.collision-map',
	'impact.background-map',
	// 'impact.debug.debug',
	'impact.font',

    'game.entities.button',
    'game.entities.sparkle',
    'game.entities.player',
    'game.entities.loot',
    'game.entities.message',
    'game.entities.thud',
    'game.entities.cloud',
    'game.entities.lightning',
    'game.entities.particle',

    'plugins.font2',
    'plugins.gamepad',
    'plugins.draw',
    'plugins.touch'
)
.defines(function(){


/**
* Simple random number generator
* returns number between min and max
* if no max is given return random between 0 and min
*
* @method rnd - generates a random number in a given range
* @param {Number} min value in range
* @param {Number} max value (if blank min becomes max and min is 0)
* @param {Boolean} [float=false] returns a float, otherwise rounded
* @return {Number} Returns random number
*/
ig.rnd = function(min, max, float) {

    var rnd = (max) ?
        Math.random() * (max - min) + min :
        Math.random() * min;

    return (float) ? rnd : ~~(rnd);
};


ig.rndKey = function(obj) {
    var result;
    var count = 0, prop;

    for (prop in obj) {
        if (Math.random() < 1/++count) {
           result = prop;
        }
    }
    return result;
};


FullsizeBackdrop = ig.Image.extend({
	resize: function(){},
	draw: function() {
		if( !this.loaded ) { return; }
		ig.system.context.drawImage( this.data, 0, 0 );
	}
});


ig.Font.inject({
    draw: function( text, x, y, alpha, align ) {
        ig.system.context.globalAlpha = alpha ? alpha : 1;
        this.parent( text, x, y, align );
        ig.system.context.globalAlpha = 1;
    }
});


ig.global.fader = {};

Base = ig.Game.extend({
	
    clearColor: null,
    tiles: new ig.Image( 'media/brick.png' ),
    touchControls: new Image('media/joystick.png'),
    backdrop: new FullsizeBackdrop( 'media/background3.png' ),
    font: new ig.Font( 'media/font2.png' ),
    gravity: 240,
    touch: {
        x: 0,
        y: 0,
        hold: false,
        firstTouch: false,
        firstX: 0,
        firstY: 0,
        left: false,
        right: false,
        up: false,
        down: false
    },
    sfx: { },
    hiScore: parseInt(localStorage.getItem('hiScore'), 10)|| 200,
    pausing: false,
    paused: false,
    canPause: false,
    joystick: new ig.Image('media/joystick.png', 32, 32),
    pointer: new ig.Image('media/joystick_pos.png'),
    enableJoystick: false,
	
	init: function() {

        // if( ig.ua.mobile ) {
            // Disable sound for all mobile devices
            // ig.Sound.enabled = false;
        // }

        ig.draw.init(SF.data);
        ig.input.bind( -1, "CanvasTouch" );
        if (!ig.baked) {
            ig.input.bind( ig.KEY.MINUS, 'screenshot' );
        }

	},
	
	update: function() {


      this.getInput();
      this.parent();

        window.scrollTo(0,1);

        if (!ig.baked && ig.input.pressed('screenshot')) {
            var c = document.getElementsByTagName('canvas')[0],
                ajax = new XMLHttpRequest(),
                img = c.toDataURL('image/png'),
                params = 'img='+img;

                ajax.open('POST', 'img.php', true);
                ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                ajax.onreadystatechange = function() {
                    if(ajax.readyState == 4 && ajax.status == 200) {
                        console.log('saved img' + ajax.responseText);
                    }
                };

                ajax.send(params);
        }

	},


    draw: function() {

        this.parent();
        if (this.enableJoystick) {
            this.drawJoystick();
        }
    
    },


    drawJoystick: function() {

        var tile;

        if (this.touch.left) {
            tile = 2;
        } else if (this.touch.right) {
            tile = 1;
        } else {
            tile = 0;
        }


        if (this.touch.hold) {
            ig.system.context.globalAlpha = 0.8;
            this.joystick.drawTile(this.touch.firstX - 16, this.touch.firstY - 16, tile, 32);
            ig.system.context.globalAlpha = 1;
            this.pointer.draw(this.touch.x - 5, this.touch.y - 5);
        }
    
    },


    getInput: function() {
    

        // @todo this should be a plugin
        //
        // need a 'deadzone' so player can stay still
        // lets set a 10px

        var deadZone = 4;

        var touchState = ig.input.state("CanvasTouch") || false;
        var firstTouch = (touchState === true && this.touch.hold === false) ? true : false;

        this.touch.x = ig.input.mouse.x - ( deadZone / 2 );
        this.touch.y = ig.input.mouse.y - ( deadZone / 2 ); 
        this.touch.hold = ig.input.state("CanvasTouch") || false;
        this.touch.left = false;
        this.touch.right = false;
        this.touch.firstTouch = firstTouch;

        if (firstTouch) {
            this.touch.firstX = this.touch.x;
            this.touch.firstY = this.touch.y;
        }

        if (ig.ua.mobile && touchState === true) {
          if (this.touch.x < (ig.system.width / 2)) {
            this.touch.left = true;
            this.touch.right = false;
          } else if (this.touch.x > (ig.system.width / 2)) {
            this.touch.right = true;
            this.touch.left = false;
          }
        }
    },



    pause: function() {

        var time = new Date().getTime() * 0.002,
                opacity = Math.sin(time * 0.9) + 1;

        ig.system.context.fillStyle = 'rgba(0,0,0,0.7)';
        ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
        ig.draw.text(ig.TR.get('paused').toUpperCase(), false, 100, '30px', 
                'rgba(255,255,255,'+opacity+')', 
                'rgba(0,0,0,'+opacity+')');

    
    }


});

});


