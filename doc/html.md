[Documentation table of contents](README.md)

# The HTML

All foundation HTML is in the main template.

We are using knockout.js to bind application data to js data. Each type of page display is in the index.html template.

The areas are initially hidden with a "ko\_flicker\_fix" class. This class is set to hidden in the CSS, then removed from all elements after knockout has been bound to the DOM.

## Knockout Sections in [index.html](../index.html)

The data-bind attribute is knockout specific. It binds that element to a ko.observable() object. These objects are contained by oms.AppObject. See [main.js](../main.js) for more details.

### There are four main areas of the page that look for contents in the data model

* <div class="subheader" data-bind="html: subheader"></div>

** subheader looks at oms.app.subheader() and displays the string as html in this div.

* <div class="snippet\_frame" data-bind="html: page">

** snippet\_frame looks at the oms.app.page() string and displays the string as html in this div.

* <div class="results\_area ko\_flicker\_fix" data-bind="visible: results().length > 0">
  
** results\_area looks for search results in oms.app.results() and displays them when present.

* <div class="event\_area ko\_flicker\_fix" data-bind="visible: events().length > 0">
  
** event\_area looks for items in oms.app.events() and displays them when present.

## Sidetap Menu

* <div class="sidetap">
  
** Wraps all content in a common div for sizing control

* <div class="stp-nav">

** Flyout menu content

* <div class="stp-content">
  
** All sidetap page content including body and overlay

* <div class="stp-overlay nav-toggle">&nbsp;</div>

** Empty div used to dim the inactive page while flyout is active

* <div class="stp-content-panel">
  
** Actual html copy area displayed on page