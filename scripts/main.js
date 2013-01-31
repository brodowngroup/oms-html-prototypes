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
      var items = [];
  
      $.each(data, function(key, val) {
        items.push('<div id="' + key + '">' + val.Name + '</div>');
      });
  
      $('<section/>', {
        html: items.join('')
      }).appendTo('.stp-content-body');
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

// ---------------
// SIDETAP SETUP
// ---------------
var st = new sidetap();
$('header a.control_left').click(st.toggle_nav);

