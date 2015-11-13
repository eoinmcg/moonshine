ig.module(
	'game.entities.sparkle'
)
.requires(
	'impact.entity',
    'impact.entity-pool'
)
.defines(function(){

EntitySparkle = ig.Entity.extend({
	size: {x: 4, y: 4},
	animSheet: new ig.AnimationSheet( 'media/sparkle.png', 4, 4),
    friction: {x: 0, y: 0},
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	
	lifetime: 3,
	fadetime: 1,
    gravity: -100,
    wave: 0,
	
	
	init: function( x, y, settings ) {

		this.parent( x, y, settings );
        this.setup(x, y);
	},


    setup: function(x, y) {
    
        this.addAnim('a', 1, [0]);
        this.addAnim('b', 1, [1]);
        this.addAnim('c', 1, [2]);
        this.addAnim('sparkle', 0.5, [0,1,2]);
        this.currentAnim = this.anims[ig.rndKey(this.anims)];
        this.currentAnim = this.anims.sparkle;
        this.speedY = Math.random();
        this.speedX = ig.rnd(-1, 1, true);
        this.wave = new Date().getTime();
        this.waveSize = ig.rnd(-5, 5);
        this.xConst = x;
	
		this.idleTimer = new ig.Timer();
    },
	
	
	update: function() {

		if( this.idleTimer.delta() > this.lifetime ) {
			this.kill();
			return;
		}

        this.wave = Math.sin( new Date().getTime() * 0.002 );

        var opacity = (this.lifetime - this.idleTimer.delta()) / this.lifetime;
        this.currentAnim.alpha = opacity;
        this.currentAnim.angle += 0.1;

		this.parent();
        this.pos.x = this.waveSize * this.wave + this.xConst;
        this.pos.y -= this.speedY;
        this.waveSize += 0.1;

	},


	handleMovementTrace: function( res ) { },

    reset: function(x, y, settings) {
        this.parent( x, y, settings ); 
        this.setup(x, y);
    }

});

ig.EntityPool.enableFor( EntitySparkle );

});



