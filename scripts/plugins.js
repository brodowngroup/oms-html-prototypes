// ------------------------------------------
// This file is for non-specific vendors that
// bring some browsers / devices up to date
//
// Test device behavior and remove before
// prod if possible
// ----------------------------------------

// -------------------------------------
// Fix for ios6 devices
// Use in case of ios sidetap wierdness
// --------------------------------------
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
});

// ---------------------------------------------------------
// Avoid `console` errors in browsers that lack a console.
// ---------------------------------------------------------

(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
