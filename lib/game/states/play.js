ig.module( 
	'game.states.play' 
)
.requires(
	'game.base'
)
.defines(function(){


Play = Base.extend({

	clearColor: null,
	gravity: 240,
	player: null,
		
	map: [],
	score: 0,
	speed: 20,
	
	tiles: new ig.Image( 'media/bricks.gif' ),
	background_tiles: new ig.Image( 'media/background_tiles.gif' ),
	backdrop: new FullsizeBackdrop( 'media/background_play.png' ),
	font2: new ig.Font( 'media/bone.font.png', {borderColor: '#c20', fontColor: '#000'} ),
    font3: new ig.Font('media/wendy.font.16.gif', {fontColor: '#fff', borderColor: '#000'}),
    comboFonts: {
        green: new ig.Font('media/wendy.font.16.gif', {fontColor: '#8ae234'}),
        yellow: new ig.Font('media/wendy.font.16.gif', {fontColor: '#fce94f'}),
        purple: new ig.Font('media/wendy.font.16.gif', {fontColor: '#f956ff'})
    },
	gameOverSound: new ig.Sound( 'media/sfx/dead.*' ),
	ohno: new ig.Sound('media/sfx/ohno.*'),
	fallSound: new ig.Sound( 'media/sfx/fall.*' ),
	comboSound: new ig.Sound( 'media/sfx/combo.*' ),
	newHiSound: new ig.Sound( 'media/sfx/newhi.*' ),
  diamondStreak: [],
  switchSplash: false,
  // enableJoystick: true,
	
	init: function() {

        var y;

        this.currHiscore = this.hiScore;
        this.newHiScore = false;

		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.ENTER, 'ok');

        // ig.game.EntityJoystick = true;
        this.font3.letterSpacing = -2;
		
		this.bgmap = [
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,1],
			[6,6,6,6,6,6,0,0,6,6],
			[0,2,0,2,2,0,0,0,0,1],
			[0,0,0,0,0,0,0,0,0,1]
		];

        this.bgTiles = [
            [0],
            [1],
            [2]
        ];
		
		for(y = 8; y < 18; y++ ) {	
			this.bgmap[y] = this.getRow();
		}

        this.cmap = this.convertCollisionMap(this.bgmap);
		
		this.collisionMap = new ig.CollisionMap( 16, this.cmap );

		this.bg = this.backgroundMap = new ig.BackgroundMap(160, this.bgTiles, 'media/background_tiles.gif' );
        this.bg.repeat = true;
        this.bg.distance = 2;

        
		this.backgroundMaps.push( new ig.BackgroundMap(16, this.bgmap, 'media/bricks.gif' ) );

		this.player = this.spawnEntity( EntityPlayer, ig.system.width/2-2, 16, {game: this} );

        this.parent();

	},
	
	
	getRow: function() {
		var row = [], x;
		for( x = 0; x < 10; x++ ) {
			row[x] = Math.random() > 0.93 ? ig.rnd(1,6) : 0;
		}
		return row;
	},
	
	
	placeLoot: function() {
        var i, tile;
		for( i = 0; i < 12; i++ ) {
			tile = (Math.random() * 16).ceil();
			if(
				this.bgmap[this.bgmap.length-1][tile] &&
				!this.bgmap[this.bgmap.length-2][tile]
			) {
				var y = (this.bgmap.length-1) * 16;
				var x = tile * 16 + 1;
				this.spawnEntity( EntityLoot, x, y );
				return;
			}
		}
	},


    checkCombo: function(color, pos) {


        var cols = {
            'purple': '#f0f',
            'yellow': '#ff0',
            'green': '#0f0'
        }, len;

        if (this.diamondStreak[this.diamondStreak.length - 1] === color || this.diamondStreak.length === 0) {
            this.diamondStreak.push(color);
            len = this.diamondStreak.length;

            if (len % 3 === 0) {
                this.spawnEntity(EntityMessage, pos.x, ig.system.height / 2,{
                    opacity: 1,
                    center: true,
                    col: cols[color],
                    text: 'COMBO x ' + len / 3
                });

                this.score += 100 * (len / 3);
                this.comboSound.play();
            }


        } else {
            this.diamondStreak = [color];
        }

    },
	
	
	update: function() {

		if( this.gameOver ) {
            if (ig.game.touch.firstTouch || 
                ig.gamepad.button !== false ||
                ig.input.pressed('ok')) {
                ig.gamepad.button = 'reset';
                ig.system.setGame( Splash );
            }
            if (this.switchSplash.delta() > 0) {
                ig.system.setGame( Splash );
            }
		}
			
		
        var i = 0, row;
		
		// Do we need a new row?
		if( !this.gameOver && this.screen.y > 40 ) {
			
			// Move screen and entities one tile up
			this.screen.y -= 16;
			for( i =0; i < this.entities.length; i++ ) {
                if (this.entities[i].fixed !== true) {
                    this.entities[i].pos.y -= 16;
                }
			}
			
			// Delete first row, insert new
            row = this.getRow();
			this.bgmap.shift();
			this.cmap.shift();
			this.bgmap.push(row);
			this.cmap.push(this.cleanRow(row));

			if( Math.random() > 0.5 ) {
				this.placeLoot();
			}
            this.speed += 0.1;
		}
		this.parent();

		if( this.gameOver ) {
			return;
		}

        if (this.score > this.currHiscore && !this.newHiScore) {
            this.newHiScore = true;
            this.newHiSound.play();
            this.spawnEntity(EntityMessage, this.player.pos.x, ig.system.height,{
                opacity: 5,
                center: true,
                text: 'NEW HISCORE!'
            });
        }

        this.bg.scroll.y += (0.005 * this.speed);
		
		this.speed += ig.system.tick * (10/this.speed);
		this.screen.y += ig.system.tick * this.speed;
		this.score += ig.system.tick * 1;

		// check for gameover
		var pp = this.player.pos.y - this.screen.y;
		if( pp > ig.system.height + 32) {
            if (this.score > this.hiScore) {
                localStorage.setItem('hiScore', this.score);
            }
			this.gameOver = true;
      ig.game.touch.hold = false;
      ig.game.touch.firstTouch = false;
      ig.music.stop();
			this.fallSound.play();
      this.player.kill();
		  this.switchSplash = new ig.Timer();	
      this.switchSplash.set(5);
		} else if (pp < -32) {
			this.gameOver = true;
            if (this.score > this.hiScore) {
                localStorage.setItem('hiScore', this.score);
                this.hiScore = this.score;
            }
            ig.game.touch.hold = false;
            ig.game.touch.firstTouch = false;
            ig.music.stop();
            this.ohno.play();
            this.player.kill();
        this.switchSplash = new ig.Timer();	
        this.switchSplash.set(5);
        }
	},
	
	
	draw: function() {


        var time = new Date().getTime() * 0.002,
                    opacity = Math.sin(time * 0.9) + 1;

		this.backdrop.draw();
        this.bg.draw();
		
		if( this.gameOver ) {
            var x = ( ig.system.width - this.font2.widthForString('GAME\nOVER')) / 2;
			this.parent();
            this.font2.alpha = opacity;
			this.font2.draw( 'GAME\nOVER', x, 100, ig.Font.ALIGN.CENTER );
            this.font2.alpha = 1;
		}
		else {
			this.parent();
		}
		
		this.font3.draw( this.score.floor().toString(), 20, 10, ig.Font.ALIGN.LEFT );

        if (this.diamondStreak.length) {
            this.comboFonts[this.diamondStreak[0]].draw(
                this.diamondStreak.length, 80, 10
            );
        }

	},

    convertCollisionMap: function(m) {
        var clean = [],
            i;

        for (i = 0; i < m.length; i += 1) {
            clean.push(this.cleanRow(m[i]));
        } 
        return clean;
    },

    cleanRow: function(r) {

        var clean = [],
            i;

        for (i = 0; i < r.length; i += 1) {
            clean.push( r[i] === 0 ? 0 : 1 );
        }

        return clean;
    }

});


});



