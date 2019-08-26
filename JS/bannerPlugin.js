(function($) {
  var ModuleName = "banner";

  var Module = function(ele, options) {
    this.ele = ele;
    this.$ele = $(ele);
    this.options = options;
  };

  var shadow = "3px 3px 3px #a3a3a3";

  $.fn[ModuleName] = function(methods, options) {
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
