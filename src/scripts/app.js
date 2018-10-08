(function() {
    'use strict';

    // functions for ratings star  
  
    var starsContener = document.querySelectorAll('.stars');

    for (var i = 0; i < starsContener.length; i++){

    starsContener[i].addEventListener('click', setRating);
    starsContener[i].addEventListener('mouseover', setHover);
    starsContener[i].addEventListener('mouseout', removeHover);
    
    function setRating(e){
        let cStar = e.target;
        let stars = this.querySelectorAll('.star');
        let match = false;
        stars.forEach(function(star){
            if (match) {
                star.classList.remove('full');
            } else {
                star.classList.add('full');
                star.style.color = '#d58e32';
            }
            if (star === cStar) {
                match = true;
            }
        });
    }

    function setHover(e){
        let hStar = e.target;
        let stars = this.querySelectorAll('.star');
        let match = false;
        stars.forEach(function(star){
            if (match) {
                star.classList.remove('star-hover');
            } else {
                star.classList.add('star-hover');
            }
            if (star === hStar){
                match = true;
            } 
        });
    }
    
    function removeHover(e){
        let stars = this.querySelectorAll('.star');
        stars.forEach(function(star){
            star.classList.remove('star-hover');
        });
      }
    }
  
    var btnFavorite = document.querySelectorAll('a.btn-outline');

    for (var i = 0; i < btnFavorite.length; i++) {
	    btnFavorite[i].addEventListener('click', function (event) {
            var classActive = this.classList;
            if (classActive.contains('active')){
                this.classList.remove('active');
            } else {
                this.className += ' active';
            }
        }, false);
    } 
  
    var responsiveStep = 568;
    var change = window.innerWidth > responsiveStep ? false : true;
   
    //buttons for menu hamburger and search
    var menuHamburger = document.getElementById('menuHamburger');
    var menuSearchButton = document.getElementById('menuSearchButton');
    
    //menu
    var menuList = document.getElementById('menuList');
    var menuSearch = document.getElementById('menuSearch');

    window.addEventListener('resize', function() {
        if (window.innerWidth > responsiveStep) {
            menuList.style.display = "flex";
            menuSearch.style.display = "flex";
            change = false;
        }
        else {
            menuList.style.display = "none";
            menuSearch.style.display = "none";
            change = true;
        }
    });

    var changeVisible = function(item) {
        change ? (item.style.display = "flex") : (item.style.display = "none");
        change = !change;
    };

    menuHamburger.addEventListener('click', function() {
        changeVisible(menuList)});
    menuSearchButton.addEventListener('click', function() {
        changeVisible(menuSearch)});
})();

