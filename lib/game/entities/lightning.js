ig.module(
	'game.entities.lightning'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityLightning = ig.Entity.extend({

    opacity: 1,
    alpha: 1,
    cycles: 0,
    size: {x: 36, y: 126},
	animSheet: new ig.AnimationSheet( 'media/lightning.png', 36, 126 ),
    timer: new ig.Timer(),
    drama: new ig.Sound('media/sfx/dead.*', false),
    lightning: new ig.Sound('media/sfx/lightning.*', false),

	init: function( x, y, settings ) {

		this.parent( x, y, settings );
        this.addAnim('idle', 1, [0]);
        this.currentAnim = this.anims.idle;

        this.timer.set(1);

	},

    _setTimer: function() {
   
        var angle = ig.rnd(-20, 20);
        angle = angle * (Math.PI / 180);

        this.opacity = 1;
        this.alpha = 1;
        this.timer.set(ig.rnd(1, 10));
        this.pos.x = ig.rnd(ig.system.width / 2 + (ig.system.width / 4)); 
        this.pos.y = -10;

        this.currentAnim.angle = angle;
        this.currentAnim.alpha = this.alpha;
        this.currentAnim.flip.x = false;


        if (this.cycles === 0) {
            this.drama.play();
        } else {
            this.lightning.play();
        }
        this.cycles += 1;

    },
	

    update: function() {
   
        if (this.alpha > 0) {
            this.opacity -= 0.05;
            this.alpha -= 0.02;
        }

        if (this.alpha < 0.7) {
            this.currentAnim.flip.x = true;
        }

        if (this.alpha < 0) {
            this.alpha = 0;
        }

        if (this.timer.delta()> 0) {
            this._setTimer();
        }

        this.currentAnim.alpha = this.alpha;

    },

	draw: function() {

        this.parent();

        if (!ig.ua.mobile) {
            if (this.opacity > 0) {
                ig.system.context.globalAlpha = this.opacity;
                ig.system.context.fillRect(0, 0, ig.system.width * ig.system.scale, ig.system.height * ig.system.scale);
                ig.system.context.globalAlpha = 1;

            }
        }


	}
	

});



});



