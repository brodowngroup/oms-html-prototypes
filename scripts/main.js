// ---------------
// SIDETAP SETUP
// ---------------
var st = new sidetap();
$('header a.control_left').click(st.toggle_nav);

// oms used for On My Stage custom display functions
var oms = oms || {};

// --------------------------------
// HEADER SEARCH TOGGLE VISIBILITY
// -------------------------------
oms.toggleSearch = function() {
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

$('header a.toggleSearch').click(oms.toggleSearch);

// ---------------
// SEARCH QUERY
// ---------------
oms.loadSearchResults = function(query) {
  
  console.log('enter loadSearchResults');
  
  $('div.stp-content-body > *').wrapAll('<div class="fadeTarget" />');
  
  $('div.fadeTarget').fadeOut('fast', function() {
    
    $(this).remove();
    
      
    $.post("http://api.onmystage.net/api/search/", { term: query }, function(data) {
      var page = [];
      
      page.push('<div class="subheader three_items shadow buttons">');
      page.push('  <a href="#" class="active">Distance</a>');
      page.push('  <a href="#">Venue</a>');
      page.push('  <a href="#">Location</a>');
      page.push('  <br class="clear">');
      page.push('</div>');
      
      page.push('<h1>Search Results</h1>');
  
      $.each(data, function(key, val) {
        page.push('<section data-property="'+key+'">');  // + val.Name;
        page.push('  <header>');
        page.push('    <a href="detail.html?id='+val.ID+'.html">');
        page.push('      <img data-image="'+val.Image+'" class="header_icon" src="images/tmp_icon.png">');
        page.push('      <h2>'+val.Name+'</h2>');
        page.push('    </a>');
        page.push('  </header>');

        page.push('  <ul>');
        page.push('    <li>');
        page.push('      <span class="date">'+val.Date+' | '+val.Time+'</span>');
        page.push('    </li>');
        page.push('    <li>');
        page.push('      <span class="loc">'+val.Venue+' '+val.Neighborhood+' | '+val.City+', '+val.State+' | X.Xm S</span>');
        page.push('    </li>');
        page.push('  </ul>');

        page.push('</section>');
      });

      // Wrapping contents in one temporary
      // div to avoid multiple DOM additions
      $('<div/>', {
        html: page.join('')
      }).appendTo('.stp-content-body');
      
      // Remove temorary wrapping div
      $('.stp-content-body > div > *').unwrap('div');
    });
  
  });
};

$('form.header_search').on('submit', function(e) {
  e.preventDefault();
  var query = $(this).find('input').val();
        
  oms.loadSearchResults(query);
  
});

// ---------------
// MAP
// ---------------

