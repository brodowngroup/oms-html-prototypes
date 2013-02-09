// oms used for On My Stage custom display functions
var oms = oms || {};

// -----------------
// Knockout Classes
// -----------------

// a single event returned from the api
oms.Result = function Result(data) {  
  this.id = data.ID;
  this.name = data.Name;
  this.image = data.Image;
  this.date = data.Date;
  this.time = data.Time;
  this.venue = data.Venue;
  this.neighborhood = data.Neighborhood;
  this.city = data.City;
  this.state = data.State;
  this.latitude = data.Latitude;
  this.longitude = data.Longitude;
  
  this.url = ko.computed(function() {
    return '/event/' + data.ID;
  });
}

// ---------------
// Knockout Setup
// ---------------

// Main Viewmodel for OMS
oms.AppObject = function OMSAppModel() {
  var self = this;
  
  // HTML pageloader
  self.page = ko.observable();
  
  // Search Results Array
  self.results = ko.observableArray([]);
  
  self.loadPage = function(url) {
    url = 'snippets/' + url;
    $.get(url, function(snippet) {
      // Clear the current results
      self.results([]);
      
      self.page(snippet);
    }, 'html');
  };
  
  self.newSearch = function() {
    var query = $('form.header_search').find('input').val();

    // Get json from api call
    $.post("http://api.onmystage.net/api/search/", { term: query }, function(data) {
        var mappedResults = $.map(data, function(item) { return new oms.Result(item) });
        self.results(mappedResults);
        
        // Clear the current page
        self.page('');
        
        // set subheader classes
        $('div.subheader').addClass('three_items buttons').removeClass('two_items')
        
    }, 'json');
  };
};

oms.app = new oms.AppObject();

oms.newPage = oms.app.page.subscribe(function(newPage) {
  
});

// Initialize knockout bindings
ko.applyBindings(oms.app);

// Load Index page
oms.app.loadPage('home_unreg.html');

// Remove hidden class on pageload hidden Items
$('div.ko_flicker_fix').add('h2.ko_flicker_fix')
                       .add('button.ko_flicker_fix')
                       .removeClass('ko_flicker_fix');


// -------------------
// SIDETAP MENU SETUP
// -------------------
oms.st = new sidetap();
$('header a.control_left').click(oms.st.toggle_nav);

// add icon spans for bg images
$('<span/>').prependTo('div.stp-nav nav a');

// --------------------------------
// HEADER SEARCH TOGGLE VISIBILITY
// --------------------------------
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

// ---------------
// Bind UI Events
// ---------------
$('header a.toggleSearch').click(oms.toggleSearch);
$('div.stp-nav > nav > a.loadPage').click(function(e) {
  e.preventDefault();
  e.stopPropagation();
  var url = $(this).data('snippet');
  oms.app.loadPage(url);
  oms.st.toggle_nav();
});
