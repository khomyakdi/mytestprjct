//slick plagin 
var slickPlagin = {
    init: function () {
        $(document).ready(function () {
            $('.intro-block .slides').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: true,
                prevArrow: $('.intro-block .slider-control .prev-btn'),
                nextArrow: $('.intro-block .slider-control .next-btn'),
            });
            $('.products-slider .slides').slick({
                initialSlide: 2,
                slidesToShow: 5,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '10px',
                prevArrow: $('.products-slider .slick-slider-prev-btn'),
                nextArrow: $('.products-slider .slick-slider-next-btn'),
                responsive: [
                    {
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 4,
                        }
                    },
                    {
                        breakpoint: 1023,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 800,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 640,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            });
            $('.event-slider .slides').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '10px',
                prevArrow: $('.event-slider .slick-slider-prev-btn'),
                nextArrow: $('.event-slider .slick-slider-next-btn'),
                responsive: [
                    {
                        breakpoint: 800,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 640,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            })
        })
    }
}
//page user interface
var pageUI = {
    init: function () {
        this.navToggler();
        this.responsiveUI.init();
    },
    navToggler: function () {
        $(document).ready(function () {
            $('.nav-toggler').on('click', function () {

                $('.main-menu').toggleClass('opened');
            })
        });
    }
}
pageUI.responsiveUI = {
    isFirstInit: true,
    currentLayout: false,
    init: function () {
        this.callFunctions();
        this.initResizeFunctions();
        this.secondInit();
    },
    rules: {
        ALL: '',
        DESKTOP: 'only screen and (min-width: 1024px)',
        TABLET: 'only screen and (min-width: 640px) and (max-width: 1023px)',
        MOBILE: 'only screen and (max-width: 639px)'
    },
    functions: {
        ALL: [],
        DESKTOP: [],
        TABLET: [],
        MOBILE: []
    },
    addFunction: function (functionName, rule) {
        this.functions[rule].push(functionName);
    },
    callFunctions: function () {
        for (var i = 0; i < this.functions.ALL.length; i++) {
            this.functions.ALL[i]();
        }
    },
    initDefaultLayout: function () {
        for (var mediaType in this.rules) {
            if (window.matchMedia(this.rules[mediaType]).matches) {
                this.defaultLayout = mediaType;
                break;
            }
        }
    },
    widthMedia: function () {
        var self = this;
        body = document.body;
        for (var mediaType in this.rules) {
            body.classList.remove("ui-" + mediaType.toLowerCase());
        };
        for (var mediaType in this.rules) {
            if (mediaType != "ALL") {
                if (window.matchMedia(this.rules[mediaType]).matches) {
                    this.currentLayout = mediaType;
                    var name = "ui-" + mediaType.toLowerCase();

                    if (!body.classList.contains(name)) {
                        body.classList.add(name);
                    }

                    for (var j = 0; j < this.functions[mediaType].length; j++) {
                        this.functions[mediaType][j].bind(self)();
                    }
                    this.currentLayout = mediaType;
                }
            }
        };
    },
    secondInit: function () {
        this.isFirstInit = false;
    },
    initResizeFunctions: function () {
        self = this;
        funcList = [
            this.widthMedia.bind(self),
        ];
        var run = function () {
            for (var i = 0; i < funcList.length; i++) {
                funcList[i]();
            }
        }
        run();
        $(window).on("resize", $.debounce(250, run));
        $(window).on("orientationchange", $.debounce(250, run));
    }
};
var toggleHeader = function (isMobile) {
    if (this.currentLayout != 'MOBILE' && this.isFirstInit)
        return;
    var headerSelector = isMobile ? '.main-menu-wrapper' : '.main-header-wrapper',
        $callBlock = $('.call-block'),
        $controlPanel = $('.control-panel');

    $(headerSelector).prepend($controlPanel).prepend($callBlock);
}

pageUI.responsiveUI.addFunction(function () {
    toggleHeader.bind(this)(true);
}, 'MOBILE');
pageUI.responsiveUI.addFunction(function () {
    toggleHeader.bind(this)(false);
}, 'TABLET');
pageUI.responsiveUI.addFunction(function () {
    toggleHeader.bind(this)(false);
}, 'DESKTOP');
document.addEventListener('DOMContentLoaded', function (event) {

    slickPlagin.init();
    pageUI.init();

});
