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

// Geolocation
// -------------------
$(window).load(function() {
  if (navigator.geolocation) {

     var setCoords = function(position) {
       oms.deviceLat = position.coords.latitude;
       oms.deviceLong = position.coords.longitude;

       console.log('Current latitude, longitude : ');
       console.log(oms.deviceLat + ', ' + oms.deviceLong);
       console.log('----------------------------------------------');
     }

     navigator.geolocation.getCurrentPosition(setCoords);
  } else {
    console.log('no geolocation capability');
    console.log('----------------------------------------------');
  }
});
 

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

// $('div.subheader').on('click', '****Distance filter button***', self.filter('distance'));
// $('div.subheader').on('click', '****City filter button***', self.filter('city'));

$('div.stp-content-body > div.subheader').on('click', 'a.venue', function(e){
  e.preventDefault();
  console.log('venue sort click');
  oms.app.filter('venue');
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
        //History.log(State.data, State.title, State.url);
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