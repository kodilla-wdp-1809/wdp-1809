(function() {
  "use strict";

  // Variables

  var pBox = document.querySelectorAll(".carousel-box");
  var pCarousel = document.querySelector(".products-carousel");
  var carouselDots = document.querySelector(".carousel-dots");
  var dotsMain = document.querySelector(".dots-main");
  var boxArray = [];

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
  var pBoxWidth = document.querySelectorAll(".carousel-box");
  var move = pBoxWidth[0].clientWidth;
  var viewWidth = window.screen.availWidth;
  onActive[0].classList.add("active");

  // This function adjusts the carousel movement

  function setCount(a, c, d) {
    var slide = (pCarousel.style.transform =
      "translateX(-" + a * (d / c) + "px)");
    return slide;
  }

  // On dots click event function

  function onDotClick(e) {
    var pBoxL = pBox.length;

    for (var i = 0; i < onActive.length; i++) {
      if (onActive[i].classList.contains("active")) {
        onActive[i].classList.remove("active");
      }
      if (onActive[i] === e.target) {
        setCount(move * i, boxArray, pBoxL);
        pCarousel.style.transition = "transform 0.5s ease";
      }
    }
    e.target.classList.add("active");
  }

  // Dots events listener

  for (var i = 0; i < dotClick; i++) {
    dotClic[i].addEventListener("click", onDotClick);
  }

  // Mouse slide carousel products

  var isDown = false;

  pCarousel.addEventListener("mousedown", e => {
    isDown = true;
    pCarousel.classList.add("mouse-drag");
  });

  pCarousel.addEventListener("mouseleave", () => {
    isDown = false;
    pCarousel.classList.remove("mouse-drag");
  });

  pCarousel.addEventListener("mouseup", () => {
    isDown = false;
    pCarousel.classList.remove("mouse-drag");
  });

  pCarousel.addEventListener("mousemove", e => {
    if (!isDown) return;
    e.preventDefault();
    const y = e.clientX - (pCarousel.offsetLeft + pCarousel.offsetWidth);
    pCarousel.style.transform = "translateX(" + y + "px)";
  });

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
    pCarousel.style.transform =
        "translateX(" + translation + "px)";
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

})();
