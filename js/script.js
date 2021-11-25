$(document).ready(function() {
	let didScroll;
    let lastScrollTop = 0;
    let delta = 5;
    let navbarHeight = $('header').outerHeight();    

    $(window).on("load scroll", function(event) {
        didScroll = true; 
    });

    setInterval(function() {
        if (didScroll) {
            if ($(".slider").length === 0) {
                $('.header').addClass("-fill");
                hasScrolled();
                didScroll = false;
            }
            else {
                hasScrolled();
                didScroll = false;
            }            
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta) return;
        if (st > lastScrollTop && st > navbarHeight) {
            $('header').removeClass('nav-down').addClass('nav-up');
        } else {
            if (st + $(window).height() < $(document).height()) {
                $('header').removeClass('nav-up').addClass('nav-down');
            }
        }
        if ($(".slider").length > 0) {
            if ($(window).scrollTop() > 110) {
                $('.header').addClass("-fill");
            }
            else {
                $('.header').removeClass("-fill");
            }
        }       
        lastScrollTop = st;
    }

    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: 'Предыдущий',
        nextText: 'Следующий',
        currentText: 'Сегодня',
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        weekHeader: 'Не',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };

    $.datepicker.setDefaults($.datepicker.regional['ru']);

    $(".feedback__input.-date").datepicker();

    var inputs = document.querySelectorAll('.inputfile');
    Array.prototype.forEach.call(inputs, function (input) {
        var label = input.nextElementSibling,
            labelVal = label.innerHTML;
        input.addEventListener('change', function (e) {
            var fileName = '';
            if (this.files && this.files.length > 1)
                fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
            else
                fileName = e.target.value.split('\\').pop();
            if (fileName)
                label.innerHTML = fileName;
            else
                label.innerHTML = labelVal;
        });
    });

	$(".slider").slick({
		fade: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		arrows: true,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    arrows: false
                }
            },
            {
                breakpoint: 960,
                settings: {
                    dots: false,
                    arrows: false
                }
            }
        ]
	});

    $(".numbers__slider").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $(".projects__slider").slick({
        fade: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    dots: false
                }
            }
        ]
    });

    $(".product-slider").slick({
        arrows: false,
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1
    });

    $(".similar-slider").slick({
        arrows: true,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });

    $(".catalog-slider").slick({
        fade: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false
    });

    $(".gallery-slider").each(function() {
        $(this).slick({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 3000,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 600,
                    settings: "unslick"
                }
            ]
        });
    });

    $(".header__burger").on("click", function(event) {
        event.preventDefault();
        $(this).toggleClass("-active");
        $(".header").toggleClass("-open");
        $(".menu-mobile").toggleClass("-active");
        $("html, body").toggleClass("-noscroll");
    });

    $(".filters-price").on("click", ".curr", function(event) {
        event.preventDefault();
        $(".filters-price__list").toggleClass("-active");
    });

    $(".filters-price__list").on("click", "span", function() {
        let sort = $(this).data("sort");
        $(".filters-price__list").toggleClass("-active");
        if (sort === "increase") {
            $(".filters-price .curr").removeClass("-decrease").addClass("-increase");
        }
        else {
            $(".filters-price .curr").removeClass("-increase").addClass("-decrease");
        }
    });

    $(".tabs__item-head").on("click", function(event) {
        event.preventDefault();
        let tab = $(this).data("tab");
        $(this).siblings().removeClass("-active");
        $(this).addClass("-active");
        $(this).parent().parent().find(".tabs__item-body").each(function(){
            if($(this).data("tab") === tab) {
                $(this).addClass("-active");
            }
            else {
                $(this).removeClass("-active");
            }
        });
        if ($('.similar-slider').length > 0 || $(".gallery-slider").length > 0) {
            $('.similar-slider').slick('refresh');
            if ($(window).innerWidth() > 600) {
                $('.gallery-slider').slick('refresh');
            }
        }        
    });

    $(".table__td.-buy").on("click", ".add-to-basket", function(event) {
        event.preventDefault();
        let item = $(this).parent().parent(),
            product_cost = item.attr("data-cost");
        item.find(".total").text("Итого: " + product_cost + "₽").addClass("-visible");        
        $(this).addClass("-inbasket");
        item.find(".link__buy-click").fadeOut(0);
        item.find(".link__basket").fadeIn(0);
    });

    $(".table__td.-buy").on("click", ".plus", function() {
        let item = $(this).parent().parent(),
            product_cost = item.attr("data-cost"),
            product_count = item.attr("data-count");
        product_count++;
        item.attr("data-count", product_count);
        item.find(".count").html(product_count);
        item.find(".total").html("Итого: " + product_cost * product_count + "₽");
    });

    $(".table__td.-buy").on("click", ".minus", function() {
        let item = $(this).parent().parent(),
            product_cost = item.attr("data-cost");
            product_count = item.attr("data-count");
        if (product_count > 1) {
            product_count--;
            item.attr("data-count", product_count);
            item.find(".count").html(product_count);
            item.find(".total").html("Итого: " + product_cost * product_count + "₽");
        }
        else {
            item.find(".add-to-basket").removeClass("-inbasket");
            item.find(".total").removeClass("-visible");
            item.find(".link__buy-click").fadeIn(0);
            item.find(".link__basket").fadeOut(0);
        }
    });

    $(".catalog-tabs__item").on("click", function(event) {
        event.preventDefault();
        let tab = $(this).data("tab");
        $(this).siblings().removeClass("-active");
        $(this).addClass("-active");
        if ($(".catalog__btn-filters").hasClass("-active")) {
            $(".catalog__btn-filters").removeClass("-active");
            $(".catalog__btn-filters").html("Подбор по параметрам");
            $(".catalog__bottom").slideToggle();
            $(".catalog__filters").slideToggle();
        }
        $(".catalog__inner").each(function(){
            if($(this).data("tab") === tab) {
                $(this).addClass("-active");
            }
            else {
                $(this).removeClass("-active");
            }
        });
    });

    $(".filters__reset").on("click", function(event) {
        event.preventDefault();
        $(this).parent()[0].reset();
    });

    $(".catalog__btn-filters").on("click", function(event) {
        if ($(this).hasClass("-active")) {
            $(this).removeClass("-active");
            $(this).html("Подбор по параметрам");
        }
        else {
            $(this).addClass("-active");
            $(this).html("Свернуть фильтры");
        }
        event.preventDefault();
        $(".catalog__bottom").slideToggle();
        $(".catalog__filters").slideToggle();
    });

    $(".vacancies-list__head img").on("click", function() {
        let item = $(this).parent().parent();
        item.toggleClass("-open");
        item.find(".vacancies-list__body").slideToggle();
    });

    if($("#countrySelect").length > 0 || $("#jobSelect").length > 0 || $("#productSelect").length > 0) {
        $("#countrySelect, #jobSelect, #productSelect").niceSelect();
    }    
    
    $(".partners-catalogs-request-price, .partners-request__back").on("click", function(event) {
        event.preventDefault();
        $(".partners-tabs__item-body[data-tab='catalog']").find(".breadcrumbs").slideToggle();
        $(".partners-catalogs, .partners-request").slideToggle();
    });
    
    $(window).on("load resize", function() {
        if($(window).innerWidth() <= 991) {
            $(function() {
                (function makeTabsSameWidth() {
                    function setEqualWidth(tabs) {
                        var maxWidth = 0;
                        tabs.each(function() {
                            currentWidth = $(this).outerWidth();
                            if (currentWidth > maxWidth) {
                                maxWidth = currentWidth;
                            }
                        });
                        tabs.width(maxWidth);
                    }
                    setEqualWidth($(".services-table__tbody .services-table__td"));
                })();
            });
        }
        else {
            $(".services-table__td").removeAttr("style");
        }
    });

    $(".partners-dropdown__selected").on("click", function() {
        $(this).parent().toggleClass("-active");
        $(this).parent().find(".partners-dropdown__list").slideToggle();
    });

    $(".partners-dropdown__item").on("click", function() {
        let tab = $(this).data("tab");
        $(this).parent().parent().toggleClass("-active");
        $(this).parent().parent().find(".partners-dropdown__list").slideToggle();
        $(".tabs__item-body").each(function() {
            if ($(this).data("tab") === tab) {
                $(this).addClass("-active");
            }
            else {
                $(this).removeClass("-active");
            }
        });
    });

    $(".news-gallery__more.-mobile").on("click", function(event) {
        event.preventDefault();
        $(this).parent().find(".gallery-slider__item").addClass("-show");
        $(this).fadeOut();
    });
});

