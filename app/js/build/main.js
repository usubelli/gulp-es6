'use strict';

disableScroll();

/* ================ VARIABLES ================ */
var d = document,
    isMobile = {
    Android: function Android() {
        navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function BlackBerry() {
        navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function iOS() {
        navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function Opera() {
        navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function Windows() {
        navigator.userAgent.match(/IEMobile/i);
    },
    any: function any() {
        isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
    }
};

/* ================ RESIZE INIT ================ */

var resizeInit = function resizeInit() {
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;

    var elementsToResize = d.querySelectorAll('.full-screen, #temoignage');

    [].forEach.call(elementsToResize, function (el) {
        el.setAttribute('style', 'width: ' + windowWidth + 'px; height: ' + windowHeight + 'px;');
    });
};
resizeInit();

if (!isMobile.any()) {
    window.addEventListener('resize', function () {
        resizeInit();
    });
}
window.addEventListener('orientationchange', function () {
    resizeInit();
});

/* ================ LOADING HOME ================ */

// Animations des elements à la fin du chargement de la page
var loadingSectionTop = function loadingSectionTop() {
    setTimeout(function () {
        var els = d.querySelectorAll('.wrapp-img, #header, .wrapp-loader, .accroche');
        for (var i = 0, iLen = els.length; i < iLen; i++) {
            els[i].classList.remove('unload');
        }
        enableScroll();
    }, 1500);
};
window.addEventListener('load', function () {
    loadingSectionTop();
});

/* ================ SECTION TOP ================ */

// Changement d'etat au scroll
var scrollPositionTop = function scrollPositionTop() {
    var scrollY = window.pageYOffset;
    if (window.pageYOffset < 1400) {
        // d.querySelector('#content').style.backgroundPosition =  `center ${scrollY / 10}px`; 
        d.querySelector('.full-screen .wrapp-img .background').style.backgroundPosition = 'right ' + scrollY / 3 + 'px';
    }

    var $header = d.querySelector('#header');
    if (scrollY > 50) {
        $header.classList.add('is-scroll');
        $header.classList.add('one');
    } else {
        $header.classList.remove('is-scroll');
    }
};
window.addEventListener('scroll', function () {
    scrollPositionTop();
});

// Evenements au click du Menu hamburger
var $burger = d.querySelector('#burger-menu');
var $reservationBtn = d.querySelector('li.reserver a');

$burger.addEventListener('click', function (e) {
    $burger.classList.toggle('open');
    d.querySelector('#header .navbar').classList.toggle('open');
    setTimeout(function () {
        d.querySelector('.navbar ul.main-nav').classList.toggle('open');
        $reservationBtn.parentNode.classList.remove('open');
    }, 200);
});

// Evenements au click du bouton réserver mobile
$reservationBtn.addEventListener('click', function (e) {
    if (window.innerWidth < 1200) {
        e.preventDefault;
        e.target.parentNode.parentNode.classList.add('open');
    }
});

/* ================ STORIES ================ */

// Ajout de la class in-view si l'element est dans le viewport
var isInViewport = function isInViewport(element, returnAnim) {
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;

    if (rect.top >= 0 && rect.bottom <= (window.innerHeight + 200 || html.clientHeight)) {
        element.classList.add('in-view');
    } else if (rect.top <= 0 && rect.bottom >= (window.innerHeight || html.clientHeight) && returnAnim) {
        element.classList.remove('in-view');
    }
};

// Animation parallax des stories au scroll
var parallaxEffect = function parallaxEffect(element, Ysmall, Ybig) {
    var top = 0;
    var scrollY = window.pageYOffset;

    top += element.offsetTop || 0;
    var translateYsmall = (top - scrollY) / Ysmall;
    var translateYbig = (top - scrollY) / Ybig;

    if (translateYbig <= 10 && translateYbig >= 0) {
        element.querySelector('.wrapp-image.big').style.transform = 'translateY( -' + translateYbig + '%)';
    }

    if (translateYsmall <= 110 && translateYsmall >= 0) {
        element.querySelector('.wrapp-image.small').style.transform = 'translateY( ' + translateYsmall + '%)';
    }
};

window.addEventListener('scroll', function () {
    if (window.innerWidth >= 992) {

        parallaxEffect(d.querySelector('.story.reveil'), 4, 30);
        parallaxEffect(d.querySelector('.story.detente'), 15, 30);

        isInViewport(d.querySelector('.offres'), false);
    }
});

/* ================ MODERNIZR ================ */

// Object-fit
if (!Modernizr.objectfit) {

    [].forEach.call(d.querySelectorAll('.story .wrapp-image .image'), function (image) {
        var fullScreenImg = image.children;
        var src = fullScreenImg[0].getAttribute('data-src');
        image.setAttribute('style', 'background-image: url(' + src + ');');
        image.classList.add('compat-object-fit');
        fullScreenImg[0].remove();
    });
}