(function() {
  var productsCard = document.querySelectorAll(".js-products");
  var jsDots = document.getElementById("js-dots");
  var productsList = document.querySelectorAll(".js-productsList");

  function cardChecker() {
    for (var k = 0; k < productsCard.length; k++) {
      if (productsCard[k].classList.contains("active")) {
        productsList[k].classList.remove("carousel-hide");
        productsList[k].className += " products-carousel carousel-show";
      } else {
        productsList[k].className += " carousel-hide";
        productsList[k].classList.remove("products-carousel");
        productsList[k].classList.remove("carousel-show");
      }
    }
  }

  cardChecker();
  var onActive = document.querySelectorAll(".panel-bar .dots li span");

  for (var i = 0; i < productsCard.length; i++) {
    productsCard[i].addEventListener("click", function() {
      for (var j = 0; j < productsCard.length; j++) {
        productsCard[j].classList.remove("active");
      }
      this.className += " active";
      cardChecker();
      // dotsCounter();
      // dotsChecker();
    });
  }
})();
