// --------------------------------
// HEADER SEARCH TOGGLE VISIBILITY
// -------------------------------
var toggleSearch = function() {
  var $form = $('form.header_search'),
      $content = $('div.stp-content-frame');
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

$('header a.toggleSearch').click(toggleSearch);

// ---------------
// SEARCH QUERY
// ---------------
$('form.header_search').on('submit', function(e) {
  e.preventDefault();
  var query = $(this).find('input').val(),
      url = '/?term=' + query;
  window.location = url;
});


// ---------------
// SIDETAP SETUP
// ---------------
var st = new sidetap();
$('header a.control_left').click(st.toggle_nav);

