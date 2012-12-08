// HEADER SEARCH TOGGLE
var toggleSearch = function() {
      var $form = $('form.header_search'),
          $content = $('div.container');
          height = -($form.innerHeight()),

          showSearch = function() {
            $form.animate({'top': 0}, 100).addClass('active').find('input[type=text]').focus();
            $content.animate({'top': 0}, 100);
          },
          
          hideSearch = function() {
            $form.animate({'top': height}, 100).removeClass('active');
            $content.animate({'top': height}, 100);
          };
      
      $form.hasClass('active') ? hideSearch() : showSearch();

    };

$('header a.control_right').click(toggleSearch);

// jPanelMenu CONTROLS
var JPM = $.jPanelMenu();
JPM.on();