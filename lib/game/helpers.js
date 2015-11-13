ig.helpers = {

  fullScreen: function(el) {
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

  }

};


