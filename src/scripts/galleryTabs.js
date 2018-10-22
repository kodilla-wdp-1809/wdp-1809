(function () {
    var productsTabs = document.querySelectorAll(".js-productTab");
    var tabs = document.querySelector(".gallery-tabs");
    var productBoxfinder = document.querySelectorAll(".product-box");
    var slider = document.querySelector(".gallery-slider");
    var ovlImage = document.querySelector(".gallery-overlay");
    var sliderStars = ovlImage.querySelectorAll(".js-star");
    var sliderArrowL = slider.querySelector(".js-slider-arrow-left");
    var sliderArrowR = slider.querySelector(".js-slider-arrow-right");
    var picturesArea = slider.querySelector(".pictures-area");
    var pos = 0;
    var tempPos = 0;
    var sliderImagesLength = 6;
    var dataHolder = [];

    function sliderScaleLength() {
        if (window.screen.availWidth > 572) {
            sliderImagesLength = 6;
        } else if (window.screen.availWidth > 490) {
            sliderImagesLength = 5;
        } else if (window.screen.availWidth > 425) {
            sliderImagesLength = 4;
        } else if (window.screen.availWidth > 319) {
            sliderImagesLength = 3;
        }
    }

    sliderScaleLength();

    function slideCreator() {
        picturesArea.insertAdjacentHTML("afterbegin", '<div class ="slider-box slider-image"><img class="js-image js-image-ovl" src=""></div>');
    }

    function sliderIfnoHolder(k) {
        var getOldPrice;
        var getProductImage = productBoxfinder[k].querySelector(".myImage").src;
        var getProductName = productBoxfinder[k].querySelector(".content").innerText;
        var getNewPrice = productBoxfinder[k].querySelector(".price-new").innerText;
        if (productBoxfinder[k].lastElementChild.lastElementChild.children[0].classList.contains("price-old")) {
            getOldPrice = productBoxfinder[k].querySelector(".price-old").innerText;
        } else {
            getOldPrice = getNewPrice
        }
        var getStars = productBoxfinder[k].querySelectorAll(".full").length;
        var SliderVariables = {};

        SliderVariables.src = getProductImage;
        SliderVariables.name = getProductName;
        SliderVariables.oldPrice = getOldPrice;
        SliderVariables.newPrice = getNewPrice;
        SliderVariables.stars = getStars;
        dataHolder[dataHolder.length] = SliderVariables;
    }

    function topRatedChecker() {
        var starAverage = 0;
        var starsCounter;
        var starsHolder;
        for (var i = 0; i < productBoxfinder.length; i++) {
            starsHolder = productBoxfinder[i].querySelectorAll(".stars");
            for (var j = 0; j < starsHolder.length; j++) {
                starsCounter = starsHolder[j].querySelectorAll(".full").length;
                starAverage = starsCounter;
            }
            if (starAverage > 2) {
                slideCreator();
                sliderIfnoHolder(i);
            }
        }
    }

    function SaleOff() {
        for (var i = 0; i < productBoxfinder.length; i++) {
            if (productBoxfinder[i].lastElementChild.lastElementChild.children[0].classList.contains("price-old")) {
                slideCreator();
                sliderIfnoHolder(i);
            } else if ((productBoxfinder[i].lastElementChild.lastElementChild.children[0].classList.contains("price-old")) === false) {
                i++;
            }
        }
    }

    function topFeatures() {
        var priceNew = 0;
        var priceOld = 0;
        var starAverage = 0;
        var getPriceNew;
        var getPriceOld;
        var starsHolder;
        var getTextN;
        var getTextO;
        for (var i = 0; i < productBoxfinder.length; i++) {
            if (productBoxfinder[i].lastElementChild.lastElementChild.children[0].classList.contains("price-old")) {
                getPriceNew = productBoxfinder[i].querySelectorAll('.price-new');
                getPriceOld = productBoxfinder[i].querySelectorAll('.price-old');
                starsHolder = productBoxfinder[i].querySelectorAll(".stars");
                for (var j = 0; j < getPriceNew.length; j++) {
                    getTextN = getPriceNew[j].innerText;
                    remDolarN = getTextN.replace("$", "");
                    priceNew = parseInt(remDolarN);
                }
                for (var k = 0; k < getPriceOld.length; k++) {
                    getTextO = getPriceOld[k].innerText;
                    remDolarO = getTextO.replace("$", "");
                    priceOld = parseInt(remDolarO);
                }
                for (var l = 0; l < starsHolder.length; l++) {
                    starsCounter = starsHolder[l].querySelectorAll(".full").length;
                    starAverage = starsCounter;
                }
                if (((priceOld / priceNew) > 1.1) && (starAverage > 1)) {
                    slideCreator();
                    sliderIfnoHolder(i);
                } else if ((productBoxfinder[i].lastElementChild.lastElementChild.children[0].classList.contains("price-old")) === false) {
                    i++;
                }
            }
        }
    }

    function activeImages() {
        var sliderImages = slider.querySelectorAll(".js-image");
        for (var i = 0; i < sliderImages.length; i++) {
            sliderImages[i].src = dataHolder[i].src;
        }
        ovlImage.style.backgroundImage = "url('" + dataHolder[0].src + "')";
        ovlImage.querySelector(".js-title").innerHTML = dataHolder[0].name;
        ovlImage.querySelector(".price-new").innerHTML = dataHolder[0].newPrice;
        ovlImage.querySelector(".price-old").innerHTML = dataHolder[0].oldPrice;
        for (var k = 0; k < sliderStars.length; k++) {
            sliderStars[k].classList.remove("full");
        }
        for (var l = 0; l < dataHolder[0].stars; l++) {
            sliderStars[l].className += " full"
        }
        sliderImages[0].classList.remove("js-image-ovl");
    }

    function imageSelecter() {
        activeImages();
        var sliderImages = slider.querySelectorAll(".js-image");
        for (var i = 0; i < sliderImages.length; i++) {
            (function (index) {
                sliderImages[i].onclick = function () {
                    ovlImage.style.backgroundImage = "url('" + dataHolder[index].src + "')";
                    ovlImage.querySelector(".js-title").innerHTML = dataHolder[index].name;
                    ovlImage.querySelector(".price-new").innerHTML = dataHolder[index].newPrice;
                    ovlImage.querySelector(".price-old").innerHTML = dataHolder[index].oldPrice;
                    for (var j = 0; j < sliderImages.length; j++) {
                        sliderImages[j].className += " js-image-ovl";
                    };
                    this.classList.remove("js-image-ovl");
                    for (var k = 0; k < sliderStars.length; k++) {
                        sliderStars[k].classList.remove("full");
                    }
                    for (var l = 0; l < dataHolder[index].stars; l++) {
                        sliderStars[l].className += " full"
                    }
                }
            })(i);
        }
    }

    function tabChecker() {
        if (productsTabs[0].classList.contains("active")) {
            topFeatures();
            imageSelecter();
            sliderLength();
        } else if (productsTabs[1].classList.contains("active")) {
            topRatedChecker(); //nie posiadamy info o liczbie sprzedazy, wiec na ta chwile uzyje funkcji z najlepszymi ocenami
            imageSelecter();
            sliderLength();
        } else if (productsTabs[2].classList.contains("active")) {
            SaleOff();
            imageSelecter();
            sliderLength();
        } else if (productsTabs[3].classList.contains("active")) {
            topRatedChecker();
            imageSelecter();
            sliderLength();
        };
    }

    tabChecker();

    function sliderCleaner() {
        var sliders = slider.querySelectorAll(".slider-image");
        for (var i = 0; i < sliders.length; i++) {
            picturesArea.removeChild(sliders[i]);
        }
        dataHolder.length = 0;
    }

    for (var i = 0; i < productsTabs.length; i++) {
        productsTabs[i].addEventListener("click", function () {
            for (var j = 0; j < productsTabs.length; j++) {
                productsTabs[j].classList.remove("active");
            };
            this.className += " active";
        });
    }

    tabs.addEventListener("click", function () {
        sliderCleaner();
        tabChecker();
    });

    function sliderLength() {
        var sliders = slider.querySelectorAll(".slider-image");
        if (sliders.length > sliderImagesLength) {
            for (var i = sliderImagesLength; i < sliders.length; i++) {
                sliders[i].style.display = "none";
            }
        }
        pos = 0;
    }

    function activeSlide(pos) {
        var sliderImages = slider.querySelectorAll(".js-image");
        ovlImage.style.backgroundImage = "url('" + dataHolder[pos].src + "')";
        ovlImage.querySelector(".js-title").innerHTML = dataHolder[pos].name;
        ovlImage.querySelector(".price-new").innerHTML = dataHolder[pos].newPrice;
        ovlImage.querySelector(".price-old").innerHTML = dataHolder[pos].oldPrice;
        for (var j = 0; j < sliderImages.length; j++) {
            sliderImages[j].className += " js-image-ovl";
        };
        sliderImages[pos].classList.remove("js-image-ovl");
        for (var k = 0; k < sliderStars.length; k++) {
            sliderStars[k].classList.remove("full");
        }
        for (var l = 0; l < dataHolder[pos].stars; l++) {
            sliderStars[l].className += " full"
        }
    }

    function rightClcArr() {
        var sliders = slider.querySelectorAll(".slider-image");
        pos += sliderImagesLength;
        if (pos > sliders.length) {
            sliderCleaner()
            tabChecker();
            sliderLength();
            pos = 0;
            tempPos = 0;
        }
        for (var i = 0; i < sliders.length; i++) {
            sliders[i].style.display = "none";
            tempPos = pos + sliderImagesLength;
        }
        for (var j = pos; j < tempPos; j++) {

            if (tempPos > sliders.length) {
                tempPos = sliders.length
            }
            sliders[j].style.display = "flex";
        }
    }

    function leftClcArr() {
        var slidersLeft = 0;
        var sliders = slider.querySelectorAll(".slider-image");
        pos -= sliderImagesLength;
        if (pos < 0) {
            slidersLeft = sliders.length % pos;
            pos = sliders.length - slidersLeft;
        }
        for (var i = 0; i < sliders.length; i++) {
            sliders[i].style.display = "none";
            tempPos = pos + sliderImagesLength;
        }
        for (var j = pos; j < tempPos; j++) {
            if (tempPos > sliders.length) {
                tempPos = sliders.length
            }
            sliders[j].style.display = "flex";
        }
        if (pos === 0) {
            sliderCleaner();
            tabChecker();
            sliderLength();
            pos = 0;
            tempPos = 0;
        }
    }

    sliderArrowR.addEventListener("click", function () {
        rightClcArr();
        activeSlide(pos);
    })

    sliderArrowL.addEventListener("click", function () {
        leftClcArr();
        activeSlide(pos);
    })
})();