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
  var closeHeight = "translateY(-300px)";
  var openHeight = "translateY(0px)";
  var transSecond = "2s";

  Module.DEFAULTS = {
    button: {
      closeText: "收合",
      openText: "展開",
      class: "btn"
    }
  };

  // 被選到的元素可執行的函式
  Module.prototype.addShadow = function() {
    this.$ele.css("boxShadow", shadow);
  };
  Module.prototype.close = function() {
    this.$ele.find(".btn").click(toggleBanner.bind(this));
  };

  $.fn[ModuleName] = function(methods, options) {
    return this.each(function(index, el) {
      var opts = $.extend(
        {},
        Module.DEFAULTS,
        typeof methods == "object" && methods,
        typeof options == "object" && options
      );
      console.log(opts);
      var module = new Module(el, opts);
      // 將每個元素帶入函式
      module.addShadow();
      module.close();
    });
  };

  function toggleBanner() {
    // variables
    var btn = this.$ele.find(".btn");
    var btnOpts = this.options.button;
    // functions
    this.$ele.toggleClass("close");
    this.$ele.css("transition", transSecond);
    if (btn.text() == "收合") {
      btn.text(btnOpts.openText);
      setTimeout(changeHeight.bind(this, closeHeight), 2000);
    } else {
      btn.text(btnOpts.closeText);
      changeHeight.call(this, openHeight);
    }
  }

  function changeHeight(height) {
    this.$ele.find(".img").css("transform", height);
  }
})(jQuery);

$(function() {
  $(".banner")
    .banner()
    .addClass("test_class");
});
