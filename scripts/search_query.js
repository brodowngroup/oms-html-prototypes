$(function() {  	
	$.post('http://api.onmystage.net/api/search?term=black', function(data) {
    var items = [];

    $.each(data, function(key, val) {
      items.push('<li id="' + key + '">' + val + '</li>');
    });

    $('<ul/>', {
      'class': 'my-new-list',
      html: items.join('')
    }).appendTo('search_results .stp-content-body');
  }, "json");
});
