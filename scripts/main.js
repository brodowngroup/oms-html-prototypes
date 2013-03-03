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
  this.time = (data.Time).replace(/<(?:.|\n)*?>/gm, '');
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
  self.lat;
  self.long;
  
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
  
  self.loadPage = function(url) {
    url = 'snippets/' + url;
    $.get(url, function(snippet) {
      self.clearDisplay();
      self.page(snippet);
    }, 'html');
  };
  
  self.loadEvent = function(index) {
    var eventData = self.results()[index];
    self.clearDisplay();
    self.events.push(eventData);
    
    self.lat = eventData.latitude;
    self.long = eventData.longitude;

    self.initMap();
  };
  
  self.newSearch = function() {
    var query = $('form.header_search').find('input').val();

    // Get json from api call
    $.post("http://api.onmystage.net/api/search/", { term: query }, function(data) {

      var mappedResults = $.map(data, function(item) { return new oms.Result(item) });

      self.clearDisplay();        
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
  
  self.loadMap = function() {
    console.info('loadmap');
    
    var location = new google.maps.LatLng(self.lat, self.long);
    
    var mapOptions = {
        zoom: 18,
        center: location,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    
  }
  
  self.initMap = function() {
    if (typeof google === 'object' && typeof google.maps === 'object') {
      self.loadMap();
    } else {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyDFYE1HKb_eW7_h6uEiZ5I4WEbL7gelz-A&sensor=false";
      document.body.appendChild(script);
    }
    
    $('a.showMap').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('div.map_slide').animate({
        'height': '300px'
      }, self.loadmap );
    });
    
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
