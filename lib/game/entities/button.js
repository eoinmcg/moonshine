ig.module(
    'game.entities.button'
)
.requires(
    'impact.entity'
)
.defines(function() {

EntityButton = ig.Entity.extend({

    gravity: 0,
    maxVel: {x: 0, y: 0},
    name: 'button',
    type: ig.Entity.TYPE.B,
	size: {x: 80, y: 30},
	animSheet: new ig.AnimationSheet( 'media/button.png', 80, 30 ),

    init: function(x, y, settings) {

        x = x || (ig.system.width / 2) - (this.size.x / 2);
        this.parent(x, y, settings);

        this.col = settings.col || '#000';
        this.clickedCol = settings.clickedCol || '#000';
        this.size = settings.size || this.size;
        this.callback = settings.callback || false;
        this.font = settings.font;
        this.text = settings.text;

        this.textW = this.font.widthForString(this.text);
        this.textH = this.font.heightForString(this.text);

        this.textX = this.pos.x + this.size.x / 2 - this.textW / 2;
        this.textY = this.pos.y + (this.size.y / 2) - ( this.textH / 2 );


		this.addAnim( 'idle', 0.1, [0] );		
        this.currentAnim = this.anims.idle;
        this.currentAnim.alpha = 0.5;

        this.pos.x = x;
        this.pos.y = 120;
        this.alpha = -0.3;
 
    },

    update: function() {

        this.parent();

        this.textX = this.pos.x + this.size.x / 2 - this.textW / 2;
        this.textY = this.pos.y + (this.size.y / 2) - ( this.textH / 2 );
        if (this.pos.y > 120) {
            this.pos.y -= 3;
        }
        this.alpha += 0.01;
    
    },


    draw: function() {

        if (this.alpha < 0) {
            return;
        }
        ig.system.context.globalAlpha = this.alpha;
        ig.draw.roundRect(this.pos.x, this.pos.y,
                        this.size.x, this.size.y,
                        5, this.col, '#fff');
        this.font.draw(this.text, this.textX, this.textY);
        ig.system.context.globalAlpha = 1;

        // this.parent();
    },


    clicked: function(other) {

        this.state = 'clicked';

        this.col = this.clickedCol;

        this.pos.x += 1;
        this.pos.y += 1;
        this.textX += 1;
        this.textY += 1;

        if (typeof this.callback === 'function') {
            this.callback(); 
        }
    }


});



EntityButtonGUI = EntityButton.extend({

    init: function(x, y, settings) {
    

        this.parent(x, y, settings);

        this.font = settings.font;
        this.name = settings.name || this.name;
        this.text = settings.text || 'gui_button';
        this.flash = settings.flash || false;
        this.clickedCol = settings.clickedCol || '#000';
        this.opacity = 1;


        if (!x) {
            this.pos.x = ( ig.system.width / 2 ) - (this.size.x / 2);
        }

        this.textW = this.font.widthForString(this.text);
        this.textH = this.font.heightForString(this.text);
        this.textX = (ig.system.width / 2) - ( this.textW / 2);
        this.textY = ( this.pos.y / ig.system.scale ) + ( this.textH / 4 );

        this.textY *= ig.system.scale;


    },

    draw: function() {

        var time;

        if (this.flash) {
            time = new Date().getTime() * 0.002;
            this.opacity = Math.sin(time * 0.9) + 1;
        } else {
            this.opacity = 1;
        }

        ig.draw.roundRect(this.pos.x, this.pos.y,
                        this.size.x, this.size.y,
                        5, this.col, '#fff');
   
        this.font.draw(this.text, this.textX, this.textY);

    },



    clicked: function() {


        this.col = this.clickedCol;

        this.pos.x += 2;
        this.pos.y += 2;
        this.textX += 2;
        this.textY += 2;

        this.flash = false;
        this.opacity = 1;

        this.parent();
    }


});



// EntityButtonChar = EntityButton.extend({
// 
//    init: function(x, y, settings) {
//   
//         this.name = settings.name || this.name;
//         this.parent(x, y, settings);
// 
//         this.img = new Image();
//         this.img.src = 'media/elf.png';
//         this.state = false;
// 
//    },
// 
// 
//    draw: function() {
// 
//         ig.draw.roundRect(this.pos.x, this.pos.y,
//                         this.size.x, this.size.y,
//                         5, this.col, '#fff');
//   
//         var offsetY = (this.name === 'Elf') ? 0 : 80,
//             offsetX = 120,
//             centerX = this.size.x / 2 - 20;
//             centerY = this.size.y / 2 - 40;
// 
//         if (this.state === 'clicked') {
//             this.parent();
//             offsetX += 40;
//         }
// 
//         ig.system.context.drawImage(this.img, 
//                 offsetX, offsetY, 
//                 40, 80, 
//                 this.pos.x + centerX,this.pos.y + centerY, 
//                 40,80);
// 
//    },
// 
//     clicked: function(other) {
// 
//         if (this.name === 'Elf') {
//             localStorage.isPixie = false;
//             ig.game.isPixie = false;
//         } else {
//             localStorage.isPixie = true;
//             ig.game.isPixie = true;
//         }
// 
//         this.state = 'clicked';
//         this.pos.x -= 2;
//         this.pos.y -= 2;
// 
//         window.setTimeout(function() {
//             ig.system.setGame(Play);
//         }, 500);
// 
// 
//     }
// 
// 
// });

EntityPointer = ig.Entity.extend({

    name: 'pointer',
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,
    size: {x:1, y:1},
    // pointer: new ig.Image('media/heart.png'),
    

    init: function(x, y, settings) {
        this.parent(x, y, settings); 

        this.pos.x = -100;
        this.pos.y = -100;
    },

    update: function() {
        this.pos.x = ig.game.touch.x;
        this.pos.y = ig.game.touch.y;


        this.parent();
    },

    
    check: function( other ) {
        // User is clicking and the 'other' entity has 
        // a 'clicked' function?
        if ( 
            ig.game.touch.firstTouch === true && 
            typeof(other.clicked) == 'function' 
        ) {
            other.clicked();
        }
    }
});

});


