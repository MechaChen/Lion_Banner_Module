(function($) {
  "use strict";
  var ModuleName = "banner";

  var Module = function(ele, options) {
    // 原 element
    this.ele = ele;
    // 加入 jQuery 物件的 element
    this.$ele = $(ele);
    this.options = options;
  };

  var shadow = "3px 3px 3px #a3a3a3";
  var skewAngle = "skew(10deg)";

  // 被選到的元素可執行的函式
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
      // 將每個元素帶入函式
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
