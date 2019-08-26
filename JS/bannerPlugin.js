(function($) {
  "use strict";
  var ModuleName = "banner";

  var Module = function(ele, options) {
    this.ele = ele;
    this.$ele = $(ele);
    this.options = options;
  };

  var shadow = "3px 3px 3px #a3a3a3";
  var skewAngle = "skew(10deg)";

  Module.prototype.addShadow = function() {
    // console.log("this is a prototype func!!");
    this.$ele.css("boxShadow", shadow);
  };
  Module.prototype.skew = function() {
    this.$ele.css("transform", skewAngle);
  };

  $.fn[ModuleName] = function(methods, options) {
    return this.each(function(index, el) {
      // $(el).css("boxShadow", shadow);
      var opts = $.extend(
        {},
        typeof methods == "object" && methods,
        typeof options == "object" && options
      );
      var module = new Module(el, opts);
      module.addShadow();
      module.skew();
    });
  };
})(jQuery);

$(function() {
  $(".banner")
    .banner()
    .addClass("test_class");
});
