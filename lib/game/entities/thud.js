ig.module(
	'game.entities.thud'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityThud = ig.Entity.extend({

	size: {x:8, y:8},
	maxVel: {x: 0, y: 0},
	// friction: {x: 500, y:100},
	animSheet: new ig.AnimationSheet( 'media/thud.gif', 8, 8 ),
	
	init: function( x, y, settings ) {
		this.addAnim( 'idle', 0.03, [0,1,2,3,4,5,6,7,8], true );		
		this.parent( x, y, settings );
        this.currentAnim = this.anims.idle;
        this.currentAnim.alpha = 0.7;
	},

    update: function() {
        if (this.currentAnim.loopCount > 0) {
            this.kill();
        } else {
            this.parent();
        }
    }


	


});


});




