// oms used for On My Stage custom functions
var oms = oms || {};

oms.deviceLat = null;
oms.deviceLong = null;

if (navigator.geolocation) {
   
   var setCoords = function(position) {
     oms.deviceLat = position.coords.latitude;
     oms.deviceLong = position.coords.longitude;
   }
   
   navigator.geolocation.getCurrentPosition(setCoords);
}
 
console.log('latitude, longitude : ');
console.log(oms.deviceLat + ', ' + oms.deviceLong);
