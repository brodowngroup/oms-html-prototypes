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
}

// ---------------
// Knockout Setup
// ---------------

// Main Viewmodel for OMS
oms.AppObject = function OMSAppModel() {
  var self = this;
  
  // HTML pageloader
  self.page = ko.observable();
  
  self.loadPage = function() {
    //$.get
  };

  // Search Result
  self.results = ko.observableArray([]); //starts empty
  
  self.newSearch = function() {
    var query = $('form.header_search').find('input').val();

    // Get json from api call
    $.post("http://api.onmystage.net/api/search/", { term: query }, function(data) {
        var mappedResults = $.map(data, function(item) { return new oms.Result(item) });
        self.results(mappedResults);
        
        // Clear the current page
        self.page();
        
        $('div.results_frame').removeClass('hidden');
    }, 'json');
  };
};

oms.app = new oms.AppObject();

oms.newPage = oms.app.page.subscribe(function(newPage) {
  console.log("Received New Page : " + newPage);
 });

ko.applyBindings(oms.app);

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

$('header a.toggleSearch').click(oms.toggleSearch);
