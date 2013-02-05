// Class that defines an individual
// event returned from the api
function Result(data) {  
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

// Main Viewmodel for OMS
function OMSAppModel() {
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
        var mappedResults = $.map(data, function(item) { return new Result(item) });
        self.results(mappedResults);
        
        // Clear the current page
        self.page().length = 0;
        
        $('div.results_frame').removeClass('hidden');
    }, 'json');
  };
};

ko.applyBindings(new OMSAppModel());

// REST OF FILE HERE BELOW FOR DEVELOPMENT
// SHOULD EVENTUALLY REPLACE CONTENTS OF MAN.JS
// AFTER SEARCH RESULTS AND PAGEVIEWS ARE FUNCTIONAL

// ---------------
// SIDETAP SETUP
// ---------------
var st = new sidetap();
$('header a.control_left').click(st.toggle_nav);

// add icon spans for bg images
$('<span/>').prependTo('div.stp-nav nav a');

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
