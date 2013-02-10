[Mobile Boilerplate homepage](http://mobileboilerplate.com/) | [Documentation
table of contents](README.md)

# The CSS

TODO : Document

## Responsive CSS

I carried over the default media query styles as a template for now.

I like having this in a separate folder. Might become a conductor of import statements.

## Normalize.css

Normalize.css is a modern, HTML5-ready alternative to CSS resets. It contains
extensive inline documentation. Please refer to the [Normalize.css
project](http://necolas.github.com/normalize.css/) for more information.


## Mobile Boilerplate defaults

This project includes a handful of base styles that build upon Normalize.css.
These include:

* Basic typography setting to provide improved text readability by default.
* Tweaks to default image alignment, fieldsets, and textareas.

You are free to modify or add to these base styles as your project requires.


## Common helpers

#### `.nocallout`

Prevent the callout menu appearing in iOS Safari when the user performs tap & hold.

#### `.pressed`

An active button class for Mobile Boilerplate's `fastButton` helper method.

#### `textarea[contenteditable]`

A hack for HTML5 contenteditable attribute on mobile

#### `.gifhidden`

A workaround for S60 3.x and 5.0 devices which do not animated gif images if they have been set as display: none

#### `.ir`

Add the `.ir` class to any element you are applying image-replacement to. Be
sure to include `background-image: url(pathtoimage.png);` for that specific
element so that image replacement can occur.

#### `.hidden`

Add the `.hidden` class to any elements that you want to hide from all
presentations, including screen readers. It could be an element that will be
populated later with JavaScript or an element you will hide with JavaScript. Do
not use this for SEO keyword stuffing. That is just not cool.

#### `.visuallyhidden`

Add the `.visuallyhidden` class to hide text from browsers but make it
available for screen readers. You can use this to hide text that is specific to
screen readers but that other users should not see. [About invisible
content](http://www.webaim.org/techniques/css/invisiblecontent/), [Hiding
content for
accessibility](http://snook.ca/archives/html_and_css/hiding-content-for-accessibility),
[HTML5 Boilerplate
issue/research](https://github.com/h5bp/html5-boilerplate/issues/194/).

#### `.invisible`

Add the `.invisible` class to any element you want to hide without affecting
layout. When you use `display: none` an element is effectively removed from the
layout. But in some cases you want the element to simply be invisible while
remaining in the flow and not affecting the positioning of surrounding
content.

#### `.clearfix`

Adding `.clearfix` to an element will ensure that it always fully contains its
floated children. There have been many variants of the clearfix hack over the
years, and there are other hacks that can also help you to contain floated
children, but the HTML5 Boilerplate currently uses the [micro
clearfix](http://nicolasgallagher.com/micro-clearfix-hack/).


