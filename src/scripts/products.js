(function () {
  var productsCard = document.querySelectorAll(".js-products");
  var jsDots = document.getElementById("js-dots");
  var productsList = document.querySelectorAll(".js-productsList");

  function cardChecker() {
    for (var k = 0; k < productsCard.length; k++) {
      if (productsCard[k].classList.contains("active")) {
        productsList[k].style.display = "flex";
      } else {
        productsList[k].style.display = "none";
      };
    }
  }

  cardChecker();

  function dotsCreator() {
    var elemCreator = document.createElement("li");
    var linkCreator = document.createElement("a");
    var child = jsDots.appendChild(elemCreator);
    child.appendChild(linkCreator);
    child.setAttribute("class", "dynamic-dot basic-animation");
  }

  function dotsCounter() {
    var jsDynamicDots = document.querySelectorAll(".dynamic-dot");
    for (var l = 0; l < jsDynamicDots.length; l++) {
      jsDots.removeChild(jsDynamicDots[l]);
    }
  }

  function dotsChecker() {
    dotsCounter();
    for (var m = 0; m < productsCard.length; m++) {
      if (productsCard[m].classList.contains("active")) {
        var producsBoxList = productsList[m].querySelectorAll(".product-box");
        var producsBoxListLength = producsBoxList.length;
        if (producsBoxListLength > 8) {
          do {
            dotsCreator();
            producsBoxListLength -= 8;
          }
          while (producsBoxListLength > 8);
        };
      }
    }
  }

  dotsChecker();

  for (var i = 0; i < productsCard.length; i++) {
    productsCard[i].addEventListener("click", function () {
      for (var j = 0; j < productsCard.length; j++) {
        productsCard[j].classList.remove("active");
      };
      this.className += " active";
      cardChecker();
      dotsCounter();
      dotsChecker();
    });
  }

})();
