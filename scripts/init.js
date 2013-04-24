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

// Load initial page snippet if no hash set
if (location.hash === '') {
  location.hash = 'home_unreg.html';
}

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

$('div.stp-content-body > div.subheader').on('click', 'a.filter', function(e){
  e.preventDefault();
  var filterBy = $(this).data('by');
  console.log(filterBy + ' sort click');
  oms.app.filter(filterBy);
});
