var slider = new Swipe(document.getElementById('slider'), {
      callback: function(e, pos) {
        var i = bullets.length;
        while (i--) {
          bullets[i].className = ' ';
        }
        bullets[pos].className = 'on';
      }
    }),
    bullets = document.getElementById('position').getElementsByTagName('em');
