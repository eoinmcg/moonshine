ig.module( 
	'game.states.splash' 
)
.requires(
	'game.base'
)
.defines(function(){



Splash = Base.extend({

	player: null,
		
	map: [],
	score: 0,
	speed: 50,
    titleOpacity: 0,
    hiScore: parseInt(localStorage.getItem('hiScore'), 10)|| 200,
	
    tower: new ig.Image('media/tower.gif'),
    backdrop: new FullsizeBackdrop( 'media/background_splash.png' ),
    font: new ig.Font('media/wendy.font.16.gif', { borderColor: '#fff', borderSize: 1, fontColor: '#ff00ff' }),
    font3: new ig.Font('media/wendy.font.16.gif', {fontColor: '#729fcf'}),
    bigFont: new ig.Font( 'media/sniglet.font.png' ),
    boneFont: new ig.Font('media/bone.font.gif?x=2'),
    boneFontBlack: new ig.Font('media/bone.font.gif', {fontColor: '#000'}),
    smallFont: new ig.Font('media/font.gif', { fontColor: '#F8F8FF' }),
    smallFontBlack: new ig.Font('media/font.gif', { fontColor: '#000' }),
    smallFontWhite: new ig.Font('media/font.gif', { fontColor: '#fff' }),
	
	init: function() {

        var i, 
            dir, 
            maxClouds = ig.ua.mobile ? 2 : 20;

        ig.input.bind(ig.KEY.MOUSE1, 'ok');
        ig.input.bind(ig.KEY.ENTER, 'ok');
        ig.input.bind(ig.KEY.C, 'clear');

        ig.global.plays = ig.global.plays || 0;
        ig.global.plays += 1;

        if (!ig.ua.mobile) {
            this.spawnEntity (EntityLightning);
            for (i = 0; i < maxClouds; i += 1) {
                dir  = i > (maxClouds / 2) ? 1 : -1;
                this.spawnEntity (EntityCloud, null, null, {dir: dir});
            }
        }

        this.parent();

        this.playButton = this.spawnEntity(EntityButton, 
                false, 160,
                {
                    size: {x: 80, y: 25},
                    font: this.smallFontWhite,
                    col: 'rgba(200,0,0,0.5)',
                    clickedCol: 'rgba(255,255,255,0.5)',
                    text: 'PLAY',
                    callback: function() {
                        window.setTimeout(function() {
                            ig.music.stop();
                            ig.system.setGame( Play );
                        }, 300);
                    }
                });
        
        this.pointer = this.spawnEntity(EntityPointer);
        this.hi = 'HISCORE  - ' + this.hiScore;
        this.hiW = this.font3.widthForString(this.hi);
        this.hiX = (ig.system.width / 2) - (this.hiW / 2);

	},
	
	
	
	
	update: function() {
        
		if(ig.input.pressed('clear')) {
            this.hiScore = 0;
            localStorage.setItem('hiScore', 0);
            ig.system.setGame( Splash );
		}
        
		if (ig.input.pressed('ok') || ig.gamepad.button !== false) {
            ig.gamepad.button = false;
            ig.music.stop();
            ig.system.setGame( Play );
		}
		
		this.parent();


	},
	
	
	draw: function() {

        var time = new Date().getTime() * 0.002,
                    opacity = Math.sin(time* 0.9);

		this.backdrop.draw();

        this.tower.draw(90,90);

        this.smallFontBlack.draw('escape from', 29, 26);
        this.smallFont.draw('escape from', 30, 25);

        this.boneFontBlack.draw( ' skull\ntowers', 28, 42, ig.Font.ALIGN.CENTER );
        this.boneFont.draw( ' skull\ntowers', 30, 40, ig.Font.ALIGN.CENTER );
        ig.system.context.globalAlpha = 1;

        this.font3.draw(this.hi, this.hiX, ig.system.height - 40);

        this.parent();
		
	}

});


});




