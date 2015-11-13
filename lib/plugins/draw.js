ig.module(
    'plugins.draw'
).requires(
	'impact.impact'
).
defines(function() {

    ig.draw = {
    
        ctx: null,
        fontFace: null,
        fontSize: null,

        init: function(settings) {
       
            settings = settings || {};

            this.ctx = ig.system.context; 
            this.fontSize = settings.fontSize || '12px';
            this.fontFace = settings.fontFace || 'Arial';

        },

        rect: function(x, y, w, h, col) {

            x *= ig.system.scale;
            y *= ig.system.scale;
            w *= ig.system.scale;
            h *= ig.system.scale;
        
            this.ctx.fillStyle = col;
            this.ctx.fillRect(x,y,w,h);

        },

    roundRect: function(x, y, w, h, r, col, stroke) {


        x *= ig.system.scale;
        y *= ig.system.scale;
        w *= ig.system.scale;
        h *= ig.system.scale;

        var fillCol = this.ctx.fillStyle, 
            strokeCol = this.ctx.strokeCol;
        if (stroke) {
            this.ctx.strokeStyle = stroke;
            this.ctx.lineWidth = 3;
        }


        this.ctx.fillStyle = col;
        this.ctx.beginPath();
        this.ctx.moveTo(x+r, y);
        this.ctx.arcTo(x+w, y,   x+w, y+h, r);
        this.ctx.arcTo(x+w, y+h, x,   y+h, r);
        this.ctx.arcTo(x,   y+h, x,   y,   r);
        this.ctx.arcTo(x,   y,   x+w, y,   r);
        this.ctx.closePath();

        if (stroke) {
            this.ctx.stroke();
        }

        this.ctx.fill();

        this.ctx.fillStyle = fillCol;
        this.ctx.strokeCol = strokeCol;

    },


    circle: function(x, y, r, col) {
    
    
    },

    text: function(str, x, y, size, col, shadow) {

        size = size || this.fontSize;

        this.ctx.font = size + ' ' + this.fontFace;

        x = x || (ig.system.width / 2) - (this.ctx.measureText(str).width / 2);

        if (shadow) {
            this.ctx.fillStyle = shadow; 
            this.ctx.fillText(str, x - 2, y + 2);
        }

        this.ctx.fillStyle = col;
        this.ctx.fillText(str, x, y);

    }


    
    };


});




