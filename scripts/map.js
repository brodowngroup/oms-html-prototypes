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
