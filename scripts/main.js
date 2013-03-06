// oms used for On My Stage custom functions
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
  this.time = (data.Time).replace(/<(?:.|\n)*?>/gm, ''); //strip HTML
  this.venue = data.Venue;
  this.neighborhood = data.Neighborhood;
  this.city = data.City;
  this.state = data.State;
  this.latitude = data.Latitude;
  this.longitude = data.Longitude;
  this.distance = data.Distance;
  
  this.url = ko.computed(function() {
    return '/event/' + data.ID;
  });
}

// ----------------------
// Main Viewmodel for OMS
// ----------------------
oms.AppObject = function OMSAppModel() {
  var self = this;
  
  // Knockout Display Models
  self.subheader = ko.observable();
  self.page = ko.observable();
  self.events = ko.observableArray([]);
  self.results = ko.observableArray([]);
  
  // Map Data
  self.map;
  self.lat;
  self.long;
  self.markerLoc;
  
  // Create Controller for all page refreshes
  // - Update History 
  // - Clear Page Display
  self.pageRefresh = function() {
    self.clearDisplay();        
  }
  
  // Three main page refreshes
  self.loadPage = function(url) {
    url = 'snippets/' + url;
    $.get(url, function(snippet) {
      self.pageRefresh();
      self.page(snippet);
    }, 'html');
  };
  
  self.loadEvent = function(index) {
    var eventData = self.results()[index];
    self.pageRefresh();
    self.events.push(eventData);
    
    self.lat = eventData.latitude;
    self.long = eventData.longitude;

    self.initMap();
  };
  
  self.newSearch = function() {
    var query = $('form.header_search').find('input').val();

    // Get json from api call
    // old - http://api.onmystage.net/api/search/
    // new - http://onmystageapi.cloudapp.net/api/search/
    $.post("http://onmystageapi.cloudapp.net/api/search/", { term: query }, function(data) {

      var mappedResults = $.map(data, function(item) { return new oms.Result(item) });

      self.pageRefresh();        
      self.loadSubheader('results.html', true, 'three_items');
      self.results(mappedResults);
      
      // Check for Results before setting scroll to bottom event
      if ($('section.result').length > 0) {
        
        $('section.result').last().addClass('loadMore');
      
        // Compute distance form top of document to top of search
        var screenHeight = $(window).height(),
            target = $('section.loadMore').offset().top;
          
          oms.scrollInterval = setInterval(function() {
          
          if ($(document).scrollTop() >= target - screenHeight) {
            
            console.log('Need to query DB for next 20 results');
            console.log('Would be nice to return total # of results w/results if > 20');
            console.log('This should only ask for more results if they exist');
            
            clearInterval(oms.scrollInterval);
          }
        }, 500);
                
      } else {
        
        oms.app.loadPage('no_results.html');
        
      }
                
    }, 'json');
  };
  
  // Helper functions for sub-areas
  self.loadSubheader = function(url, buttons, custom_class) {
    url = 'snippets/subheader/' + url;
    $.get(url, function(snippet) {
      self.subheader(snippet);
      
      // set subheader classes
      var classes = 'subheader shadow';
      
      if(buttons)          { classes = classes + ' buttons'; }
      if(custom_class)     { classes = classes + ' ' + custom_class; }
      
      $('div.subheader').removeClass()
                        .addClass(classes);
    }, 'html');
  }
  
  self.loadMap = function() {
    self.markerLoc = new google.maps.LatLng(self.lat, self.long);
    
    var mapOptions = {
        zoom: 18,
        center: self.markerLoc,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      
    self.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    
    var marker = new google.maps.Marker({
      position: self.markerLoc,
      map: self.map
    });
    
    google.maps.event.addListenerOnce(self.map, 'idle', function(){
      $('a.showMap').on('click', function(e) {
                      e.preventDefault();
                      e.stopPropagation();
                      var $this = $(this);
                      if ($this.hasClass('active')) {
                        $('#map_canvas').animate({
                          'height': '1px'
                        }, function(){
                          $this.removeClass('active');
                          $this.text('show map');
                        });
                      } else {
                        $('#map_canvas').animate({
                          'height': '300px'
                        }, function(){
                          // callback to recenter map after animation
                          google.maps.event.trigger(self.map, 'resize');
                          oms.app.map.setCenter(oms.app.markerLoc);
                          $this.text('hide map');
                          $this.addClass('active');
                          $this.show();
                        });
                      }
      }).click();
    });
  }
  
  self.initMap = function() {
    if (typeof google === 'object' && typeof google.maps === 'object') {
      self.loadMap();
    } else {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyDFYE1HKb_eW7_h6uEiZ5I4WEbL7gelz-A&sensor=false&callback=oms.app.loadMap";
      document.body.appendChild(script);
    }
    
    
  };
  
  self.clearDisplay = function () {
    // Clear the current page
    self.subheader('');
    self.page('');
    self.events([]);
    self.results([]);
    clearInterval(oms.scrollInterval);
  }
  
};

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
// Init Functions
// ---------------

// Sidetap 
// ------------
oms.st = new sidetap();
$('header a.control_left').click(oms.st.toggle_nav);

// add icon spans for bg images
$('<span/>').prependTo('div.stp-nav nav a');

// Knockout 
// -------------
oms.app = new oms.AppObject();
ko.applyBindings(oms.app);

// Load initial page snippet
oms.app.loadPage('home_unreg.html');

// Remove hidden class on pageload hidden Items
$('div.ko_flicker_fix').add('h2.ko_flicker_fix')
                       .add('button.ko_flicker_fix')
                       .removeClass('ko_flicker_fix');
                       
// Bind UI Events
// -------------------
$('header a.toggleSearch').on('click', oms.toggleSearch);

$('div.stp-nav > nav > a.loadPage').on('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  var $this = $(this);
  var snippet = $this.data('snippet');
  oms.app.loadPage(snippet);

  if ($this.data('subheader')) {
    if($this.data('subbuttons')) {
      oms.app.loadSubheader($this.data('snippet'), true, $this.data('subclass'));
    } else {
      oms.app.loadSubheader($this.data('snippet'));
    }
  }
  
  oms.st.toggle_nav();
});

$('div.results_area > div').on('click', 'a.event_link', function(e) {
  e.preventDefault();
  var index = $(this).prop('rel');
  oms.app.loadEvent(index);
});

// History Control
// -----------------
(function(window,undefined){

    // Prepare
    var History = window.History;
    if ( !History.enabled ) {
         // History.js is disabled for this browser.
        return false;
    }

    // Bind to StateChange Event
    History.Adapter.bind(window,'statechange',function(){
        var State = History.getState();
        History.log(State.data, State.title, State.url);
    });

    // Change our States
    // History.pushState({state:1}, "State 1", "?state=1"); // logs {state:1}, "State 1", "?state=1"
    // History.pushState({state:2}, "State 2", "?state=2"); // logs {state:2}, "State 2", "?state=2"
    // History.replaceState({state:3}, "State 3", "?state=3"); // logs {state:3}, "State 3", "?state=3"
    // History.pushState(null, null, "?state=4"); // logs {}, '', "?state=4"
    // History.back(); // logs {state:3}, "State 3", "?state=3"
    // History.back(); // logs {state:1}, "State 1", "?state=1"
    // History.back(); // logs {}, "Home Page", "?"
    // History.go(2); // logs {state:3}, "State 3", "?state=3"

})(window);