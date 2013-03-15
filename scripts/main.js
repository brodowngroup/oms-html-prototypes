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
    //----------------------------------------//
    // Commenting out the part that           //
    // sets the URL until we can have         //
    // all traffic redirected to index.html   //
    //----------------------------------------//
    // History.pushState(data, title, url);
    History.pushState(data, title, '');
    self.clearDisplay();
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
    //----------------------------------------------------//
    // pageType is used by History to determine what      //
    // kind of page to load on history change             //
    //----------------------------------------------------//
    var query = { 
      term: searchTerm,
      latitude: oms.deviceLat,
      longitude: oms.deviceLong,
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
        
        // Check for scroll to bottom every 500ms
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
