ig.module(
	'game.entities.cloud'
)
.requires(
	'impact.entity',
    'impact.entity-pool'
)
.defines(function(){

EntityCloud = ig.Entity.extend({

	size: {x:114, y:32},
	animSheet: new ig.AnimationSheet( 'media/cloud.png', 114, 32 ),
    gravity: 0,
    maxVel: {x: 250, y: 0},
    vel: {x: 0, y: 0},
	
	init: function( x, y, settings ) {

		this.parent( x, y, settings );
        this.setup(x, y, settings);
	},

    setup: function(x, y, settings) {

        settings = settings || {};
        settings.dir = settings.dir;
        this.pos.x = ig.system.width / 2 - (this.size.x / 2);
        this.pos.y = ig.rnd(0, ig.system.height);

        this.vel.x = ig.rnd(100, 250) * settings.dir;
    
		this.addAnim( 'idle', 0.1, [0] );		
        this.currentAnim = this.anims.idle;

        if (this.dir < 0) {
            this.currentAnim.flip.x = true;
        }

    },


    update: function() {

        if (this.pos.x < -100 || this.pos.x > 160) {
         this.kill();
        }

        this.parent();
    },
	
    reset: function(x, y, settings) {
        this.parent( x, y, settings ); 
        this.setup();
    }

});
// 
ig.EntityPool.enableFor( EntityCloud );


});



