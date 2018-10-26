(function () {
    var brandsBoxfinder = document.querySelectorAll(".js-brand-box");
    var brandArrowL = document.querySelector(".brand-box-arr-left");
    var brandArrowR = document.querySelector(".brand-box-arr-right");
    var brandLength = 6; //jezeli chcesz przetestowac skrypt zmien na dowolna wielkosc (od 1 do 6, czyli tyle, ile jest brand boxow). Wg klienta ma sie wyswietlac 6 boxow, w wersji dla RWD bedzie to dostosowane w zaleznosci od rozdzielczosci 
    var pos = 0;
    var tempPos = 0;

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