(function () {
    var brandsBoxfinder = document.querySelectorAll(".js-brand-box");
    var brandArrowL = document.querySelector(".brand-box-arr-left");
    var brandArrowR = document.querySelector(".brand-box-arr-right");
    var brandLength = 6;
    var pos = 0;
    var tempPos = 0;

    function brandsScaleLength() {
        if (window.screen.availWidth > 768) {
            brandLength = 6;
        } else if (window.screen.availWidth > 572) {
            brandLength = 5;
        } else if (window.screen.availWidth > 425) {
            brandLength = 4;
        } else if (window.screen.availWidth > 375) {
            brandLength = 3;
        } else if (window.screen.availWidth > 319) {
            brandLength = 2;
        }
        for (var i = 0; i < brandsBoxfinder.length; i++) {
            brandsBoxfinder[i].style.display = "none";
        }
        for (var j = 0; j < brandLength; j++) {
            brandsBoxfinder[j].style.display = "flex";
        }
    }

    brandsScaleLength();

    function bRightClcArr() {
        pos += brandLength;
        if (pos >= brandsBoxfinder.length) {
            pos = 0;
            tempPos = 0;
        }
        for (var i = 0; i < brandsBoxfinder.length; i++) {
            brandsBoxfinder[i].style.display = "none";
            tempPos = pos + brandLength;
        }
        for (var j = pos; j < tempPos; j++) {
            if (tempPos > brandsBoxfinder.length) {
                tempPos = brandsBoxfinder.length
            }
            brandsBoxfinder[j].style.display = "flex";
        }
    }

    function bLeftClcArr() {
        var brandsLeft = 0;
        pos -= brandLength;
        if (pos < 0) {
            brandsLeft = brandsBoxfinder.length % pos;
            pos = brandsBoxfinder.length - brandsLeft;
            tempPos = brandsBoxfinder.length;
        }
        if (pos === tempPos) {
            pos = brandsBoxfinder.length - brandLength;
        }
        tempPos = pos + brandLength
        for (var i = 0; i < brandsBoxfinder.length; i++) {
            brandsBoxfinder[i].style.display = "none";
        }
        for (var j = pos; j < tempPos; j++) {
            if (tempPos > brandsBoxfinder.length) {
                tempPos = brandsBoxfinder.length
            }
            brandsBoxfinder[j].style.display = "flex";
        }
    }

    brandArrowR.addEventListener("click", function () {
        bRightClcArr();
    })

    brandArrowL.addEventListener("click", function () {
        bLeftClcArr();
    })

})();