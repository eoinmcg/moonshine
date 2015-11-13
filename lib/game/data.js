var SF = {};

SF.data = {
    title: 'Moonshine',
    lang: 'en',
    orientation: 'portrait',
    ads: false,
    draw: {
        fontFace: 'Arial',
        fontSize: '12px'
    }
};

// this starts the game
window.addEventListener('load', function() {
    window.setTimeout(function(){
        var state = SF.checkEasterEgg() ? Intro : Splash;
        ig.main('#moonshine', state, 60, 160, 240, 2); 
        sizeHandler();
        window.addEventListener('resize', function(evt) {
            sizeHandler();
        }, false);
        window.addEventListener('orientationchange', function(evt) {
            sizeHandler();
        }, false);   

    }, 10);
}, false);


SF.checkEasterEgg = function() {
        var date = new Date().toString().split(' '),
            month = date[1],
            day = parseInt( date[2], 10 ),
            bday_week = (month === 'Oct' && (day > 23 && day < 29));

        return bday_week;
};

SF.data.phrases = {

    en: {
        'rotate_device': 'Please rotate your device',
        'tap_to_start': 'Tap to Start',
        'click_to_start': 'Click to Start',
        'wave': 'Wave',
        'play': 'Play',
        'more': 'More',
        'reload': 'RELOAD!',
        'game_over': 'GAME OVER',
        'new_hiscore': 'NEW HISCORE',
        'kills': 'Kills',
        'score': 'Score',
        'bullets': 'Bullets',
        'escaped': 'Escaped',
        'missed': 'Missed',
        'shots_fired': 'Shots Fired',
        'accuracy': 'Accuracy',
        'bonus': 'Bonus',
        'new_hi': 'New Hi Score!',
        'paused': 'Paused'
    },
    fr: {
        'rotate_device': 'Tournez votre appareil',
        'tap_to_start': 'Touche pour Jouer',
        'click_to_start': 'Clique pour Jouer',
        'wave': 'Attaque',
        'play': 'Jouer',
        'more': 'Plus',
        'reload': 'RECHARGER',
        'game_over': 'GAME OVER',
        'new_hiscore': 'MEILLEUR SCORE',
        'score': 'Score',
        'kills': 'Tués',
        'bullets': 'Balles',
        'escaped': 'Ratés',
        'missed': 'A coté',
        'shots_fired': 'Coups Tirés',
        'accuracy': 'Précision',
        'bonus': 'Bonus',
        'new_hi': 'Meilleur Score !',
        'paused': 'Pause'
    }

};




function sizeHandler() {
    window.scrollTo(0, 1);
    document.getElementById('orientate').style.display = "none";
    if (!document.getElementById('game')) {
        return;
    }
    var rw = 320;
    var rh = 480;
    var w = window.innerWidth;
    var h = window.innerHeight;
    multiplier = Math.min((h / rh), (w / rw));
    var destW = rw * multiplier;
    var destH = rh * multiplier;
    if (w > h) {
        if (w >= 320 && h >= 480) {
            document.getElementById('orientate').style.display = "none";
            document.getElementById('game').style.width = destW + "px";
            document.getElementById('game').style.height = destH + "px";
            document.getElementById('game').style.left = ((w / 2) - (destW / 2)) + "px";
        } else {
            document.getElementById('orientate').style.display = "block";
            // document.getElementById('bannerAd').style.display = "block";
        }
    } else {
        if (w == 320) {
            multiplier = 1;
            document.getElementById('orientate').style.display = "none";
            document.getElementById('game').style.width = "320px";
            document.getElementById('game').style.height = "480px";
        } else if (w > 320) {
            document.getElementById('orientate').style.display = "none";
            document.getElementById('game').style.width = destW + "px";
            document.getElementById('game').style.height = destH + "px";
            document.getElementById('game').style.left = ((w / 2) - (destW / 2)) + "px";
        } else if (w < 320) {
            document.getElementById('orientate').style.display = "block";
        }
    }
}

SF.fullscreen = function(el) {

    if(el.requestFullscreen) {
      el.requestFullscreen();
    } else if(el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if(el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    } else if(el.msRequestFullscreen) {
      el.msRequestFullscreen();
    }

    window.removeEventListener('click', $.fullScreen);
    window.removeEventListener('keydown', $.fullScreen);
    window.removeEventListener('touchstart', $.fullScreen);


};
