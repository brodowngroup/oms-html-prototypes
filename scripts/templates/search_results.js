<section class="result">
  <header>
    <img src="/images/icon-star.png" class="control_right">
    <a class="event_link" data-bind="attr: { href: url, rel: $index }">
      <img class="header_icon" src="/images/tmp_icon.png">
      <h2 data-bind="text: name"></h2>
    </a>
  </header>
  <ul>
    <li>
      <span class="date"><span data-bind="text: date"></span>
      <span class="separator" data-bind="visible: time"> / </span>
      <span data-bind="text: time"></span>
    </li>
    <li>
      <span class="loc">
        <span data-bind="text: venue"></span>
        <span data-bind="text: neighborhood"></span>
        <span class="separator" data-bind="visible: city"> / </span>
        <span data-bind="text: city"></span><span data-bind="visible: state">,</span> <span data-bind="text: state"></span>
        <span class="separator" data-bind="visible: distance"> / </span>
        <span data-bind="text: distance"></span>
    </li>
  </ul>
</section>
