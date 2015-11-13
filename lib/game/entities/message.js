ig.module(
	'game.entities.message'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityMessage = ig.Entity.extend({

    fixed: true,
    font: new ig.Font('media/wendy.font.16.gif'),
    opacity: 1,
    gravity: 0,
    maxVel: {x: 0, y: 0},
	
	init: function( x, y, settings ) {

		this.parent( x, y, settings );
        settings = settings || {};
        this.text = settings.text || 'message';
        this.center = settings.center || false;
        this.col = settings.col || '#ffff00';
        this.border = settings.border || 0;
        this.borderCol = settings.border || '#ffffff';
        this.opacity = settings.opacity || 1;
        this.speed = settings.speed || 1;

        this.width = this.font.widthForString(this.text);

        if (this.center) {
            this.pos.x = (ig.system.width - this.width) / 2;

        }

        this.font = new ig.Font('media/wendy.font.16.gif', {
            fontColor: this.col
        });
	},


    draw: function() {
        this.font.alpha = this.opacity;
        this.font.draw( this.text, this.pos.x, this.pos.y, ig.Font.ALIGN.CENTER );
        this.font.alpha = 1;
    
    },
	
	update: function() {

        if (this.speed) {
            this.pos.y -= this.speed;
        } else {
            // this.pos.y = ig.system.height / 2;
        }
        this.opacity -= 0.01;

        if (this.opacity < 0 || this.pos.y < 0) {
            this.kill();
        }
	}
	

});



});






