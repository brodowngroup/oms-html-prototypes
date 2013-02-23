[Documentation table of contents](README.md)

# The HTML

All foundation HTML is in the main template.

We are using knockout.js to bind application data to js data. Each type of page display is in the index.html template.

The areas are initially hidden with a "ko\_flicker\_fix" class. This class is set to hidden in the CSS, then removed from all elements after knockout has been bound to the DOM.

## Knockout Sections in [index.html](../index.html)

The data-bind attribute is knockout specific. It binds that element to a ko.observable() object. These objects are contained by oms.AppObject. See [main.js](../main.js) for more details.

### There are four main areas of the page that look for contents in the data model

<dl>
  <dt><div class="subheader" data-bind="html: subheader"></div></dt>
  <dd>subheader looks at oms.app.subheader() and displays the string as html in this div.</dd>
  <dt><div class="snippet\_frame" data-bind="html: page"></dt>
  <dd>snippet\_frame looks at the oms.app.page() string and displays the string as html in this div.</dd>
  <dt><div class="results\_area ko\_flicker\_fix" data-bind="visible: results().length > 0"></dt>
  <dd>results\_area looks for search results in oms.app.results() and displays them when present.</dd>
  <dt><div class="event\_area ko\_flicker\_fix" data-bind="visible: events().length > 0"></dt>
  <dd>event\_area looks for items in oms.app.events() and displays them when present.</dd>
</dl>

## Sidetap Menu

<dl>
  <dt><div class="sidetap"></dt>
  <dd>Wraps all content in a common div for sizing control</dd>
  <dt><div class="stp-nav"></dt>
  <dd>Flyout menu content</dd>
  <dt><div class="stp-content"></dt>
  <dd>All sidetap page content including body and overlay</dd>
  <dt><div class="stp-overlay nav-toggle">&nbsp;</div></dt>
  <dd>Empty div used to dim the inactive page while flyout is active</dd>
  <dt><div class="stp-content-panel"></dt>
  <dd>Actual html copy area displayed on page</dd>
</dl>
