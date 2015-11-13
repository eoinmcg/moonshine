ig.module(
	'game.entities.loot'
)
.requires(
	'impact.entity',
    'impact.entity-pool'
)
.defines(function(){

EntityLoot = ig.Entity.extend({

	// size: {x:10, y:8},
	// animSheet: new ig.AnimationSheet( 'media/star.png', 10, 9 ),
	size: {x:12, y:10},
	animSheet: new ig.AnimationSheet( 'media/sparklydiamond.png', 12, 10 ),
	type: ig.Entity.TYPE.B,
	
	sound: new ig.Sound('media/sfx/collect.ogg'),
	
	init: function( x, y, settings ) {

		this.parent( x, y, settings );
        this.setup();
	},

    setup: function() {
    
		this.addAnim( 'yellow', 0.1, [0,1,2,3,4,5,6,7,6,0,0] );		
		this.addAnim( 'purple', 0.1, [8,9,10,11,12,13,14,15,14,8,8] );		
		this.addAnim( 'green', 0.1, [16,17,18,19,20,21,22,23,22,16,16] );		

        this.color = ig.rndKey(this.anims);
        this.currentAnim = this.anims[this.color];
    },
	
	update: function() {
		this.parent();
		if( this.pos.y - ig.game.screen.y < -32 ) {
			this.kill();
		}
	},
	
	pickup: function() {
        var i;
		ig.game.score += 50;
		this.sound.play();

        ig.game.checkCombo(this.color, this.pos);

        for (i = 0; i < 3; i += 1) {
            ig.game.spawnEntity( EntitySparkle, this.pos.x, this.pos.y);
        }
		this.kill();
	},


    reset: function(x, y, settings) {
        this.parent( x, y, settings ); 
        this.setup();
    }

});

ig.EntityPool.enableFor( EntityLoot );


});


