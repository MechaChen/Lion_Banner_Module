(function($) {
  var shadow = "3px 3px 3px #a3a3a3";

  $.fn.banner = function() {
    return this.each(function(index, el) {
      $(el).css("boxShadow", shadow);
    });
  };
})(jQuery);

$(function() {
  $(".banner")
    .banner()
    .addClass("test_class");
});
