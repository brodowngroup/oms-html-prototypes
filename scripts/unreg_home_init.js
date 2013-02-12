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

// set subheader
// $('div.subheader').addClass('two_items buttons')
//                   .removeClass('three_items')
//                   .find('div.unreg_home').show();
