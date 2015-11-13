ig.module(
	'game.entities.joystick'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityJoystick = ig.Entity.extend({

    fixed: true,
	size: {x:32, y:32},
	animSheet: new ig.AnimationSheet( 'media/joystick.png', 32, 32 ),
	
	
	init: function( x, y, settings ) {

		this.parent( x, y, settings );

		this.addAnim( 'idle', 0.1, [0] );		
		this.addAnim( 'right', 0.1, [1] );		
		this.addAnim( 'left', 0.1, [2] );		

        ig.game.EntityJoystick = true;
        this.currentAnim = this.anims.idle;
        this.currentAnim.alpha = 0.5;
        this.pos.y -= 32;

	},
    
    update: function() {

        var touch = ig.game.touch;

        if (touch.hold) {
            this.pos.x = touch.firstX - (this.size.x / 2);
            this.pos.y = touch.firstY - (this.size.y / 2);
            if (touch.left) {
                this.currentAnim = this.anims.left;
            } else if (touch.right) {
                this.currentAnim = this.anims.right;
            } else {
                this.currentAnim = this.anims.idle;
            }
        }
        this.currentAnim.alpha = 0.5;

    },

	
	draw: function() {
        if (ig.game.touch.hold) {
            this.parent();
        }

	}
	



});



});



