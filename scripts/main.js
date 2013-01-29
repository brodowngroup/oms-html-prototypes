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
  var $form = $(this),
      query = $form.find('input').val(),
      url = $form.attr('action');

  $.getJSON('scripts/test_json.json', function(data) {

    console.log('success');

  });

});





$("#searchForm").submit(function(event) {

  /* stop form from submitting normally */
  event.preventDefault();

  /* get some values from elements on the page: */
  var $form = $( this ),
      term = $form.find( 'input[name="s"]' ).val(),
      url = $form.attr( 'action' );

  /* Send the data using post */
  var posting = $.post( url, { s: term } );

  /* Put the results in a div */
  posting.done(function( data ) {
    var content = $( data ).find( '#content' );
    $( "#result" ).empty().append( content );
  });









// ---------------
// SIDETAP SETUP
// ---------------
var st = new sidetap();
$('header a.control_left').click(st.toggle_nav);

