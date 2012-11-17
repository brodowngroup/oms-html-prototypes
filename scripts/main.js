// HEADER SEARCH TOGGLE
var toggleSearch = function() {
  var $form = $('form.header_search'),
      height = -($form.height());
        
  $form.hasClass('active') ? 
    $form.animate({'top': height}, 100).removeClass('active') :
    $form.animate({'top': 0}, 100).addClass('active');

},
adjustContainers = function() {
    var headerHeight = $('header').height(),
        searchHeight = $('form.header_search').height(),
        containerOffset = headerHeight + searchHeight;

    $('div.stp-content-body div.container').css({'padding-top': containerOffset});
}

$('a.control_right').click(toggleSearch);

// SIDETAP CONTROLS
var st = new sidetap();
    
$('header a.control_left').click(st.toggle_nav);

st.stp_nav.find('nav a.active').click(function(e) {
  e.preventDefault();
  
  var $self = $(this),
      destination = $self.attr('href'),
      $showPanel = $(destination),
      showPage = function() {
        adjustContainers();
        st.toggle_nav();
        $('div.stp-nav nav a').removeClass('current');
        st.show_section($showPanel, {
          animation: 'infromright',
          callback : function() {
            $self.addClass('current');
            if(destination === '#home_unreg') {
              st.stp_nav.addClass('unreg');
            } else {
              st.stp_nav.removeClass('unreg');
            }
          }
        });
      };
      
      //Only Showpage if not current
      if(!$self.hasClass('current')) {
        showPage();
      }
      
});
