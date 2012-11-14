var toggleSearch = function() {
  var $form = $('form.header_search'),
      height = -($form.height());
        
  $form.hasClass('active') ? 
    $form.animate({'top': height}).removeClass('active') :
    $form.animate({'top': 0}).addClass('active');

}

$(function() {
  $('a.control_right').on('click', toggleSearch);
});