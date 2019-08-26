$.fn.banner = function() {
  $(this).css("boxShadow", "3px 3px 3px #a3a3a3");
  return this;
};

$(function() {
  $(".banner")
    .banner()
    .addClass("test_class");
});
