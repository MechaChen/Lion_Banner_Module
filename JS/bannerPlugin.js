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

  // 預設值
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

  var shadow = "0px 0px 8px #000";
  var closeHeight = "translateY(-300px)";
  var openHeight = "translateY(0px)";
  var transSecond = "2s";

  // 被選到的元素可執行的函式
  Module.prototype.defaultSetting = function() {
    var btnOpts = this.options.button;
    this.$ele.find(".btn").addClass(btnOpts.class);
    var btn = this.$ele.find(`.${btnOpts.class}`);
    var classStates = this.options.class;

    if (this.options.openAtStart) {
      btn.text(btnOpts.closeText);
      this.$ele.addClass(classStates.opened);
    } else {
      this.$ele.addClass(classStates.closed);
      changeImgHeight.call(this, closeHeight);
      btn.text(btnOpts.openText);
    }
  };
  Module.prototype.toggleBanner = function() {
    var btnOpts = this.options.button;
    this.$ele.find(`.${btnOpts.class}`).click(bannerAnima.bind(this));
  };
  Module.prototype.autoToggle = function() {
    var autoToggle = this.options.autoToggle;
    if (autoToggle) setInterval(bannerAnima.bind(this), autoToggle || 3000);
  };

  // 啟動設定
  $.fn[ModuleName] = function(methods, options) {
    return this.each(function(index, el) {
      var $this = $(this);
      var module = $this.data(ModuleName);
      var opts = Module.DEFAULTS;
      if (module) {
        if (typeof methods === "string" && typeof options === "undefined") {
          if (methods === "toggle") {
            bannerAnima.call(module);
          } else if (methods === "open") {
            if (!/opened/.test($this.attr("class"))) {
              bannerAnima.call(module);
            }
          } else if (methods === "close") {
            if (!/closed/.test($this.attr("class"))) {
              bannerAnima.call(module);
            }
          } else {
            console.log("Unsupported Options!");
            throw "Unsupported Options";
          }
        } else if (
          typeof methods === "string" &&
          typeof options === "undefined"
        ) {
          console.log("暫時沒有定義");
        } else {
          console.log("Unsupported Options!");
          throw "Unsupported Options";
        }
      } else {
        opts = $.extend(
          {},
          Module.DEFAULTS,
          typeof methods == "object" && methods,
          typeof options == "object" && options
        );
        module = new Module(el, opts);
        $this.data(ModuleName, module);
        // 將每個元素帶入函式
        module.defaultSetting();
        module.toggleBanner();
        module.autoToggle();
      }
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
          // 更改 class 名稱為 closing
          controlClass.call(this, classStates.closing);
          // 設定計時器
          var timer = setInterval(whenTransition, 2000 / 30);
          // 兩秒後，
          // 1. 改圖高度
          // 2.class 名稱改 closed
          // 3.清除計時器
          setTimeout(
            function() {
              changeImgHeight.call(this, closeHeight);
              controlClass.call(this, classStates.closed);
              clearInterval(timer);
            }.bind(this),
            2000
          );
        } else {
          // 立即將
          // 1. class 改為 closed
          // 2. 圖片高度下降
          controlClass.call(this, classStates.closed);
          changeImgHeight.call(this, closeHeight);
        }
      } else {
        btn.text(btnOpts.closeText);
        changeImgHeight.call(this, openHeight);
        if (isTransition) {
          controlClass.call(this, classStates.opening);
          var timer = setInterval(whenTransition, 2000 / 30);
          setTimeout(
            function() {
              controlClass.call(this, classStates.opened);
              clearInterval(timer);
            }.bind(this),
            2000
          );
        } else {
          console.log("~OPEN~");
          controlClass.call(this, classStates.opened);
        }
      }
    }
  }

  function changeImgHeight(height) {
    this.$ele.find(".img").css("transform", height);
  }

  function controlClass(className) {
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
      openAtStart: true,
      autoToggle: 2000,
      button: {
        closeText: "CLOSE",
        openText: "OPEN",
        class: "BTN"
      },
      transition: true
    })
    .addClass("test_class");
});
