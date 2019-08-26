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
    openAtStart: true,
    autoToggle: true,
    button: {
      closeText: "收合",
      openText: "展開",
      class: "btn"
    },
    class: {
      closed: "closed",
      closing: "closing",
      opened: "opened",
      opening: "opening"
    },
    transition: true,
    whenTransition: function() {
      console.log("whenTransition");
    }
  };

  // 被選到的元素可執行的函式
  Module.prototype.defaultSetting = function() {
    var btnOpts = this.options.button;
    var btn = this.$ele.find(`.${btnOpts.class}`);

    if (this.options.openAtStart) {
      btn.text(btnOpts.closeText);
    } else {
      this.$ele.addClass("close");
      changeHeight.call(this, closeHeight);
      btn.text(btnOpts.openText);
    }
  };
  Module.prototype.addShadow = function() {
    this.$ele.css("boxShadow", shadow);
  };
  Module.prototype.toggleBanner = function() {
    var btnOpts = this.options.button;
    this.$ele.find(`.${btnOpts.class}`).click(bannerAnima.bind(this));
  };
  Module.prototype.autoToggle = function() {
    if (this.options.autoToggle) setInterval(bannerAnima.bind(this), 3000);
  };

  // 啟動設定
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
      module.defaultSetting();
      module.addShadow();
      module.toggleBanner();
      module.autoToggle();
    });
  };

  function bannerAnima() {
    var btnOpts = this.options.button;
    var btn = this.$ele.find(`.${btnOpts.class}`);

    if (this.options.transition) this.$ele.css("transition", transSecond);

    this.$ele.toggleClass("close");
    if (btn.text() == btnOpts.closeText) {
      btn.text(btnOpts.openText);
      if (this.options.transition) {
        setTimeout(changeHeight.bind(this, closeHeight), 2000);
      } else {
        changeHeight.call(this, closeHeight);
      }
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
    .banner({
      openAtStart: false,
      autoToggle: false,
      button: {
        closeText: "OPEN!",
        openText: "CLOSE",
        class: "btn"
      },
      transition: false
    })
    .addClass("test_class");
});
