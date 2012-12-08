
// ---------------------
// Fix for ios6 devices
// ----------------------

$(document).ready(function() {
  var my_sidetap = function() {
    var ios5;
    ios5 = window.SharedWorker && navigator.userAgent.match(/^((?!android).)*webkit.*$/i);
    var ios6;
    ios6 = navigator.userAgent.match(/6_/);
    if (ios5 && !(ios6)) {
      return new SidetapIos();
    } else {
      return new SidetapStandard();
    }
  }();
  $('header a.control_left').on('click',my_sidetap.toggle_nav)
});