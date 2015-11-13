ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({

	size: {x:10, y:14},
	offset: {x:4, y:2},
	checkAgainst: ig.Entity.TYPE.B,
	animSheet: new ig.AnimationSheet( 'media/moonshine_w.png', 16, 16 ),
	maxVel: {x: 60, y: 300},
	friction: {x: 500, y:0},
	speed: 500,
	bounciness: 0.1,
	wow: new ig.Sound('media/sfx/wow.*'),
	thud: new ig.Sound('media/sfx/thud.*'),
    game: null,
	
	init: function( x, y, settings ) {

        this.addAnim( 'idle', 0.2, [0,0,0,0,5,5,0,0,6] );
        this.addAnim( 'fall', 0.1, [7,3], true );
        this.addAnim( 'walk', 0.15, [1,2]);

		this.parent( x, y, settings );
        this.game = settings.game;

	},
	
	update: function() {

    var dir = false;

		if( ig.input.state('left') || 
                ig.gamepad.x === -1 ||
                this.game.touch.left ) {
			this.accel.x = -this.speed;
            this.currentAnim.flip.x = true;
		}
		else if( ig.input.state('right') || 
                ig.gamepad.x === 1 ||
                this.game.touch.right ) {
			this.accel.x = this.speed;
            this.currentAnim.flip.x = false;
		}
		else {
			this.accel.x = 0;
		}

        if (this.vel.y > 20) {
            if (this.currentAnim.sequence[0] === 7) {
              dir = this.currentAnim.flip.x;
              this.currentAnim = this.anims.fall;
              this.currentAnim.flip.x = dir;
            } else {
              this.currentAnim = this.anims.fall;
            }
        } else if (this.vel.x) {
            this.currentAnim = this.anims.walk;
        } else {
            this.currentAnim = this.anims.idle;
        }


		
		this.parent();
	},
	
	handleMovementTrace: function( res ) {

        var x, w, dir;

		if( res.collision.y && this.vel.y > 32 ) {
            if (this.pos.y > ig.system.height - this.size.y) {
			this.wow.play();
            ig.game.spawnEntity(EntityMessage, this.pos.x, this.pos.y - 30, {text: 'LUCKY!', col: '#fff', opacity: 1, center: true});
            ig.game.spawnEntity(EntityMessage, this.pos.x, this.pos.y - 45, {text: '+200', opacity: 0.9, center: true});
            ig.game.score += 200;
            } 
            w = this.size.x / 2;
            x = this.currentAnim.flip.x ?
                this.pos.x + w : this.pos.x - w;

            dir = this.currentAnim.flip.x;
            this.currentAnim = this.anims.idle;
            this.currentAnim.flip.x = dir;;
            this.thud.play();
            ig.game.spawnEntity(EntityThud, 
                x,
                this.pos.y + ( this.size.y / 2 ));
		} 

		this.parent(res);
	},

	check: function( other ) {
		other.pickup();
	}

});


});

