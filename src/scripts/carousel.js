(function() {
  "use strict";

  // Variables

  var pBox = document.querySelectorAll(".carousel-show .carousel-box");
  var pCarousel = document.querySelector(".products-carousel.carousel-show");
  var carouselDots = document.querySelector(".carousel-dots");
  var dotsMain = document.querySelector(".dots-main");
  var boxArray = [];
  var productsCard = document.querySelectorAll(".js-products");
  var jsDots = document.getElementById("js-dots");
  var carouselCard = document.querySelector(".js-productsList.carousel-show");

  // Dynamically added dots that depend on the number of product boxes

  function addDots() {
    var box;
    var vPortWidth = window.screen.availWidth;
    var pBoxL = pBox.length;
    var i;
    var dotsTempl = '<li><span class="dot-click basic-animation"></span></li>';
    carouselDots.innerHTML = "";

    if (vPortWidth >= 1025) {
      box = pBoxL / 4;
    } else if (vPortWidth >= 990) {
      box = pBoxL / 3;
    } else if (vPortWidth >= 568) {
      box = pBoxL / 2;
    } else if (vPortWidth <= 567) {
      box = pBoxL;
    }
    for (i = 0; i < box; i++) {
      carouselDots.insertAdjacentHTML("beforeend", dotsTempl);
    }
    return boxArray.push(box);
  }

  addDots();

  // Resolution listener

  window.onresize = addDots;

  // variables whose state must be update

  var dotClic = document.querySelectorAll(".dot-click");
  var dotClick = dotClic.length;
  var onActive = document.querySelectorAll(".panel-bar .dots li span");
  var viewWidth = window.screen.availWidth;
  onActive[0].classList.add("active");

  function onDotClick(e) {
    var selv = e.target;

    for (var i = 0; i < onActive.length; i++) {
      if (onActive[i].classList.contains("active")) {
        onActive[i].classList.remove("active");
      }
      if (onActive[i] === selv) {
        var pBoxWidth = document.querySelectorAll(
          ".carousel-show .carousel-box"
        );
        var move = pBoxWidth[i].clientWidth;
        var pboxActive = document.querySelector(
          ".products-carousel.carousel-show"
        );
        var pBoxLe = pBoxWidth.length;
        pboxActive.style.transform =
          "translateX(-" + move * i * (pBoxLe / boxArray) + "px)";
        pboxActive.style.transition = "transform 0.5s ease";
      }
    }
    selv.classList.add("active");
  }

  // Dots events listener

  for (var i = 0; i < dotClick; i++) {
    dotClic[i].addEventListener("click", onDotClick);
  }

  //  Mouse slide carousel products

  function mouseSlide(carousel) {
    var isDown = false;

    carousel.addEventListener("mousedown", e => {
      isDown = true;
      carousel.classList.add("mouse-drag");
    });

    carousel.addEventListener("mouseleave", () => {
      isDown = false;
      carousel.classList.remove("mouse-drag");
    });

    carousel.addEventListener("mouseup", () => {
      isDown = false;
      carousel.classList.remove("mouse-drag");
    });

    carousel.addEventListener("mousemove", e => {
      if (!isDown) return;
      e.preventDefault();
      const y = e.clientX - (carousel.offsetLeft + carousel.offsetWidth);
      carousel.style.transform = "translateX(" + y + "px)";
    });
  }

  mouseSlide(pCarousel);

// Touch slide carousel products

  let startX;
  const endTouch = e => {
    pCarousel.style.setProperty("--translate", 0);
    pCarousel.removeEventListener("touchmove", moveTouch);
    pCarousel.removeEventListener("touchend", endTouch);
  };

  const moveTouch = e => {
    const progressX = startX - e.touches[0].clientX;
    const translation =
      progressX > 0
        ? parseInt(-Math.abs(progressX))
        : parseInt(Math.abs(progressX));
    pCarousel.style.transform = "translateX(" + translation + "px)";
  };

  const startTouch = e => {
    const {touches} = e;
    if (touches && touches.length === 1) {
      const touch = touches[0];
      startX = touch.clientX;
      pCarousel.addEventListener("touchmove", moveTouch);
      pCarousel.addEventListener("touchend", endTouch);
    }
  };

  pCarousel.addEventListener("touchstart", startTouch);

  var productsList = document.querySelectorAll(".js-productsList");

  function cardChecker() {
    for (var k = 0; k < productsCard.length; k++) {
      var isDown = false;
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
  // caChecker();

  for (var l = 0; l < productsCard.length; l++) {
    productsCard[l].addEventListener("click", function() {
      for (var j = 0; j < productsCard.length; j++) {
        productsCard[j].classList.remove("active");
      }
      this.className += " active";
      for (var c = 0; c < onActive.length; c++) {
        if (onActive[c].classList.contains("active")) {
          onActive[c].classList.remove("active");
          onActive[0].classList.add("active");
        }
      }
      cardChecker();
      // dotsCounter();
      // dotsChecker();
    });
  }

})();
