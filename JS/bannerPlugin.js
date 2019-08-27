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

  var shadow = "3px 3px 3px #a3a3a3";
  var closeHeight = "translateY(-300px)";
  var openHeight = "translateY(0px)";
  var transSecond = "2s";

  // 被選到的元素可執行的函式
  Module.prototype.defaultSetting = function() {
    var btnOpts = this.options.button;
    var btn = this.$ele.find(`.${btnOpts.class}`);
    var classStates = this.options.class;

    if (this.options.openAtStart) {
      btn.text(btnOpts.closeText);
    } else {
      this.$ele.addClass(classStates.closed);
      changeImgHeight.call(this, closeHeight);
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
    var isTransition = this.options.transition;
    var classStates = this.options.class;
    var whenTransition = this.options.whenTransition;

    if (isTransition) this.$ele.css("transition", transSecond);

    // 判斷 class 是否在已完成的狀態，ex : opened、closed
    if (/opened|closed/.test(this.$ele.attr("class"))) {
      this.$ele.toggleClass(classStates.closed);
      // 利用按鈕文字決定是否展開或收合
      if (btn.text() == btnOpts.closeText) {
        btn.text(btnOpts.openText);
        // 檢查是否有 transition
        if (isTransition) {
          classControl.call(this, classStates.closing);
          var timer = setInterval(whenTransition, 2000 / 30);
          setTimeout(
            function() {
              changeImgHeight.call(this, closeHeight);
              classControl.call(this, classStates.closed);
              clearInterval(timer);
            }.bind(this),
            2000
          );
        } else {
          changeImgHeight.call(this, closeHeight);
        }
      } else {
        btn.text(btnOpts.closeText);
        changeImgHeight.call(this, openHeight);
        if (isTransition) {
          classControl.call(this, classStates.opening);
          var timer = setInterval(whenTransition, 2000 / 30);
          setTimeout(
            function() {
              classControl.call(this, classStates.opened);
              clearInterval(timer);
            }.bind(this),
            2000
          );
        } else {
        }
      }
    }
  }

  function changeImgHeight(height) {
    this.$ele.find(".img").css("transform", height);
  }

  function classControl(className) {
    var classStates = this.options.class;
    var allClassesArray = [];
    for (var prop in classStates) allClassesArray.push(prop);
    var allClasses = allClassesArray.join(" ");

    this.$ele.removeClass(allClasses);
    this.$ele.addClass(className);
  }
})(jQuery);

$(function() {
  $(".banner")
    .banner({
      openAtStart: false,
      autoToggle: false,
      button: {
        closeText: "CLOSE",
        openText: "OPEN!",
        class: "btn"
      },
      transition: true
    })
    .addClass("test_class");
});
