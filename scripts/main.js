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
  this.time = data.Time;
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

oms.stripHTML = function (string) {
  return string.replace(/<(?:.|\n)*?>/gm, '');
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
    
  // Create Controller for all page refreshes
  // - Update History 
  // - Clear Page Display
  self.pageRefresh = function(data, title, url) {
    self.clearDisplay();
    //----------------------------------------//
    // Commenting out the part that forcibly  //
    // sets the URL until we can have         //
    // all traffic redirected to index.html   //
    //----------------------------------------//
    // History.pushState(data, title, url);
    History.pushState(data, title, '');
  }
  
  // Three main page refreshes
  self.loadPage = function(url) {
    var title = url.replace('.html', ''),
        pageData = {
          pageType: 'loadPage',
          url: url
        },
        path = '/snippets/' + url;
    $.get(path, function(snippet) {
      self.pageRefresh(pageData, title, title);
      self.page(snippet);
    }, 'html');
  };
  
  self.loadEvent = function(index) {
    var eventData = self.results()[index],
        pageData = {
          pageType: 'loadEvent',
          event: eventData
        };
    self.pageRefresh(pageData, eventData.name, "/event/" + eventData.id);
    self.events.push(eventData);
    
    oms.mapLat = eventData.latitude;
    oms.mapLong = eventData.longitude;

    oms.initMap();
  };
  
  //catches searches from the UI form and preps them for the search function
  self.newSearch = function() {
    var searchTerm = $('form.header_search input').val();
    self.search(searchTerm, 1);
    self.loadSubheader('loading.html');
  }
  
  self.search = function(searchTerm, page) {
    
    var latitude = null,
        longitude = null;

    if (navigator.geolocation) {
      
      var setCoords = function(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      }
      
      navigator.geolocation.getCurrentPosition(setCoords);
   }
    
    //----------------------------------------------------//
    // pageType is used by History to determine what      //
    // kind of page to load on history change             //
    //----------------------------------------------------//
    var query = { 
      term: searchTerm,
      latitude: latitude,
      longitude: longitude,
      distance: null,
      page: page,
      pageType: 'search'
    };
    
    if (page > 1) {
      self.loadSubheader('loading.html');
    }
    
    // Get json from api call
    // local - http://api.onmystage.net/api/search/
    // cloud - http://onmystageapi.cloudapp.net/api/search/
    $.post("http://onmystageapi.cloudapp.net/api/search/", query, function(data) {
      var mappedResults = $.map(data, function(item) { return new oms.Result(item) });

      if (page === 1) {
        self.pageRefresh(query, "searchTerm", "search");        
        self.loadSubheader('results.html', true, 'three_items');
        self.results(mappedResults);
      } else {
        clearInterval(oms.scrollInterval);
        self.subheader('');
        $.map(mappedResults, function(item) { self.results.push(item) });
      }
      
      // Check for Results before setting scroll to bottom event
      if ($('section.result').length > 0) {
              
        // Compute distance form top of document to top of search
        var screenHeight = $(window).height(),
            target = $('section.result').last().offset().top;
          
        oms.scrollInterval = setInterval(function() {
          if ($(document).scrollTop() >= target - screenHeight) {            
            clearInterval(oms.scrollInterval);
            page = page + 1;
            self.search(searchTerm, page);
          }
        }, 500);
                
      } else {
        
        oms.app.loadPage('no_results.html');
        
      }
                
    }, 'json');
  };
  
  // Helper functions for sub-areas
  self.loadSubheader = function(url, buttons, custom_class) {
    url = '/snippets/subheader/' + url;
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
  
  self.clearDisplay = function () {
    // Clear the current page
    self.subheader('');
    self.page('');
    self.events([]);
    self.results([]);
    clearInterval(oms.scrollInterval);
  }
  
};

// Map Data
oms.map;
oms.mapLat;
oms.mapLong;
oms.markerLoc;

oms.loadMap = function() {
  oms.markerLoc = new google.maps.LatLng(oms.mapLat, oms.mapLong);
  
  var mapOptions = {
      zoom: 18,
      center: oms.markerLoc,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
  oms.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  
  var marker = new google.maps.Marker({
    position: oms.markerLoc,
    map: oms.map
  });
  
  google.maps.event.addListenerOnce(oms.map, 'idle', function(){
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
                        google.maps.event.trigger(oms.map, 'resize');
                        oms.map.setCenter(oms.app.markerLoc);
                        $this.text('hide map');
                        $this.addClass('active');
                        $this.show();
                      });
                    }
    });
  });
}

oms.initMap = function() {
  if (typeof google === 'object' && typeof google.maps === 'object') {
    oms.loadMap();
  } else {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyDFYE1HKb_eW7_h6uEiZ5I4WEbL7gelz-A&sensor=false&callback=oms.loadMap";
    document.body.appendChild(script);
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
        return false;
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