[Documentation table of contents](README.md)

# The JavaScript

## main.js

This file sets up all the initiial ko bindings, data structure, events and UI bindings for the app.

All custom variables are under the oms namespace. The sidetap fly-out nav is at oms.st. Knockout vendor object is under its own ko object, but our custom functions that interact with the ko bindings are under oms.app.

TODO - document knockout app flow

## vendor scripts

This directory can be used to contain all 3rd party library code.

We are using a few frameworks in this project :

* jQuery.js 1.8.3
* knockout.js 2.2.1
* sidetap.js
* swipe.min..js
* mbp.helper.js
* modernizr-2.6.2.min.js

TODO : document use of plugins with justification for each