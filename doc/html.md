[Mobile Boilerplate homepage](http://mobileboilerplate.com/) | [Documentation
table of contents](README.md)

# The HTML

All foundation HTML is in the main template.

Since we are using knockout.js to bind our data to js data, each type of page display is in the template. The areas are initially hidden with a "ko\_flicker\_fix" class. This class is set to hidden in the CSS, then removed from all elements after knockout has been bound to the DOM.

## Knockout Sections in [index.html](../index.html)

* <div class="snippet_frame" data-bind="html: page"></div>

This div looks at the oms.app.page string and displays the string as html in this div. 

* <div class="results_area ko_flicker_fix" data-bind="visible: results().length > 0">...
  
This div looks for search results in results() and displays them when present.