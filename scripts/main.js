var toggleSearch = function() {
  var $form = $('form.header_search'),
      height = -($form.height());
        
  $form.hasClass('active') ? 
    $form.animate({'top': height}, 100).removeClass('active') :
    $form.animate({'top': 0}, 100).addClass('active');

}

$(function() {
  $('a.control_right').on('click', toggleSearch);
});