ig.module( 
	'game.states.intro' 
)
.requires(
	'game.base'
)
.defines(function(){



Intro = Base.extend({

	clearColor: null,
	// backdrop: new FullsizeBackdrop( 'media/bday.jpg' ),
    cake: new ig.Image('media/cake.gif'),
    boneFontPink: new ig.Font('media/bone.font.gif', {fontColor: '#FF1493'}),
    backdrop: new FullsizeBackdrop( 'media/bday.jpg' ),
    smallFontWhite: new ig.Font('media/font.gif', { fontColor: '#fff' }),
    timer: null,
    wave: new Date().getTime(),
	
	init: function() {

        this.parent();
        this.x = (ig.system.width / 2) - (this.cake.width / 2);
        this.y = (ig.system.height / 2) - (this.cake.height / 2);
    
        this.timer = new ig.Timer();
        this.timer.set(0);


        this.backdrop = new FullsizeBackdrop( 'media/bday.jpg' );
        ig.music.add( 'media/sfx/bday.*', 'music' );
        ig.music.volume = 1;
        ig.music.play('music');
       


	},
	
	
	
	
	update: function() {
		
		this.parent();


		if( ig.game.touch.firstTouch ) {
          ig.music.stop();
        ig.system.setGame( Splash );
		}


        this.wave = Math.sin( new Date().getTime() * 0.002 );

        if (this.timer.delta() > 0) {
            this.timer.set(Math.random() * 1);
            var x = ~~(Math.random() * ig.system.width),
                y = ~~(Math.random() * ig.system.height);
            for (i = 0; i < 5; i += 1) {
                ig.game.spawnEntity( EntityStar, x, y);
            }

        }

	},
	
	
	draw: function() {


        var time = new Date().getTime() * 0.002,
                    opacity = Math.sin(time* 0.9);

		this.backdrop.draw();
        this.cake.draw(this.x, this.y);
        this.boneFontPink.alpha = opacity;
        this.boneFontPink.draw('HAPPY', 40, 10, ig.Font.ALIGN.CENTER);
        this.boneFontPink.draw('BIRTHDAY', 20, 40, ig.Font.ALIGN.CENTER);
        this.boneFontPink.draw('MAIREAD', 25, 70, ig.Font.ALIGN.CENTER);

        this.smallFontWhite.alpha = 0.5;
        this.smallFontWhite.draw('LOVE DAD', 90, 215);
		
        this.parent();
	}


});


});





