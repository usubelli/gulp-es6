    disableScroll();

    /* ================ VARIABLES ================ */ 
    const d = document,
        isMobile = {
            Android: () => { navigator.userAgent.match(/Android/i); },
            BlackBerry: () => { navigator.userAgent.match(/BlackBerry/i);},
            iOS: () => { navigator.userAgent.match(/iPhone|iPad|iPod/i); },
            Opera: () => { navigator.userAgent.match(/Opera Mini/i); },
            Windows: () => { navigator.userAgent.match(/IEMobile/i); },
            any: () => { (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera () || isMobile.Windows());}
        };


    /* ================ RESIZE INIT ================ */  

    const resizeInit = () => {
        let windowWidth = window.innerWidth,
            windowHeight = window.innerHeight;
        
        const elementsToResize = d.querySelectorAll('.full-screen, #temoignage');
        
        [].forEach.call( elementsToResize, el => { 
            el.setAttribute('style', `width: ${windowWidth}px; height: ${windowHeight}px;`); 
        });
    };      
    resizeInit();
   
    if(!isMobile.any()) {
        window.addEventListener('resize', () => { resizeInit() });
    }
    window.addEventListener('orientationchange', () => { resizeInit() });

 


    /* ================ LOADING HOME ================ */ 

    // Animations des elements à la fin du chargement de la page
    const loadingSectionTop = () => {
        setTimeout(() => { 
            let els = d.querySelectorAll('.wrapp-img, #header, .wrapp-loader, .accroche');
            for (let i = 0, iLen = els.length; i < iLen; i++) {
                els[i].classList.remove('unload');
            }
            enableScroll();
        }, 1500);
    }
    window.addEventListener( 'load', () => { loadingSectionTop() });




    /* ================ SECTION TOP ================ */ 

    // Changement d'etat au scroll
    const scrollPositionTop = () => {
        const scrollY = window.pageYOffset;
        if ( window.pageYOffset < 1400 ){
            // d.querySelector('#content').style.backgroundPosition =  `center ${scrollY / 10}px`; 
            d.querySelector('.full-screen .wrapp-img .background').style.backgroundPosition =  `right ${scrollY / 3}px`; 
        }

        let $header = d.querySelector('#header'); 
        if( scrollY > 50 ) {
            $header.classList.add('is-scroll');
            $header.classList.add('one');
        } else {
            $header.classList.remove('is-scroll');
        }
    }
    window.addEventListener( 'scroll', () => { scrollPositionTop() });


    // Evenements au click du Menu hamburger
    const $burger = d.querySelector('#burger-menu');
    const $reservationBtn = d.querySelector('li.reserver a');

    $burger.addEventListener( 'click', (e) => {
		$burger.classList.toggle('open');
        d.querySelector('#header .navbar').classList.toggle('open');
        setTimeout(() => { 
            d.querySelector('.navbar ul.main-nav').classList.toggle('open') 
            $reservationBtn.parentNode.classList.remove('open');
        }, 200);
	});
 
 
    // Evenements au click du bouton réserver mobile
    $reservationBtn.addEventListener( 'click', (e) => {
        if (window.innerWidth < 1200) {
            e.preventDefault; 
		    e.target.parentNode.parentNode.classList.add('open'); 
        }
	});
    


    

    /* ================ STORIES ================ */ 

    // Ajout de la class in-view si l'element est dans le viewport
    const isInViewport = (element, returnAnim) => {
        let rect = element.getBoundingClientRect(); 
        let html = document.documentElement;

        if ( rect.top >= 0 && rect.bottom <= (window.innerHeight + 200 || html.clientHeight ) ) {
            element.classList.add('in-view');
        } else if ( rect.top <= 0 && rect.bottom >= (window.innerHeight || html.clientHeight ) && returnAnim) {
            element.classList.remove('in-view');
        }
    }


    // Animation parallax des stories au scroll
    const parallaxEffect = (element, Ysmall, Ybig) => { 
        let top = 0;
        let scrollY = window.pageYOffset;

        top += element.offsetTop || 0; 
        let translateYsmall = ( top - scrollY ) / Ysmall; 
        let translateYbig = ( top - scrollY ) / Ybig; 

        if ( translateYbig <= 10 && translateYbig >= 0) {
            element.querySelector('.wrapp-image.big').style.transform = `translateY( -${translateYbig}%)`;
        }

        if ( translateYsmall <= 110 && translateYsmall >= 0) {
            element.querySelector('.wrapp-image.small').style.transform = `translateY( ${translateYsmall}%)`;
        }
    }
    
    window.addEventListener( 'scroll', () => { 
        if (window.innerWidth >= 992) {

            parallaxEffect(d.querySelector('.story.reveil'), 4, 30 ) ;
            parallaxEffect(d.querySelector('.story.detente'), 15, 30 );

            isInViewport( d.querySelector('.offres'), false );
        }
    });




    /* ================ MODERNIZR ================ */ 

    // Object-fit
    if ( !Modernizr.objectfit ) {
       
        [].forEach.call( d.querySelectorAll('.story .wrapp-image .image'), image => { 
            let fullScreenImg = image.children;
            let src = fullScreenImg[0].getAttribute('data-src');
            image.setAttribute('style', `background-image: url(${src});`); 
            image.classList.add('compat-object-fit');
            fullScreenImg[0].remove();
        });
     
    }

