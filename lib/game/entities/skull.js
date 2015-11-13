ig.module(
	'game.entities.skull'
)
.requires(
	'impact.entity',
    'plugins.empika.entity_tween'
)
.defines(function(){

EntitySkull = ig.Entity.extend({

    gravity: 0,
    // maxVel: {x: 0, y: 500},
	// friction: {x: 500, y:100},
	size: {x:16, y:18},
	animSheet: new ig.AnimationSheet( 'media/skull.png', 16, 18 ),
	type: ig.Entity.TYPE.B,
	
	
	init: function( x, y, settings ) {
		this.addAnim( 'idle', 0.1, [0,1] );		
		this.parent( x, y, settings );
var actions = {actions: [
              { x: 15, y: 10, duration: 0, anim: 'idle', easing: ig.Tween.Easing.Cubic.EaseIn }
            ], post_anim: 'idle'};

            // Add the actions to the entity
            this.initialize_animations(actions);

            // Kick off the Tweening
            this.anim_start();
	}


	

});


});



