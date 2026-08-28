(function () {
  "use strict";

  $(function () {
    $(".menu-container").load("menu.html", function() {
      // Toggle menu on button click
      $(".menu-button").on("click", function(e) {
        e.preventDefault();
        $(".menu-items").toggleClass("active");
      });
      
      // Close menu when clicking on a menu item
      $(".menu-items a").on("click", function() {
        $(".menu-items").removeClass("active");
      });
      
      // Close menu when clicking outside
      $(document).on("click", function(e) {
        if (!$(e.target).closest(".menu").length) {
          $(".menu-items").removeClass("active");
        }
      });
    });
  });
})();