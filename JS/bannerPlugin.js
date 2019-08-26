(function($) {
  var shadow = "3px 3px 3px #a3a3a3";

  $.fn.banner = function() {
    $(this).css("boxShadow", shadow);
    return this;
  };
})(jQuery);

$(function() {
  $(".banner")
    .banner()
    .addClass("test_class");
});
