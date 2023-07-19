$(document).ready(function () {

    // Bind update when using side filter
    $('#teamFilter')
        .on('click',
            'a',
            function () {
                var a = $('.galtls-item').not('.concealed').find('img.lazy');

                for (var i = 0; i < a.length; i++) {

                    var h = $(a[i]).outerHeight(),
                        w = $(a[i]).outerWidth();

                    $(a[i])
                        .parent()
                        .css({
                            width: w + 'px',
                            height: h + 'px'
                        });

                    $(a[i]).attr('src', $(a[i]).data('original'));

                }
            });

    ////////

    var lazyloading = 'progressive';

    // Swiping for gallery
    if ($(window).width() < 991) {

        lazyloading = 'ondemand';

        $.ajax({
            url: "/Custom/Assets/scripts/jquery.touchSwipe.min.js",
            dataType: "script",
            success: function () {
                $("#colorbox")
                    .swipe({
                        swipe: function (event, direction, distance, duration, fingerCount) {
                            console.log("You swiped " + direction);
                            if ($('#colorbox:visible').length > 0) {
                                if (direction === 'left') {
                                    $('#cboxPrevious').click();
                                } else if (direction === 'right') {
                                    $('#cboxNext').click();
                                }
                            };
                        }
                    });
            }
        });
    };


    var deviceWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    // mobile navigation
    $('.navigation, .navbar-close').on('click', function () {
        var $body = $('body');
        var $header = $('header#mainHeader');

        if ($body.hasClass('sidebar-open')) {
            $body.removeClass('sidebar-open');
            setTimeout(function () {
                $header.removeClass('on-open');
            }, 400);
        } else {
            $body.addClass('sidebar-open');
            $header.addClass('on-open');
        }
    });

    $(document).on("click", "header#mainHeader", function (event) {
        var $target = $(event.target),
            $body = $('body');

        // target is #mainHeader
        if ($target.hasClass('inverse on-open')) {
            if ($body.hasClass('sidebar-open')) {
                $body.removeClass('sidebar-open');
                setTimeout(function () {
                    $(this).removeClass('on-open');
                }, 400);
            }
        };


        // target is .navbar-header
        if ($target.hasClass('navbar-header') || $target.hasClass('navbar')) {
            if ($body.hasClass('sidebar-open')) {
                $body.removeClass('sidebar-open');
                setTimeout(function () {
                    $(this).removeClass('on-open');
                }, 400);
            }
        }
    });

    var lastScrollTop = 0;
    $(document).on('scroll', function () {
        var scrollTop = $("html").scrollTop() || $("body").scrollTop();

        if (scrollTop > 5) {
            if (!$('body').hasClass("is-scrolling")) {
                $('body').addClass("is-scrolling");
            }
        } else {
            $('body').removeClass("is-scrolling");
        };



        var st = $(this).scrollTop();
        if (st > lastScrollTop) {
            // downscroll code
            if (scrollTop > 208) {
                if (!$('body').hasClass("is-sticky")) {
                    $('body').addClass("is-sticky is-shadow");

                    setTimeout(function () {
                        $('body').addClass('in');
                    }, 500);
                }
            } else {
                $('body').removeClass("is-sticky in");
            };

        } else {
            // upscroll code			
            if (scrollTop <= 250) {
                if ($('body').hasClass("is-sticky")) {
                    $('body').removeClass("is-sticky in is-shadow");
                }
            };

        };

        lastScrollTop = st;
    });

    $('.homeTileCarousel').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true
    });

    if ($('.homegallery').length) {
        var $grid = $('.homegallery').masonry({
            // options
            itemSelector: '.grid-item',
            columnWidth: 270,
            gutter: 12,
            isFitWidth: true
        });
    }

    var timeoutId;
    $(window).on("resize", function () {
        if (timeoutId) {
            clearTimeout(timeoutId);
        };

        timeoutId = setTimeout(function () {

            if ($('.homegallery').length) {
                // reset masonry
                $grid.masonry('layout');
            }

            // set boxes tallest
            setTallestElement('.boxes-wrapper', '.box-inner');

            // set news tallest			
            setTallestElement('.newstiles', '.newstls-desc');

        }, 100);
    });

    $('.column-side > .content').each(function () {
        var $content = $(this).html();
        var $newContent = $content.replace(/\s+/g, '');

        if ($newContent === "" || $newContent == "&nbsp;") {
            $(this).addClass('hidden-mobile');
        }
    });


    $('.search-btn-desktop').on("click", function (e) {
        var $parent = $(this).parents('.navbar-search');
        var $input = $parent.find('.search-input');
        var hasFocus = $('.search-input:focus').length;

        $('.is-open').removeClass("is-open");

        if ($parent.hasClass('is-search-focus')) {
            $parent.removeClass('is-search-focus');
        } else {
            $parent.addClass('is-search-focus');
            $input.focus();
        }

    });


    $('[data-toggleclass]').on("click", function (e) {
        e.preventDefault();
        var $className = $(this).attr("data-toggleclass");
        var $target = $(this).parents('.' + $className);
        var $classStatus = $target.hasClass('is-open') ? true : false;

        $('.is-open').removeClass("is-open");
        $('.is-search-focus').removeClass('is-search-focus');

        if ($classStatus) {
            $target.removeClass('is-open');
        } else {
            $target.addClass('is-open');
        }
    });

    // Lazy Load
    $("img.lazy").lazyload();

    // wysiwyg cotent
    $(".wysiwyg-content table").each(function () {
        $(this).wrap('<div class="table-responsive"/>');
    });

    $(".wysiwyg-content img").each(function () {
        if ($(this).css('float') === "left") {
            $(this).addClass("pull-left");
        };

        if ($(this).css('float') === "right") {
            $(this).addClass("pull-right");
        }
    });

    var resizeColourBox = function () {
        var width = $(window).width() - 40;
        width = width > 1000 ? 1000 : width;
        $.colorbox.resize({
            width: width,
            height: width * 0.7 - 90
        })
    }
    // image carousel

    $('.imagecarousel').each(function () {

        var $this = $(this);

        var slideToShow = $this.attr('data-slidetoshow');

        $this.find('.imgcarsl-inner').slick({
            slide: '.imgcarsl-item',
            //slidesToShow: slideToShow,
            //slidesToScroll: parseInt(slideToShow),

            slidesToShow: 4,
            slidesToScroll: 4,

            lazyLoad: lazyloading,

            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]

            //responsive: [
            //{
            //    breakpoint: 1024,
            //    settings: {
            //        slidesToShow: slideToShow - 1 > 1 ? slideToShow - 1 : 1,
            //        slidesToScroll: slideToShow - 1 > 1 ? slideToShow - 1 : 1
            //    }
            //},
            //{
            //    breakpoint: 767,
            //    settings: {
            //        slidesToShow: slideToShow - 2 > 1 ? slideToShow - 2 : 1,
            //        slidesToScroll: slideToShow - 2 > 1 ? slideToShow - 2 : 1
            //    }
            //},
            //{
            //    breakpoint: 481,
            //    settings: {
            //        slidesToShow: slideToShow - 3 > 1 ? slideToShow - 3 : 1,
            //        slidesToScroll: slideToShow - 3 > 1 ? slideToShow - 3 : 1
            //    }
            //}
            //]
        });



        var $item = $this.find('.imgcarsl-item');
        var groupName = $($item[0]).find('a:not(.video)').attr('class');
        var div_w = $item.width();
        $item.css('height', div_w);

        // on image loaded
        $item.imagesLoaded(function () {
            imageScaleSize($this, div_w);
        });

        // set colorbox
        $("." + groupName).colorbox({
            rel: groupName,
            transition: "none",
            maxWidth: '1000px',
            maxHeight: '700px',
            reposition: true,
            onComplete: resizeColourBox
        });

        $this.find(".video").colorbox({
            rel: groupName,
            iframe: false,
            maxWidth: '1000px',
            maxHeight: '700px',
            reposition: true
        });

        $(document).bind('cbox_open', function () {
            var $scrollWidth = getScrollBarWidth();

            $('html').css({
                overflow: 'hidden',
                "padding-right": $scrollWidth + "px"
            });

            $('nav.navbar').css({
                "padding-right": $scrollWidth + "px"
            });

            // Do a resize incase colorbox is too big
            setTimeout(resizeColourBox, 300);

        }).bind('cbox_closed', function () {
            $('html, nav.navbar').removeAttr('style');
        });

        var timeoutId;
        $(window).on('resize', function () {

            if (timeoutId) {
                clearTimeout(timeoutId);
            };

            timeoutId = setTimeout(function () {

                $('.imagecarousel').each(function () {
                    $carousel = $(this);
                    var current = $carousel.find('.slick-current');
                    var $item = $carousel.find('.imgcarsl-item');

                    $item.find('img').removeAttr('style');
                    var item_w = current.width();
                    $item.css('height', item_w);


                    imageScaleSize($carousel, item_w);
                });


                // Resize color box according to window size
                resizeColourBox();
            }, 200);
        });

        $('.imagecarousel img').load(function () {
            $carousel = $(this).closest('.imagecarousel');
            var current = $carousel.find('.slick-current');
            var $item = $carousel.find('.imgcarsl-item');

            $item.find('img').removeAttr('style');
            var item_w = current.width();
            $item.css('height', item_w);

            imageScaleSize($carousel, item_w);
        });

    });


    // testimonial
    $('.testimonial-wrapper .testmnl-holder').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false
    });


    // Identifying Accordion Functionality 
    /*---------------------------------------------------------------------------------
		usage: 
		1) add class initAccordion into the wrapper
		2) the item should contains [class*="-item"]
		3) the heading should contains [class*="-heading"] and the trigger is an anchor ( a[href="#"] )
		4) the body should contains [class*="-body"] and contains class .collapse
		5) add class .in into the faq-body to make expanded at first render
	----------------------------------------------------------------------------------*/
    $('.initAccordion').each(function (idx) {
        var $wrap = $(this);
        var $item = $wrap.find('[class*="-item"]');

        $wrap.attr({
            'id': "ac-" + idx,
            'role': "tablist",
            'aria-multiselectable': "true"
        });

        for (var a = 0; a <= $item.length; a++) {
            var $el = $($item[a]);
            var $head = $el.find('[class*="-heading"]');
            var $body = $el.find('[class*="-body"]');
            var $link = $head.find('a');

            if ($body.hasClass('in')) {
                $el.addClass('is-expanded');
            };

            $head.attr({
                'role': "tab",
                'id': "achead-" + idx + '-' + a
            });

            $link.attr({
                'class': $body.hasClass('in') ? "" : "collapsed",
                'role': "button",
                'data-toggle': "collapse",
                'data-parent': "ac-" + idx,
                'href': "#acbody-" + idx + '-' + a,
                'aria-expanded': $body.hasClass('in') ? "true" : "false",
                'aria-controls': "collapse-" + idx + '-' + a
            });

            $body.attr({
                'id': "acbody-" + idx + '-' + a,
                'role': "tabpanel",
                'aria-labelledby': "achead-" + idx + '-' + a
            })
                .on('hidden.bs.collapse', function () {
                    $(this).parent().removeClass('is-expanded');
                })
                .on('show.bs.collapse', function () {
                    $(this).parent().addClass('is-expanded');
                });
        };

    });


    // first render boxes 
    $('.boxes-wrapper').each(function () {
        setTallestElement(this, '.box-inner');
    });

    // first render  news tiles
    $('.newstiles').each(function () {
        setTallestElement('.newstiles', '.newstls-desc');
    });


    // side navigation
    $('.sidenavigation').each(function (idx) {
        var $this = $(this);
        var $item = $this.find('.sidnav-item');

        //if(!$this.hasClass('is-nosubnav')) {
        if ($item.length) {
            $item.each(function () {
                var $el = $(this);
                var $link = $el.find('.sidnav-heading a');
                var $check = $link.siblings('.sidnav-check');
                var $body = $el.find('.sidnav-body');

                $link.on('click', function (e) {
                    if ($link.parents().hasClass('is-filter') || !$link.parents().hasClass('is-nosubnav')) {
                        e.preventDefault();
                        $el.addClass('active');
                        $this.find('.is-expanded').not('.active').removeClass('is-expanded');
                        $el.toggleClass('is-expanded');
                        $this.find('.active').removeClass('active');
                    };
                });

                $check.on('click', function (e) {
                    e.preventDefault();
                    var $_ck = $(this);

                    $_ck.toggleClass('is-checked').siblings('a').toggleClass('is-selected');

                    if ($_ck.hasClass('is-checked')) {
                        $body.children().addClass('is-selected');

                    } else {
                        $body.find('.is-selected').removeClass('is-selected');
                    }
                });

                $body.children('a').on('click', function (e) {
                    var $child = $(this);
                    if ($link.parents().hasClass('is-filter')) {
                        e.preventDefault();

                        $child.toggleClass('is-selected');
                        var count = $child.parent().find('.is-selected');

                        if (count.length > 0) {
                            $check.addClass('is-checked');
                            $link.addClass('is-selected');
                        } else {
                            $check.removeClass('is-checked');
                            $link.removeClass('is-selected');
                        }
                    }


                });

            });
        };
        //};

    });

    $(window)
        .load(function () {
            var $teamFilter = $('#teamFilter');
            if ($teamFilter.length > 0) {

                var yr = [],
                    items = $('[id*="plSidnavItem"] .sidnav-body > a');
                for (var i = 0; i < items.length; i++) {
                    yr.push(parseInt($(items[i]).data('category')));
                };
                yr = Math.max.apply(null, yr);

                $('[id*="plSidnavItem"]').click();
                
                if(!$teamFilter.hasClass('is-notfilteredonload')) {
                    $('[id*="plSidnavItem"] .sidnav-body > a[data-category="' + yr + '"]').click();
                }

                setTimeout(function () {
                    $('#teamFilter, #theTeamTiles')
                        .animate({
                            opacity: 1
                        },
                            500);
                }, 500);
            }
        });

    // only on desktop or bigger than 992px
    if ($('.mainMenu').length) {
        var timeOutMenu,
            $menuChildren = $('.mainMenu > li');

        $.each($menuChildren, function (idx, value) {
            $(this).css({
                'width': $(this).outerWidth()
            });
        });



        $menuChildren.hover(function () {
            var $self = $(this);
            if (!$self.hasClass('is-hover')) {

                $self.addClass('is-hover');

                // for sub menu position
                if ($self.hasClass('sub-menu')) {


                    var $subMenuContainer = $self.find('.sbmn-wrapper');
                    var $textLabel = $self.children("a");
                    var $textLength = $textLabel.width() + 60;
                    var $textPosition = $textLabel.position().left;


                    if ($self.find('.sbmn-single-column').length) {
                        var $subMenuWidth = $subMenuContainer.outerWidth() > $textLength ? $subMenuContainer.outerWidth() : $textLength;
                    } else {
                        var $subMenuWidth = ($subMenuContainer.outerWidth() + 10) > $textLength ? ($subMenuContainer.outerWidth() + 10) : $textLength;
                    }

                    var $containerWidth = $self.parents('.mainMenu').outerWidth();
                    var $selfPosition = $self.position().left;

                    // set sub menu wrapper new width
                    $subMenuContainer.css({
                        'width': $subMenuWidth,
                        'position': 'absolute',
                        'left': ($self.children("a").position().left - 30) > 0 ? $self.children("a").position().left - 30 : 0
                    });

                    if (($selfPosition + $subMenuWidth) > $containerWidth) {
                        // for the menu on the adge of right navigation bar
                        $subMenuContainer.css('left', -(($selfPosition + $subMenuWidth) - $containerWidth));
                    }
                }
            };
        },

            function () {
                var $target = $(this);
                $target.removeClass('is-hover');
            });

        $(window).on('resize', function () {

            $mnChild = $('.mainMenu > li');
            $mnChild.removeAttr('style');

            if (timeOutMenu) {
                clearTimeout(timeOutMenu);
            };

            timeOutMenu = setTimeout(function () {
                $.each($mnChild, function (idx, value) {
                    $(this).css({
                        'width': $(this).outerWidth()
                    });
                });
            }, 200);

        });


        // if on mobile devices
        $('.mainMenu').each(function () {
            var $menu = $(this);
            var $menuItem = $menu.children('li');
            var $menuLink = $menuItem.children('a');

            $menuLink.on("click", function (e) {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(document).width() < 992) {
                    var $parent = $(this).parent();
                    if ($parent.hasClass('sub-menu')) {
                        e.preventDefault();
                        $parent.addClass('is-current');
                        $menu.find('.is-expanded').not('.is-current').removeClass('is-expanded');
                        $parent.toggleClass('is-expanded');
                        $menu.find('.is-current').removeClass('is-current');
                    }
                }

            });

        });
    }


    // custom select
    $('select.form-control').selectpicker({
        dropupAuto: false
    });

    // custom select
    $('.customSelect').selectpicker({
        dropupAuto: false
    });

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('.customSelect, select.form-control').selectpicker('mobile');
    };


    // run gmap
    if ($('.gmapContent').length) {

        var dataGmap = $('.gmapContent');
        $.each(dataGmap, function (index, value) {
            google.maps.event.addDomListener(window, 'load', initialize($(value)));
        });
    };



    // scroll event
    //$.scrollSpeed(100, 800);
    //$.scrollSpeed(100, 800, 'easeOutCubic');

    //$("body").smoothWheel();

    $('.DOBpicker').pickadate({
        selectMonths: true,
        selectYears: 90,
        max: new Date(),
        format: 'dd/mm/yyyy'
    });

    $('.datePicker').pickadate({
        selectMonths: true,
        selectYears: true,
        format: 'dd/mm/yyyy'
    });

    $('.workingDaysDatePicker').pickadate({
        min: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        disable: [
            1, 7
        ],
        format: 'dd/mm/yyyy'
    });

    $('.timePicker').pickatime({
        min: [10, 0],
        max: [16, 0]
    });



    //subscribe 
    $('#submitNewsletter').click(function (e) {
        e.preventDefault();
        $('.subscribe-message').empty();
        $.getJSON('/api/newsletter/signup', {
            name: $('.sbftr-newsletter #frFirstName').val() + ' ' + $('.sbftr-newsletter #frSurname').val(),
            email: $('.sbftr-newsletter #frEmail').val()
        }, function (json, textStatus) {
            var $message = $('.sbftr-newsletter .sbftr-newsletter-message');
            var $form = $('.sbftr-newsletter .form-wrapper');

            $message.html(json.message).fadeIn('slow');
            $form.fadeOut('fast');

            setTimeout(function () {
                $message.html("").fadeOut('fast');
                $form.fadeIn('slow');
            }, 3000);

            $('.subscribe-message').append(json.message);

        });

    });




    /*-------------------------------------------------------------------------------------------------------------------
            Listing Filter
        -------------------------------------------------------------------------------------------------------------------*/
    if ($('.navListingFilter').length && $('.listContentFilter').length) {
        var $headFilter = $('.navListingFilter').find('.sidnav-heading .sidnav-check');
        var $childFilter = $('.navListingFilter').find('.sidnav-body a');
        var showHideListFilter = function ($el) {
            if ($el.hasClass('is-checked')) {
                $('.listContentFilter').find('[class*="-item"]').fadeIn('slow');
            } else {
                $('.listContentFilter').find('[class*="-item"]').fadeOut('fast');
            }
        };

        // first load 
        showHideListFilter($headFilter);

        // event on click   
        $headFilter.on('click', function () {
            showHideListFilter($(this));
        });

        // event child
        $childFilter.on('click', function () {

            var $title = (($(this).data('title')).toString()).toLowerCase();
            var $list = $('.listContentFilter').find('[class*="-item"]');

            for (var a = 0; a < $list.length; a++) {
                var item = $($list[a]);
                if (((item.data('title')).toString()).toLowerCase() === $title) {
                    if ($(this).hasClass('is-selected')) {
                        item.fadeIn('slow');
                    } else {
                        item.fadeOut('fast');
                    }
                }
            };
        });
    }

});



function stickyHeader(scrollTop, position) {
    if (scrollTop > position) {
        if (!$('body').hasClass("is-sticky")) {
            $('body').addClass("is-sticky animate");
        }

        setTimeout(function () {
            $('body').removeClass("animate");
        }, 500);

    } else {
        $('body').removeClass("is-sticky");
    };
}


function imageScaleSize(element, itemWidth) {

    //console.log('///////////////');
    //console.log(element);

    //console.log('///////////////');
    //console.log(itemWidth);

    var img = element.find('img');
    img.each(function () {
        var $img = $(this);
        var maxWidth = itemWidth;
        var maxHeight = itemWidth;
        var width = $img.width();
        var height = $img.height();
        var aspec, margin_top, margin_left;

        if (height > width) {
            if (width > maxWidth) {
                aspec = maxWidth / width;
                width = maxWidth;
                height = height * aspec;
                margin_top = -(height - maxHeight) / 2;
            }

            $img.css({
                'height': height,
                'margin-top': margin_top,
                'width': width
            });

        } else {
            if (height > maxHeight) {
                aspec = maxHeight / height;
                height = maxHeight;
                width = width * aspec;
                margin_left = -(width - maxWidth) / 2;
            }

            $img.css({
                'height': height,
                'margin-left': margin_left,
                'width': width
            });
        }

        $img.parents('.imgcarsl-item').removeClass('fade');

    });
};


function initialize(mapObject) {
    var startingZoom = mapObject.data("zoom");
    var LatLang = (mapObject.data("marker")).split(/,\s*/);
    var myLatlng = new google.maps.LatLng(parseFloat(LatLang[0]), parseFloat(LatLang[1]));
    var contentHTML = mapObject.html();
    var mapOptions = {
        center: myLatlng,
        zoom: startingZoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };


    var map = new google.maps.Map(mapObject[0], mapOptions);

    var infowindow = new google.maps.InfoWindow({
        content: contentHTML,
        maxWidth: 320
    });


    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });

    // repositioning gmap's marker everytime window resize                    
    $(window).on("resize", function () {
        mapObject.each(function () {
            var currCenter = map.getCenter();
            google.maps.event.trigger(map, 'resize');
            map.setCenter(currCenter);
        });

    });

};

function setTallestElement(element, child) {
    var deviceWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (deviceWidth >= 767) {
        $(element).each(function () {
            var $el = $(this);
            $el.find(child).removeAttr('style');

            var $child = $el.find(child);
            var height = 0;
            for (var i = 0; i < $child.length; i++) {
                var $el = $($child[i]).outerHeight();
                if (height < $el) height = $el;
            };

            $child.css("height", height);
        });
    } else {
        $(element).each(function () {
            $(this).find(child).removeAttr('style');
        });
    }
};

function setMinimumWeight() {
    var deviceWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || deviceWidth < 992) {

        var deviceHeight = document.documentElement.clientHeight,
            minusHeaderFooter = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 101 : 102;
        minHeight = deviceHeight - minusHeaderFooter;

        $('#loadCSS').remove();
        $('head').append('<style id="loadCSS" type="text/css">@media (max-width: 768px) {#main-wrapper{min-height: ' + minHeight + 'px;}</style>');
    }
};

function getScrollBarWidth() {
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";

    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);

    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;

    document.body.removeChild(outer);

    return (w1 - w2);
};

/*!
 * Masonry PACKAGED v4.0.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

/**
 * Bridget makes jQuery widgets
 * v2.0.0
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */

(function (window, factory) {
    'use strict';
    /* globals define: false, module: false, require: false */

    if (typeof define == 'function' && define.amd) {
        // AMD
        define('jquery-bridget/jquery-bridget', ['jquery'], function (jQuery) {
            factory(window, jQuery);
        });
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS
        module.exports = factory(
            window,
            require('jquery')
        );
    } else {
        // browser global
        window.jQueryBridget = factory(
            window,
            window.jQuery
        );
    }

}(window, function factory(window, jQuery) {
    'use strict';

    // ----- utils ----- //

    var arraySlice = Array.prototype.slice;

    // helper function for logging errors
    // $.error breaks jQuery chaining
    var console = window.console;
    var logError = typeof console == 'undefined' ? function () { } :
        function (message) {
            console.error(message);
        };

    // ----- jQueryBridget ----- //

    function jQueryBridget(namespace, PluginClass, $) {
        $ = $ || jQuery || window.jQuery;
        if (!$) {
            return;
        }

        // add option method -> $().plugin('option', {...})
        if (!PluginClass.prototype.option) {
            // option setter
            PluginClass.prototype.option = function (opts) {
                // bail out if not an object
                if (!$.isPlainObject(opts)) {
                    return;
                }
                this.options = $.extend(true, this.options, opts);
            };
        }

        // make jQuery plugin
        $.fn[namespace] = function (arg0 /*, arg1 */) {
            if (typeof arg0 == 'string') {
                // method call $().plugin( 'methodName', { options } )
                // shift arguments by 1
                var args = arraySlice.call(arguments, 1);
                return methodCall(this, arg0, args);
            }
            // just $().plugin({ options })
            plainCall(this, arg0);
            return this;
        };

        // $().plugin('methodName')
        function methodCall($elems, methodName, args) {
            var returnValue;
            var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';

            $elems.each(function (i, elem) {
                // get instance
                var instance = $.data(elem, namespace);
                if (!instance) {
                    logError(namespace + ' not initialized. Cannot call methods, i.e. ' +
                        pluginMethodStr);
                    return;
                }

                var method = instance[methodName];
                if (!method || methodName.charAt(0) == '_') {
                    logError(pluginMethodStr + ' is not a valid method');
                    return;
                }

                // apply method, get return value
                var value = method.apply(instance, args);
                // set return value if value is returned, use only first value
                returnValue = returnValue === undefined ? value : returnValue;
            });

            return returnValue !== undefined ? returnValue : $elems;
        }

        function plainCall($elems, options) {
            $elems.each(function (i, elem) {
                var instance = $.data(elem, namespace);
                if (instance) {
                    // set options & init
                    instance.option(options);
                    instance._init();
                } else {
                    // initialize new instance
                    instance = new PluginClass(elem, options);
                    $.data(elem, namespace, instance);
                }
            });
        }

        updateJQuery($);

    }

    // ----- updateJQuery ----- //

    // set $.bridget for v1 backwards compatibility
    function updateJQuery($) {
        if (!$ || ($ && $.bridget)) {
            return;
        }
        $.bridget = jQueryBridget;
    }

    updateJQuery(jQuery || window.jQuery);

    // -----  ----- //

    return jQueryBridget;

}));

/**
 * EvEmitter v1.0.1
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

(function (global, factory) {
    // universal module definition
    /* jshint strict: false */ /* globals define, module */
    if (typeof define == 'function' && define.amd) {
        // AMD - RequireJS
        define('ev-emitter/ev-emitter', factory);
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS - Browserify, Webpack
        module.exports = factory();
    } else {
        // Browser globals
        global.EvEmitter = factory();
    }

}(this, function () {



    function EvEmitter() { }

    var proto = EvEmitter.prototype;

    proto.on = function (eventName, listener) {
        if (!eventName || !listener) {
            return;
        }
        // set events hash
        var events = this._events = this._events || {};
        // set listeners array
        var listeners = events[eventName] = events[eventName] || [];
        // only add once
        if (listeners.indexOf(listener) == -1) {
            listeners.push(listener);
        }

        return this;
    };

    proto.once = function (eventName, listener) {
        if (!eventName || !listener) {
            return;
        }
        // add event
        this.on(eventName, listener);
        // set once flag
        // set onceEvents hash
        var onceEvents = this._onceEvents = this._onceEvents || {};
        // set onceListeners array
        var onceListeners = onceEvents[eventName] = onceEvents[eventName] || [];
        // set flag
        onceListeners[listener] = true;

        return this;
    };

    proto.off = function (eventName, listener) {
        var listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) {
            return;
        }
        var index = listeners.indexOf(listener);
        if (index != -1) {
            listeners.splice(index, 1);
        }

        return this;
    };

    proto.emitEvent = function (eventName, args) {
        var listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) {
            return;
        }
        var i = 0;
        var listener = listeners[i];
        args = args || [];
        // once stuff
        var onceListeners = this._onceEvents && this._onceEvents[eventName];

        while (listener) {
            var isOnce = onceListeners && onceListeners[listener];
            if (isOnce) {
                // remove listener
                // remove before trigger to prevent recursion
                this.off(eventName, listener);
                // unset once flag
                delete onceListeners[listener];
            }
            // trigger listener
            listener.apply(this, args);
            // get next listener
            i += isOnce ? 0 : 1;
            listener = listeners[i];
        }

        return this;
    };

    return EvEmitter;

}));

/*!
 * getSize v2.0.2
 * measure size of elements
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false, console: false */

(function (window, factory) {
    'use strict';

    if (typeof define == 'function' && define.amd) {
        // AMD
        define('get-size/get-size', [], function () {
            return factory();
        });
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS
        module.exports = factory();
    } else {
        // browser global
        window.getSize = factory();
    }

})(window, function factory() {
    'use strict';

    // -------------------------- helpers -------------------------- //

    // get a number from a string, not a percentage
    function getStyleSize(value) {
        var num = parseFloat(value);
        // not a percent like '100%', and a number
        var isValid = value.indexOf('%') == -1 && !isNaN(num);
        return isValid && num;
    }

    function noop() { }

    var logError = typeof console == 'undefined' ? noop :
        function (message) {
            console.error(message);
        };

    // -------------------------- measurements -------------------------- //

    var measurements = [
        'paddingLeft',
        'paddingRight',
        'paddingTop',
        'paddingBottom',
        'marginLeft',
        'marginRight',
        'marginTop',
        'marginBottom',
        'borderLeftWidth',
        'borderRightWidth',
        'borderTopWidth',
        'borderBottomWidth'
    ];

    var measurementsLength = measurements.length;

    function getZeroSize() {
        var size = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        };
        for (var i = 0; i < measurementsLength; i++) {
            var measurement = measurements[i];
            size[measurement] = 0;
        }
        return size;
    }

    // -------------------------- getStyle -------------------------- //

    /**
     * getStyle, get style of element, check for Firefox bug
     * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
     */
    function getStyle(elem) {
        var style = getComputedStyle(elem);
        if (!style) {
            logError('Style returned ' + style +
                '. Are you running this code in a hidden iframe on Firefox? ' +
                'See http://bit.ly/getsizebug1');
        }
        return style;
    }

    // -------------------------- setup -------------------------- //

    var isSetup = false;

    var isBoxSizeOuter;

    /**
     * setup
     * check isBoxSizerOuter
     * do on first getSize() rather than on page load for Firefox bug
     */
    function setup() {
        // setup once
        if (isSetup) {
            return;
        }
        isSetup = true;

        // -------------------------- box sizing -------------------------- //

        /**
         * WebKit measures the outer-width on style.width on border-box elems
         * IE & Firefox<29 measures the inner-width
         */
        var div = document.createElement('div');
        div.style.width = '200px';
        div.style.padding = '1px 2px 3px 4px';
        div.style.borderStyle = 'solid';
        div.style.borderWidth = '1px 2px 3px 4px';
        div.style.boxSizing = 'border-box';

        var body = document.body || document.documentElement;
        body.appendChild(div);
        var style = getStyle(div);

        getSize.isBoxSizeOuter = isBoxSizeOuter = getStyleSize(style.width) == 200;
        body.removeChild(div);

    }

    // -------------------------- getSize -------------------------- //

    function getSize(elem) {
        setup();

        // use querySeletor if elem is string
        if (typeof elem == 'string') {
            elem = document.querySelector(elem);
        }

        // do not proceed on non-objects
        if (!elem || typeof elem != 'object' || !elem.nodeType) {
            return;
        }

        var style = getStyle(elem);

        // if hidden, everything is 0
        if (style.display == 'none') {
            return getZeroSize();
        }

        var size = {};
        size.width = elem.offsetWidth;
        size.height = elem.offsetHeight;

        var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

        // get all measurements
        for (var i = 0; i < measurementsLength; i++) {
            var measurement = measurements[i];
            var value = style[measurement];
            var num = parseFloat(value);
            // any 'auto', 'medium' value will be 0
            size[measurement] = !isNaN(num) ? num : 0;
        }

        var paddingWidth = size.paddingLeft + size.paddingRight;
        var paddingHeight = size.paddingTop + size.paddingBottom;
        var marginWidth = size.marginLeft + size.marginRight;
        var marginHeight = size.marginTop + size.marginBottom;
        var borderWidth = size.borderLeftWidth + size.borderRightWidth;
        var borderHeight = size.borderTopWidth + size.borderBottomWidth;

        var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

        // overwrite width and height if we can get it from style
        var styleWidth = getStyleSize(style.width);
        if (styleWidth !== false) {
            size.width = styleWidth +
                // add padding and border unless it's already including it
                (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
        }

        var styleHeight = getStyleSize(style.height);
        if (styleHeight !== false) {
            size.height = styleHeight +
                // add padding and border unless it's already including it
                (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
        }

        size.innerWidth = size.width - (paddingWidth + borderWidth);
        size.innerHeight = size.height - (paddingHeight + borderHeight);

        size.outerWidth = size.width + marginWidth;
        size.outerHeight = size.height + marginHeight;

        return size;
    }

    return getSize;

});

/**
 * matchesSelector v2.0.1
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

(function (window, factory) {
    /*global define: false, module: false */
    'use strict';
    // universal module definition
    if (typeof define == 'function' && define.amd) {
        // AMD
        define('matches-selector/matches-selector', factory);
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS
        module.exports = factory();
    } else {
        // browser global
        window.matchesSelector = factory();
    }

}(window, function factory() {
    'use strict';

    var matchesMethod = (function () {
        var ElemProto = Element.prototype;
        // check for the standard method name first
        if (ElemProto.matches) {
            return 'matches';
        }
        // check un-prefixed
        if (ElemProto.matchesSelector) {
            return 'matchesSelector';
        }
        // check vendor prefixes
        var prefixes = ['webkit', 'moz', 'ms', 'o'];

        for (var i = 0; i < prefixes.length; i++) {
            var prefix = prefixes[i];
            var method = prefix + 'MatchesSelector';
            if (ElemProto[method]) {
                return method;
            }
        }
    })();

    return function matchesSelector(elem, selector) {
        return elem[matchesMethod](selector);
    };

}));

/**
 * Fizzy UI utils v2.0.0
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

(function (window, factory) {
    /*global define: false, module: false, require: false */
    'use strict';
    // universal module definition

    if (typeof define == 'function' && define.amd) {
        // AMD
        define('fizzy-ui-utils/utils', [
            'matches-selector/matches-selector'
        ], function (matchesSelector) {
            return factory(window, matchesSelector);
        });
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS
        module.exports = factory(
            window,
            require('desandro-matches-selector')
        );
    } else {
        // browser global
        window.fizzyUIUtils = factory(
            window,
            window.matchesSelector
        );
    }

}(window, function factory(window, matchesSelector) {



    var utils = {};

    // ----- extend ----- //

    // extends objects
    utils.extend = function (a, b) {
        for (var prop in b) {
            a[prop] = b[prop];
        }
        return a;
    };

    // ----- modulo ----- //

    utils.modulo = function (num, div) {
        return ((num % div) + div) % div;
    };

    // ----- makeArray ----- //

    // turn element or nodeList into an array
    utils.makeArray = function (obj) {
        var ary = [];
        if (Array.isArray(obj)) {
            // use object if already an array
            ary = obj;
        } else if (obj && typeof obj.length == 'number') {
            // convert nodeList to array
            for (var i = 0; i < obj.length; i++) {
                ary.push(obj[i]);
            }
        } else {
            // array of single index
            ary.push(obj);
        }
        return ary;
    };

    // ----- removeFrom ----- //

    utils.removeFrom = function (ary, obj) {
        var index = ary.indexOf(obj);
        if (index != -1) {
            ary.splice(index, 1);
        }
    };

    // ----- getParent ----- //

    utils.getParent = function (elem, selector) {
        while (elem != document.body) {
            elem = elem.parentNode;
            if (matchesSelector(elem, selector)) {
                return elem;
            }
        }
    };

    // ----- getQueryElement ----- //

    // use element as selector string
    utils.getQueryElement = function (elem) {
        if (typeof elem == 'string') {
            return document.querySelector(elem);
        }
        return elem;
    };

    // ----- handleEvent ----- //

    // enable .ontype to trigger from .addEventListener( elem, 'type' )
    utils.handleEvent = function (event) {
        var method = 'on' + event.type;
        if (this[method]) {
            this[method](event);
        }
    };

    // ----- filterFindElements ----- //

    utils.filterFindElements = function (elems, selector) {
        // make array of elems
        elems = utils.makeArray(elems);
        var ffElems = [];

        elems.forEach(function (elem) {
            // check that elem is an actual element
            if (!(elem instanceof HTMLElement)) {
                return;
            }
            // add elem if no selector
            if (!selector) {
                ffElems.push(elem);
                return;
            }
            // filter & find items if we have a selector
            // filter
            if (matchesSelector(elem, selector)) {
                ffElems.push(elem);
            }
            // find children
            var childElems = elem.querySelectorAll(selector);
            // concat childElems to filterFound array
            for (var i = 0; i < childElems.length; i++) {
                ffElems.push(childElems[i]);
            }
        });

        return ffElems;
    };

    // ----- debounceMethod ----- //

    utils.debounceMethod = function (_class, methodName, threshold) {
        // original method
        var method = _class.prototype[methodName];
        var timeoutName = methodName + 'Timeout';

        _class.prototype[methodName] = function () {
            var timeout = this[timeoutName];
            if (timeout) {
                clearTimeout(timeout);
            }
            var args = arguments;

            var _this = this;
            this[timeoutName] = setTimeout(function () {
                method.apply(_this, args);
                delete _this[timeoutName];
            }, threshold || 100);
        };
    };

    // ----- docReady ----- //

    utils.docReady = function (callback) {
        if (document.readyState == 'complete') {
            callback();
        } else {
            document.addEventListener('DOMContentLoaded', callback);
        }
    };

    // ----- htmlInit ----- //

    // http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
    utils.toDashed = function (str) {
        return str.replace(/(.)([A-Z])/g, function (match, $1, $2) {
            return $1 + '-' + $2;
        }).toLowerCase();
    };

    var console = window.console;
    /**
     * allow user to initialize classes via [data-namespace] or .js-namespace class
     * htmlInit( Widget, 'widgetName' )
     * options are parsed from data-namespace-options
     */
    utils.htmlInit = function (WidgetClass, namespace) {
        utils.docReady(function () {
            var dashedNamespace = utils.toDashed(namespace);
            var dataAttr = 'data-' + dashedNamespace;
            var dataAttrElems = document.querySelectorAll('[' + dataAttr + ']');
            var jsDashElems = document.querySelectorAll('.js-' + dashedNamespace);
            var elems = utils.makeArray(dataAttrElems)
                .concat(utils.makeArray(jsDashElems));
            var dataOptionsAttr = dataAttr + '-options';
            var jQuery = window.jQuery;

            elems.forEach(function (elem) {
                var attr = elem.getAttribute(dataAttr) ||
                    elem.getAttribute(dataOptionsAttr);
                var options;
                try {
                    options = attr && JSON.parse(attr);
                } catch (error) {
                    // log error, do not initialize
                    if (console) {
                        console.error('Error parsing ' + dataAttr + ' on ' + elem.className +
                            ': ' + error);
                    }
                    return;
                }
                // initialize
                var instance = new WidgetClass(elem, options);
                // make available via $().data('layoutname')
                if (jQuery) {
                    jQuery.data(elem, namespace, instance);
                }
            });

        });
    };

    // -----  ----- //

    return utils;

}));

/**
 * Outlayer Item
 */

(function (window, factory) {
    // universal module definition
    /* jshint strict: false */ /* globals define, module, require */
    if (typeof define == 'function' && define.amd) {
        // AMD - RequireJS
        define('outlayer/item', [
            'ev-emitter/ev-emitter',
            'get-size/get-size'
        ],
            function (EvEmitter, getSize) {
                return factory(window, EvEmitter, getSize);
            }
        );
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS - Browserify, Webpack
        module.exports = factory(
            window,
            require('ev-emitter'),
            require('get-size')
        );
    } else {
        // browser global
        window.Outlayer = {};
        window.Outlayer.Item = factory(
            window,
            window.EvEmitter,
            window.getSize
        );
    }

}(window, function factory(window, EvEmitter, getSize) {
    'use strict';

    // ----- helpers ----- //

    function isEmptyObj(obj) {
        for (var prop in obj) {
            return false;
        }
        prop = null;
        return true;
    }

    // -------------------------- CSS3 support -------------------------- //


    var docElemStyle = document.documentElement.style;

    var transitionProperty = typeof docElemStyle.transition == 'string' ?
        'transition' : 'WebkitTransition';
    var transformProperty = typeof docElemStyle.transform == 'string' ?
        'transform' : 'WebkitTransform';

    var transitionEndEvent = {
        WebkitTransition: 'webkitTransitionEnd',
        transition: 'transitionend'
    }[transitionProperty];

    // cache all vendor properties
    var vendorProperties = [
        transformProperty,
        transitionProperty,
        transitionProperty + 'Duration',
        transitionProperty + 'Property'
    ];

    // -------------------------- Item -------------------------- //

    function Item(element, layout) {
        if (!element) {
            return;
        }

        this.element = element;
        // parent layout class, i.e. Masonry, Isotope, or Packery
        this.layout = layout;
        this.position = {
            x: 0,
            y: 0
        };

        this._create();
    }

    // inherit EvEmitter
    var proto = Item.prototype = Object.create(EvEmitter.prototype);
    proto.constructor = Item;

    proto._create = function () {
        // transition objects
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        };

        this.css({
            position: 'absolute'
        });
    };

    // trigger specified handler for event type
    proto.handleEvent = function (event) {
        var method = 'on' + event.type;
        if (this[method]) {
            this[method](event);
        }
    };

    proto.getSize = function () {
        this.size = getSize(this.element);
    };

    /**
     * apply CSS styles to element
     * @param {Object} style
     */
    proto.css = function (style) {
        var elemStyle = this.element.style;

        for (var prop in style) {
            // use vendor property if available
            var supportedProp = vendorProperties[prop] || prop;
            elemStyle[supportedProp] = style[prop];
        }
    };

    // measure position, and sets it
    proto.getPosition = function () {
        var style = getComputedStyle(this.element);
        var isOriginLeft = this.layout._getOption('originLeft');
        var isOriginTop = this.layout._getOption('originTop');
        var xValue = style[isOriginLeft ? 'left' : 'right'];
        var yValue = style[isOriginTop ? 'top' : 'bottom'];
        // convert percent to pixels
        var layoutSize = this.layout.size;
        var x = xValue.indexOf('%') != -1 ?
            (parseFloat(xValue) / 100) * layoutSize.width : parseInt(xValue, 10);
        var y = yValue.indexOf('%') != -1 ?
            (parseFloat(yValue) / 100) * layoutSize.height : parseInt(yValue, 10);

        // clean up 'auto' or other non-integer values
        x = isNaN(x) ? 0 : x;
        y = isNaN(y) ? 0 : y;
        // remove padding from measurement
        x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
        y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

        this.position.x = x;
        this.position.y = y;
    };

    // set settled position, apply padding
    proto.layoutPosition = function () {
        var layoutSize = this.layout.size;
        var style = {};
        var isOriginLeft = this.layout._getOption('originLeft');
        var isOriginTop = this.layout._getOption('originTop');

        // x
        var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight';
        var xProperty = isOriginLeft ? 'left' : 'right';
        var xResetProperty = isOriginLeft ? 'right' : 'left';

        var x = this.position.x + layoutSize[xPadding];
        // set in percentage or pixels
        style[xProperty] = this.getXValue(x);
        // reset other property
        style[xResetProperty] = '';

        // y
        var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom';
        var yProperty = isOriginTop ? 'top' : 'bottom';
        var yResetProperty = isOriginTop ? 'bottom' : 'top';

        var y = this.position.y + layoutSize[yPadding];
        // set in percentage or pixels
        style[yProperty] = this.getYValue(y);
        // reset other property
        style[yResetProperty] = '';

        this.css(style);
        this.emitEvent('layout', [this]);
    };

    proto.getXValue = function (x) {
        var isHorizontal = this.layout._getOption('horizontal');
        return this.layout.options.percentPosition && !isHorizontal ?
            ((x / this.layout.size.width) * 100) + '%' : x + 'px';
    };

    proto.getYValue = function (y) {
        var isHorizontal = this.layout._getOption('horizontal');
        return this.layout.options.percentPosition && isHorizontal ?
            ((y / this.layout.size.height) * 100) + '%' : y + 'px';
    };

    proto._transitionTo = function (x, y) {
        this.getPosition();
        // get current x & y from top/left
        var curX = this.position.x;
        var curY = this.position.y;

        var compareX = parseInt(x, 10);
        var compareY = parseInt(y, 10);
        var didNotMove = compareX === this.position.x && compareY === this.position.y;

        // save end position
        this.setPosition(x, y);

        // if did not move and not transitioning, just go to layout
        if (didNotMove && !this.isTransitioning) {
            this.layoutPosition();
            return;
        }

        var transX = x - curX;
        var transY = y - curY;
        var transitionStyle = {};
        transitionStyle.transform = this.getTranslate(transX, transY);

        this.transition({
            to: transitionStyle,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: true
        });
    };

    proto.getTranslate = function (x, y) {
        // flip cooridinates if origin on right or bottom
        var isOriginLeft = this.layout._getOption('originLeft');
        var isOriginTop = this.layout._getOption('originTop');
        x = isOriginLeft ? x : -x;
        y = isOriginTop ? y : -y;
        //console.log("A - main.js");
        return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
    };

    // non transition + transform support
    proto.goTo = function (x, y) {
        this.setPosition(x, y);
        this.layoutPosition();
    };

    proto.moveTo = proto._transitionTo;

    proto.setPosition = function (x, y) {
        this.position.x = parseInt(x, 10);
        this.position.y = parseInt(y, 10);
    };

    // ----- transition ----- //

    /**
     * @param {Object} style - CSS
     * @param {Function} onTransitionEnd
     */

    // non transition, just trigger callback
    proto._nonTransition = function (args) {
        this.css(args.to);
        if (args.isCleaning) {
            this._removeStyles(args.to);
        }
        for (var prop in args.onTransitionEnd) {
            args.onTransitionEnd[prop].call(this);
        }
    };

    /**
     * proper transition
     * @param {Object} args - arguments
     *   @param {Object} to - style to transition to
     *   @param {Object} from - style to start transition from
     *   @param {Boolean} isCleaning - removes transition styles after transition
     *   @param {Function} onTransitionEnd - callback
     */
    proto._transition = function (args) {
        // redirect to nonTransition if no transition duration
        if (!parseFloat(this.layout.options.transitionDuration)) {
            this._nonTransition(args);
            return;
        }

        var _transition = this._transn;
        // keep track of onTransitionEnd callback by css property
        for (var prop in args.onTransitionEnd) {
            _transition.onEnd[prop] = args.onTransitionEnd[prop];
        }
        // keep track of properties that are transitioning
        for (prop in args.to) {
            _transition.ingProperties[prop] = true;
            // keep track of properties to clean up when transition is done
            if (args.isCleaning) {
                _transition.clean[prop] = true;
            }
        }

        // set from styles
        if (args.from) {
            this.css(args.from);
            // force redraw. http://blog.alexmaccaw.com/css-transitions
            var h = this.element.offsetHeight;
            // hack for JSHint to hush about unused var
            h = null;
        }
        // enable transition
        this.enableTransition(args.to);
        // set styles that are transitioning
        this.css(args.to);

        this.isTransitioning = true;

    };

    // dash before all cap letters, including first for
    // WebkitTransform => -webkit-transform
    function toDashedAll(str) {
        return str.replace(/([A-Z])/g, function ($1) {
            return '-' + $1.toLowerCase();
        });
    }

    var transitionProps = 'opacity,' +
        toDashedAll(vendorProperties.transform || 'transform');

    proto.enableTransition = function (/* style */) {
        // HACK changing transitionProperty during a transition
        // will cause transition to jump
        if (this.isTransitioning) {
            return;
        }

        // make `transition: foo, bar, baz` from style object
        // HACK un-comment this when enableTransition can work
        // while a transition is happening
        // var transitionValues = [];
        // for ( var prop in style ) {
        //   // dash-ify camelCased properties like WebkitTransition
        //   prop = vendorProperties[ prop ] || prop;
        //   transitionValues.push( toDashedAll( prop ) );
        // }
        // enable transition styles
        this.css({
            transitionProperty: transitionProps,
            transitionDuration: this.layout.options.transitionDuration
        });
        // listen for transition end event
        this.element.addEventListener(transitionEndEvent, this, false);
    };

    proto.transition = Item.prototype[transitionProperty ? '_transition' : '_nonTransition'];

    // ----- events ----- //

    proto.onwebkitTransitionEnd = function (event) {
        this.ontransitionend(event);
    };

    proto.onotransitionend = function (event) {
        this.ontransitionend(event);
    };

    // properties that I munge to make my life easier
    var dashedVendorProperties = {
        '-webkit-transform': 'transform'
    };

    proto.ontransitionend = function (event) {
        // disregard bubbled events from children
        if (event.target !== this.element) {
            return;
        }
        var _transition = this._transn;
        // get property name of transitioned property, convert to prefix-free
        var propertyName = dashedVendorProperties[event.propertyName] || event.propertyName;

        // remove property that has completed transitioning
        delete _transition.ingProperties[propertyName];
        // check if any properties are still transitioning
        if (isEmptyObj(_transition.ingProperties)) {
            // all properties have completed transitioning
            this.disableTransition();
        }
        // clean style
        if (propertyName in _transition.clean) {
            // clean up style
            this.element.style[event.propertyName] = '';
            delete _transition.clean[propertyName];
        }
        // trigger onTransitionEnd callback
        if (propertyName in _transition.onEnd) {
            var onTransitionEnd = _transition.onEnd[propertyName];
            onTransitionEnd.call(this);
            delete _transition.onEnd[propertyName];
        }

        this.emitEvent('transitionEnd', [this]);
    };

    proto.disableTransition = function () {
        this.removeTransitionStyles();
        this.element.removeEventListener(transitionEndEvent, this, false);
        this.isTransitioning = false;
    };

    /**
     * removes style property from element
     * @param {Object} style
    **/
    proto._removeStyles = function (style) {
        // clean up transition styles
        var cleanStyle = {};
        for (var prop in style) {
            cleanStyle[prop] = '';
        }
        this.css(cleanStyle);
    };

    var cleanTransitionStyle = {
        transitionProperty: '',
        transitionDuration: ''
    };

    proto.removeTransitionStyles = function () {
        // remove transition
        this.css(cleanTransitionStyle);
    };

    // ----- show/hide/remove ----- //

    // remove element from DOM
    proto.removeElem = function () {
        this.element.parentNode.removeChild(this.element);
        // remove display: none
        this.css({ display: '' });
        this.emitEvent('remove', [this]);
    };

    proto.remove = function () {
        // just remove element if no transition support or no transition
        if (!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) {
            this.removeElem();
            return;
        }

        // start transition
        this.once('transitionEnd', function () {
            this.removeElem();
        });
        this.hide();
    };

    proto.reveal = function () {
        delete this.isHidden;
        // remove display: none
        this.css({ display: '' });

        var options = this.layout.options;

        var onTransitionEnd = {};
        var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
        onTransitionEnd[transitionEndProperty] = this.onRevealTransitionEnd;

        this.transition({
            from: options.hiddenStyle,
            to: options.visibleStyle,
            isCleaning: true,
            onTransitionEnd: onTransitionEnd
        });
    };

    proto.onRevealTransitionEnd = function () {
        // check if still visible
        // during transition, item may have been hidden
        if (!this.isHidden) {
            this.emitEvent('reveal');
        }
    };

    /**
     * get style property use for hide/reveal transition end
     * @param {String} styleProperty - hiddenStyle/visibleStyle
     * @returns {String}
     */
    proto.getHideRevealTransitionEndProperty = function (styleProperty) {
        var optionStyle = this.layout.options[styleProperty];
        // use opacity
        if (optionStyle.opacity) {
            return 'opacity';
        }
        // get first property
        for (var prop in optionStyle) {
            return prop;
        }
    };

    proto.hide = function () {
        // set flag
        this.isHidden = true;
        // remove display: none
        this.css({ display: '' });

        var options = this.layout.options;

        var onTransitionEnd = {};
        var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
        onTransitionEnd[transitionEndProperty] = this.onHideTransitionEnd;

        this.transition({
            from: options.visibleStyle,
            to: options.hiddenStyle,
            // keep hidden stuff hidden
            isCleaning: true,
            onTransitionEnd: onTransitionEnd
        });
    };

    proto.onHideTransitionEnd = function () {
        // check if still hidden
        // during transition, item may have been un-hidden
        if (this.isHidden) {
            this.css({ display: 'none' });
            this.emitEvent('hide');
        }
    };

    proto.destroy = function () {
        this.css({
            position: '',
            left: '',
            right: '',
            top: '',
            bottom: '',
            transition: '',
            transform: ''
        });
    };

    return Item;

}));

/*!
 * Outlayer v2.0.0
 * the brains and guts of a layout library
 * MIT license
 */

(function (window, factory) {
    'use strict';
    // universal module definition
    /* jshint strict: false */ /* globals define, module, require */
    if (typeof define == 'function' && define.amd) {
        // AMD - RequireJS
        define('outlayer/outlayer', [
            'ev-emitter/ev-emitter',
            'get-size/get-size',
            'fizzy-ui-utils/utils',
            './item'
        ],
            function (EvEmitter, getSize, utils, Item) {
                return factory(window, EvEmitter, getSize, utils, Item);
            }
        );
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS - Browserify, Webpack
        module.exports = factory(
            window,
            require('ev-emitter'),
            require('get-size'),
            require('fizzy-ui-utils'),
            require('./item')
        );
    } else {
        // browser global
        window.Outlayer = factory(
            window,
            window.EvEmitter,
            window.getSize,
            window.fizzyUIUtils,
            window.Outlayer.Item
        );
    }

}(window, function factory(window, EvEmitter, getSize, utils, Item) {
    'use strict';

    // ----- vars ----- //

    var console = window.console;
    var jQuery = window.jQuery;
    var noop = function () { };

    // -------------------------- Outlayer -------------------------- //

    // globally unique identifiers
    var GUID = 0;
    // internal store of all Outlayer intances
    var instances = {};


    /**
     * @param {Element, String} element
     * @param {Object} options
     * @constructor
     */
    function Outlayer(element, options) {
        var queryElement = utils.getQueryElement(element);
        if (!queryElement) {
            if (console) {
                console.error('Bad element for ' + this.constructor.namespace +
                    ': ' + (queryElement || element));
            }
            return;
        }
        this.element = queryElement;
        // add jQuery
        if (jQuery) {
            this.$element = jQuery(this.element);
        }

        // options
        this.options = utils.extend({}, this.constructor.defaults);
        this.option(options);

        // add id for Outlayer.getFromElement
        var id = ++GUID;
        this.element.outlayerGUID = id; // expando
        instances[id] = this; // associate via id

        // kick it off
        this._create();

        var isInitLayout = this._getOption('initLayout');
        if (isInitLayout) {
            this.layout();
        }
    }

    // settings are for internal use only
    Outlayer.namespace = 'outlayer';
    Outlayer.Item = Item;

    // default options
    Outlayer.defaults = {
        containerStyle: {
            position: 'relative'
        },
        initLayout: true,
        originLeft: true,
        originTop: true,
        resize: true,
        resizeContainer: true,
        // item options
        transitionDuration: '0.4s',
        hiddenStyle: {
            opacity: 0,
            transform: 'scale(0.001)'
        },
        visibleStyle: {
            opacity: 1,
            transform: 'scale(1)'
        }
    };

    var proto = Outlayer.prototype;
    // inherit EvEmitter
    utils.extend(proto, EvEmitter.prototype);

    /**
     * set options
     * @param {Object} opts
     */
    proto.option = function (opts) {
        utils.extend(this.options, opts);
    };

    /**
     * get backwards compatible option value, check old name
     */
    proto._getOption = function (option) {
        var oldOption = this.constructor.compatOptions[option];
        return oldOption && this.options[oldOption] !== undefined ?
            this.options[oldOption] : this.options[option];
    };

    Outlayer.compatOptions = {
        // currentName: oldName
        initLayout: 'isInitLayout',
        horizontal: 'isHorizontal',
        layoutInstant: 'isLayoutInstant',
        originLeft: 'isOriginLeft',
        originTop: 'isOriginTop',
        resize: 'isResizeBound',
        resizeContainer: 'isResizingContainer'
    };

    proto._create = function () {
        // get items from children
        this.reloadItems();
        // elements that affect layout, but are not laid out
        this.stamps = [];
        this.stamp(this.options.stamp);
        // set container style
        utils.extend(this.element.style, this.options.containerStyle);

        // bind resize method
        var canBindResize = this._getOption('resize');
        if (canBindResize) {
            this.bindResize();
        }
    };

    // goes through all children again and gets bricks in proper order
    proto.reloadItems = function () {
        // collection of item elements
        this.items = this._itemize(this.element.children);
    };


    /**
     * turn elements into Outlayer.Items to be used in layout
     * @param {Array or NodeList or HTMLElement} elems
     * @returns {Array} items - collection of new Outlayer Items
     */
    proto._itemize = function (elems) {

        var itemElems = this._filterFindItemElements(elems);
        var Item = this.constructor.Item;

        // create new Outlayer Items for collection
        var items = [];
        for (var i = 0; i < itemElems.length; i++) {
            var elem = itemElems[i];
            var item = new Item(elem, this);
            items.push(item);
        }

        return items;
    };

    /**
     * get item elements to be used in layout
     * @param {Array or NodeList or HTMLElement} elems
     * @returns {Array} items - item elements
     */
    proto._filterFindItemElements = function (elems) {
        return utils.filterFindElements(elems, this.options.itemSelector);
    };

    /**
     * getter method for getting item elements
     * @returns {Array} elems - collection of item elements
     */
    proto.getItemElements = function () {
        return this.items.map(function (item) {
            return item.element;
        });
    };

    // ----- init & layout ----- //

    /**
     * lays out all items
     */
    proto.layout = function () {
        this._resetLayout();
        this._manageStamps();

        // don't animate first layout
        var layoutInstant = this._getOption('layoutInstant');
        var isInstant = layoutInstant !== undefined ?
            layoutInstant : !this._isLayoutInited;
        this.layoutItems(this.items, isInstant);

        // flag for initalized
        this._isLayoutInited = true;
    };

    // _init is alias for layout
    proto._init = proto.layout;

    /**
     * logic before any new layout
     */
    proto._resetLayout = function () {
        this.getSize();
    };


    proto.getSize = function () {
        this.size = getSize(this.element);
    };

    /**
     * get measurement from option, for columnWidth, rowHeight, gutter
     * if option is String -> get element from selector string, & get size of element
     * if option is Element -> get size of element
     * else use option as a number
     *
     * @param {String} measurement
     * @param {String} size - width or height
     * @private
     */
    proto._getMeasurement = function (measurement, size) {
        var option = this.options[measurement];
        var elem;
        if (!option) {
            // default to 0
            this[measurement] = 0;
        } else {
            // use option as an element
            if (typeof option == 'string') {
                elem = this.element.querySelector(option);
            } else if (option instanceof HTMLElement) {
                elem = option;
            }
            // use size of element, if element
            this[measurement] = elem ? getSize(elem)[size] : option;
        }
    };

    /**
     * layout a collection of item elements
     * @api public
     */
    proto.layoutItems = function (items, isInstant) {
        items = this._getItemsForLayout(items);

        this._layoutItems(items, isInstant);

        this._postLayout();
    };

    /**
     * get the items to be laid out
     * you may want to skip over some items
     * @param {Array} items
     * @returns {Array} items
     */
    proto._getItemsForLayout = function (items) {
        return items.filter(function (item) {
            return !item.isIgnored;
        });
    };

    /**
     * layout items
     * @param {Array} items
     * @param {Boolean} isInstant
     */
    proto._layoutItems = function (items, isInstant) {
        this._emitCompleteOnItems('layout', items);

        if (!items || !items.length) {
            // no items, emit event with empty array
            return;
        }

        var queue = [];

        items.forEach(function (item) {
            // get x/y object from method
            var position = this._getItemLayoutPosition(item);
            // enqueue
            position.item = item;
            position.isInstant = isInstant || item.isLayoutInstant;
            queue.push(position);
        }, this);

        this._processLayoutQueue(queue);
    };

    /**
     * get item layout position
     * @param {Outlayer.Item} item
     * @returns {Object} x and y position
     */
    proto._getItemLayoutPosition = function ( /* item */) {
        return {
            x: 0,
            y: 0
        };
    };

    /**
     * iterate over array and position each item
     * Reason being - separating this logic prevents 'layout invalidation'
     * thx @paul_irish
     * @param {Array} queue
     */
    proto._processLayoutQueue = function (queue) {
        queue.forEach(function (obj) {
            this._positionItem(obj.item, obj.x, obj.y, obj.isInstant);
        }, this);
    };

    /**
     * Sets position of item in DOM
     * @param {Outlayer.Item} item
     * @param {Number} x - horizontal position
     * @param {Number} y - vertical position
     * @param {Boolean} isInstant - disables transitions
     */
    proto._positionItem = function (item, x, y, isInstant) {
        if (isInstant) {
            // if not transition, just set CSS
            item.goTo(x, y);
        } else {
            item.moveTo(x, y);
        }
    };

    /**
     * Any logic you want to do after each layout,
     * i.e. size the container
     */
    proto._postLayout = function () {
        this.resizeContainer();
    };

    proto.resizeContainer = function () {
        var isResizingContainer = this._getOption('resizeContainer');
        if (!isResizingContainer) {
            return;
        }
        var size = this._getContainerSize();
        if (size) {
            this._setContainerMeasure(size.width, true);
            this._setContainerMeasure(size.height, false);
        }
    };

    /**
     * Sets width or height of container if returned
     * @returns {Object} size
     *   @param {Number} width
     *   @param {Number} height
     */
    proto._getContainerSize = noop;

    /**
     * @param {Number} measure - size of width or height
     * @param {Boolean} isWidth
     */
    proto._setContainerMeasure = function (measure, isWidth) {
        if (measure === undefined) {
            return;
        }

        var elemSize = this.size;
        // add padding and border width if border box
        if (elemSize.isBorderBox) {
            measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
                elemSize.borderLeftWidth + elemSize.borderRightWidth :
                elemSize.paddingBottom + elemSize.paddingTop +
                elemSize.borderTopWidth + elemSize.borderBottomWidth;
        }

        measure = Math.max(measure, 0);
        this.element.style[isWidth ? 'width' : 'height'] = measure + 'px';
    };

    /**
     * emit eventComplete on a collection of items events
     * @param {String} eventName
     * @param {Array} items - Outlayer.Items
     */
    proto._emitCompleteOnItems = function (eventName, items) {
        var _this = this;
        function onComplete() {
            _this.dispatchEvent(eventName + 'Complete', null, [items]);
        }

        var count = items.length;
        if (!items || !count) {
            onComplete();
            return;
        }

        var doneCount = 0;
        function tick() {
            doneCount++;
            if (doneCount == count) {
                onComplete();
            }
        }

        // bind callback
        items.forEach(function (item) {
            item.once(eventName, tick);
        });
    };

    /**
     * emits events via EvEmitter and jQuery events
     * @param {String} type - name of event
     * @param {Event} event - original event
     * @param {Array} args - extra arguments
     */
    proto.dispatchEvent = function (type, event, args) {
        // add original event to arguments
        var emitArgs = event ? [event].concat(args) : args;
        this.emitEvent(type, emitArgs);

        if (jQuery) {
            // set this.$element
            this.$element = this.$element || jQuery(this.element);
            if (event) {
                // create jQuery event
                var $event = jQuery.Event(event);
                $event.type = type;
                this.$element.trigger($event, args);
            } else {
                // just trigger with type if no event available
                this.$element.trigger(type, args);
            }
        }
    };

    // -------------------------- ignore & stamps -------------------------- //


    /**
     * keep item in collection, but do not lay it out
     * ignored items do not get skipped in layout
     * @param {Element} elem
     */
    proto.ignore = function (elem) {
        var item = this.getItem(elem);
        if (item) {
            item.isIgnored = true;
        }
    };

    /**
     * return item to layout collection
     * @param {Element} elem
     */
    proto.unignore = function (elem) {
        var item = this.getItem(elem);
        if (item) {
            delete item.isIgnored;
        }
    };

    /**
     * adds elements to stamps
     * @param {NodeList, Array, Element, or String} elems
     */
    proto.stamp = function (elems) {
        elems = this._find(elems);
        if (!elems) {
            return;
        }

        this.stamps = this.stamps.concat(elems);
        // ignore
        elems.forEach(this.ignore, this);
    };

    /**
     * removes elements to stamps
     * @param {NodeList, Array, or Element} elems
     */
    proto.unstamp = function (elems) {
        elems = this._find(elems);
        if (!elems) {
            return;
        }

        elems.forEach(function (elem) {
            // filter out removed stamp elements
            utils.removeFrom(this.stamps, elem);
            this.unignore(elem);
        }, this);
    };

    /**
     * finds child elements
     * @param {NodeList, Array, Element, or String} elems
     * @returns {Array} elems
     */
    proto._find = function (elems) {
        if (!elems) {
            return;
        }
        // if string, use argument as selector string
        if (typeof elems == 'string') {
            elems = this.element.querySelectorAll(elems);
        }
        elems = utils.makeArray(elems);
        return elems;
    };

    proto._manageStamps = function () {
        if (!this.stamps || !this.stamps.length) {
            return;
        }

        this._getBoundingRect();

        this.stamps.forEach(this._manageStamp, this);
    };

    // update boundingLeft / Top
    proto._getBoundingRect = function () {
        // get bounding rect for container element
        var boundingRect = this.element.getBoundingClientRect();
        var size = this.size;
        this._boundingRect = {
            left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
            top: boundingRect.top + size.paddingTop + size.borderTopWidth,
            right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
            bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
        };
    };

    /**
     * @param {Element} stamp
    **/
    proto._manageStamp = noop;

    /**
     * get x/y position of element relative to container element
     * @param {Element} elem
     * @returns {Object} offset - has left, top, right, bottom
     */
    proto._getElementOffset = function (elem) {
        var boundingRect = elem.getBoundingClientRect();
        var thisRect = this._boundingRect;
        var size = getSize(elem);
        var offset = {
            left: boundingRect.left - thisRect.left - size.marginLeft,
            top: boundingRect.top - thisRect.top - size.marginTop,
            right: thisRect.right - boundingRect.right - size.marginRight,
            bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
        };
        return offset;
    };

    // -------------------------- resize -------------------------- //

    // enable event handlers for listeners
    // i.e. resize -> onresize
    proto.handleEvent = utils.handleEvent;

    /**
     * Bind layout to window resizing
     */
    proto.bindResize = function () {
        window.addEventListener('resize', this);
        this.isResizeBound = true;
    };

    /**
     * Unbind layout to window resizing
     */
    proto.unbindResize = function () {
        window.removeEventListener('resize', this);
        this.isResizeBound = false;
    };

    proto.onresize = function () {
        this.resize();
    };

    utils.debounceMethod(Outlayer, 'onresize', 100);

    proto.resize = function () {
        // don't trigger if size did not change
        // or if resize was unbound. See #9
        if (!this.isResizeBound || !this.needsResizeLayout()) {
            return;
        }

        this.layout();
    };

    /**
     * check if layout is needed post layout
     * @returns Boolean
     */
    proto.needsResizeLayout = function () {
        var size = getSize(this.element);
        // check that this.size and size are there
        // IE8 triggers resize on body size change, so they might not be
        var hasSizes = this.size && size;
        return hasSizes && size.innerWidth !== this.size.innerWidth;
    };

    // -------------------------- methods -------------------------- //

    /**
     * add items to Outlayer instance
     * @param {Array or NodeList or Element} elems
     * @returns {Array} items - Outlayer.Items
    **/
    proto.addItems = function (elems) {
        var items = this._itemize(elems);
        // add items to collection
        if (items.length) {
            this.items = this.items.concat(items);
        }
        return items;
    };

    /**
     * Layout newly-appended item elements
     * @param {Array or NodeList or Element} elems
     */
    proto.appended = function (elems) {
        var items = this.addItems(elems);
        if (!items.length) {
            return;
        }
        // layout and reveal just the new items
        this.layoutItems(items, true);
        this.reveal(items);
    };

    /**
     * Layout prepended elements
     * @param {Array or NodeList or Element} elems
     */
    proto.prepended = function (elems) {
        var items = this._itemize(elems);
        if (!items.length) {
            return;
        }
        // add items to beginning of collection
        var previousItems = this.items.slice(0);
        this.items = items.concat(previousItems);
        // start new layout
        this._resetLayout();
        this._manageStamps();
        // layout new stuff without transition
        this.layoutItems(items, true);
        this.reveal(items);
        // layout previous items
        this.layoutItems(previousItems);
    };

    /**
     * reveal a collection of items
     * @param {Array of Outlayer.Items} items
     */
    proto.reveal = function (items) {
        this._emitCompleteOnItems('reveal', items);
        if (!items || !items.length) {
            return;
        }
        items.forEach(function (item) {
            item.reveal();
        });
    };

    /**
     * hide a collection of items
     * @param {Array of Outlayer.Items} items
     */
    proto.hide = function (items) {
        this._emitCompleteOnItems('hide', items);
        if (!items || !items.length) {
            return;
        }
        items.forEach(function (item) {
            item.hide();
        });
    };

    /**
     * reveal item elements
     * @param {Array}, {Element}, {NodeList} items
     */
    proto.revealItemElements = function (elems) {
        var items = this.getItems(elems);
        this.reveal(items);
    };

    /**
     * hide item elements
     * @param {Array}, {Element}, {NodeList} items
     */
    proto.hideItemElements = function (elems) {
        var items = this.getItems(elems);
        this.hide(items);
    };

    /**
     * get Outlayer.Item, given an Element
     * @param {Element} elem
     * @param {Function} callback
     * @returns {Outlayer.Item} item
     */
    proto.getItem = function (elem) {
        // loop through items to get the one that matches
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.element == elem) {
                // return item
                return item;
            }
        }
    };

    /**
     * get collection of Outlayer.Items, given Elements
     * @param {Array} elems
     * @returns {Array} items - Outlayer.Items
     */
    proto.getItems = function (elems) {
        elems = utils.makeArray(elems);
        var items = [];
        elems.forEach(function (elem) {
            var item = this.getItem(elem);
            if (item) {
                items.push(item);
            }
        }, this);

        return items;
    };

    /**
     * remove element(s) from instance and DOM
     * @param {Array or NodeList or Element} elems
     */
    proto.remove = function (elems) {
        var removeItems = this.getItems(elems);

        this._emitCompleteOnItems('remove', removeItems);

        // bail if no items to remove
        if (!removeItems || !removeItems.length) {
            return;
        }

        removeItems.forEach(function (item) {
            item.remove();
            // remove item from collection
            utils.removeFrom(this.items, item);
        }, this);
    };

    // ----- destroy ----- //

    // remove and disable Outlayer instance
    proto.destroy = function () {
        // clean up dynamic styles
        var style = this.element.style;
        style.height = '';
        style.position = '';
        style.width = '';
        // destroy items
        this.items.forEach(function (item) {
            item.destroy();
        });

        this.unbindResize();

        var id = this.element.outlayerGUID;
        delete instances[id]; // remove reference to instance by id
        delete this.element.outlayerGUID;
        // remove data for jQuery
        if (jQuery) {
            jQuery.removeData(this.element, this.constructor.namespace);
        }

    };

    // -------------------------- data -------------------------- //

    /**
     * get Outlayer instance from element
     * @param {Element} elem
     * @returns {Outlayer}
     */
    Outlayer.data = function (elem) {
        elem = utils.getQueryElement(elem);
        var id = elem && elem.outlayerGUID;
        return id && instances[id];
    };


    // -------------------------- create Outlayer class -------------------------- //

    /**
     * create a layout class
     * @param {String} namespace
     */
    Outlayer.create = function (namespace, options) {
        // sub-class Outlayer
        var Layout = subclass(Outlayer);
        // apply new options and compatOptions
        Layout.defaults = utils.extend({}, Outlayer.defaults);
        utils.extend(Layout.defaults, options);
        Layout.compatOptions = utils.extend({}, Outlayer.compatOptions);

        Layout.namespace = namespace;

        Layout.data = Outlayer.data;

        // sub-class Item
        Layout.Item = subclass(Item);

        // -------------------------- declarative -------------------------- //

        utils.htmlInit(Layout, namespace);

        // -------------------------- jQuery bridge -------------------------- //

        // make into jQuery plugin
        if (jQuery && jQuery.bridget) {
            jQuery.bridget(namespace, Layout);
        }

        return Layout;
    };

    function subclass(Parent) {
        function SubClass() {
            Parent.apply(this, arguments);
        }

        SubClass.prototype = Object.create(Parent.prototype);
        SubClass.prototype.constructor = SubClass;

        return SubClass;
    }

    // ----- fin ----- //

    // back in global
    Outlayer.Item = Item;

    return Outlayer;

}));

/*!
 * Masonry v4.0.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

(function (window, factory) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (typeof define == 'function' && define.amd) {
        // AMD
        define([
            'outlayer/outlayer',
            'get-size/get-size'
        ],
            factory);
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS
        module.exports = factory(
            require('outlayer'),
            require('get-size')
        );
    } else {
        // browser global
        window.Masonry = factory(
            window.Outlayer,
            window.getSize
        );
    }

}(window, function factory(Outlayer, getSize) {



    // -------------------------- masonryDefinition -------------------------- //

    // create an Outlayer layout class
    var Masonry = Outlayer.create('masonry');
    // isFitWidth -> fitWidth
    Masonry.compatOptions.fitWidth = 'isFitWidth';

    Masonry.prototype._resetLayout = function () {
        this.getSize();
        this._getMeasurement('columnWidth', 'outerWidth');
        this._getMeasurement('gutter', 'outerWidth');
        this.measureColumns();

        // reset column Y
        this.colYs = [];
        for (var i = 0; i < this.cols; i++) {
            this.colYs.push(0);
        }

        this.maxY = 0;
    };

    Masonry.prototype.measureColumns = function () {
        this.getContainerWidth();
        // if columnWidth is 0, default to outerWidth of first item
        if (!this.columnWidth) {
            var firstItem = this.items[0];
            var firstItemElem = firstItem && firstItem.element;
            // columnWidth fall back to item of first element
            this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth ||
                // if first elem has no width, default to size of container
                this.containerWidth;
        }

        var columnWidth = this.columnWidth += this.gutter;

        // calculate columns
        var containerWidth = this.containerWidth + this.gutter;
        var cols = containerWidth / columnWidth;
        // fix rounding errors, typically with gutters
        var excess = columnWidth - containerWidth % columnWidth;
        // if overshoot is less than a pixel, round up, otherwise floor it
        var mathMethod = excess && excess < 1 ? 'round' : 'floor';
        cols = Math[mathMethod](cols);
        this.cols = Math.max(cols, 1);
    };

    Masonry.prototype.getContainerWidth = function () {
        // container is parent if fit width
        var isFitWidth = this._getOption('fitWidth');
        var container = isFitWidth ? this.element.parentNode : this.element;
        // check that this.size and size are there
        // IE8 triggers resize on body size change, so they might not be
        var size = getSize(container);
        this.containerWidth = size && size.innerWidth;
    };

    Masonry.prototype._getItemLayoutPosition = function (item) {
        item.getSize();
        // how many columns does this brick span
        var remainder = item.size.outerWidth % this.columnWidth;
        var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
        // round if off by 1 pixel, otherwise use ceil
        var colSpan = Math[mathMethod](item.size.outerWidth / this.columnWidth);
        colSpan = Math.min(colSpan, this.cols);

        var colGroup = this._getColGroup(colSpan);
        // get the minimum Y value from the columns
        var minimumY = Math.min.apply(Math, colGroup);
        var shortColIndex = colGroup.indexOf(minimumY);

        // position the brick
        var position = {
            x: this.columnWidth * shortColIndex,
            y: minimumY
        };

        // apply setHeight to necessary columns
        var setHeight = minimumY + item.size.outerHeight;
        var setSpan = this.cols + 1 - colGroup.length;
        for (var i = 0; i < setSpan; i++) {
            this.colYs[shortColIndex + i] = setHeight;
        }

        return position;
    };

    /**
     * @param {Number} colSpan - number of columns the element spans
     * @returns {Array} colGroup
     */
    Masonry.prototype._getColGroup = function (colSpan) {
        if (colSpan < 2) {
            // if brick spans only one column, use all the column Ys
            return this.colYs;
        }

        var colGroup = [];
        // how many different places could this brick fit horizontally
        var groupCount = this.cols + 1 - colSpan;
        // for each group potential horizontal position
        for (var i = 0; i < groupCount; i++) {
            // make an array of colY values for that one group
            var groupColYs = this.colYs.slice(i, i + colSpan);
            // and get the max value of the array
            colGroup[i] = Math.max.apply(Math, groupColYs);
        }
        return colGroup;
    };

    Masonry.prototype._manageStamp = function (stamp) {
        var stampSize = getSize(stamp);
        var offset = this._getElementOffset(stamp);
        // get the columns that this stamp affects
        var isOriginLeft = this._getOption('originLeft');
        var firstX = isOriginLeft ? offset.left : offset.right;
        var lastX = firstX + stampSize.outerWidth;
        var firstCol = Math.floor(firstX / this.columnWidth);
        firstCol = Math.max(0, firstCol);
        var lastCol = Math.floor(lastX / this.columnWidth);
        // lastCol should not go over if multiple of columnWidth #425
        lastCol -= lastX % this.columnWidth ? 0 : 1;
        lastCol = Math.min(this.cols - 1, lastCol);
        // set colYs to bottom of the stamp

        var isOriginTop = this._getOption('originTop');
        var stampMaxY = (isOriginTop ? offset.top : offset.bottom) +
            stampSize.outerHeight;
        for (var i = firstCol; i <= lastCol; i++) {
            this.colYs[i] = Math.max(stampMaxY, this.colYs[i]);
        }
    };

    Masonry.prototype._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var size = {
            height: this.maxY
        };

        if (this._getOption('fitWidth')) {
            size.width = this._getContainerFitWidth();
        }

        return size;
    };

    Masonry.prototype._getContainerFitWidth = function () {
        var unusedCols = 0;
        // count unused columns
        var i = this.cols;
        while (--i) {
            if (this.colYs[i] !== 0) {
                break;
            }
            unusedCols++;
        }
        // fit container to columns that have been used
        return (this.cols - unusedCols) * this.columnWidth - this.gutter;
    };

    Masonry.prototype.needsResizeLayout = function () {
        var previousWidth = this.containerWidth;
        this.getContainerWidth();
        return previousWidth != this.containerWidth;
    };

    return Masonry;

}));


/*!
 * imagesLoaded PACKAGED v4.1.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

/**
 * EvEmitter v1.0.1
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

(function (global, factory) {
    // universal module definition
    /* jshint strict: false */ /* globals define, module */
    if (typeof define == 'function' && define.amd) {
        // AMD - RequireJS
        define('ev-emitter/ev-emitter', factory);
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS - Browserify, Webpack
        module.exports = factory();
    } else {
        // Browser globals
        global.EvEmitter = factory();
    }

}(this, function () {



    function EvEmitter() { }

    var proto = EvEmitter.prototype;

    proto.on = function (eventName, listener) {
        if (!eventName || !listener) {
            return;
        }
        // set events hash
        var events = this._events = this._events || {};
        // set listeners array
        var listeners = events[eventName] = events[eventName] || [];
        // only add once
        if (listeners.indexOf(listener) == -1) {
            listeners.push(listener);
        }

        return this;
    };

    proto.once = function (eventName, listener) {
        if (!eventName || !listener) {
            return;
        }
        // add event
        this.on(eventName, listener);
        // set once flag
        // set onceEvents hash
        var onceEvents = this._onceEvents = this._onceEvents || {};
        // set onceListeners array
        var onceListeners = onceEvents[eventName] = onceEvents[eventName] || [];
        // set flag
        onceListeners[listener] = true;

        return this;
    };

    proto.off = function (eventName, listener) {
        var listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) {
            return;
        }
        var index = listeners.indexOf(listener);
        if (index != -1) {
            listeners.splice(index, 1);
        }

        return this;
    };

    proto.emitEvent = function (eventName, args) {
        var listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) {
            return;
        }
        var i = 0;
        var listener = listeners[i];
        args = args || [];
        // once stuff
        var onceListeners = this._onceEvents && this._onceEvents[eventName];

        while (listener) {
            var isOnce = onceListeners && onceListeners[listener];
            if (isOnce) {
                // remove listener
                // remove before trigger to prevent recursion
                this.off(eventName, listener);
                // unset once flag
                delete onceListeners[listener];
            }
            // trigger listener
            listener.apply(this, args);
            // get next listener
            i += isOnce ? 0 : 1;
            listener = listeners[i];
        }

        return this;
    };

    return EvEmitter;

}));

/*!
 * imagesLoaded v4.1.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function (window, factory) {
    'use strict';
    // universal module definition

    /*global define: false, module: false, require: false */

    if (typeof define == 'function' && define.amd) {
        // AMD
        define([
            'ev-emitter/ev-emitter'
        ], function (EvEmitter) {
            return factory(window, EvEmitter);
        });
    } else if (typeof module == 'object' && module.exports) {
        // CommonJS
        module.exports = factory(
            window,
            require('ev-emitter')
        );
    } else {
        // browser global
        window.imagesLoaded = factory(
            window,
            window.EvEmitter
        );
    }

})(window,

    // --------------------------  factory -------------------------- //

    function factory(window, EvEmitter) {



        var $ = window.jQuery;
        var console = window.console;

        // -------------------------- helpers -------------------------- //

        // extend objects
        function extend(a, b) {
            for (var prop in b) {
                a[prop] = b[prop];
            }
            return a;
        }

        // turn element or nodeList into an array
        function makeArray(obj) {
            var ary = [];
            if (Array.isArray(obj)) {
                // use object if already an array
                ary = obj;
            } else if (typeof obj.length == 'number') {
                // convert nodeList to array
                for (var i = 0; i < obj.length; i++) {
                    ary.push(obj[i]);
                }
            } else {
                // array of single index
                ary.push(obj);
            }
            return ary;
        }

        // -------------------------- imagesLoaded -------------------------- //

        /**
         * @param {Array, Element, NodeList, String} elem
         * @param {Object or Function} options - if function, use as callback
         * @param {Function} onAlways - callback function
         */
        function ImagesLoaded(elem, options, onAlways) {
            // coerce ImagesLoaded() without new, to be new ImagesLoaded()
            if (!(this instanceof ImagesLoaded)) {
                return new ImagesLoaded(elem, options, onAlways);
            }
            // use elem as selector string
            if (typeof elem == 'string') {
                elem = document.querySelectorAll(elem);
            }

            this.elements = makeArray(elem);
            this.options = extend({}, this.options);

            if (typeof options == 'function') {
                onAlways = options;
            } else {
                extend(this.options, options);
            }

            if (onAlways) {
                this.on('always', onAlways);
            }

            this.getImages();

            if ($) {
                // add jQuery Deferred object
                this.jqDeferred = new $.Deferred();
            }

            // HACK check async to allow time to bind listeners
            setTimeout(function () {
                this.check();
            }.bind(this));
        }

        ImagesLoaded.prototype = Object.create(EvEmitter.prototype);

        ImagesLoaded.prototype.options = {};

        ImagesLoaded.prototype.getImages = function () {
            this.images = [];

            // filter & find items if we have an item selector
            this.elements.forEach(this.addElementImages, this);
        };

        /**
         * @param {Node} element
         */
        ImagesLoaded.prototype.addElementImages = function (elem) {
            // filter siblings
            if (elem.nodeName == 'IMG') {
                this.addImage(elem);
            }
            // get background image on element
            if (this.options.background === true) {
                this.addElementBackgroundImages(elem);
            }

            // find children
            // no non-element nodes, #143
            var nodeType = elem.nodeType;
            if (!nodeType || !elementNodeTypes[nodeType]) {
                return;
            }
            var childImgs = elem.querySelectorAll('img');
            // concat childElems to filterFound array
            for (var i = 0; i < childImgs.length; i++) {
                var img = childImgs[i];
                this.addImage(img);
            }

            // get child background images
            if (typeof this.options.background == 'string') {
                var children = elem.querySelectorAll(this.options.background);
                for (i = 0; i < children.length; i++) {
                    var child = children[i];
                    this.addElementBackgroundImages(child);
                }
            }
        };

        var elementNodeTypes = {
            1: true,
            9: true,
            11: true
        };

        ImagesLoaded.prototype.addElementBackgroundImages = function (elem) {
            var style = getComputedStyle(elem);
            if (!style) {
                // Firefox returns null if in a hidden iframe https://bugzil.la/548397
                return;
            }
            // get url inside url("...")
            var reURL = /url\((['"])?(.*?)\1\)/gi;
            var matches = reURL.exec(style.backgroundImage);
            while (matches !== null) {
                var url = matches && matches[2];
                if (url) {
                    this.addBackground(url, elem);
                }
                matches = reURL.exec(style.backgroundImage);
            }
        };

        /**
         * @param {Image} img
         */
        ImagesLoaded.prototype.addImage = function (img) {
            var loadingImage = new LoadingImage(img);
            this.images.push(loadingImage);
        };

        ImagesLoaded.prototype.addBackground = function (url, elem) {
            var background = new Background(url, elem);
            this.images.push(background);
        };

        ImagesLoaded.prototype.check = function () {
            var _this = this;
            this.progressedCount = 0;
            this.hasAnyBroken = false;
            // complete if no images
            if (!this.images.length) {
                this.complete();
                return;
            }

            function onProgress(image, elem, message) {
                // HACK - Chrome triggers event before object properties have changed. #83
                setTimeout(function () {
                    _this.progress(image, elem, message);
                });
            }

            this.images.forEach(function (loadingImage) {
                loadingImage.once('progress', onProgress);
                loadingImage.check();
            });
        };

        ImagesLoaded.prototype.progress = function (image, elem, message) {
            this.progressedCount++;
            this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
            // progress event
            this.emitEvent('progress', [this, image, elem]);
            if (this.jqDeferred && this.jqDeferred.notify) {
                this.jqDeferred.notify(this, image);
            }
            // check if completed
            if (this.progressedCount == this.images.length) {
                this.complete();
            }

            if (this.options.debug && console) {
                console.log('progress: ' + message, image, elem);
            }
        };

        ImagesLoaded.prototype.complete = function () {
            var eventName = this.hasAnyBroken ? 'fail' : 'done';
            this.isComplete = true;
            this.emitEvent(eventName, [this]);
            this.emitEvent('always', [this]);
            if (this.jqDeferred) {
                var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
                this.jqDeferred[jqMethod](this);
            }
        };

        // --------------------------  -------------------------- //

        function LoadingImage(img) {
            this.img = img;
        }

        LoadingImage.prototype = Object.create(EvEmitter.prototype);

        LoadingImage.prototype.check = function () {
            // If complete is true and browser supports natural sizes,
            // try to check for image status manually.
            var isComplete = this.getIsImageComplete();
            if (isComplete) {
                // report based on naturalWidth
                this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
                return;
            }

            // If none of the checks above matched, simulate loading on detached element.
            this.proxyImage = new Image();
            this.proxyImage.addEventListener('load', this);
            this.proxyImage.addEventListener('error', this);
            // bind to image as well for Firefox. #191
            this.img.addEventListener('load', this);
            this.img.addEventListener('error', this);
            this.proxyImage.src = this.img.src;
        };

        LoadingImage.prototype.getIsImageComplete = function () {
            return this.img.complete && this.img.naturalWidth !== undefined;
        };

        LoadingImage.prototype.confirm = function (isLoaded, message) {
            this.isLoaded = isLoaded;
            this.emitEvent('progress', [this, this.img, message]);
        };

        // ----- events ----- //

        // trigger specified handler for event type
        LoadingImage.prototype.handleEvent = function (event) {
            var method = 'on' + event.type;
            if (this[method]) {
                this[method](event);
            }
        };

        LoadingImage.prototype.onload = function () {
            this.confirm(true, 'onload');
            this.unbindEvents();
        };

        LoadingImage.prototype.onerror = function () {
            this.confirm(false, 'onerror');
            this.unbindEvents();
        };

        LoadingImage.prototype.unbindEvents = function () {
            this.proxyImage.removeEventListener('load', this);
            this.proxyImage.removeEventListener('error', this);
            this.img.removeEventListener('load', this);
            this.img.removeEventListener('error', this);
        };

        // -------------------------- Background -------------------------- //

        function Background(url, element) {
            this.url = url;
            this.element = element;
            this.img = new Image();
        }

        // inherit LoadingImage prototype
        Background.prototype = Object.create(LoadingImage.prototype);

        Background.prototype.check = function () {
            this.img.addEventListener('load', this);
            this.img.addEventListener('error', this);
            this.img.src = this.url;
            // check if image is already complete
            var isComplete = this.getIsImageComplete();
            if (isComplete) {
                this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
                this.unbindEvents();
            }
        };

        Background.prototype.unbindEvents = function () {
            this.img.removeEventListener('load', this);
            this.img.removeEventListener('error', this);
        };

        Background.prototype.confirm = function (isLoaded, message) {
            this.isLoaded = isLoaded;
            this.emitEvent('progress', [this, this.element, message]);
        };

        // -------------------------- jQuery -------------------------- //

        ImagesLoaded.makeJQueryPlugin = function (jQuery) {
            jQuery = jQuery || window.jQuery;
            if (!jQuery) {
                return;
            }
            // set local variable
            $ = jQuery;
            // $().imagesLoaded()
            $.fn.imagesLoaded = function (options, callback) {
                var instance = new ImagesLoaded(this, options, callback);
                return instance.jqDeferred.promise($(this));
            };
        };
        // try making plugin
        ImagesLoaded.makeJQueryPlugin();

        // --------------------------  -------------------------- //

        return ImagesLoaded;

    });


/*!
	Colorbox 1.6.3
	license: MIT
	http://www.jacklmoore.com/colorbox
*/
(function ($, document, window) {
    var
        // Default settings object.
        // See http://jacklmoore.com/colorbox for details.
        defaults = {
            // data sources
            html: false,
            photo: false,
            iframe: false,
            inline: false,

            // behavior and appearance
            transition: "elastic",
            speed: 300,
            fadeOut: 300,
            width: false,
            initialWidth: "600",
            innerWidth: false,
            maxWidth: false,
            height: false,
            initialHeight: "450",
            innerHeight: false,
            maxHeight: false,
            scalePhotos: true,
            scrolling: true,
            opacity: 0.9,
            preloading: true,
            className: false,
            overlayClose: true,
            escKey: true,
            arrowKey: true,
            top: false,
            bottom: false,
            left: false,
            right: false,
            fixed: false,
            data: undefined,
            closeButton: true,
            fastIframe: true,
            open: false,
            reposition: true,
            loop: true,
            slideshow: false,
            slideshowAuto: true,
            slideshowSpeed: 2500,
            slideshowStart: "start slideshow",
            slideshowStop: "stop slideshow",
            photoRegex: /\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,

            // alternate image paths for high-res displays
            retinaImage: false,
            retinaUrl: false,
            retinaSuffix: '@2x.$1',

            // internationalization
            current: "image {current} of {total}",
            previous: "previous",
            next: "next",
            close: "close",
            xhrError: "This content failed to load.",
            imgError: "This image failed to load.",

            // accessbility
            returnFocus: true,
            trapFocus: true,

            // callbacks
            onOpen: false,
            onLoad: false,
            onComplete: false,
            onCleanup: false,
            onClosed: false,

            rel: function () {
                return this.rel;
            },
            href: function () {
                // using this.href would give the absolute url, when the href may have been inteded as a selector (e.g. '#container')
                return $(this).attr('href');
            },
            title: function () {
                return this.title;
            },
            createImg: function () {
                var img = new Image();
                var attrs = $(this).data('cbox-img-attrs');

                if (typeof attrs === 'object') {
                    $.each(attrs, function (key, val) {
                        img[key] = val;
                    });
                }

                return img;
            },
            createIframe: function () {
                var iframe = document.createElement('iframe');
                var attrs = $(this).data('cbox-iframe-attrs');

                if (typeof attrs === 'object') {
                    $.each(attrs, function (key, val) {
                        iframe[key] = val;
                    });
                }

                if ('frameBorder' in iframe) {
                    iframe.frameBorder = 0;
                }
                if ('allowTransparency' in iframe) {
                    iframe.allowTransparency = "true";
                }
                iframe.name = (new Date()).getTime(); // give the iframe a unique name to prevent caching
                iframe.allowFullscreen = true;

                return iframe;
            }
        },

        // Abstracting the HTML and event identifiers for easy rebranding
        colorbox = 'colorbox',
        prefix = 'cbox',
        boxElement = prefix + 'Element',

        // Events
        event_open = prefix + '_open',
        event_load = prefix + '_load',
        event_complete = prefix + '_complete',
        event_cleanup = prefix + '_cleanup',
        event_closed = prefix + '_closed',
        event_purge = prefix + '_purge',

        // Cached jQuery Object Variables
        $overlay,
        $box,
        $wrap,
        $content,
        $topBorder,
        $leftBorder,
        $rightBorder,
        $bottomBorder,
        $related,
        $window,
        $loaded,
        $loadingBay,
        $loadingOverlay,
        $title,
        $current,
        $slideshow,
        $next,
        $prev,
        $close,
        $groupControls,
        $events = $('<a/>'), // $({}) would be prefered, but there is an issue with jQuery 1.4.2

        // Variables for cached values or use across multiple functions
        settings,
        interfaceHeight,
        interfaceWidth,
        loadedHeight,
        loadedWidth,
        index,
        photo,
        open,
        active,
        closing,
        loadingTimer,
        publicMethod,
        div = "div",
        requests = 0,
        previousCSS = {},
        init;

    // ****************
    // HELPER FUNCTIONS
    // ****************

    // Convenience function for creating new jQuery objects
    function $tag(tag, id, css) {
        var element = document.createElement(tag);

        if (id) {
            element.id = prefix + id;
        }

        if (css) {
            element.style.cssText = css;
        }

        return $(element);
    }

    // Get the window height using innerHeight when available to avoid an issue with iOS
    // http://bugs.jquery.com/ticket/6724
    function winheight() {
        return window.innerHeight ? window.innerHeight : $(window).height();
    }

    function Settings(element, options) {
        if (options !== Object(options)) {
            options = {};
        }

        this.cache = {};
        this.el = element;

        this.value = function (key) {
            var dataAttr;

            if (this.cache[key] === undefined) {
                dataAttr = $(this.el).attr('data-cbox-' + key);

                if (dataAttr !== undefined) {
                    this.cache[key] = dataAttr;
                } else if (options[key] !== undefined) {
                    this.cache[key] = options[key];
                } else if (defaults[key] !== undefined) {
                    this.cache[key] = defaults[key];
                }
            }

            return this.cache[key];
        };

        this.get = function (key) {
            var value = this.value(key);
            return $.isFunction(value) ? value.call(this.el, this) : value;
        };
    }

    // Determine the next and previous members in a group.
    function getIndex(increment) {
        var
            max = $related.length,
            newIndex = (index + increment) % max;

        return (newIndex < 0) ? max + newIndex : newIndex;
    }

    // Convert '%' and 'px' values to integers
    function setSize(size, dimension) {
        return Math.round((/%/.test(size) ? ((dimension === 'x' ? $window.width() : winheight()) / 100) : 1) * parseInt(size, 10));
    }

    // Checks an href to see if it is a photo.
    // There is a force photo option (photo: true) for hrefs that cannot be matched by the regex.
    function isImage(settings, url) {
        return settings.get('photo') || settings.get('photoRegex').test(url);
    }

    function retinaUrl(settings, url) {
        return settings.get('retinaUrl') && window.devicePixelRatio > 1 ? url.replace(settings.get('photoRegex'), settings.get('retinaSuffix')) : url;
    }

    function trapFocus(e) {
        if ('contains' in $box[0] && !$box[0].contains(e.target) && e.target !== $overlay[0]) {
            e.stopPropagation();
            $box.focus();
        }
    }

    function setClass(str) {
        if (setClass.str !== str) {
            $box.add($overlay).removeClass(setClass.str).addClass(str);
            setClass.str = str;
        }
    }

    function getRelated(rel) {
        index = 0;

        if (rel && rel !== false && rel !== 'nofollow') {
            $related = $('.' + boxElement).filter(function () {
                var options = $.data(this, colorbox);
                var settings = new Settings(this, options);
                return (settings.get('rel') === rel);
            });
            index = $related.index(settings.el);

            // Check direct calls to Colorbox.
            if (index === -1) {
                $related = $related.add(settings.el);
                index = $related.length - 1;
            }
        } else {
            $related = $(settings.el);
        }
    }

    function trigger(event) {
        // for external use
        $(document).trigger(event);
        // for internal use
        $events.triggerHandler(event);
    }

    var slideshow = (function () {
        var active,
            className = prefix + "Slideshow_",
            click = "click." + prefix,
            timeOut;

        function clear() {
            clearTimeout(timeOut);
        }

        function set() {
            if (settings.get('loop') || $related[index + 1]) {
                clear();
                timeOut = setTimeout(publicMethod.next, settings.get('slideshowSpeed'));
            }
        }

        function start() {
            $slideshow
                .html(settings.get('slideshowStop'))
                .unbind(click)
                .one(click, stop);

            $events
                .bind(event_complete, set)
                .bind(event_load, clear);

            $box.removeClass(className + "off").addClass(className + "on");
        }

        function stop() {
            clear();

            $events
                .unbind(event_complete, set)
                .unbind(event_load, clear);

            $slideshow
                .html(settings.get('slideshowStart'))
                .unbind(click)
                .one(click, function () {
                    publicMethod.next();
                    start();
                });

            $box.removeClass(className + "on").addClass(className + "off");
        }

        function reset() {
            active = false;
            $slideshow.hide();
            clear();
            $events
                .unbind(event_complete, set)
                .unbind(event_load, clear);
            $box.removeClass(className + "off " + className + "on");
        }

        return function () {
            if (active) {
                if (!settings.get('slideshow')) {
                    $events.unbind(event_cleanup, reset);
                    reset();
                }
            } else {
                if (settings.get('slideshow') && $related[1]) {
                    active = true;
                    $events.one(event_cleanup, reset);
                    if (settings.get('slideshowAuto')) {
                        start();
                    } else {
                        stop();
                    }
                    $slideshow.show();
                }
            }
        };

    }());


    function launch(element) {
        var options;

        if (!closing) {

            options = $(element).data(colorbox);

            settings = new Settings(element, options);

            getRelated(settings.get('rel'));

            if (!open) {
                open = active = true; // Prevents the page-change action from queuing up if the visitor holds down the left or right keys.

                setClass(settings.get('className'));

                // Show colorbox so the sizes can be calculated in older versions of jQuery
                $box.css({ visibility: 'hidden', display: 'block', opacity: '' });

                $loaded = $tag(div, 'LoadedContent', 'width:0; height:0; overflow:hidden; visibility:hidden');
                $content.css({ width: '', height: '' }).append($loaded);

                // Cache values needed for size calculations
                interfaceHeight = $topBorder.height() + $bottomBorder.height() + $content.outerHeight(true) - $content.height();
                interfaceWidth = $leftBorder.width() + $rightBorder.width() + $content.outerWidth(true) - $content.width();
                loadedHeight = $loaded.outerHeight(true);
                loadedWidth = $loaded.outerWidth(true);

                // Opens inital empty Colorbox prior to content being loaded.
                var initialWidth = setSize(settings.get('initialWidth'), 'x');
                var initialHeight = setSize(settings.get('initialHeight'), 'y');
                var maxWidth = settings.get('maxWidth');
                var maxHeight = settings.get('maxHeight');

                settings.w = Math.max((maxWidth !== false ? Math.min(initialWidth, setSize(maxWidth, 'x')) : initialWidth) - loadedWidth - interfaceWidth, 0);
                settings.h = Math.max((maxHeight !== false ? Math.min(initialHeight, setSize(maxHeight, 'y')) : initialHeight) - loadedHeight - interfaceHeight, 0);

                $loaded.css({ width: '', height: settings.h });
                publicMethod.position();

                trigger(event_open);
                settings.get('onOpen');

                $groupControls.add($title).hide();

                $box.focus();

                if (settings.get('trapFocus')) {
                    // Confine focus to the modal
                    // Uses event capturing that is not supported in IE8-
                    if (document.addEventListener) {

                        document.addEventListener('focus', trapFocus, true);

                        $events.one(event_closed, function () {
                            document.removeEventListener('focus', trapFocus, true);
                        });
                    }
                }

                // Return focus on closing
                if (settings.get('returnFocus')) {
                    $events.one(event_closed, function () {
                        $(settings.el).focus();
                    });
                }
            }

            var opacity = parseFloat(settings.get('opacity'));
            $overlay.css({
                opacity: opacity === opacity ? opacity : '',
                cursor: settings.get('overlayClose') ? 'pointer' : '',
                visibility: 'visible'
            }).show();

            if (settings.get('closeButton')) {
                $close.html(settings.get('close')).appendTo($content);
            } else {
                $close.appendTo('<div/>'); // replace with .detach() when dropping jQuery < 1.4
            }

            load();
        }
    }

    // Colorbox's markup needs to be added to the DOM prior to being called
    // so that the browser will go ahead and load the CSS background images.
    function appendHTML() {
        if (!$box) {
            init = false;
            $window = $(window);
            $box = $tag(div).attr({
                id: colorbox,
                'class': $.support.opacity === false ? prefix + 'IE' : '', // class for optional IE8 & lower targeted CSS.
                role: 'dialog',
                tabindex: '-1'
            }).hide();
            $overlay = $tag(div, "Overlay").hide();
            $loadingOverlay = $([$tag(div, "LoadingOverlay")[0], $tag(div, "LoadingGraphic")[0]]);
            $wrap = $tag(div, "Wrapper");
            $content = $tag(div, "Content").append(
                $title = $tag(div, "Title"),
                $current = $tag(div, "Current"),
                $prev = $('<button type="button"/>').attr({ id: prefix + 'Previous' }),
                $next = $('<button type="button"/>').attr({ id: prefix + 'Next' }),
                $slideshow = $tag('button', "Slideshow"),
                $loadingOverlay
            );

            $close = $('<button type="button"/>').attr({ id: prefix + 'Close' });

            $wrap.append( // The 3x3 Grid that makes up Colorbox
                $tag(div).append(
                    $tag(div, "TopLeft"),
                    $topBorder = $tag(div, "TopCenter"),
                    $tag(div, "TopRight")
                ),
                $tag(div, false, 'clear:left').append(
                    $leftBorder = $tag(div, "MiddleLeft"),
                    $content,
                    $rightBorder = $tag(div, "MiddleRight")
                ),
                $tag(div, false, 'clear:left').append(
                    $tag(div, "BottomLeft"),
                    $bottomBorder = $tag(div, "BottomCenter"),
                    $tag(div, "BottomRight")
                )
            ).find('div div').css({ 'float': 'left' });

            $loadingBay = $tag(div, false, 'position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;');

            $groupControls = $next.add($prev).add($current).add($slideshow);
        }
        if (document.body && !$box.parent().length) {
            $(document.body).append($overlay, $box.append($wrap, $loadingBay));
        }
    }

    // Add Colorbox's event bindings
    function addBindings() {
        function clickHandler(e) {
            // ignore non-left-mouse-clicks and clicks modified with ctrl / command, shift, or alt.
            // See: http://jacklmoore.com/notes/click-events/
            if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                launch(this);
            }
        }

        if ($box) {
            if (!init) {
                init = true;

                // Anonymous functions here keep the public method from being cached, thereby allowing them to be redefined on the fly.
                $next.click(function () {
                    publicMethod.next();
                });
                $prev.click(function () {
                    publicMethod.prev();
                });
                $close.click(function () {
                    publicMethod.close();
                });
                $overlay.click(function () {
                    if (settings.get('overlayClose')) {
                        publicMethod.close();
                    }
                });

                // Key Bindings
                $(document).bind('keydown.' + prefix, function (e) {
                    var key = e.keyCode;
                    if (open && settings.get('escKey') && key === 27) {
                        e.preventDefault();
                        publicMethod.close();
                    }
                    if (open && settings.get('arrowKey') && $related[1] && !e.altKey) {
                        if (key === 37) {
                            e.preventDefault();
                            $prev.click();
                        } else if (key === 39) {
                            e.preventDefault();
                            $next.click();
                        }
                    }
                });

                if ($.isFunction($.fn.on)) {
                    // For jQuery 1.7+
                    $(document).on('click.' + prefix, '.' + boxElement, clickHandler);
                } else {
                    // For jQuery 1.3.x -> 1.6.x
                    // This code is never reached in jQuery 1.9, so do not contact me about 'live' being removed.
                    // This is not here for jQuery 1.9, it's here for legacy users.
                    $('.' + boxElement).live('click.' + prefix, clickHandler);
                }
            }
            return true;
        }
        return false;
    }

    // Don't do anything if Colorbox already exists.
    if ($[colorbox]) {
        return;
    }

    // Append the HTML when the DOM loads
    $(appendHTML);


    // ****************
    // PUBLIC FUNCTIONS
    // Usage format: $.colorbox.close();
    // Usage from within an iframe: parent.jQuery.colorbox.close();
    // ****************

    publicMethod = $.fn[colorbox] = $[colorbox] = function (options, callback) {
        var settings;
        var $obj = this;

        options = options || {};

        if ($.isFunction($obj)) { // assume a call to $.colorbox
            $obj = $('<a/>');
            options.open = true;
        }

        if (!$obj[0]) { // colorbox being applied to empty collection
            return $obj;
        }

        appendHTML();

        if (addBindings()) {

            if (callback) {
                options.onComplete = callback;
            }

            $obj.each(function () {
                var old = $.data(this, colorbox) || {};
                $.data(this, colorbox, $.extend(old, options));
            }).addClass(boxElement);

            settings = new Settings($obj[0], options);

            if (settings.get('open')) {
                launch($obj[0]);
            }
        }

        return $obj;
    };

    publicMethod.position = function (speed, loadedCallback) {
        var
            css,
            top = 0,
            left = 0,
            offset = $box.offset(),
            scrollTop,
            scrollLeft;

        $window.unbind('resize.' + prefix);

        // remove the modal so that it doesn't influence the document width/height
        $box.css({ top: -9e4, left: -9e4 });

        scrollTop = $window.scrollTop();
        scrollLeft = $window.scrollLeft();

        if (settings.get('fixed')) {
            offset.top -= scrollTop;
            offset.left -= scrollLeft;
            $box.css({ position: 'fixed' });
        } else {
            top = scrollTop;
            left = scrollLeft;
            $box.css({ position: 'absolute' });
        }

        // keeps the top and left positions within the browser's viewport.
        if (settings.get('right') !== false) {
            left += Math.max($window.width() - settings.w - loadedWidth - interfaceWidth - setSize(settings.get('right'), 'x'), 0);
        } else if (settings.get('left') !== false) {
            left += setSize(settings.get('left'), 'x');
        } else {
            left += Math.round(Math.max($window.width() - settings.w - loadedWidth - interfaceWidth, 0) / 2);
        }

        if (settings.get('bottom') !== false) {
            top += Math.max(winheight() - settings.h - loadedHeight - interfaceHeight - setSize(settings.get('bottom'), 'y'), 0);
        } else if (settings.get('top') !== false) {
            top += setSize(settings.get('top'), 'y');
        } else {
            top += Math.round(Math.max(winheight() - settings.h - loadedHeight - interfaceHeight, 0) / 2);
        }

        $box.css({ top: offset.top, left: offset.left, visibility: 'visible' });

        // this gives the wrapper plenty of breathing room so it's floated contents can move around smoothly,
        // but it has to be shrank down around the size of div#colorbox when it's done.  If not,
        // it can invoke an obscure IE bug when using iframes.
        $wrap[0].style.width = $wrap[0].style.height = "9999px";

        function modalDimensions() {
            $topBorder[0].style.width = $bottomBorder[0].style.width = $content[0].style.width = (parseInt($box[0].style.width, 10) - interfaceWidth) + 'px';
            $content[0].style.height = $leftBorder[0].style.height = $rightBorder[0].style.height = (parseInt($box[0].style.height, 10) - interfaceHeight) + 'px';
        }

        css = { width: settings.w + loadedWidth + interfaceWidth, height: settings.h + loadedHeight + interfaceHeight, top: top, left: left };

        // setting the speed to 0 if the content hasn't changed size or position
        if (speed) {
            var tempSpeed = 0;
            $.each(css, function (i) {
                if (css[i] !== previousCSS[i]) {
                    tempSpeed = speed;
                    return;
                }
            });
            speed = tempSpeed;
        }

        previousCSS = css;

        if (!speed) {
            $box.css(css);
        }

        $box.dequeue().animate(css, {
            duration: speed || 0,
            complete: function () {
                modalDimensions();

                active = false;

                // shrink the wrapper down to exactly the size of colorbox to avoid a bug in IE's iframe implementation.
                $wrap[0].style.width = (settings.w + loadedWidth + interfaceWidth) + "px";
                $wrap[0].style.height = (settings.h + loadedHeight + interfaceHeight) + "px";

                if (settings.get('reposition')) {
                    setTimeout(function () {  // small delay before binding onresize due to an IE8 bug.
                        $window.bind('resize.' + prefix, publicMethod.position);
                    }, 1);
                }

                if ($.isFunction(loadedCallback)) {
                    loadedCallback();
                }
            },
            step: modalDimensions
        });
    };

    publicMethod.resize = function (options) {
        var scrolltop;

        if (open) {
            options = options || {};

            if (options.width) {
                settings.w = setSize(options.width, 'x') - loadedWidth - interfaceWidth;
            }

            if (options.innerWidth) {
                settings.w = setSize(options.innerWidth, 'x');
            }

            $loaded.css({ width: settings.w });

            if (options.height) {
                settings.h = setSize(options.height, 'y') - loadedHeight - interfaceHeight;
            }

            if (options.innerHeight) {
                settings.h = setSize(options.innerHeight, 'y');
            }

            if (!options.innerHeight && !options.height) {
                scrolltop = $loaded.scrollTop();
                $loaded.css({ height: "auto" });
                settings.h = $loaded.height();
            }

            $loaded.css({ height: settings.h });

            if (scrolltop) {
                $loaded.scrollTop(scrolltop);
            }

            publicMethod.position(settings.get('transition') === "none" ? 0 : settings.get('speed'));
        }
    };

    publicMethod.prep = function (object) {
        if (!open) {
            return;
        }

        var callback, speed = settings.get('transition') === "none" ? 0 : settings.get('speed');

        $loaded.remove();

        $loaded = $tag(div, 'LoadedContent').append(object);

        function getWidth() {
            settings.w = settings.w || $loaded.width();
            settings.w = settings.mw && settings.mw < settings.w ? settings.mw : settings.w;
            return settings.w;
        }
        function getHeight() {
            settings.h = settings.h || $loaded.height();
            settings.h = settings.mh && settings.mh < settings.h ? settings.mh : settings.h;
            return settings.h;
        }

        $loaded.hide()
            .appendTo($loadingBay.show())// content has to be appended to the DOM for accurate size calculations.
            .css({ width: getWidth(), overflow: settings.get('scrolling') ? 'auto' : 'hidden' })
            .css({ height: getHeight() })// sets the height independently from the width in case the new width influences the value of height.
            .prependTo($content);

        $loadingBay.hide();

        // floating the IMG removes the bottom line-height and fixed a problem where IE miscalculates the width of the parent element as 100% of the document width.

        $(photo).css({ 'float': 'none' });

        setClass(settings.get('className'));

        callback = function () {
            var total = $related.length,
                iframe,
                complete;

            if (!open) {
                return;
            }

            function removeFilter() { // Needed for IE8 in versions of jQuery prior to 1.7.2
                if ($.support.opacity === false) {
                    $box[0].style.removeAttribute('filter');
                }
            }

            complete = function () {
                clearTimeout(loadingTimer);
                $loadingOverlay.hide();
                trigger(event_complete);
                settings.get('onComplete');
            };


            $title.html(settings.get('title')).show();
            $loaded.show();

            if (total > 1) { // handle grouping
                if (typeof settings.get('current') === "string") {
                    $current.html(settings.get('current').replace('{current}', index + 1).replace('{total}', total)).show();
                }

                $next[(settings.get('loop') || index < total - 1) ? "show" : "hide"]().html(settings.get('next'));
                $prev[(settings.get('loop') || index) ? "show" : "hide"]().html(settings.get('previous'));

                slideshow();

                // Preloads images within a rel group
                if (settings.get('preloading')) {
                    $.each([getIndex(-1), getIndex(1)], function () {
                        var img,
                            i = $related[this],
                            settings = new Settings(i, $.data(i, colorbox)),
                            src = settings.get('href');

                        if (src && isImage(settings, src)) {
                            src = retinaUrl(settings, src);
                            img = document.createElement('img');
                            img.src = src;
                        }
                    });
                }
            } else {
                $groupControls.hide();
            }

            if (settings.get('iframe')) {

                iframe = settings.get('createIframe');

                if (!settings.get('scrolling')) {
                    iframe.scrolling = "no";
                }

                $(iframe)
                    .attr({
                        src: settings.get('href'),
                        'class': prefix + 'Iframe'
                    })
                    .one('load', complete)
                    .appendTo($loaded);

                $events.one(event_purge, function () {
                    iframe.src = "//about:blank";
                });

                if (settings.get('fastIframe')) {
                    $(iframe).trigger('load');
                }
            } else {
                complete();
            }

            if (settings.get('transition') === 'fade') {
                $box.fadeTo(speed, 1, removeFilter);
            } else {
                removeFilter();
            }
        };

        if (settings.get('transition') === 'fade') {
            $box.fadeTo(speed, 0, function () {
                publicMethod.position(0, callback);
            });
        } else {
            publicMethod.position(speed, callback);
        }
    };

    function load() {
        var href, setResize, prep = publicMethod.prep, $inline, request = ++requests;

        active = true;

        photo = false;

        trigger(event_purge);
        trigger(event_load);
        settings.get('onLoad');

        settings.h = settings.get('height') ?
            setSize(settings.get('height'), 'y') - loadedHeight - interfaceHeight :
            settings.get('innerHeight') && setSize(settings.get('innerHeight'), 'y');

        settings.w = settings.get('width') ?
            setSize(settings.get('width'), 'x') - loadedWidth - interfaceWidth :
            settings.get('innerWidth') && setSize(settings.get('innerWidth'), 'x');

        // Sets the minimum dimensions for use in image scaling
        settings.mw = settings.w;
        settings.mh = settings.h;

        // Re-evaluate the minimum width and height based on maxWidth and maxHeight values.
        // If the width or height exceed the maxWidth or maxHeight, use the maximum values instead.
        if (settings.get('maxWidth')) {
            settings.mw = setSize(settings.get('maxWidth'), 'x') - loadedWidth - interfaceWidth;
            settings.mw = settings.w && settings.w < settings.mw ? settings.w : settings.mw;
        }
        if (settings.get('maxHeight')) {
            settings.mh = setSize(settings.get('maxHeight'), 'y') - loadedHeight - interfaceHeight;
            settings.mh = settings.h && settings.h < settings.mh ? settings.h : settings.mh;
        }

        href = settings.get('href');

        loadingTimer = setTimeout(function () {
            $loadingOverlay.show();
        }, 100);

        if (settings.get('inline')) {
            var $target = $(href);
            // Inserts an empty placeholder where inline content is being pulled from.
            // An event is bound to put inline content back when Colorbox closes or loads new content.
            $inline = $('<div>').hide().insertBefore($target);

            $events.one(event_purge, function () {
                $inline.replaceWith($target);
            });

            prep($target);
        } else if (settings.get('iframe')) {
            // IFrame element won't be added to the DOM until it is ready to be displayed,
            // to avoid problems with DOM-ready JS that might be trying to run in that iframe.
            prep(" ");
        } else if (settings.get('html')) {
            prep(settings.get('html'));
        } else if (isImage(settings, href)) {

            href = retinaUrl(settings, href);

            photo = settings.get('createImg');

            $(photo)
                .addClass(prefix + 'Photo')
                .bind('error.' + prefix, function () {
                    prep($tag(div, 'Error').html(settings.get('imgError')));
                })
                .one('load', function () {
                    if (request !== requests) {
                        return;
                    }

                    // A small pause because some browsers will occassionaly report a
                    // img.width and img.height of zero immediately after the img.onload fires
                    setTimeout(function () {
                        var percent;

                        if (settings.get('retinaImage') && window.devicePixelRatio > 1) {
                            photo.height = photo.height / window.devicePixelRatio;
                            photo.width = photo.width / window.devicePixelRatio;
                        }

                        if (settings.get('scalePhotos')) {
                            setResize = function () {
                                photo.height -= photo.height * percent;
                                photo.width -= photo.width * percent;
                            };
                            if (settings.mw && photo.width > settings.mw) {
                                percent = (photo.width - settings.mw) / photo.width;
                                setResize();
                            }
                            if (settings.mh && photo.height > settings.mh) {
                                percent = (photo.height - settings.mh) / photo.height;
                                setResize();
                            }
                        }

                        if (settings.h) {
                            photo.style.marginTop = Math.max(settings.mh - photo.height, 0) / 2 + 'px';
                        }

                        if ($related[1] && (settings.get('loop') || $related[index + 1])) {
                            photo.style.cursor = 'pointer';

                            $(photo).bind('click.' + prefix, function () {
                                publicMethod.next();
                            });
                        }

                        photo.style.width = photo.width + 'px';
                        photo.style.height = photo.height + 'px';
                        prep(photo);
                    }, 1);
                });

            photo.src = href;

        } else if (href) {
            $loadingBay.load(href, settings.get('data'), function (data, status) {
                if (request === requests) {
                    prep(status === 'error' ? $tag(div, 'Error').html(settings.get('xhrError')) : $(this).contents());
                }
            });
        }
    }

    // Navigates to the next page/image in a set.
    publicMethod.next = function () {
        if (!active && $related[1] && (settings.get('loop') || $related[index + 1])) {
            index = getIndex(1);
            launch($related[index]);
        }
    };

    publicMethod.prev = function () {
        if (!active && $related[1] && (settings.get('loop') || index)) {
            index = getIndex(-1);
            launch($related[index]);
        }
    };

    // Note: to use this within an iframe use the following format: parent.jQuery.colorbox.close();
    publicMethod.close = function () {
        if (open && !closing) {

            closing = true;
            open = false;
            trigger(event_cleanup);
            settings.get('onCleanup');
            $window.unbind('.' + prefix);
            $overlay.fadeTo(settings.get('fadeOut') || 0, 0);

            $box.stop().fadeTo(settings.get('fadeOut') || 0, 0, function () {
                $box.hide();
                $overlay.hide();
                trigger(event_purge);
                $loaded.remove();

                setTimeout(function () {
                    closing = false;
                    trigger(event_closed);
                    settings.get('onClosed');
                }, 1);
            });
        }
    };

    // Removes changes Colorbox made to the document, but does not remove the plugin.
    publicMethod.remove = function () {
        if (!$box) { return; }

        $box.stop();
        $[colorbox].close();
        $box.stop(false, true).remove();
        $overlay.remove();
        closing = false;
        $box = null;
        $('.' + boxElement)
            .removeData(colorbox)
            .removeClass(boxElement);

        $(document).unbind('click.' + prefix).unbind('keydown.' + prefix);
    };

    // A method for fetching the current element Colorbox is referencing.
    // returns a jQuery object.
    publicMethod.element = function () {
        return $(settings.el);
    };

    publicMethod.settings = defaults;

}(jQuery, document, window));

/*!
 * Shuffle.js by @Vestride
 * Categorize, sort, and filter a responsive grid of items.
 * Dependencies: jQuery 1.9+, Modernizr 2.6.2+
 * @license MIT license
 * @version 3.1.1
 */

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransforms-csstransforms3d-csstransitions-cssclasses-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes
 */
window.Modernizr = function (a, b, c) { function z(a) { j.cssText = a } function A(a, b) { return z(m.join(a + ";") + (b || "")) } function B(a, b) { return typeof a === b } function C(a, b) { return !!~("" + a).indexOf(b) } function D(a, b) { for (var d in a) { var e = a[d]; if (!C(e, "-") && j[e] !== c) return b == "pfx" ? e : !0 } return !1 } function E(a, b, d) { for (var e in a) { var f = b[a[e]]; if (f !== c) return d === !1 ? a[e] : B(f, "function") ? f.bind(d || b) : f } return !1 } function F(a, b, c) { var d = a.charAt(0).toUpperCase() + a.slice(1), e = (a + " " + o.join(d + " ") + d).split(" "); return B(b, "string") || B(b, "undefined") ? D(e, b) : (e = (a + " " + p.join(d + " ") + d).split(" "), E(e, b, c)) } var d = "2.6.2", e = {}, f = !0, g = b.documentElement, h = "modernizr", i = b.createElement(h), j = i.style, k, l = {}.toString, m = " -webkit- -moz- -o- -ms- ".split(" "), n = "Webkit Moz O ms", o = n.split(" "), p = n.toLowerCase().split(" "), q = {}, r = {}, s = {}, t = [], u = t.slice, v, w = function (a, c, d, e) { var f, i, j, k, l = b.createElement("div"), m = b.body, n = m || b.createElement("body"); if (parseInt(d, 10)) while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j); return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i }, x = {}.hasOwnProperty, y; !B(x, "undefined") && !B(x.call, "undefined") ? y = function (a, b) { return x.call(a, b) } : y = function (a, b) { return b in a && B(a.constructor.prototype[b], "undefined") }, Function.prototype.bind || (Function.prototype.bind = function (b) { var c = this; if (typeof c != "function") throw new TypeError; var d = u.call(arguments, 1), e = function () { if (this instanceof e) { var a = function () { }; a.prototype = c.prototype; var f = new a, g = c.apply(f, d.concat(u.call(arguments))); return Object(g) === g ? g : f } return c.apply(b, d.concat(u.call(arguments))) }; return e }), q.csstransforms = function () { return !!F("transform") }, q.csstransforms3d = function () { var a = !!F("perspective"); return a && "webkitPerspective" in g.style && w("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function (b, c) { a = b.offsetLeft === 9 && b.offsetHeight === 3 }), a }, q.csstransitions = function () { return F("transition") }; for (var G in q) y(q, G) && (v = G.toLowerCase(), e[v] = q[G](), t.push((e[v] ? "" : "no-") + v)); return e.addTest = function (a, b) { if (typeof a == "object") for (var d in a) y(a, d) && e.addTest(d, a[d]); else { a = a.toLowerCase(); if (e[a] !== c) return e; b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b } return e }, z(""), i = k = null, e._version = d, e._prefixes = m, e._domPrefixes = p, e._cssomPrefixes = o, e.testProp = function (a) { return D([a]) }, e.testAllProps = F, e.testStyles = w, e.prefixed = function (a, b, c) { return b ? F(a, b, c) : F(a, "pfx") }, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + t.join(" ") : ""), e }(this, this.document);

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'modernizr'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'), window.Modernizr);
    } else {
        window.Shuffle = factory(window.jQuery, window.Modernizr);
    }
})(function ($, Modernizr, undefined) {

    'use strict';


    // Validate Modernizr exists.
    // Shuffle requires `csstransitions`, `csstransforms`, `csstransforms3d`,
    // and `prefixed` to exist on the Modernizr object.
    if (typeof Modernizr !== 'object') {
        throw new Error('Shuffle.js requires Modernizr.\n' +
            'http://vestride.github.io/Shuffle/#dependencies');
    }


    /**
     * Returns css prefixed properties like `-webkit-transition` or `box-sizing`
     * from `transition` or `boxSizing`, respectively.
     * @param {(string|boolean)} prop Property to be prefixed.
     * @return {string} The prefixed css property.
     */
    function dashify(prop) {
        if (!prop) {
            return '';
        }

        // Replace upper case with dash-lowercase,
        // then fix ms- prefixes because they're not capitalized.
        return prop.replace(/([A-Z])/g, function (str, m1) {
            return '-' + m1.toLowerCase();
        }).replace(/^ms-/, '-ms-');
    }

    // Constant, prefixed variables.
    var TRANSITION = Modernizr.prefixed('transition');
    var TRANSITION_DELAY = Modernizr.prefixed('transitionDelay');
    var TRANSITION_DURATION = Modernizr.prefixed('transitionDuration');

    // Note(glen): Stock Android 4.1.x browser will fail here because it wrongly
    // says it supports non-prefixed transitions.
    // https://github.com/Modernizr/Modernizr/issues/897
    var TRANSITIONEND = {
        'WebkitTransition': 'webkitTransitionEnd',
        'transition': 'transitionend'
    }[TRANSITION];

    var TRANSFORM = Modernizr.prefixed('transform');
    var CSS_TRANSFORM = dashify(TRANSFORM);

    // Constants
    var CAN_TRANSITION_TRANSFORMS = Modernizr.csstransforms && Modernizr.csstransitions;
    var HAS_TRANSFORMS_3D = Modernizr.csstransforms3d;
    var HAS_COMPUTED_STYLE = !!window.getComputedStyle;
    var SHUFFLE = 'shuffle';

    // Configurable. You can change these constants to fit your application.
    // The default scale and concealed scale, however, have to be different values.
    var ALL_ITEMS = 'all';
    var FILTER_ATTRIBUTE_KEY = 'groups';
    var DEFAULT_SCALE = 1;
    var CONCEALED_SCALE = 0.001;

    // Underscore's throttle function.
    function throttle(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        options = options || {};
        var later = function () {
            previous = options.leading === false ? 0 : $.now();
            timeout = null;
            result = func.apply(context, args);
            context = args = null;
        };
        return function () {
            var now = $.now();
            if (!previous && options.leading === false) {
                previous = now;
            }
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                clearTimeout(timeout);
                timeout = null;
                previous = now;
                result = func.apply(context, args);
                context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    }

    function each(obj, iterator, context) {
        for (var i = 0, length = obj.length; i < length; i++) {
            if (iterator.call(context, obj[i], i, obj) === {}) {
                return;
            }
        }
    }

    function defer(fn, context, wait) {
        return setTimeout($.proxy(fn, context), wait);
    }

    function arrayMax(array) {
        return Math.max.apply(Math, array);
    }

    function arrayMin(array) {
        return Math.min.apply(Math, array);
    }


    /**
     * Always returns a numeric value, given a value.
     * @param {*} value Possibly numeric value.
     * @return {number} `value` or zero if `value` isn't numeric.
     * @private
     */
    function getNumber(value) {
        return $.isNumeric(value) ? value : 0;
    }

    var getStyles = window.getComputedStyle || function () { };

    /**
     * Represents a coordinate pair.
     * @param {number} [x=0] X.
     * @param {number} [y=0] Y.
     */
    var Point = function (x, y) {
        this.x = getNumber(x);
        this.y = getNumber(y);
    };


    /**
     * Whether two points are equal.
     * @param {Point} a Point A.
     * @param {Point} b Point B.
     * @return {boolean}
     */
    Point.equals = function (a, b) {
        return a.x === b.x && a.y === b.y;
    };

    var COMPUTED_SIZE_INCLUDES_PADDING = (function () {
        if (!HAS_COMPUTED_STYLE) {
            return false;
        }

        var parent = document.body || document.documentElement;
        var e = document.createElement('div');
        e.style.cssText = 'width:10px;padding:2px;' +
            '-webkit-box-sizing:border-box;box-sizing:border-box;';
        parent.appendChild(e);

        var width = getStyles(e, null).width;
        var ret = width === '10px';

        parent.removeChild(e);

        return ret;
    }());


    // Used for unique instance variables
    var id = 0;
    var $window = $(window);


    /**
     * Categorize, sort, and filter a responsive grid of items.
     *
     * @param {Element} element An element which is the parent container for the grid items.
     * @param {Object} [options=Shuffle.options] Options object.
     * @constructor
     */
    var Shuffle = function (element, options) {
        options = options || {};
        $.extend(this, Shuffle.options, options, Shuffle.settings);

        this.$el = $(element);
        this.element = element;
        this.unique = 'shuffle_' + id++;

        this._fire(Shuffle.EventType.LOADING);
        this._init();

        // Dispatch the done event asynchronously so that people can bind to it after
        // Shuffle has been initialized.
        defer(function () {
            this.initialized = true;
            this._fire(Shuffle.EventType.DONE);
        }, this, 16);
    };

    /**
     * Events the container element emits with the .shuffle namespace.
     * For example, "done.shuffle".
     * @enum {string}
     */
    Shuffle.EventType = {
        LOADING: 'loading',
        DONE: 'done',
        LAYOUT: 'layout',
        REMOVED: 'removed'
    };


    /** @enum {string} */
    Shuffle.ClassName = {
        BASE: SHUFFLE,
        SHUFFLE_ITEM: 'shuffle-item',
        FILTERED: 'filtered',
        CONCEALED: 'concealed'
    };


    // Overrideable options
    Shuffle.options = {
        group: ALL_ITEMS, // Initial filter group.
        speed: 250, // Transition/animation speed (milliseconds).
        easing: 'ease-out', // CSS easing function to use.
        itemSelector: '', // e.g. '.picture-item'.
        sizer: null, // Sizer element. Use an element to determine the size of columns and gutters.
        gutterWidth: 0, // A static number or function that tells the plugin how wide the gutters between columns are (in pixels).
        columnWidth: 0, // A static number or function that returns a number which tells the plugin how wide the columns are (in pixels).
        delimeter: null, // If your group is not json, and is comma delimeted, you could set delimeter to ','.
        buffer: 0, // Useful for percentage based heights when they might not always be exactly the same (in pixels).
        columnThreshold: HAS_COMPUTED_STYLE ? 0.01 : 0.1, // Reading the width of elements isn't precise enough and can cause columns to jump between values.
        initialSort: null, // Shuffle can be initialized with a sort object. It is the same object given to the sort method.
        throttle: throttle, // By default, shuffle will throttle resize events. This can be changed or removed.
        throttleTime: 300, // How often shuffle can be called on resize (in milliseconds).
        sequentialFadeDelay: 150, // Delay between each item that fades in when adding items.
        supported: CAN_TRANSITION_TRANSFORMS // Whether to use transforms or absolute positioning.
    };


    // Not overrideable
    Shuffle.settings = {
        useSizer: false,
        itemCss: { // default CSS for each item
            position: 'absolute',
            top: 0,
            left: 0,
            visibility: 'visible'
        },
        revealAppendedDelay: 300,
        lastSort: {},
        lastFilter: ALL_ITEMS,
        enabled: true,
        destroyed: false,
        initialized: false,
        _animations: [],
        _transitions: [],
        _isMovementCanceled: false,
        styleQueue: []
    };


    // Expose for testing.
    Shuffle.Point = Point;


    /**
     * Static methods.
     */

    /**
     * If the browser has 3d transforms available, build a string with those,
     * otherwise use 2d transforms.
     * @param {Point} point X and Y positions.
     * @param {number} scale Scale amount.
     * @return {string} A normalized string which can be used with the transform style.
     * @private
     */
    Shuffle._getItemTransformString = function (point, scale) {
        if (HAS_TRANSFORMS_3D) {
            //console.log("B - main.js");
            return 'translate3d(' + point.x + 'px, ' + point.y + 'px, 0) scale3d(' + scale + ', ' + scale + ', 1)';
        } else {
            return 'translate(' + point.x + 'px, ' + point.y + 'px) scale(' + scale + ')';
        }
    };


    /**
     * Retrieve the computed style for an element, parsed as a float.
     * @param {Element} element Element to get style for.
     * @param {string} style Style property.
     * @param {CSSStyleDeclaration} [styles] Optionally include clean styles to
     *     use instead of asking for them again.
     * @return {number} The parsed computed value or zero if that fails because IE
     *     will return 'auto' when the element doesn't have margins instead of
     *     the computed style.
     * @private
     */
    Shuffle._getNumberStyle = function (element, style, styles) {
        if (HAS_COMPUTED_STYLE) {
            styles = styles || getStyles(element, null);
            var value = Shuffle._getFloat(styles[style]);

            // Support IE<=11 and W3C spec.
            if (!COMPUTED_SIZE_INCLUDES_PADDING && style === 'width') {
                value += Shuffle._getFloat(styles.paddingLeft) +
                    Shuffle._getFloat(styles.paddingRight) +
                    Shuffle._getFloat(styles.borderLeftWidth) +
                    Shuffle._getFloat(styles.borderRightWidth);
            } else if (!COMPUTED_SIZE_INCLUDES_PADDING && style === 'height') {
                value += Shuffle._getFloat(styles.paddingTop) +
                    Shuffle._getFloat(styles.paddingBottom) +
                    Shuffle._getFloat(styles.borderTopWidth) +
                    Shuffle._getFloat(styles.borderBottomWidth);
            }

            return value;
        } else {
            return Shuffle._getFloat($(element).css(style));
        }
    };


    /**
     * Parse a string as an float.
     * @param {string} value String float.
     * @return {number} The string as an float or zero.
     * @private
     */
    Shuffle._getFloat = function (value) {
        return getNumber(parseFloat(value));
    };


    /**
     * Returns the outer width of an element, optionally including its margins.
     *
     * There are a few different methods for getting the width of an element, none of
     * which work perfectly for all Shuffle's use cases.
     *
     * 1. getBoundingClientRect() `left` and `right` properties.
     *   - Accounts for transform scaled elements, making it useless for Shuffle
     *   elements which have shrunk.
     * 2. The `offsetWidth` property (or jQuery's CSS).
     *   - This value stays the same regardless of the elements transform property,
     *   however, it does not return subpixel values.
     * 3. getComputedStyle()
     *   - This works great Chrome, Firefox, Safari, but IE<=11 does not include
     *   padding and border when box-sizing: border-box is set, requiring a feature
     *   test and extra work to add the padding back for IE and other browsers which
     *   follow the W3C spec here.
     *
     * @param {Element} element The element.
     * @param {boolean} [includeMargins] Whether to include margins. Default is false.
     * @return {number} The width.
     */
    Shuffle._getOuterWidth = function (element, includeMargins) {
        // Store the styles so that they can be used by others without asking for it again.
        var styles = getStyles(element, null);
        var width = Shuffle._getNumberStyle(element, 'width', styles);

        // Use jQuery here because it uses getComputedStyle internally and is
        // cross-browser. Using the style property of the element will only work
        // if there are inline styles.
        if (includeMargins) {
            var marginLeft = Shuffle._getNumberStyle(element, 'marginLeft', styles);
            var marginRight = Shuffle._getNumberStyle(element, 'marginRight', styles);
            width += marginLeft + marginRight;
        }

        return width;
    };


    /**
     * Returns the outer height of an element, optionally including its margins.
     * @param {Element} element The element.
     * @param {boolean} [includeMargins] Whether to include margins. Default is false.
     * @return {number} The height.
     */
    Shuffle._getOuterHeight = function (element, includeMargins) {
        var styles = getStyles(element, null);
        var height = Shuffle._getNumberStyle(element, 'height', styles);

        if (includeMargins) {
            var marginTop = Shuffle._getNumberStyle(element, 'marginTop', styles);
            var marginBottom = Shuffle._getNumberStyle(element, 'marginBottom', styles);
            height += marginTop + marginBottom;
        }

        return height;
    };


    /**
     * Change a property or execute a function which will not have a transition
     * @param {Element} element DOM element that won't be transitioned
     * @param {Function} callback A function which will be called while transition
     *     is set to 0ms.
     * @param {Object} [context] Optional context for the callback function.
     * @private
     */
    Shuffle._skipTransition = function (element, callback, context) {
        var duration = element.style[TRANSITION_DURATION];

        // Set the duration to zero so it happens immediately
        element.style[TRANSITION_DURATION] = '0ms'; // ms needed for firefox!

        callback.call(context);

        // Force reflow
        var reflow = element.offsetWidth;
        // Avoid jshint warnings: unused variables and expressions.
        reflow = null;

        // Put the duration back
        element.style[TRANSITION_DURATION] = duration;
    };


    /**
     * Instance methods.
     */

    Shuffle.prototype._init = function () {
        this.$items = this._getItems();

        this.sizer = this._getElementOption(this.sizer);

        if (this.sizer) {
            this.useSizer = true;
        }

        // Add class and invalidate styles
        this.$el.addClass(Shuffle.ClassName.BASE);

        // Set initial css for each item
        this._initItems();

        // Bind resize events
        // http://stackoverflow.com/questions/1852751/window-resize-event-firing-in-internet-explorer
        $window.on('resize.' + SHUFFLE + '.' + this.unique, this._getResizeFunction());

        // Get container css all in one request. Causes reflow
        var containerCSS = this.$el.css(['position', 'overflow']);
        var containerWidth = Shuffle._getOuterWidth(this.element);

        // Add styles to the container if it doesn't have them.
        this._validateStyles(containerCSS);

        // We already got the container's width above, no need to cause another reflow getting it again...
        // Calculate the number of columns there will be
        this._setColumns(containerWidth);

        // Kick off!
        this.shuffle(this.group, this.initialSort);

        // The shuffle items haven't had transitions set on them yet
        // so the user doesn't see the first layout. Set them now that the first layout is done.
        if (this.supported) {
            defer(function () {
                this._setTransitions();
                this.element.style[TRANSITION] = 'height ' + this.speed + 'ms ' + this.easing;
            }, this);
        }
    };


    /**
     * Returns a throttled and proxied function for the resize handler.
     * @return {Function}
     * @private
     */
    Shuffle.prototype._getResizeFunction = function () {
        var resizeFunction = $.proxy(this._onResize, this);
        return this.throttle ?
            this.throttle(resizeFunction, this.throttleTime) :
            resizeFunction;
    };


    /**
     * Retrieve an element from an option.
     * @param {string|jQuery|Element} option The option to check.
     * @return {?Element} The plain element or null.
     * @private
     */
    Shuffle.prototype._getElementOption = function (option) {
        // If column width is a string, treat is as a selector and search for the
        // sizer element within the outermost container
        if (typeof option === 'string') {
            return this.$el.find(option)[0] || null;

            // Check for an element
        } else if (option && option.nodeType && option.nodeType === 1) {
            return option;

            // Check for jQuery object
        } else if (option && option.jquery) {
            return option[0];
        }

        return null;
    };


    /**
     * Ensures the shuffle container has the css styles it needs applied to it.
     * @param {Object} styles Key value pairs for position and overflow.
     * @private
     */
    Shuffle.prototype._validateStyles = function (styles) {
        // Position cannot be static.
        if (styles.position === 'static') {
            this.element.style.position = 'relative';
        }

        // Overflow has to be hidden
        if (styles.overflow !== 'hidden') {
            this.element.style.overflow = 'hidden';
        }
    };


    /**
     * Filter the elements by a category.
     * @param {string} [category] Category to filter by. If it's given, the last
     *     category will be used to filter the items.
     * @param {ArrayLike} [$collection] Optionally filter a collection. Defaults to
     *     all the items.
     * @return {jQuery} Filtered items.
     * @private
     */
    Shuffle.prototype._filter = function (category, $collection) {
        category = category || this.lastFilter;
        $collection = $collection || this.$items;

        var set = this._getFilteredSets(category, $collection);

        // Individually add/remove concealed/filtered classes
        this._toggleFilterClasses(set.filtered, set.concealed);

        // Save the last filter in case elements are appended.
        this.lastFilter = category;

        // This is saved mainly because providing a filter function (like searching)
        // will overwrite the `lastFilter` property every time its called.
        if (typeof category === 'string') {
            this.group = category;
        }

        return set.filtered;
    };


    /**
     * Returns an object containing the filtered and concealed elements.
     * @param {string|Function} category Category or function to filter by.
     * @param {ArrayLike.<Element>} $items A collection of items to filter.
     * @return {!{filtered: jQuery, concealed: jQuery}}
     * @private
     */
    Shuffle.prototype._getFilteredSets = function (category, $items) {
        var $filtered = $();
        var $concealed = $();

        // category === 'all', add filtered class to everything
        if (category === ALL_ITEMS) {
            $filtered = $items;

            // Loop through each item and use provided function to determine
            // whether to hide it or not.
        } else {
            each($items, function (el) {
                var $item = $(el);
                if (this._doesPassFilter(category, $item)) {
                    $filtered = $filtered.add($item);
                } else {
                    $concealed = $concealed.add($item);
                }
            }, this);
        }

        return {
            filtered: $filtered,
            concealed: $concealed
        };
    };


    /**
     * Test an item to see if it passes a category.
     * @param {string|Function} category Category or function to filter by.
     * @param {jQuery} $item A single item, wrapped with jQuery.
     * @return {boolean} Whether it passes the category/filter.
     * @private
     */
    Shuffle.prototype._doesPassFilter = function (category, $item) {
        if ($.isFunction(category)) {
            return category.call($item[0], $item, this);

            // Check each element's data-groups attribute against the given category.
        } else {
            var groups = $item.data(FILTER_ATTRIBUTE_KEY);
            var keys = this.delimeter && !$.isArray(groups) ?
                groups.split(this.delimeter) :
                groups;
            return $.inArray(category, keys) > -1;
        }
    };


    /**
     * Toggles the filtered and concealed class names.
     * @param {jQuery} $filtered Filtered set.
     * @param {jQuery} $concealed Concealed set.
     * @private
     */
    Shuffle.prototype._toggleFilterClasses = function ($filtered, $concealed) {
        $filtered
            .removeClass(Shuffle.ClassName.CONCEALED)
            .addClass(Shuffle.ClassName.FILTERED);
        $concealed
            .removeClass(Shuffle.ClassName.FILTERED)
            .addClass(Shuffle.ClassName.CONCEALED);
    };


    /**
     * Set the initial css for each item
     * @param {jQuery} [$items] Optionally specifiy at set to initialize
     */
    Shuffle.prototype._initItems = function ($items) {
        $items = $items || this.$items;
        $items.addClass([
            Shuffle.ClassName.SHUFFLE_ITEM,
            Shuffle.ClassName.FILTERED
        ].join(' '));
        $items.css(this.itemCss).data('point', new Point()).data('scale', DEFAULT_SCALE);
    };


    /**
     * Updates the filtered item count.
     * @private
     */
    Shuffle.prototype._updateItemCount = function () {
        this.visibleItems = this._getFilteredItems().length;
    };


    /**
     * Sets css transform transition on a an element.
     * @param {Element} element Element to set transition on.
     * @private
     */
    Shuffle.prototype._setTransition = function (element) {
        element.style[TRANSITION] = CSS_TRANSFORM + ' ' + this.speed + 'ms ' +
            this.easing + ', opacity ' + this.speed + 'ms ' + this.easing;
    };


    /**
     * Sets css transform transition on a group of elements.
     * @param {ArrayLike.<Element>} $items Elements to set transitions on.
     * @private
     */
    Shuffle.prototype._setTransitions = function ($items) {
        $items = $items || this.$items;
        each($items, function (el) {
            this._setTransition(el);
        }, this);
    };


    /**
     * Sets a transition delay on a collection of elements, making each delay
     * greater than the last.
     * @param {ArrayLike.<Element>} $collection Array to iterate over.
     */
    Shuffle.prototype._setSequentialDelay = function ($collection) {
        if (!this.supported) {
            return;
        }

        // $collection can be an array of dom elements or jquery object
        each($collection, function (el, i) {
            // This works because the transition-property: transform, opacity;
            el.style[TRANSITION_DELAY] = '0ms,' + ((i + 1) * this.sequentialFadeDelay) + 'ms';
        }, this);
    };


    Shuffle.prototype._getItems = function () {
        return this.$el.children(this.itemSelector);
    };


    Shuffle.prototype._getFilteredItems = function () {
        return this.$items.filter('.' + Shuffle.ClassName.FILTERED);
    };


    Shuffle.prototype._getConcealedItems = function () {
        return this.$items.filter('.' + Shuffle.ClassName.CONCEALED);
    };


    /**
     * Returns the column size, based on column width and sizer options.
     * @param {number} containerWidth Size of the parent container.
     * @param {number} gutterSize Size of the gutters.
     * @return {number}
     * @private
     */
    Shuffle.prototype._getColumnSize = function (containerWidth, gutterSize) {
        var size;

        // If the columnWidth property is a function, then the grid is fluid
        if ($.isFunction(this.columnWidth)) {
            size = this.columnWidth(containerWidth);

            // columnWidth option isn't a function, are they using a sizing element?
        } else if (this.useSizer) {
            size = Shuffle._getOuterWidth(this.sizer);

            // if not, how about the explicitly set option?
        } else if (this.columnWidth) {
            size = this.columnWidth;

            // or use the size of the first item
        } else if (this.$items.length > 0) {
            size = Shuffle._getOuterWidth(this.$items[0], true);

            // if there's no items, use size of container
        } else {
            size = containerWidth;
        }

        // Don't let them set a column width of zero.
        if (size === 0) {
            size = containerWidth;
        }

        return size + gutterSize;
    };


    /**
     * Returns the gutter size, based on gutter width and sizer options.
     * @param {number} containerWidth Size of the parent container.
     * @return {number}
     * @private
     */
    Shuffle.prototype._getGutterSize = function (containerWidth) {
        var size;
        if ($.isFunction(this.gutterWidth)) {
            size = this.gutterWidth(containerWidth);
        } else if (this.useSizer) {
            size = Shuffle._getNumberStyle(this.sizer, 'marginLeft');
        } else {
            size = this.gutterWidth;
        }

        return size;
    };


    /**
     * Calculate the number of columns to be used. Gets css if using sizer element.
     * @param {number} [theContainerWidth] Optionally specify a container width if it's already available.
     */
    Shuffle.prototype._setColumns = function (theContainerWidth) {
        var containerWidth = theContainerWidth || Shuffle._getOuterWidth(this.element);
        var gutter = this._getGutterSize(containerWidth);
        var columnWidth = this._getColumnSize(containerWidth, gutter);
        var calculatedColumns = (containerWidth + gutter) / columnWidth;

        // Widths given from getStyles are not precise enough...
        if (Math.abs(Math.round(calculatedColumns) - calculatedColumns) < this.columnThreshold) {
            // e.g. calculatedColumns = 11.998876
            calculatedColumns = Math.round(calculatedColumns);
        }

        this.cols = Math.max(Math.floor(calculatedColumns), 1);
        this.containerWidth = containerWidth;
        this.colWidth = columnWidth;
    };

    /**
     * Adjust the height of the grid
     */
    Shuffle.prototype._setContainerSize = function () {
        this.$el.css('height', this._getContainerSize());
    };


    /**
     * Based on the column heights, it returns the biggest one.
     * @return {number}
     * @private
     */
    Shuffle.prototype._getContainerSize = function () {
        return arrayMax(this.positions);
    };


    /**
     * Fire events with .shuffle namespace
     */
    Shuffle.prototype._fire = function (name, args) {
        this.$el.trigger(name + '.' + SHUFFLE, args && args.length ? args : [this]);
    };


    /**
     * Zeros out the y columns array, which is used to determine item placement.
     * @private
     */
    Shuffle.prototype._resetCols = function () {
        var i = this.cols;
        this.positions = [];
        while (i--) {
            this.positions.push(0);
        }
    };


    /**
     * Loops through each item that should be shown and calculates the x, y position.
     * @param {Array.<Element>} items Array of items that will be shown/layed out in order in their array.
     *     Because jQuery collection are always ordered in DOM order, we can't pass a jq collection.
     * @param {boolean} [isOnlyPosition=false] If true this will position the items with zero opacity.
     */
    Shuffle.prototype._layout = function (items, isOnlyPosition) {
        each(items, function (item) {
            this._layoutItem(item, !!isOnlyPosition);
        }, this);

        // `_layout` always happens after `_shrink`, so it's safe to process the style
        // queue here with styles from the shrink method.
        this._processStyleQueue();

        // Adjust the height of the container.
        this._setContainerSize();
    };


    /**
     * Calculates the position of the item and pushes it onto the style queue.
     * @param {Element} item Element which is being positioned.
     * @param {boolean} isOnlyPosition Whether to position the item, but with zero
     *     opacity so that it can fade in later.
     * @private
     */
    Shuffle.prototype._layoutItem = function (item, isOnlyPosition) {
        var $item = $(item);
        var itemData = $item.data();
        var currPos = itemData.point;
        var currScale = itemData.scale;
        var itemSize = {
            width: Shuffle._getOuterWidth(item, true),
            height: Shuffle._getOuterHeight(item, true)
        };
        var pos = this._getItemPosition(itemSize);

        // If the item will not change its position, do not add it to the render
        // queue. Transitions don't fire when setting a property to the same value.
        if (Point.equals(currPos, pos) && currScale === DEFAULT_SCALE) {
            return;
        }

        // Save data for shrink
        itemData.point = pos;
        itemData.scale = DEFAULT_SCALE;

        this.styleQueue.push({
            $item: $item,
            point: pos,
            scale: DEFAULT_SCALE,
            opacity: isOnlyPosition ? 0 : 1,
            // Set styles immediately if there is no transition speed.
            skipTransition: isOnlyPosition || this.speed === 0,
            callfront: function () {
                if (!isOnlyPosition) {
                    $item.css('visibility', 'visible');
                }
            },
            callback: function () {
                if (isOnlyPosition) {
                    $item.css('visibility', 'hidden');
                }
            }
        });
    };


    /**
     * Determine the location of the next item, based on its size.
     * @param {{width: number, height: number}} itemSize Object with width and height.
     * @return {Point}
     * @private
     */
    Shuffle.prototype._getItemPosition = function (itemSize) {
        var columnSpan = this._getColumnSpan(itemSize.width, this.colWidth, this.cols);

        var setY = this._getColumnSet(columnSpan, this.cols);

        // Finds the index of the smallest number in the set.
        var shortColumnIndex = this._getShortColumn(setY, this.buffer);

        // Position the item
        var point = new Point(
            Math.round(this.colWidth * shortColumnIndex),
            Math.round(setY[shortColumnIndex]));

        // Update the columns array with the new values for each column.
        // e.g. before the update the columns could be [250, 0, 0, 0] for an item
        // which spans 2 columns. After it would be [250, itemHeight, itemHeight, 0].
        var setHeight = setY[shortColumnIndex] + itemSize.height;
        var setSpan = this.cols + 1 - setY.length;
        for (var i = 0; i < setSpan; i++) {
            this.positions[shortColumnIndex + i] = setHeight;
        }

        return point;
    };


    /**
     * Determine the number of columns an items spans.
     * @param {number} itemWidth Width of the item.
     * @param {number} columnWidth Width of the column (includes gutter).
     * @param {number} columns Total number of columns
     * @return {number}
     * @private
     */
    Shuffle.prototype._getColumnSpan = function (itemWidth, columnWidth, columns) {
        var columnSpan = itemWidth / columnWidth;

        // If the difference between the rounded column span number and the
        // calculated column span number is really small, round the number to
        // make it fit.
        if (Math.abs(Math.round(columnSpan) - columnSpan) < this.columnThreshold) {
            // e.g. columnSpan = 4.0089945390298745
            columnSpan = Math.round(columnSpan);
        }

        // Ensure the column span is not more than the amount of columns in the whole layout.
        return Math.min(Math.ceil(columnSpan), columns);
    };


    /**
     * Retrieves the column set to use for placement.
     * @param {number} columnSpan The number of columns this current item spans.
     * @param {number} columns The total columns in the grid.
     * @return {Array.<number>} An array of numbers represeting the column set.
     * @private
     */
    Shuffle.prototype._getColumnSet = function (columnSpan, columns) {
        // The item spans only one column.
        if (columnSpan === 1) {
            return this.positions;

            // The item spans more than one column, figure out how many different
            // places it could fit horizontally.
            // The group count is the number of places within the positions this block
            // could fit, ignoring the current positions of items.
            // Imagine a 2 column brick as the second item in a 4 column grid with
            // 10px height each. Find the places it would fit:
            // [10, 0, 0, 0]
            //  |   |  |
            //  *   *  *
            //
            // Then take the places which fit and get the bigger of the two:
            // max([10, 0]), max([0, 0]), max([0, 0]) = [10, 0, 0]
            //
            // Next, find the first smallest number (the short column).
            // [10, 0, 0]
            //      |
            //      *
            //
            // And that's where it should be placed!
        } else {
            var groupCount = columns + 1 - columnSpan;
            var groupY = [];

            // For how many possible positions for this item there are.
            for (var i = 0; i < groupCount; i++) {
                // Find the bigger value for each place it could fit.
                groupY[i] = arrayMax(this.positions.slice(i, i + columnSpan));
            }

            return groupY;
        }
    };


    /**
     * Find index of short column, the first from the left where this item will go.
     *
     * @param {Array.<number>} positions The array to search for the smallest number.
     * @param {number} buffer Optional buffer which is very useful when the height
     *     is a percentage of the width.
     * @return {number} Index of the short column.
     * @private
     */
    Shuffle.prototype._getShortColumn = function (positions, buffer) {
        var minPosition = arrayMin(positions);
        for (var i = 0, len = positions.length; i < len; i++) {
            if (positions[i] >= minPosition - buffer && positions[i] <= minPosition + buffer) {
                return i;
            }
        }
        return 0;
    };


    /**
     * Hides the elements that don't match our filter.
     * @param {jQuery} $collection jQuery collection to shrink.
     * @private
     */
    Shuffle.prototype._shrink = function ($collection) {
        var $concealed = $collection || this._getConcealedItems();

        each($concealed, function (item) {
            var $item = $(item);
            var itemData = $item.data();

            // Continuing would add a transitionend event listener to the element, but
            // that listener would not execute because the transform and opacity would
            // stay the same.
            if (itemData.scale === CONCEALED_SCALE) {
                return;
            }

            itemData.scale = CONCEALED_SCALE;

            this.styleQueue.push({
                $item: $item,
                point: itemData.point,
                scale: CONCEALED_SCALE,
                opacity: 0,
                callback: function () {
                    $item.css('visibility', 'hidden');
                }
            });
        }, this);
    };


    /**
     * Resize handler.
     * @private
     */
    Shuffle.prototype._onResize = function () {
        // If shuffle is disabled, destroyed, don't do anything
        if (!this.enabled || this.destroyed) {
            return;
        }

        // Will need to check height in the future if it's layed out horizontaly
        var containerWidth = Shuffle._getOuterWidth(this.element);

        // containerWidth hasn't changed, don't do anything
        if (containerWidth === this.containerWidth) {
            return;
        }

        this.update();
    };


    /**
     * Returns styles for either jQuery animate or transition.
     * @param {Object} opts Transition options.
     * @return {!Object} Transforms for transitions, left/top for animate.
     * @private
     */
    Shuffle.prototype._getStylesForTransition = function (opts) {
        var styles = {
            opacity: opts.opacity
        };

        if (this.supported) {
            styles[TRANSFORM] = Shuffle._getItemTransformString(opts.point, opts.scale);
        } else {
            styles.left = opts.point.x;
            styles.top = opts.point.y;
        }

        return styles;
    };


    /**
     * Transitions an item in the grid
     *
     * @param {Object} opts options.
     * @param {jQuery} opts.$item jQuery object representing the current item.
     * @param {Point} opts.point A point object with the x and y coordinates.
     * @param {number} opts.scale Amount to scale the item.
     * @param {number} opts.opacity Opacity of the item.
     * @param {Function} opts.callback Complete function for the animation.
     * @param {Function} opts.callfront Function to call before transitioning.
     * @private
     */
    Shuffle.prototype._transition = function (opts) {
        var styles = this._getStylesForTransition(opts);
        this._startItemAnimation(opts.$item, styles, opts.callfront || $.noop, opts.callback || $.noop);
    };


    Shuffle.prototype._startItemAnimation = function ($item, styles, callfront, callback) {
        var _this = this;
        // Transition end handler removes its listener.
        function handleTransitionEnd(evt) {
            // Make sure this event handler has not bubbled up from a child.
            if (evt.target === evt.currentTarget) {
                $(evt.target).off(TRANSITIONEND, handleTransitionEnd);
                _this._removeTransitionReference(reference);
                callback();
            }
        }

        var reference = {
            $element: $item,
            handler: handleTransitionEnd
        };

        callfront();

        // Transitions are not set until shuffle has loaded to avoid the initial transition.
        if (!this.initialized) {
            $item.css(styles);
            callback();
            return;
        }

        // Use CSS Transforms if we have them
        if (this.supported) {
            $item.css(styles);
            $item.on(TRANSITIONEND, handleTransitionEnd);
            this._transitions.push(reference);

            // Use jQuery to animate left/top
        } else {
            // Save the deferred object which jQuery returns.
            var anim = $item.stop(true).animate(styles, this.speed, 'swing', callback);
            // Push the animation to the list of pending animations.
            this._animations.push(anim.promise());
        }
    };


    /**
     * Execute the styles gathered in the style queue. This applies styles to elements,
     * triggering transitions.
     * @param {boolean} noLayout Whether to trigger a layout event.
     * @private
     */
    Shuffle.prototype._processStyleQueue = function (noLayout) {
        if (this.isTransitioning) {
            this._cancelMovement();
        }

        var $transitions = $();

        // Iterate over the queue and keep track of ones that use transitions.
        each(this.styleQueue, function (transitionObj) {
            if (transitionObj.skipTransition) {
                this._styleImmediately(transitionObj);
            } else {
                $transitions = $transitions.add(transitionObj.$item);
                this._transition(transitionObj);
            }
        }, this);


        if ($transitions.length > 0 && this.initialized && this.speed > 0) {
            // Set flag that shuffle is currently in motion.
            this.isTransitioning = true;

            if (this.supported) {
                this._whenCollectionDone($transitions, TRANSITIONEND, this._movementFinished);

                // The _transition function appends a promise to the animations array.
                // When they're all complete, do things.
            } else {
                this._whenAnimationsDone(this._movementFinished);
            }

            // A call to layout happened, but none of the newly filtered items will
            // change position. Asynchronously fire the callback here.
        } else if (!noLayout) {
            defer(this._layoutEnd, this);
        }

        // Remove everything in the style queue
        this.styleQueue.length = 0;
    };

    Shuffle.prototype._cancelMovement = function () {
        if (this.supported) {
            // Remove the transition end event for each listener.
            each(this._transitions, function (transition) {
                transition.$element.off(TRANSITIONEND, transition.handler);
            });
        } else {
            // Even when `stop` is called on the jQuery animation, its promise will
            // still be resolved. Since it cannot be determine from within that callback
            // whether the animation was stopped or not, a flag is set here to distinguish
            // between the two states.
            this._isMovementCanceled = true;
            this.$items.stop(true);
            this._isMovementCanceled = false;
        }

        // Reset the array.
        this._transitions.length = 0;

        // Show it's no longer active.
        this.isTransitioning = false;
    };

    Shuffle.prototype._removeTransitionReference = function (ref) {
        var indexInArray = $.inArray(ref, this._transitions);
        if (indexInArray > -1) {
            this._transitions.splice(indexInArray, 1);
        }
    };


    /**
     * Apply styles without a transition.
     * @param {Object} opts Transitions options object.
     * @private
     */
    Shuffle.prototype._styleImmediately = function (opts) {
        Shuffle._skipTransition(opts.$item[0], function () {
            opts.$item.css(this._getStylesForTransition(opts));
        }, this);
    };

    Shuffle.prototype._movementFinished = function () {
        this.isTransitioning = false;
        this._layoutEnd();
    };

    Shuffle.prototype._layoutEnd = function () {
        this._fire(Shuffle.EventType.LAYOUT);
    };

    Shuffle.prototype._addItems = function ($newItems, addToEnd, isSequential) {
        // Add classes and set initial positions.
        this._initItems($newItems);

        // Add transition to each item.
        this._setTransitions($newItems);

        // Update the list of
        this.$items = this._getItems();

        // Shrink all items (without transitions).
        this._shrink($newItems);
        each(this.styleQueue, function (transitionObj) {
            transitionObj.skipTransition = true;
        });

        // Apply shrink positions, but do not cause a layout event.
        this._processStyleQueue(true);

        if (addToEnd) {
            this._addItemsToEnd($newItems, isSequential);
        } else {
            this.shuffle(this.lastFilter);
        }
    };


    Shuffle.prototype._addItemsToEnd = function ($newItems, isSequential) {
        // Get ones that passed the current filter
        var $passed = this._filter(null, $newItems);
        var passed = $passed.get();

        // How many filtered elements?
        this._updateItemCount();

        this._layout(passed, true);

        if (isSequential && this.supported) {
            this._setSequentialDelay(passed);
        }

        this._revealAppended(passed);
    };


    /**
     * Triggers appended elements to fade in.
     * @param {ArrayLike.<Element>} $newFilteredItems Collection of elements.
     * @private
     */
    Shuffle.prototype._revealAppended = function (newFilteredItems) {
        defer(function () {
            each(newFilteredItems, function (el) {
                var $item = $(el);
                this._transition({
                    $item: $item,
                    opacity: 1,
                    point: $item.data('point'),
                    scale: DEFAULT_SCALE
                });
            }, this);

            this._whenCollectionDone($(newFilteredItems), TRANSITIONEND, function () {
                $(newFilteredItems).css(TRANSITION_DELAY, '0ms');
                this._movementFinished();
            });
        }, this, this.revealAppendedDelay);
    };


    /**
     * Execute a function when an event has been triggered for every item in a collection.
     * @param {jQuery} $collection Collection of elements.
     * @param {string} eventName Event to listen for.
     * @param {Function} callback Callback to execute when they're done.
     * @private
     */
    Shuffle.prototype._whenCollectionDone = function ($collection, eventName, callback) {
        var done = 0;
        var items = $collection.length;
        var self = this;

        function handleEventName(evt) {
            if (evt.target === evt.currentTarget) {
                $(evt.target).off(eventName, handleEventName);
                done++;

                // Execute callback if all items have emitted the correct event.
                if (done === items) {
                    self._removeTransitionReference(reference);
                    callback.call(self);
                }
            }
        }

        var reference = {
            $element: $collection,
            handler: handleEventName
        };

        // Bind the event to all items.
        $collection.on(eventName, handleEventName);

        // Keep track of transitionend events so they can be removed.
        this._transitions.push(reference);
    };


    /**
     * Execute a callback after jQuery `animate` for a collection has finished.
     * @param {Function} callback Callback to execute when they're done.
     * @private
     */
    Shuffle.prototype._whenAnimationsDone = function (callback) {
        $.when.apply(null, this._animations).always($.proxy(function () {
            this._animations.length = 0;
            if (!this._isMovementCanceled) {
                callback.call(this);
            }
        }, this));
    };


    /**
     * Public Methods
     */

    /**
     * The magic. This is what makes the plugin 'shuffle'
     * @param {string|Function} [category] Category to filter by. Can be a function
     * @param {Object} [sortObj] A sort object which can sort the filtered set
     */
    Shuffle.prototype.shuffle = function (category, sortObj) {
        if (!this.enabled) {
            return;
        }

        if (!category) {
            category = ALL_ITEMS;
        }

        this._filter(category);

        // How many filtered elements?
        this._updateItemCount();

        // Shrink each concealed item
        this._shrink();

        // Update transforms on .filtered elements so they will animate to their new positions
        this.sort(sortObj);
    };


    /**
     * Gets the .filtered elements, sorts them, and passes them to layout.
     * @param {Object} opts the options object for the sorted plugin
     */
    Shuffle.prototype.sort = function (opts) {
        if (this.enabled) {
            this._resetCols();

            var sortOptions = opts || this.lastSort;
            var items = this._getFilteredItems().sorted(sortOptions);

            this._layout(items);

            this.lastSort = sortOptions;
        }
    };


    /**
     * Reposition everything.
     * @param {boolean} isOnlyLayout If true, column and gutter widths won't be
     *     recalculated.
     */
    Shuffle.prototype.update = function (isOnlyLayout) {
        if (this.enabled) {

            if (!isOnlyLayout) {
                // Get updated colCount
                this._setColumns();
            }

            // Layout items
            this.sort();
        }
    };


    /**
     * Use this instead of `update()` if you don't need the columns and gutters updated
     * Maybe an image inside `shuffle` loaded (and now has a height), which means calculations
     * could be off.
     */
    Shuffle.prototype.layout = function () {
        this.update(true);
    };


    /**
     * New items have been appended to shuffle. Fade them in sequentially
     * @param {jQuery} $newItems jQuery collection of new items
     * @param {boolean} [addToEnd=false] If true, new items will be added to the end / bottom
     *     of the items. If not true, items will be mixed in with the current sort order.
     * @param {boolean} [isSequential=true] If false, new items won't sequentially fade in
     */
    Shuffle.prototype.appended = function ($newItems, addToEnd, isSequential) {
        this._addItems($newItems, addToEnd === true, isSequential !== false);
    };


    /**
     * Disables shuffle from updating dimensions and layout on resize
     */
    Shuffle.prototype.disable = function () {
        this.enabled = false;
    };


    /**
     * Enables shuffle again
     * @param {boolean} [isUpdateLayout=true] if undefined, shuffle will update columns and gutters
     */
    Shuffle.prototype.enable = function (isUpdateLayout) {
        this.enabled = true;
        if (isUpdateLayout !== false) {
            this.update();
        }
    };


    /**
     * Remove 1 or more shuffle items
     * @param {jQuery} $collection A jQuery object containing one or more element in shuffle
     * @return {Shuffle} The shuffle object
     */
    Shuffle.prototype.remove = function ($collection) {

        // If this isn't a jquery object, exit
        if (!$collection.length || !$collection.jquery) {
            return;
        }

        function handleRemoved() {
            // Remove the collection in the callback
            $collection.remove();

            // Update things now that elements have been removed.
            this.$items = this._getItems();
            this._updateItemCount();

            this._fire(Shuffle.EventType.REMOVED, [$collection, this]);

            // Let it get garbage collected
            $collection = null;
        }

        // Hide collection first.
        this._toggleFilterClasses($(), $collection);
        this._shrink($collection);

        this.sort();

        this.$el.one(Shuffle.EventType.LAYOUT + '.' + SHUFFLE, $.proxy(handleRemoved, this));
    };


    /**
     * Destroys shuffle, removes events, styles, and classes
     */
    Shuffle.prototype.destroy = function () {
        // If there is more than one shuffle instance on the page,
        // removing the resize handler from the window would remove them
        // all. This is why a unique value is needed.
        $window.off('.' + this.unique);

        // Reset container styles
        this.$el
            .removeClass(SHUFFLE)
            .removeAttr('style')
            .removeData(SHUFFLE);

        // Reset individual item styles
        this.$items
            .removeAttr('style')
            .removeData('point')
            .removeData('scale')
            .removeClass([
                Shuffle.ClassName.CONCEALED,
                Shuffle.ClassName.FILTERED,
                Shuffle.ClassName.SHUFFLE_ITEM
            ].join(' '));

        // Null DOM references
        this.$items = null;
        this.$el = null;
        this.sizer = null;
        this.element = null;
        this._transitions = null;

        // Set a flag so if a debounced resize has been triggered,
        // it can first check if it is actually destroyed and not doing anything
        this.destroyed = true;
    };


    // Plugin definition
    $.fn.shuffle = function (opts) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var $this = $(this);
            var shuffle = $this.data(SHUFFLE);

            // If we don't have a stored shuffle, make a new one and save it
            if (!shuffle) {
                shuffle = new Shuffle(this, opts);
                $this.data(SHUFFLE, shuffle);
            } else if (typeof opts === 'string' && shuffle[opts]) {
                shuffle[opts].apply(shuffle, args);
            }
        });
    };


    // http://stackoverflow.com/a/962890/373422
    function randomize(array) {
        var tmp, current;
        var top = array.length;

        if (!top) {
            return array;
        }

        while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }

        return array;
    }


    // You can return `undefined` from the `by` function to revert to DOM order
    // This plugin does NOT return a jQuery object. It returns a plain array because
    // jQuery sorts everything in DOM order.
    $.fn.sorted = function (options) {
        var opts = $.extend({}, $.fn.sorted.defaults, options);
        var arr = this.get();
        var revert = false;

        if (!arr.length) {
            return [];
        }

        if (opts.randomize) {
            return randomize(arr);
        }

        // Sort the elements by the opts.by function.
        // If we don't have opts.by, default to DOM order
        if ($.isFunction(opts.by)) {
            arr.sort(function (a, b) {

                // Exit early if we already know we want to revert
                if (revert) {
                    return 0;
                }

                var valA = opts.by($(a));
                var valB = opts.by($(b));

                // If both values are undefined, use the DOM order
                if (valA === undefined && valB === undefined) {
                    revert = true;
                    return 0;
                }

                if (valA < valB || valA === 'sortFirst' || valB === 'sortLast') {
                    return -1;
                }

                if (valA > valB || valA === 'sortLast' || valB === 'sortFirst') {
                    return 1;
                }

                return 0;
            });
        }

        // Revert to the original array if necessary
        if (revert) {
            return this.get();
        }

        if (opts.reverse) {
            arr.reverse();
        }

        return arr;
    };


    $.fn.sorted.defaults = {
        reverse: false, // Use array.reverse() to reverse the results
        by: null, // Sorting function
        randomize: false // If true, this will skip the sorting and return a randomized order in the array
    };

    return Shuffle;

});

/*!

/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Forked by Spencer Mefford
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Fork Home:
 *   https://github.com/spencermefford/jquery_lazyload
 *
 * Original Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.0 (forked)
 *
 */

(function ($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function (options) {
        var elements = this;
        var $container;
        var settings = {
            threshold: 0,
            failure_limit: 0,
            event: "scroll",
            effect: "show",
            container: window,
            data_attribute: "original",
            skip_invisible: true,
            appear: null,
            load: null,
            error: null,
            complete: null,
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;

            elements.each(function () {
                var $this = $(this);

                //if ($this.parent().parent().hasClass('filtered')) {

                if (settings.skip_invisible && !$this.is(":visible")) {


                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                    /* Nothing. */


                } else if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) {
                    $this.trigger("appear");
                    /* if we found an image we'll load, reset the counter */
                    counter = 0;


                } else {
                    if (++counter > settings.failure_limit) {

                        return false;
                    }
                }
                //};
            });

        }

        if (options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
            settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function () {
                return update();
            });
        }

        this.each(function () {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                $self.attr("src", settings.placeholder);
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function () {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function () {
                            var original = $self.data(settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            elements = elements.not(self);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }

                            if (settings.complete && elements.length === 0) {
                                settings.complete.call();
                            }
                        })
                        .bind("error", function () {
                            /* Remove image from array so it is not looped next time. */
                            elements = elements.not(self);
                            var elements_left = elements.length;

                            if (settings.complete && elements_left === 0) {
                                settings.complete.call();
                            }

                            if (settings.error) {
                                settings.error.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.data(settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function () {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function () {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/iphone|ipod|ipad.*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function (event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function () {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function () {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function (element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function (element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function (element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold + $(element).height();
    };

    $.leftofbegin = function (element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function (element, settings) {
        return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
            !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold": function (a) { return $.belowthefold(a, { threshold: 0 }); },
        "above-the-top": function (a) { return !$.belowthefold(a, { threshold: 0 }); },
        "right-of-screen": function (a) { return $.rightoffold(a, { threshold: 0 }); },
        "left-of-screen": function (a) { return !$.rightoffold(a, { threshold: 0 }); },
        "in-viewport": function (a) { return $.inviewport(a, { threshold: 0 }); },
        /* Maintain BC for couple of versions. */
        "above-the-fold": function (a) { return !$.belowthefold(a, { threshold: 0 }); },
        "right-of-fold": function (a) { return $.rightoffold(a, { threshold: 0 }); },
        "left-of-fold": function (a) { return !$.rightoffold(a, { threshold: 0 }); }
    });

})(jQuery, window, document);

/*!
 * pickadate.js v3.5.6, 2015/04/20
 * By Amsul, http://amsul.ca
 * Hosted on http://amsul.github.io/pickadate.js
 * Licensed under MIT
 */

(function (factory) {

    // AMD.
    if (typeof define == 'function' && define.amd)
        define('picker', ['jquery'], factory)

    // Node.js/browserify.
    else if (typeof exports == 'object')
        module.exports = factory(require('jquery'))

    // Browser globals.
    else this.Picker = factory(jQuery)

}(function ($) {

    var $window = $(window)
    var $document = $(document)
    var $html = $(document.documentElement)
    var supportsTransitions = document.documentElement.style.transition != null


    /**
     * The picker constructor that creates a blank picker.
     */
    function PickerConstructor(ELEMENT, NAME, COMPONENT, OPTIONS) {

        // If there�s no element, return the picker constructor.
        if (!ELEMENT) return PickerConstructor


        var
            IS_DEFAULT_THEME = false,


            // The state of the picker.
            STATE = {
                id: ELEMENT.id || 'P' + Math.abs(~~(Math.random() * new Date()))
            },


            // Merge the defaults and options passed.
            SETTINGS = COMPONENT ? $.extend(true, {}, COMPONENT.defaults, OPTIONS) : OPTIONS || {},


            // Merge the default classes with the settings classes.
            CLASSES = $.extend({}, PickerConstructor.klasses(), SETTINGS.klass),


            // The element node wrapper into a jQuery object.
            $ELEMENT = $(ELEMENT),


            // Pseudo picker constructor.
            PickerInstance = function () {
                return this.start()
            },


            // The picker prototype.
            P = PickerInstance.prototype = {

                constructor: PickerInstance,

                $node: $ELEMENT,


                /**
                 * Initialize everything
                 */
                start: function () {

                    // If it�s already started, do nothing.
                    if (STATE && STATE.start) return P


                    // Update the picker states.
                    STATE.methods = {}
                    STATE.start = true
                    STATE.open = false
                    STATE.type = ELEMENT.type


                    // Confirm focus state, convert into text input to remove UA stylings,
                    // and set as readonly to prevent keyboard popup.
                    ELEMENT.autofocus = ELEMENT == getActiveElement()
                    ELEMENT.readOnly = !SETTINGS.editable
                    ELEMENT.id = ELEMENT.id || STATE.id
                    if (ELEMENT.type != 'text') {
                        ELEMENT.type = 'text'
                    }


                    // Create a new picker component with the settings.
                    P.component = new COMPONENT(P, SETTINGS)


                    // Create the picker root and then prepare it.
                    P.$root = $('<div class="' + CLASSES.picker + '" id="' + ELEMENT.id + '_root" />')
                    prepareElementRoot()


                    // Create the picker holder and then prepare it.
                    P.$holder = $(createWrappedComponent()).appendTo(P.$root)
                    prepareElementHolder()


                    // If there�s a format for the hidden input element, create the element.
                    if (SETTINGS.formatSubmit) {
                        prepareElementHidden()
                    }


                    // Prepare the input element.
                    prepareElement()


                    // Insert the hidden input as specified in the settings.
                    if (SETTINGS.containerHidden) $(SETTINGS.containerHidden).append(P._hidden)
                    else $ELEMENT.after(P._hidden)


                    // Insert the root as specified in the settings.
                    if (SETTINGS.container) $(SETTINGS.container).append(P.$root)
                    else $ELEMENT.after(P.$root)


                    // Bind the default component and settings events.
                    P.on({
                        start: P.component.onStart,
                        render: P.component.onRender,
                        stop: P.component.onStop,
                        open: P.component.onOpen,
                        close: P.component.onClose,
                        set: P.component.onSet
                    }).on({
                        start: SETTINGS.onStart,
                        render: SETTINGS.onRender,
                        stop: SETTINGS.onStop,
                        open: SETTINGS.onOpen,
                        close: SETTINGS.onClose,
                        set: SETTINGS.onSet
                    })


                    // Once we�re all set, check the theme in use.
                    IS_DEFAULT_THEME = isUsingDefaultTheme(P.$holder[0])


                    // If the element has autofocus, open the picker.
                    if (ELEMENT.autofocus) {
                        P.open()
                    }


                    // Trigger queued the �start� and �render� events.
                    return P.trigger('start').trigger('render')
                }, //start


                /**
                 * Render a new picker
                 */
                render: function (entireComponent) {

                    // Insert a new component holder in the root or box.
                    if (entireComponent) {
                        P.$holder = $(createWrappedComponent())
                        prepareElementHolder()
                        P.$root.html(P.$holder)
                    }
                    else P.$root.find('.' + CLASSES.box).html(P.component.nodes(STATE.open))

                    // Trigger the queued �render� events.
                    return P.trigger('render')
                }, //render


                /**
                 * Destroy everything
                 */
                stop: function () {

                    // If it�s already stopped, do nothing.
                    if (!STATE.start) return P

                    // Then close the picker.
                    P.close()

                    // Remove the hidden field.
                    if (P._hidden) {
                        P._hidden.parentNode.removeChild(P._hidden)
                    }

                    // Remove the root.
                    P.$root.remove()

                    // Remove the input class, remove the stored data, and unbind
                    // the events (after a tick for IE - see `P.close`).
                    $ELEMENT.removeClass(CLASSES.input).removeData(NAME)
                    setTimeout(function () {
                        $ELEMENT.off('.' + STATE.id)
                    }, 0)

                    // Restore the element state
                    ELEMENT.type = STATE.type
                    ELEMENT.readOnly = false

                    // Trigger the queued �stop� events.
                    P.trigger('stop')

                    // Reset the picker states.
                    STATE.methods = {}
                    STATE.start = false

                    return P
                }, //stop


                /**
                 * Open up the picker
                 */
                open: function (dontGiveFocus) {

                    // If it�s already open, do nothing.
                    if (STATE.open) return P

                    // Add the �active� class.
                    $ELEMENT.addClass(CLASSES.active)
                    aria(ELEMENT, 'expanded', true)

                    // * A Firefox bug, when `html` has `overflow:hidden`, results in
                    //   killing transitions :(. So add the �opened� state on the next tick.
                    //   Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=625289
                    setTimeout(function () {

                        // Add the �opened� class to the picker root.
                        P.$root.addClass(CLASSES.opened)
                        aria(P.$root[0], 'hidden', false)

                    }, 0)

                    // If we have to give focus, bind the element and doc events.
                    if (dontGiveFocus !== false) {

                        // Set it as open.
                        STATE.open = true

                        // Prevent the page from scrolling.
                        if (IS_DEFAULT_THEME) {
                            $html.
                                css('overflow', 'hidden').
                                css('padding-right', '+=' + getScrollbarWidth())
                        }

                        // Pass focus to the root element�s jQuery object.
                        focusPickerOnceOpened()

                        // Bind the document events.
                        $document.on('click.' + STATE.id + ' focusin.' + STATE.id, function (event) {

                            var target = event.target

                            // If the target of the event is not the element, close the picker picker.
                            // * Don�t worry about clicks or focusins on the root because those don�t bubble up.
                            //   Also, for Firefox, a click on an `option` element bubbles up directly
                            //   to the doc. So make sure the target wasn't the doc.
                            // * In Firefox stopPropagation() doesn�t prevent right-click events from bubbling,
                            //   which causes the picker to unexpectedly close when right-clicking it. So make
                            //   sure the event wasn�t a right-click.
                            if (target != ELEMENT && target != document && event.which != 3) {

                                // If the target was the holder that covers the screen,
                                // keep the element focused to maintain tabindex.
                                P.close(target === P.$holder[0])
                            }

                        }).on('keydown.' + STATE.id, function (event) {

                            var
                                // Get the keycode.
                                keycode = event.keyCode,

                                // Translate that to a selection change.
                                keycodeToMove = P.component.key[keycode],

                                // Grab the target.
                                target = event.target


                            // On escape, close the picker and give focus.
                            if (keycode == 27) {
                                P.close(true)
                            }


                            // Check if there is a key movement or �enter� keypress on the element.
                            else if (target == P.$holder[0] && (keycodeToMove || keycode == 13)) {

                                // Prevent the default action to stop page movement.
                                event.preventDefault()

                                // Trigger the key movement action.
                                if (keycodeToMove) {
                                    PickerConstructor._.trigger(P.component.key.go, P, [PickerConstructor._.trigger(keycodeToMove)])
                                }

                                // On �enter�, if the highlighted item isn�t disabled, set the value and close.
                                else if (!P.$root.find('.' + CLASSES.highlighted).hasClass(CLASSES.disabled)) {
                                    P.set('select', P.component.item.highlight)
                                    if (SETTINGS.closeOnSelect) {
                                        P.close(true)
                                    }
                                }
                            }


                            // If the target is within the root and �enter� is pressed,
                            // prevent the default action and trigger a click on the target instead.
                            else if ($.contains(P.$root[0], target) && keycode == 13) {
                                event.preventDefault()
                                target.click()
                            }
                        })
                    }

                    // Trigger the queued �open� events.
                    return P.trigger('open')
                }, //open


                /**
                 * Close the picker
                 */
                close: function (giveFocus) {

                    // If we need to give focus, do it before changing states.
                    if (giveFocus) {
                        if (SETTINGS.editable) {
                            ELEMENT.focus()
                        }
                        else {
                            // ....ah yes! It would�ve been incomplete without a crazy workaround for IE :|
                            // The focus is triggered *after* the close has completed - causing it
                            // to open again. So unbind and rebind the event at the next tick.
                            P.$holder.off('focus.toOpen').focus()
                            setTimeout(function () {
                                P.$holder.on('focus.toOpen', handleFocusToOpenEvent)
                            }, 0)
                        }
                    }

                    // Remove the �active� class.
                    $ELEMENT.removeClass(CLASSES.active)
                    aria(ELEMENT, 'expanded', false)

                    // * A Firefox bug, when `html` has `overflow:hidden`, results in
                    //   killing transitions :(. So remove the �opened� state on the next tick.
                    //   Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=625289
                    setTimeout(function () {

                        // Remove the �opened� and �focused� class from the picker root.
                        P.$root.removeClass(CLASSES.opened + ' ' + CLASSES.focused)
                        aria(P.$root[0], 'hidden', true)

                    }, 0)

                    // If it�s already closed, do nothing more.
                    if (!STATE.open) return P

                    // Set it as closed.
                    STATE.open = false

                    // Allow the page to scroll.
                    if (IS_DEFAULT_THEME) {
                        $html.
                            css('overflow', '').
                            css('padding-right', '-=' + getScrollbarWidth())
                    }

                    // Unbind the document events.
                    $document.off('.' + STATE.id)

                    // Trigger the queued �close� events.
                    return P.trigger('close')
                }, //close


                /**
                 * Clear the values
                 */
                clear: function (options) {
                    return P.set('clear', null, options)
                }, //clear


                /**
                 * Set something
                 */
                set: function (thing, value, options) {

                    var thingItem, thingValue,
                        thingIsObject = $.isPlainObject(thing),
                        thingObject = thingIsObject ? thing : {}

                    // Make sure we have usable options.
                    options = thingIsObject && $.isPlainObject(value) ? value : options || {}

                    if (thing) {

                        // If the thing isn�t an object, make it one.
                        if (!thingIsObject) {
                            thingObject[thing] = value
                        }

                        // Go through the things of items to set.
                        for (thingItem in thingObject) {

                            // Grab the value of the thing.
                            thingValue = thingObject[thingItem]

                            // First, if the item exists and there�s a value, set it.
                            if (thingItem in P.component.item) {
                                if (thingValue === undefined) thingValue = null
                                P.component.set(thingItem, thingValue, options)
                            }

                            // Then, check to update the element value and broadcast a change.
                            if (thingItem == 'select' || thingItem == 'clear') {
                                $ELEMENT.
                                    val(thingItem == 'clear' ? '' : P.get(thingItem, SETTINGS.format)).
                                    trigger('change')
                            }
                        }

                        // Render a new picker.
                        P.render()
                    }

                    // When the method isn�t muted, trigger queued �set� events and pass the `thingObject`.
                    return options.muted ? P : P.trigger('set', thingObject)
                }, //set


                /**
                 * Get something
                 */
                get: function (thing, format) {

                    // Make sure there�s something to get.
                    thing = thing || 'value'

                    // If a picker state exists, return that.
                    if (STATE[thing] != null) {
                        return STATE[thing]
                    }

                    // Return the submission value, if that.
                    if (thing == 'valueSubmit') {
                        if (P._hidden) {
                            return P._hidden.value
                        }
                        thing = 'value'
                    }

                    // Return the value, if that.
                    if (thing == 'value') {
                        return ELEMENT.value
                    }

                    // Check if a component item exists, return that.
                    if (thing in P.component.item) {
                        if (typeof format == 'string') {
                            var thingValue = P.component.get(thing)
                            return thingValue ?
                                PickerConstructor._.trigger(
                                    P.component.formats.toString,
                                    P.component,
                                    [format, thingValue]
                                ) : ''
                        }
                        return P.component.get(thing)
                    }
                }, //get



                /**
                 * Bind events on the things.
                 */
                on: function (thing, method, internal) {

                    var thingName, thingMethod,
                        thingIsObject = $.isPlainObject(thing),
                        thingObject = thingIsObject ? thing : {}

                    if (thing) {

                        // If the thing isn�t an object, make it one.
                        if (!thingIsObject) {
                            thingObject[thing] = method
                        }

                        // Go through the things to bind to.
                        for (thingName in thingObject) {

                            // Grab the method of the thing.
                            thingMethod = thingObject[thingName]

                            // If it was an internal binding, prefix it.
                            if (internal) {
                                thingName = '_' + thingName
                            }

                            // Make sure the thing methods collection exists.
                            STATE.methods[thingName] = STATE.methods[thingName] || []

                            // Add the method to the relative method collection.
                            STATE.methods[thingName].push(thingMethod)
                        }
                    }

                    return P
                }, //on



                /**
                 * Unbind events on the things.
                 */
                off: function () {
                    var i, thingName,
                        names = arguments;
                    for (i = 0, namesCount = names.length; i < namesCount; i += 1) {
                        thingName = names[i]
                        if (thingName in STATE.methods) {
                            delete STATE.methods[thingName]
                        }
                    }
                    return P
                },


                /**
                 * Fire off method events.
                 */
                trigger: function (name, data) {
                    var _trigger = function (name) {
                        var methodList = STATE.methods[name]
                        if (methodList) {
                            methodList.map(function (method) {
                                PickerConstructor._.trigger(method, P, [data])
                            })
                        }
                    }
                    _trigger('_' + name)
                    _trigger(name)
                    return P
                } //trigger
            } //PickerInstance.prototype


        /**
         * Wrap the picker holder components together.
         */
        function createWrappedComponent() {

            // Create a picker wrapper holder
            return PickerConstructor._.node('div',

                // Create a picker wrapper node
                PickerConstructor._.node('div',

                    // Create a picker frame
                    PickerConstructor._.node('div',

                        // Create a picker box node
                        PickerConstructor._.node('div',

                            // Create the components nodes.
                            P.component.nodes(STATE.open),

                            // The picker box class
                            CLASSES.box
                        ),

                        // Picker wrap class
                        CLASSES.wrap
                    ),

                    // Picker frame class
                    CLASSES.frame
                ),

                // Picker holder class
                CLASSES.holder,

                'tabindex="-1"'
            ) //endreturn
        } //createWrappedComponent



        /**
         * Prepare the input element with all bindings.
         */
        function prepareElement() {

            $ELEMENT.

                // Store the picker data by component name.
                data(NAME, P).

                // Add the �input� class name.
                addClass(CLASSES.input).

                // If there�s a `data-value`, update the value of the element.
                val($ELEMENT.data('value') ?
                    P.get('select', SETTINGS.format) :
                    ELEMENT.value
                )


            // Only bind keydown events if the element isn�t editable.
            if (!SETTINGS.editable) {

                $ELEMENT.

                    // On focus/click, open the picker.
                    on('focus.' + STATE.id + ' click.' + STATE.id, function (event) {
                        event.preventDefault()
                        P.open()
                    }).

                    // Handle keyboard event based on the picker being opened or not.
                    on('keydown.' + STATE.id, handleKeydownEvent)
            }


            // Update the aria attributes.
            aria(ELEMENT, {
                haspopup: true,
                expanded: false,
                readonly: false,
                owns: ELEMENT.id + '_root'
            })
        }


        /**
         * Prepare the root picker element with all bindings.
         */
        function prepareElementRoot() {
            aria(P.$root[0], 'hidden', true)
        }


        /**
         * Prepare the holder picker element with all bindings.
         */
        function prepareElementHolder() {

            P.$holder.

                on({

                    // For iOS8.
                    keydown: handleKeydownEvent,

                    'focus.toOpen': handleFocusToOpenEvent,

                    blur: function () {
                        // Remove the �target� class.
                        $ELEMENT.removeClass(CLASSES.target)
                    },

                    // When something within the holder is focused, stop from bubbling
                    // to the doc and remove the �focused� state from the root.
                    focusin: function (event) {
                        P.$root.removeClass(CLASSES.focused)
                        event.stopPropagation()
                    },

                    // When something within the holder is clicked, stop it
                    // from bubbling to the doc.
                    'mousedown click': function (event) {

                        var target = event.target

                        // Make sure the target isn�t the root holder so it can bubble up.
                        if (target != P.$holder[0]) {

                            event.stopPropagation()

                            // * For mousedown events, cancel the default action in order to
                            //   prevent cases where focus is shifted onto external elements
                            //   when using things like jQuery mobile or MagnificPopup (ref: #249 & #120).
                            //   Also, for Firefox, don�t prevent action on the `option` element.
                            if (event.type == 'mousedown' && !$(target).is('input, select, textarea, button, option')) {

                                event.preventDefault()

                                // Re-focus onto the holder so that users can click away
                                // from elements focused within the picker.
                                P.$holder[0].focus()
                            }
                        }
                    }

                }).

                // If there�s a click on an actionable element, carry out the actions.
                on('click', '[data-pick], [data-nav], [data-clear], [data-close]', function () {

                    var $target = $(this),
                        targetData = $target.data(),
                        targetDisabled = $target.hasClass(CLASSES.navDisabled) || $target.hasClass(CLASSES.disabled),

                        // * For IE, non-focusable elements can be active elements as well
                        //   (http://stackoverflow.com/a/2684561).
                        activeElement = getActiveElement()
                    activeElement = activeElement && (activeElement.type || activeElement.href)

                    // If it�s disabled or nothing inside is actively focused, re-focus the element.
                    if (targetDisabled || activeElement && !$.contains(P.$root[0], activeElement)) {
                        P.$holder[0].focus()
                    }

                    // If something is superficially changed, update the `highlight` based on the `nav`.
                    if (!targetDisabled && targetData.nav) {
                        P.set('highlight', P.component.item.highlight, { nav: targetData.nav })
                    }

                    // If something is picked, set `select` then close with focus.
                    else if (!targetDisabled && 'pick' in targetData) {
                        P.set('select', targetData.pick)
                        if (SETTINGS.closeOnSelect) {
                            P.close(true)
                        }
                    }

                    // If a �clear� button is pressed, empty the values and close with focus.
                    else if (targetData.clear) {
                        P.clear()
                        if (SETTINGS.closeOnClear) {
                            P.close(true)
                        }
                    }

                    else if (targetData.close) {
                        P.close(true)
                    }

                }) //P.$holder

        }


        /**
         * Prepare the hidden input element along with all bindings.
         */
        function prepareElementHidden() {

            var name

            if (SETTINGS.hiddenName === true) {
                name = ELEMENT.name
                ELEMENT.name = ''
            }
            else {
                name = [
                    typeof SETTINGS.hiddenPrefix == 'string' ? SETTINGS.hiddenPrefix : '',
                    typeof SETTINGS.hiddenSuffix == 'string' ? SETTINGS.hiddenSuffix : '_submit'
                ]
                name = name[0] + ELEMENT.name + name[1]
            }

            P._hidden = $(
                '<input ' +
                'type=hidden ' +

                // Create the name using the original input�s with a prefix and suffix.
                'name="' + name + '"' +

                // If the element has a value, set the hidden value as well.
                (
                    $ELEMENT.data('value') || ELEMENT.value ?
                        ' value="' + P.get('select', SETTINGS.formatSubmit) + '"' :
                        ''
                ) +
                '>'
            )[0]

            $ELEMENT.

                // If the value changes, update the hidden input with the correct format.
                on('change.' + STATE.id, function () {
                    P._hidden.value = ELEMENT.value ?
                        P.get('select', SETTINGS.formatSubmit) :
                        ''
                })
        }


        // Wait for transitions to end before focusing the holder. Otherwise, while
        // using the `container` option, the view jumps to the container.
        function focusPickerOnceOpened() {

            if (IS_DEFAULT_THEME && supportsTransitions) {
                P.$holder.find('.' + CLASSES.frame).one('transitionend', function () {
                    P.$holder[0].focus()
                })
            }
            else {
                P.$holder[0].focus()
            }
        }


        function handleFocusToOpenEvent(event) {

            // Stop the event from propagating to the doc.
            event.stopPropagation()

            // Add the �target� class.
            $ELEMENT.addClass(CLASSES.target)

            // Add the �focused� class to the root.
            P.$root.addClass(CLASSES.focused)

            // And then finally open the picker.
            P.open()
        }


        // For iOS8.
        function handleKeydownEvent(event) {

            var keycode = event.keyCode,

                // Check if one of the delete keys was pressed.
                isKeycodeDelete = /^(8|46)$/.test(keycode)

            // For some reason IE clears the input value on �escape�.
            if (keycode == 27) {
                P.close(true)
                return false
            }

            // Check if `space` or `delete` was pressed or the picker is closed with a key movement.
            if (keycode == 32 || isKeycodeDelete || !STATE.open && P.component.key[keycode]) {

                // Prevent it from moving the page and bubbling to doc.
                event.preventDefault()
                event.stopPropagation()

                // If `delete` was pressed, clear the values and close the picker.
                // Otherwise open the picker.
                if (isKeycodeDelete) { P.clear().close() }
                else { P.open() }
            }
        }


        // Return a new picker instance.
        return new PickerInstance()
    } //PickerConstructor



    /**
     * The default classes and prefix to use for the HTML classes.
     */
    PickerConstructor.klasses = function (prefix) {
        prefix = prefix || 'picker'
        return {

            picker: prefix,
            opened: prefix + '--opened',
            focused: prefix + '--focused',

            input: prefix + '__input',
            active: prefix + '__input--active',
            target: prefix + '__input--target',

            holder: prefix + '__holder',

            frame: prefix + '__frame',
            wrap: prefix + '__wrap',

            box: prefix + '__box'
        }
    } //PickerConstructor.klasses



    /**
     * Check if the default theme is being used.
     */
    function isUsingDefaultTheme(element) {

        var theme,
            prop = 'position'

        // For IE.
        if (element.currentStyle) {
            theme = element.currentStyle[prop]
        }

        // For normal browsers.
        else if (window.getComputedStyle) {
            theme = getComputedStyle(element)[prop]
        }

        return theme == 'fixed'
    }



    /**
     * Get the width of the browser�s scrollbar.
     * Taken from: https://github.com/VodkaBears/Remodal/blob/master/src/jquery.remodal.js
     */
    function getScrollbarWidth() {

        if ($html.height() <= $window.height()) {
            return 0
        }

        var $outer = $('<div style="visibility:hidden;width:100px" />').
            appendTo('body')

        // Get the width without scrollbars.
        var widthWithoutScroll = $outer[0].offsetWidth

        // Force adding scrollbars.
        $outer.css('overflow', 'scroll')

        // Add the inner div.
        var $inner = $('<div style="width:100%" />').appendTo($outer)

        // Get the width with scrollbars.
        var widthWithScroll = $inner[0].offsetWidth

        // Remove the divs.
        $outer.remove()

        // Return the difference between the widths.
        return widthWithoutScroll - widthWithScroll
    }



    /**
     * PickerConstructor helper methods.
     */
    PickerConstructor._ = {

        /**
         * Create a group of nodes. Expects:
         * `
            {
                min:    {Integer},
                max:    {Integer},
                i:      {Integer},
                node:   {String},
                item:   {Function}
            }
         * `
         */
        group: function (groupObject) {

            var
                // Scope for the looped object
                loopObjectScope,

                // Create the nodes list
                nodesList = '',

                // The counter starts from the `min`
                counter = PickerConstructor._.trigger(groupObject.min, groupObject)


            // Loop from the `min` to `max`, incrementing by `i`
            for (; counter <= PickerConstructor._.trigger(groupObject.max, groupObject, [counter]); counter += groupObject.i) {

                // Trigger the `item` function within scope of the object
                loopObjectScope = PickerConstructor._.trigger(groupObject.item, groupObject, [counter])

                // Splice the subgroup and create nodes out of the sub nodes
                nodesList += PickerConstructor._.node(
                    groupObject.node,
                    loopObjectScope[0],   // the node
                    loopObjectScope[1],   // the classes
                    loopObjectScope[2]    // the attributes
                )
            }

            // Return the list of nodes
            return nodesList
        }, //group


        /**
         * Create a dom node string
         */
        node: function (wrapper, item, klass, attribute) {

            // If the item is false-y, just return an empty string
            if (!item) return ''

            // If the item is an array, do a join
            item = $.isArray(item) ? item.join('') : item

            // Check for the class
            klass = klass ? ' class="' + klass + '"' : ''

            // Check for any attributes
            attribute = attribute ? ' ' + attribute : ''

            // Return the wrapped item
            return '<' + wrapper + klass + attribute + '>' + item + '</' + wrapper + '>'
        }, //node


        /**
         * Lead numbers below 10 with a zero.
         */
        lead: function (number) {
            return (number < 10 ? '0' : '') + number
        },


        /**
         * Trigger a function otherwise return the value.
         */
        trigger: function (callback, scope, args) {
            return typeof callback == 'function' ? callback.apply(scope, args || []) : callback
        },


        /**
         * If the second character is a digit, length is 2 otherwise 1.
         */
        digits: function (string) {
            return (/\d/).test(string[1]) ? 2 : 1
        },


        /**
         * Tell if something is a date object.
         */
        isDate: function (value) {
            return {}.toString.call(value).indexOf('Date') > -1 && this.isInteger(value.getDate())
        },


        /**
         * Tell if something is an integer.
         */
        isInteger: function (value) {
            return {}.toString.call(value).indexOf('Number') > -1 && value % 1 === 0
        },


        /**
         * Create ARIA attribute strings.
         */
        ariaAttr: ariaAttr
    } //PickerConstructor._



    /**
     * Extend the picker with a component and defaults.
     */
    PickerConstructor.extend = function (name, Component) {

        // Extend jQuery.
        $.fn[name] = function (options, action) {

            // Grab the component data.
            var componentData = this.data(name)

            // If the picker is requested, return the data object.
            if (options == 'picker') {
                return componentData
            }

            // If the component data exists and `options` is a string, carry out the action.
            if (componentData && typeof options == 'string') {
                return PickerConstructor._.trigger(componentData[options], componentData, [action])
            }

            // Otherwise go through each matched element and if the component
            // doesn�t exist, create a new picker using `this` element
            // and merging the defaults and options with a deep copy.
            return this.each(function () {
                var $this = $(this)
                if (!$this.data(name)) {
                    new PickerConstructor(this, name, Component, options)
                }
            })
        }

        // Set the defaults.
        $.fn[name].defaults = Component.defaults
    } //PickerConstructor.extend



    function aria(element, attribute, value) {
        if ($.isPlainObject(attribute)) {
            for (var key in attribute) {
                ariaSet(element, key, attribute[key])
            }
        }
        else {
            ariaSet(element, attribute, value)
        }
    }
    function ariaSet(element, attribute, value) {
        element.setAttribute(
            (attribute == 'role' ? '' : 'aria-') + attribute,
            value
        )
    }
    function ariaAttr(attribute, data) {
        if (!$.isPlainObject(attribute)) {
            attribute = { attribute: data }
        }
        data = ''
        for (var key in attribute) {
            var attr = (key == 'role' ? '' : 'aria-') + key,
                attrVal = attribute[key]
            data += attrVal == null ? '' : attr + '="' + attribute[key] + '"'
        }
        return data
    }

    // IE8 bug throws an error for activeElements within iframes.
    function getActiveElement() {
        try {
            return document.activeElement
        } catch (err) { }
    }



    // Expose the picker constructor.
    return PickerConstructor


}));




/*!
 * Date picker for pickadate.js v3.5.6
 * http://amsul.github.io/pickadate.js/date.htm
 */

(function (factory) {

    // AMD.
    if (typeof define == 'function' && define.amd)
        define(['picker', 'jquery'], factory)

    // Node.js/browserify.
    else if (typeof exports == 'object')
        module.exports = factory(require('./picker.js'), require('jquery'))

    // Browser globals.
    else factory(Picker, jQuery)

}(function (Picker, $) {


    /**
     * Globals and constants
     */
    var DAYS_IN_WEEK = 7,
        WEEKS_IN_CALENDAR = 6,
        _ = Picker._



    /**
     * The date picker constructor
     */
    function DatePicker(picker, settings) {

        var calendar = this,
            element = picker.$node[0],
            elementValue = element.value,
            elementDataValue = picker.$node.data('value'),
            valueString = elementDataValue || elementValue,
            formatString = elementDataValue ? settings.formatSubmit : settings.format,
            isRTL = function () {

                return element.currentStyle ?

                    // For IE.
                    element.currentStyle.direction == 'rtl' :

                    // For normal browsers.
                    getComputedStyle(picker.$root[0]).direction == 'rtl'
            }

        calendar.settings = settings
        calendar.$node = picker.$node

        // The queue of methods that will be used to build item objects.
        calendar.queue = {
            min: 'measure create',
            max: 'measure create',
            now: 'now create',
            select: 'parse create validate',
            highlight: 'parse navigate create validate',
            view: 'parse create validate viewset',
            disable: 'deactivate',
            enable: 'activate'
        }

        // The component's item object.
        calendar.item = {}

        calendar.item.clear = null
        calendar.item.disable = (settings.disable || []).slice(0)
        calendar.item.enable = -(function (collectionDisabled) {
            return collectionDisabled[0] === true ? collectionDisabled.shift() : -1
        })(calendar.item.disable)

        calendar.
            set('min', settings.min).
            set('max', settings.max).
            set('now')

        // When there�s a value, set the `select`, which in turn
        // also sets the `highlight` and `view`.
        if (valueString) {
            calendar.set('select', valueString, {
                format: formatString,
                defaultValue: true
            })
        }

        // If there�s no value, default to highlighting �today�.
        else {
            calendar.
                set('select', null).
                set('highlight', calendar.item.now)
        }


        // The keycode to movement mapping.
        calendar.key = {
            40: 7, // Down
            38: -7, // Up
            39: function () { return isRTL() ? -1 : 1 }, // Right
            37: function () { return isRTL() ? 1 : -1 }, // Left
            go: function (timeChange) {
                var highlightedObject = calendar.item.highlight,
                    targetDate = new Date(highlightedObject.year, highlightedObject.month, highlightedObject.date + timeChange)
                calendar.set(
                    'highlight',
                    targetDate,
                    { interval: timeChange }
                )
                this.render()
            }
        }


        // Bind some picker events.
        picker.
            on('render', function () {
                picker.$root.find('.' + settings.klass.selectMonth).on('change', function () {
                    var value = this.value
                    if (value) {
                        picker.set('highlight', [picker.get('view').year, value, picker.get('highlight').date])
                        picker.$root.find('.' + settings.klass.selectMonth).trigger('focus')
                    }
                })
                picker.$root.find('.' + settings.klass.selectYear).on('change', function () {
                    var value = this.value
                    if (value) {
                        picker.set('highlight', [value, picker.get('view').month, picker.get('highlight').date])
                        picker.$root.find('.' + settings.klass.selectYear).trigger('focus')
                    }
                })
            }, 1).
            on('open', function () {
                var includeToday = ''
                if (calendar.disabled(calendar.get('now'))) {
                    includeToday = ':not(.' + settings.klass.buttonToday + ')'
                }
                picker.$root.find('button' + includeToday + ', select').attr('disabled', false)
            }, 1).
            on('close', function () {
                picker.$root.find('button, select').attr('disabled', true)
            }, 1)

    } //DatePicker


    /**
     * Set a datepicker item object.
     */
    DatePicker.prototype.set = function (type, value, options) {

        var calendar = this,
            calendarItem = calendar.item

        // If the value is `null` just set it immediately.
        if (value === null) {
            if (type == 'clear') type = 'select'
            calendarItem[type] = value
            return calendar
        }

        // Otherwise go through the queue of methods, and invoke the functions.
        // Update this as the time unit, and set the final value as this item.
        // * In the case of `enable`, keep the queue but set `disable` instead.
        //   And in the case of `flip`, keep the queue but set `enable` instead.
        calendarItem[(type == 'enable' ? 'disable' : type == 'flip' ? 'enable' : type)] = calendar.queue[type].split(' ').map(function (method) {
            value = calendar[method](type, value, options)
            return value
        }).pop()

        // Check if we need to cascade through more updates.
        if (type == 'select') {
            calendar.set('highlight', calendarItem.select, options)
        }
        else if (type == 'highlight') {
            calendar.set('view', calendarItem.highlight, options)
        }
        else if (type.match(/^(flip|min|max|disable|enable)$/)) {
            if (calendarItem.select && calendar.disabled(calendarItem.select)) {
                calendar.set('select', calendarItem.select, options)
            }
            if (calendarItem.highlight && calendar.disabled(calendarItem.highlight)) {
                calendar.set('highlight', calendarItem.highlight, options)
            }
        }

        return calendar
    } //DatePicker.prototype.set


    /**
     * Get a datepicker item object.
     */
    DatePicker.prototype.get = function (type) {
        return this.item[type]
    } //DatePicker.prototype.get


    /**
     * Create a picker date object.
     */
    DatePicker.prototype.create = function (type, value, options) {

        var isInfiniteValue,
            calendar = this

        // If there�s no value, use the type as the value.
        value = value === undefined ? type : value


        // If it�s infinity, update the value.
        if (value == -Infinity || value == Infinity) {
            isInfiniteValue = value
        }

        // If it�s an object, use the native date object.
        else if ($.isPlainObject(value) && _.isInteger(value.pick)) {
            value = value.obj
        }

        // If it�s an array, convert it into a date and make sure
        // that it�s a valid date � otherwise default to today.
        else if ($.isArray(value)) {
            value = new Date(value[0], value[1], value[2])
            value = _.isDate(value) ? value : calendar.create().obj
        }

        // If it�s a number or date object, make a normalized date.
        else if (_.isInteger(value) || _.isDate(value)) {
            value = calendar.normalize(new Date(value), options)
        }

        // If it�s a literal true or any other case, set it to now.
        else /*if ( value === true )*/ {
            value = calendar.now(type, value, options)
        }

        // Return the compiled object.
        return {
            year: isInfiniteValue || value.getFullYear(),
            month: isInfiniteValue || value.getMonth(),
            date: isInfiniteValue || value.getDate(),
            day: isInfiniteValue || value.getDay(),
            obj: isInfiniteValue || value,
            pick: isInfiniteValue || value.getTime()
        }
    } //DatePicker.prototype.create


    /**
     * Create a range limit object using an array, date object,
     * literal �true�, or integer relative to another time.
     */
    DatePicker.prototype.createRange = function (from, to) {

        var calendar = this,
            createDate = function (date) {
                if (date === true || $.isArray(date) || _.isDate(date)) {
                    return calendar.create(date)
                }
                return date
            }

        // Create objects if possible.
        if (!_.isInteger(from)) {
            from = createDate(from)
        }
        if (!_.isInteger(to)) {
            to = createDate(to)
        }

        // Create relative dates.
        if (_.isInteger(from) && $.isPlainObject(to)) {
            from = [to.year, to.month, to.date + from];
        }
        else if (_.isInteger(to) && $.isPlainObject(from)) {
            to = [from.year, from.month, from.date + to];
        }

        return {
            from: createDate(from),
            to: createDate(to)
        }
    } //DatePicker.prototype.createRange


    /**
     * Check if a date unit falls within a date range object.
     */
    DatePicker.prototype.withinRange = function (range, dateUnit) {
        range = this.createRange(range.from, range.to)
        return dateUnit.pick >= range.from.pick && dateUnit.pick <= range.to.pick
    }


    /**
     * Check if two date range objects overlap.
     */
    DatePicker.prototype.overlapRanges = function (one, two) {

        var calendar = this

        // Convert the ranges into comparable dates.
        one = calendar.createRange(one.from, one.to)
        two = calendar.createRange(two.from, two.to)

        return calendar.withinRange(one, two.from) || calendar.withinRange(one, two.to) ||
            calendar.withinRange(two, one.from) || calendar.withinRange(two, one.to)
    }


    /**
     * Get the date today.
     */
    DatePicker.prototype.now = function (type, value, options) {
        value = new Date()
        if (options && options.rel) {
            value.setDate(value.getDate() + options.rel)
        }
        return this.normalize(value, options)
    }


    /**
     * Navigate to next/prev month.
     */
    DatePicker.prototype.navigate = function (type, value, options) {

        var targetDateObject,
            targetYear,
            targetMonth,
            targetDate,
            isTargetArray = $.isArray(value),
            isTargetObject = $.isPlainObject(value),
            viewsetObject = this.item.view/*,
        safety = 100*/


        if (isTargetArray || isTargetObject) {

            if (isTargetObject) {
                targetYear = value.year
                targetMonth = value.month
                targetDate = value.date
            }
            else {
                targetYear = +value[0]
                targetMonth = +value[1]
                targetDate = +value[2]
            }

            // If we�re navigating months but the view is in a different
            // month, navigate to the view�s year and month.
            if (options && options.nav && viewsetObject && viewsetObject.month !== targetMonth) {
                targetYear = viewsetObject.year
                targetMonth = viewsetObject.month
            }

            // Figure out the expected target year and month.
            targetDateObject = new Date(targetYear, targetMonth + (options && options.nav ? options.nav : 0), 1)
            targetYear = targetDateObject.getFullYear()
            targetMonth = targetDateObject.getMonth()

            // If the month we�re going to doesn�t have enough days,
            // keep decreasing the date until we reach the month�s last date.
            while ( /*safety &&*/ new Date(targetYear, targetMonth, targetDate).getMonth() !== targetMonth) {
                targetDate -= 1
                /*safety -= 1
                if ( !safety ) {
                    throw 'Fell into an infinite loop while navigating to ' + new Date( targetYear, targetMonth, targetDate ) + '.'
                }*/
            }

            value = [targetYear, targetMonth, targetDate]
        }

        return value
    } //DatePicker.prototype.navigate


    /**
     * Normalize a date by setting the hours to midnight.
     */
    DatePicker.prototype.normalize = function (value/*, options*/) {
        value.setHours(0, 0, 0, 0)
        return value
    }


    /**
     * Measure the range of dates.
     */
    DatePicker.prototype.measure = function (type, value/*, options*/) {

        var calendar = this

        // If it�s anything false-y, remove the limits.
        if (!value) {
            value = type == 'min' ? -Infinity : Infinity
        }

        // If it�s a string, parse it.
        else if (typeof value == 'string') {
            value = calendar.parse(type, value)
        }

        // If it's an integer, get a date relative to today.
        else if (_.isInteger(value)) {
            value = calendar.now(type, value, { rel: value })
        }

        return value
    } ///DatePicker.prototype.measure


    /**
     * Create a viewset object based on navigation.
     */
    DatePicker.prototype.viewset = function (type, dateObject/*, options*/) {
        return this.create([dateObject.year, dateObject.month, 1])
    }


    /**
     * Validate a date as enabled and shift if needed.
     */
    DatePicker.prototype.validate = function (type, dateObject, options) {

        var calendar = this,

            // Keep a reference to the original date.
            originalDateObject = dateObject,

            // Make sure we have an interval.
            interval = options && options.interval ? options.interval : 1,

            // Check if the calendar enabled dates are inverted.
            isFlippedBase = calendar.item.enable === -1,

            // Check if we have any enabled dates after/before now.
            hasEnabledBeforeTarget, hasEnabledAfterTarget,

            // The min & max limits.
            minLimitObject = calendar.item.min,
            maxLimitObject = calendar.item.max,

            // Check if we�ve reached the limit during shifting.
            reachedMin, reachedMax,

            // Check if the calendar is inverted and at least one weekday is enabled.
            hasEnabledWeekdays = isFlippedBase && calendar.item.disable.filter(function (value) {

                // If there�s a date, check where it is relative to the target.
                if ($.isArray(value)) {
                    var dateTime = calendar.create(value).pick
                    if (dateTime < dateObject.pick) hasEnabledBeforeTarget = true
                    else if (dateTime > dateObject.pick) hasEnabledAfterTarget = true
                }

                // Return only integers for enabled weekdays.
                return _.isInteger(value)
            }).length/*,

        safety = 100*/



        // Cases to validate for:
        // [1] Not inverted and date disabled.
        // [2] Inverted and some dates enabled.
        // [3] Not inverted and out of range.
        //
        // Cases to **not** validate for:
        // � Navigating months.
        // � Not inverted and date enabled.
        // � Inverted and all dates disabled.
        // � ..and anything else.
        if (!options || (!options.nav && !options.defaultValue)) if (
            /* 1 */ (!isFlippedBase && calendar.disabled(dateObject)) ||
            /* 2 */ (isFlippedBase && calendar.disabled(dateObject) && (hasEnabledWeekdays || hasEnabledBeforeTarget || hasEnabledAfterTarget)) ||
            /* 3 */ (!isFlippedBase && (dateObject.pick <= minLimitObject.pick || dateObject.pick >= maxLimitObject.pick))
        ) {


            // When inverted, flip the direction if there aren�t any enabled weekdays
            // and there are no enabled dates in the direction of the interval.
            if (isFlippedBase && !hasEnabledWeekdays && ((!hasEnabledAfterTarget && interval > 0) || (!hasEnabledBeforeTarget && interval < 0))) {
                interval *= -1
            }


            // Keep looping until we reach an enabled date.
            while ( /*safety &&*/ calendar.disabled(dateObject)) {

                /*safety -= 1
                if ( !safety ) {
                    throw 'Fell into an infinite loop while validating ' + dateObject.obj + '.'
                }*/


                // If we�ve looped into the next/prev month with a large interval, return to the original date and flatten the interval.
                if (Math.abs(interval) > 1 && (dateObject.month < originalDateObject.month || dateObject.month > originalDateObject.month)) {
                    dateObject = originalDateObject
                    interval = interval > 0 ? 1 : -1
                }


                // If we�ve reached the min/max limit, reverse the direction, flatten the interval and set it to the limit.
                if (dateObject.pick <= minLimitObject.pick) {
                    reachedMin = true
                    interval = 1
                    dateObject = calendar.create([
                        minLimitObject.year,
                        minLimitObject.month,
                        minLimitObject.date + (dateObject.pick === minLimitObject.pick ? 0 : -1)
                    ])
                }
                else if (dateObject.pick >= maxLimitObject.pick) {
                    reachedMax = true
                    interval = -1
                    dateObject = calendar.create([
                        maxLimitObject.year,
                        maxLimitObject.month,
                        maxLimitObject.date + (dateObject.pick === maxLimitObject.pick ? 0 : 1)
                    ])
                }


                // If we�ve reached both limits, just break out of the loop.
                if (reachedMin && reachedMax) {
                    break
                }


                // Finally, create the shifted date using the interval and keep looping.
                dateObject = calendar.create([dateObject.year, dateObject.month, dateObject.date + interval])
            }

        } //endif


        // Return the date object settled on.
        return dateObject
    } //DatePicker.prototype.validate


    /**
     * Check if a date is disabled.
     */
    DatePicker.prototype.disabled = function (dateToVerify) {

        var
            calendar = this,

            // Filter through the disabled dates to check if this is one.
            isDisabledMatch = calendar.item.disable.filter(function (dateToDisable) {

                // If the date is a number, match the weekday with 0index and `firstDay` check.
                if (_.isInteger(dateToDisable)) {
                    return dateToVerify.day === (calendar.settings.firstDay ? dateToDisable : dateToDisable - 1) % 7
                }

                // If it�s an array or a native JS date, create and match the exact date.
                if ($.isArray(dateToDisable) || _.isDate(dateToDisable)) {
                    return dateToVerify.pick === calendar.create(dateToDisable).pick
                }

                // If it�s an object, match a date within the �from� and �to� range.
                if ($.isPlainObject(dateToDisable)) {
                    return calendar.withinRange(dateToDisable, dateToVerify)
                }
            })

        // If this date matches a disabled date, confirm it�s not inverted.
        isDisabledMatch = isDisabledMatch.length && !isDisabledMatch.filter(function (dateToDisable) {
            return $.isArray(dateToDisable) && dateToDisable[3] == 'inverted' ||
                $.isPlainObject(dateToDisable) && dateToDisable.inverted
        }).length

        // Check the calendar �enabled� flag and respectively flip the
        // disabled state. Then also check if it�s beyond the min/max limits.
        return calendar.item.enable === -1 ? !isDisabledMatch : isDisabledMatch ||
            dateToVerify.pick < calendar.item.min.pick ||
            dateToVerify.pick > calendar.item.max.pick

    } //DatePicker.prototype.disabled


    /**
     * Parse a string into a usable type.
     */
    DatePicker.prototype.parse = function (type, value, options) {

        var calendar = this,
            parsingObject = {}

        // If it�s already parsed, we�re good.
        if (!value || typeof value != 'string') {
            return value
        }

        // We need a `.format` to parse the value with.
        if (!(options && options.format)) {
            options = options || {}
            options.format = calendar.settings.format
        }

        // Convert the format into an array and then map through it.
        calendar.formats.toArray(options.format).map(function (label) {

            var
                // Grab the formatting label.
                formattingLabel = calendar.formats[label],

                // The format length is from the formatting label function or the
                // label length without the escaping exclamation (!) mark.
                formatLength = formattingLabel ? _.trigger(formattingLabel, calendar, [value, parsingObject]) : label.replace(/^!/, '').length

            // If there's a format label, split the value up to the format length.
            // Then add it to the parsing object with appropriate label.
            if (formattingLabel) {
                parsingObject[label] = value.substr(0, formatLength)
            }

            // Update the value as the substring from format length to end.
            value = value.substr(formatLength)
        })

        // Compensate for month 0index.
        return [
            parsingObject.yyyy || parsingObject.yy,
            +(parsingObject.mm || parsingObject.m) - 1,
            parsingObject.dd || parsingObject.d
        ]
    } //DatePicker.prototype.parse


    /**
     * Various formats to display the object in.
     */
    DatePicker.prototype.formats = (function () {

        // Return the length of the first word in a collection.
        function getWordLengthFromCollection(string, collection, dateObject) {

            // Grab the first word from the string.
            // Regex pattern from http://stackoverflow.com/q/150033
            var word = string.match(/[^\x00-\x7F]+|\w+/)[0]

            // If there's no month index, add it to the date object
            if (!dateObject.mm && !dateObject.m) {
                dateObject.m = collection.indexOf(word) + 1
            }

            // Return the length of the word.
            return word.length
        }

        // Get the length of the first word in a string.
        function getFirstWordLength(string) {
            return string.match(/\w+/)[0].length
        }

        return {

            d: function (string, dateObject) {

                // If there's string, then get the digits length.
                // Otherwise return the selected date.
                return string ? _.digits(string) : dateObject.date
            },
            dd: function (string, dateObject) {

                // If there's a string, then the length is always 2.
                // Otherwise return the selected date with a leading zero.
                return string ? 2 : _.lead(dateObject.date)
            },
            ddd: function (string, dateObject) {

                // If there's a string, then get the length of the first word.
                // Otherwise return the short selected weekday.
                return string ? getFirstWordLength(string) : this.settings.weekdaysShort[dateObject.day]
            },
            dddd: function (string, dateObject) {

                // If there's a string, then get the length of the first word.
                // Otherwise return the full selected weekday.
                return string ? getFirstWordLength(string) : this.settings.weekdaysFull[dateObject.day]
            },
            m: function (string, dateObject) {

                // If there's a string, then get the length of the digits
                // Otherwise return the selected month with 0index compensation.
                return string ? _.digits(string) : dateObject.month + 1
            },
            mm: function (string, dateObject) {

                // If there's a string, then the length is always 2.
                // Otherwise return the selected month with 0index and leading zero.
                return string ? 2 : _.lead(dateObject.month + 1)
            },
            mmm: function (string, dateObject) {

                var collection = this.settings.monthsShort

                // If there's a string, get length of the relevant month from the short
                // months collection. Otherwise return the selected month from that collection.
                return string ? getWordLengthFromCollection(string, collection, dateObject) : collection[dateObject.month]
            },
            mmmm: function (string, dateObject) {

                var collection = this.settings.monthsFull

                // If there's a string, get length of the relevant month from the full
                // months collection. Otherwise return the selected month from that collection.
                return string ? getWordLengthFromCollection(string, collection, dateObject) : collection[dateObject.month]
            },
            yy: function (string, dateObject) {

                // If there's a string, then the length is always 2.
                // Otherwise return the selected year by slicing out the first 2 digits.
                return string ? 2 : ('' + dateObject.year).slice(2)
            },
            yyyy: function (string, dateObject) {

                // If there's a string, then the length is always 4.
                // Otherwise return the selected year.
                return string ? 4 : dateObject.year
            },

            // Create an array by splitting the formatting string passed.
            toArray: function (formatString) { return formatString.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g) },

            // Format an object into a string using the formatting options.
            toString: function (formatString, itemObject) {
                var calendar = this
                return calendar.formats.toArray(formatString).map(function (label) {
                    return _.trigger(calendar.formats[label], calendar, [0, itemObject]) || label.replace(/^!/, '')
                }).join('')
            }
        }
    })() //DatePicker.prototype.formats




    /**
     * Check if two date units are the exact.
     */
    DatePicker.prototype.isDateExact = function (one, two) {

        var calendar = this

        // When we�re working with weekdays, do a direct comparison.
        if (
            (_.isInteger(one) && _.isInteger(two)) ||
            (typeof one == 'boolean' && typeof two == 'boolean')
        ) {
            return one === two
        }

        // When we�re working with date representations, compare the �pick� value.
        if (
            (_.isDate(one) || $.isArray(one)) &&
            (_.isDate(two) || $.isArray(two))
        ) {
            return calendar.create(one).pick === calendar.create(two).pick
        }

        // When we�re working with range objects, compare the �from� and �to�.
        if ($.isPlainObject(one) && $.isPlainObject(two)) {
            return calendar.isDateExact(one.from, two.from) && calendar.isDateExact(one.to, two.to)
        }

        return false
    }


    /**
     * Check if two date units overlap.
     */
    DatePicker.prototype.isDateOverlap = function (one, two) {

        var calendar = this,
            firstDay = calendar.settings.firstDay ? 1 : 0

        // When we�re working with a weekday index, compare the days.
        if (_.isInteger(one) && (_.isDate(two) || $.isArray(two))) {
            one = one % 7 + firstDay
            return one === calendar.create(two).day + 1
        }
        if (_.isInteger(two) && (_.isDate(one) || $.isArray(one))) {
            two = two % 7 + firstDay
            return two === calendar.create(one).day + 1
        }

        // When we�re working with range objects, check if the ranges overlap.
        if ($.isPlainObject(one) && $.isPlainObject(two)) {
            return calendar.overlapRanges(one, two)
        }

        return false
    }


    /**
     * Flip the �enabled� state.
     */
    DatePicker.prototype.flipEnable = function (val) {
        var itemObject = this.item
        itemObject.enable = val || (itemObject.enable == -1 ? 1 : -1)
    }


    /**
     * Mark a collection of dates as �disabled�.
     */
    DatePicker.prototype.deactivate = function (type, datesToDisable) {

        var calendar = this,
            disabledItems = calendar.item.disable.slice(0)


        // If we�re flipping, that�s all we need to do.
        if (datesToDisable == 'flip') {
            calendar.flipEnable()
        }

        else if (datesToDisable === false) {
            calendar.flipEnable(1)
            disabledItems = []
        }

        else if (datesToDisable === true) {
            calendar.flipEnable(-1)
            disabledItems = []
        }

        // Otherwise go through the dates to disable.
        else {

            datesToDisable.map(function (unitToDisable) {

                var matchFound

                // When we have disabled items, check for matches.
                // If something is matched, immediately break out.
                for (var index = 0; index < disabledItems.length; index += 1) {
                    if (calendar.isDateExact(unitToDisable, disabledItems[index])) {
                        matchFound = true
                        break
                    }
                }

                // If nothing was found, add the validated unit to the collection.
                if (!matchFound) {
                    if (
                        _.isInteger(unitToDisable) ||
                        _.isDate(unitToDisable) ||
                        $.isArray(unitToDisable) ||
                        ($.isPlainObject(unitToDisable) && unitToDisable.from && unitToDisable.to)
                    ) {
                        disabledItems.push(unitToDisable)
                    }
                }
            })
        }

        // Return the updated collection.
        return disabledItems
    } //DatePicker.prototype.deactivate


    /**
     * Mark a collection of dates as �enabled�.
     */
    DatePicker.prototype.activate = function (type, datesToEnable) {

        var calendar = this,
            disabledItems = calendar.item.disable,
            disabledItemsCount = disabledItems.length

        // If we�re flipping, that�s all we need to do.
        if (datesToEnable == 'flip') {
            calendar.flipEnable()
        }

        else if (datesToEnable === true) {
            calendar.flipEnable(1)
            disabledItems = []
        }

        else if (datesToEnable === false) {
            calendar.flipEnable(-1)
            disabledItems = []
        }

        // Otherwise go through the disabled dates.
        else {

            datesToEnable.map(function (unitToEnable) {

                var matchFound,
                    disabledUnit,
                    index,
                    isExactRange

                // Go through the disabled items and try to find a match.
                for (index = 0; index < disabledItemsCount; index += 1) {

                    disabledUnit = disabledItems[index]

                    // When an exact match is found, remove it from the collection.
                    if (calendar.isDateExact(disabledUnit, unitToEnable)) {
                        matchFound = disabledItems[index] = null
                        isExactRange = true
                        break
                    }

                    // When an overlapped match is found, add the �inverted� state to it.
                    else if (calendar.isDateOverlap(disabledUnit, unitToEnable)) {
                        if ($.isPlainObject(unitToEnable)) {
                            unitToEnable.inverted = true
                            matchFound = unitToEnable
                        }
                        else if ($.isArray(unitToEnable)) {
                            matchFound = unitToEnable
                            if (!matchFound[3]) matchFound.push('inverted')
                        }
                        else if (_.isDate(unitToEnable)) {
                            matchFound = [unitToEnable.getFullYear(), unitToEnable.getMonth(), unitToEnable.getDate(), 'inverted']
                        }
                        break
                    }
                }

                // If a match was found, remove a previous duplicate entry.
                if (matchFound) for (index = 0; index < disabledItemsCount; index += 1) {
                    if (calendar.isDateExact(disabledItems[index], unitToEnable)) {
                        disabledItems[index] = null
                        break
                    }
                }

                // In the event that we�re dealing with an exact range of dates,
                // make sure there are no �inverted� dates because of it.
                if (isExactRange) for (index = 0; index < disabledItemsCount; index += 1) {
                    if (calendar.isDateOverlap(disabledItems[index], unitToEnable)) {
                        disabledItems[index] = null
                        break
                    }
                }

                // If something is still matched, add it into the collection.
                if (matchFound) {
                    disabledItems.push(matchFound)
                }
            })
        }

        // Return the updated collection.
        return disabledItems.filter(function (val) { return val != null })
    } //DatePicker.prototype.activate


    /**
     * Create a string for the nodes in the picker.
     */
    DatePicker.prototype.nodes = function (isOpen) {

        var
            calendar = this,
            settings = calendar.settings,
            calendarItem = calendar.item,
            nowObject = calendarItem.now,
            selectedObject = calendarItem.select,
            highlightedObject = calendarItem.highlight,
            viewsetObject = calendarItem.view,
            disabledCollection = calendarItem.disable,
            minLimitObject = calendarItem.min,
            maxLimitObject = calendarItem.max,


            // Create the calendar table head using a copy of weekday labels collection.
            // * We do a copy so we don't mutate the original array.
            tableHead = (function (collection, fullCollection) {

                // If the first day should be Monday, move Sunday to the end.
                if (settings.firstDay) {
                    collection.push(collection.shift())
                    fullCollection.push(fullCollection.shift())
                }

                // Create and return the table head group.
                return _.node(
                    'thead',
                    _.node(
                        'tr',
                        _.group({
                            min: 0,
                            max: DAYS_IN_WEEK - 1,
                            i: 1,
                            node: 'th',
                            item: function (counter) {
                                return [
                                    collection[counter],
                                    settings.klass.weekdays,
                                    'scope=col title="' + fullCollection[counter] + '"'
                                ]
                            }
                        })
                    )
                ) //endreturn
            })((settings.showWeekdaysFull ? settings.weekdaysFull : settings.weekdaysShort).slice(0), settings.weekdaysFull.slice(0)), //tableHead


            // Create the nav for next/prev month.
            createMonthNav = function (next) {

                // Otherwise, return the created month tag.
                return _.node(
                    'div',
                    ' ',
                    settings.klass['nav' + (next ? 'Next' : 'Prev')] + (

                        // If the focused month is outside the range, disabled the button.
                        (next && viewsetObject.year >= maxLimitObject.year && viewsetObject.month >= maxLimitObject.month) ||
                            (!next && viewsetObject.year <= minLimitObject.year && viewsetObject.month <= minLimitObject.month) ?
                            ' ' + settings.klass.navDisabled : ''
                    ),
                    'data-nav=' + (next || -1) + ' ' +
                    _.ariaAttr({
                        role: 'button',
                        controls: calendar.$node[0].id + '_table'
                    }) + ' ' +
                    'title="' + (next ? settings.labelMonthNext : settings.labelMonthPrev) + '"'
                ) //endreturn
            }, //createMonthNav


            // Create the month label.
            createMonthLabel = function () {

                var monthsCollection = settings.showMonthsShort ? settings.monthsShort : settings.monthsFull

                // If there are months to select, add a dropdown menu.
                if (settings.selectMonths) {

                    return _.node('select',
                        _.group({
                            min: 0,
                            max: 11,
                            i: 1,
                            node: 'option',
                            item: function (loopedMonth) {

                                return [

                                    // The looped month and no classes.
                                    monthsCollection[loopedMonth], 0,

                                    // Set the value and selected index.
                                    'value=' + loopedMonth +
                                    (viewsetObject.month == loopedMonth ? ' selected' : '') +
                                    (
                                        (
                                            (viewsetObject.year == minLimitObject.year && loopedMonth < minLimitObject.month) ||
                                            (viewsetObject.year == maxLimitObject.year && loopedMonth > maxLimitObject.month)
                                        ) ?
                                            ' disabled' : ''
                                    )
                                ]
                            }
                        }),
                        settings.klass.selectMonth,
                        (isOpen ? '' : 'disabled') + ' ' +
                        _.ariaAttr({ controls: calendar.$node[0].id + '_table' }) + ' ' +
                        'title="' + settings.labelMonthSelect + '"'
                    )
                }

                // If there's a need for a month selector
                return _.node('div', monthsCollection[viewsetObject.month], settings.klass.month)
            }, //createMonthLabel


            // Create the year label.
            createYearLabel = function () {

                var focusedYear = viewsetObject.year,

                    // If years selector is set to a literal "true", set it to 5. Otherwise
                    // divide in half to get half before and half after focused year.
                    numberYears = settings.selectYears === true ? 5 : ~~(settings.selectYears / 2)

                // If there are years to select, add a dropdown menu.
                if (numberYears) {

                    var
                        minYear = minLimitObject.year,
                        maxYear = maxLimitObject.year,
                        lowestYear = focusedYear - numberYears,
                        highestYear = focusedYear + numberYears

                    // If the min year is greater than the lowest year, increase the highest year
                    // by the difference and set the lowest year to the min year.
                    if (minYear > lowestYear) {
                        highestYear += minYear - lowestYear
                        lowestYear = minYear
                    }

                    // If the max year is less than the highest year, decrease the lowest year
                    // by the lower of the two: available and needed years. Then set the
                    // highest year to the max year.
                    if (maxYear < highestYear) {

                        var availableYears = lowestYear - minYear,
                            neededYears = highestYear - maxYear

                        lowestYear -= availableYears > neededYears ? neededYears : availableYears
                        highestYear = maxYear
                    }

                    return _.node('select',
                        _.group({
                            min: lowestYear,
                            max: highestYear,
                            i: 1,
                            node: 'option',
                            item: function (loopedYear) {
                                return [

                                    // The looped year and no classes.
                                    loopedYear, 0,

                                    // Set the value and selected index.
                                    'value=' + loopedYear + (focusedYear == loopedYear ? ' selected' : '')
                                ]
                            }
                        }),
                        settings.klass.selectYear,
                        (isOpen ? '' : 'disabled') + ' ' + _.ariaAttr({ controls: calendar.$node[0].id + '_table' }) + ' ' +
                        'title="' + settings.labelYearSelect + '"'
                    )
                }

                // Otherwise just return the year focused
                return _.node('div', focusedYear, settings.klass.year)
            } //createYearLabel


        // Create and return the entire calendar.
        return _.node(
            'div',
            (settings.selectYears ? createYearLabel() + createMonthLabel() : createMonthLabel() + createYearLabel()) +
            createMonthNav() + createMonthNav(1),
            settings.klass.header
        ) + _.node(
            'table',
            tableHead +
            _.node(
                'tbody',
                _.group({
                    min: 0,
                    max: WEEKS_IN_CALENDAR - 1,
                    i: 1,
                    node: 'tr',
                    item: function (rowCounter) {

                        // If Monday is the first day and the month starts on Sunday, shift the date back a week.
                        var shiftDateBy = settings.firstDay && calendar.create([viewsetObject.year, viewsetObject.month, 1]).day === 0 ? -7 : 0

                        return [
                            _.group({
                                min: DAYS_IN_WEEK * rowCounter - viewsetObject.day + shiftDateBy + 1, // Add 1 for weekday 0index
                                max: function () {
                                    return this.min + DAYS_IN_WEEK - 1
                                },
                                i: 1,
                                node: 'td',
                                item: function (targetDate) {

                                    // Convert the time date from a relative date to a target date.
                                    targetDate = calendar.create([viewsetObject.year, viewsetObject.month, targetDate + (settings.firstDay ? 1 : 0)])

                                    var isSelected = selectedObject && selectedObject.pick == targetDate.pick,
                                        isHighlighted = highlightedObject && highlightedObject.pick == targetDate.pick,
                                        isDisabled = disabledCollection && calendar.disabled(targetDate) || targetDate.pick < minLimitObject.pick || targetDate.pick > maxLimitObject.pick,
                                        formattedDate = _.trigger(calendar.formats.toString, calendar, [settings.format, targetDate])

                                    return [
                                        _.node(
                                            'div',
                                            targetDate.date,
                                            (function (klasses) {

                                                // Add the `infocus` or `outfocus` classes based on month in view.
                                                klasses.push(viewsetObject.month == targetDate.month ? settings.klass.infocus : settings.klass.outfocus)

                                                // Add the `today` class if needed.
                                                if (nowObject.pick == targetDate.pick) {
                                                    klasses.push(settings.klass.now)
                                                }

                                                // Add the `selected` class if something's selected and the time matches.
                                                if (isSelected) {
                                                    klasses.push(settings.klass.selected)
                                                }

                                                // Add the `highlighted` class if something's highlighted and the time matches.
                                                if (isHighlighted) {
                                                    klasses.push(settings.klass.highlighted)
                                                }

                                                // Add the `disabled` class if something's disabled and the object matches.
                                                if (isDisabled) {
                                                    klasses.push(settings.klass.disabled)
                                                }

                                                return klasses.join(' ')
                                            })([settings.klass.day]),
                                            'data-pick=' + targetDate.pick + ' ' + _.ariaAttr({
                                                role: 'gridcell',
                                                label: formattedDate,
                                                selected: isSelected && calendar.$node.val() === formattedDate ? true : null,
                                                activedescendant: isHighlighted ? true : null,
                                                disabled: isDisabled ? true : null
                                            })
                                        ),
                                        '',
                                        _.ariaAttr({ role: 'presentation' })
                                    ] //endreturn
                                }
                            })
                        ] //endreturn
                    }
                })
            ),
            settings.klass.table,
            'id="' + calendar.$node[0].id + '_table' + '" ' + _.ariaAttr({
                role: 'grid',
                controls: calendar.$node[0].id,
                readonly: true
            })
        ) +

            // * For Firefox forms to submit, make sure to set the buttons� `type` attributes as �button�.
            _.node(
                'div',
                _.node('button', settings.today, settings.klass.buttonToday,
                    'type=button data-pick=' + nowObject.pick +
                    (isOpen && !calendar.disabled(nowObject) ? '' : ' disabled') + ' ' +
                    _.ariaAttr({ controls: calendar.$node[0].id })) +
                _.node('button', settings.clear, settings.klass.buttonClear,
                    'type=button data-clear=1' +
                    (isOpen ? '' : ' disabled') + ' ' +
                    _.ariaAttr({ controls: calendar.$node[0].id })) +
                _.node('button', settings.close, settings.klass.buttonClose,
                    'type=button data-close=true ' +
                    (isOpen ? '' : ' disabled') + ' ' +
                    _.ariaAttr({ controls: calendar.$node[0].id })),
                settings.klass.footer
            ) //endreturn
    } //DatePicker.prototype.nodes




    /**
     * The date picker defaults.
     */
    DatePicker.defaults = (function (prefix) {

        return {

            // The title label to use for the month nav buttons
            labelMonthNext: 'Next month',
            labelMonthPrev: 'Previous month',

            // The title label to use for the dropdown selectors
            labelMonthSelect: 'Select a month',
            labelYearSelect: 'Select a year',

            // Months and weekdays
            monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            weekdaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

            // Today and clear
            today: 'Today',
            clear: 'Clear',
            close: 'Close',

            // Picker close behavior
            closeOnSelect: true,
            closeOnClear: true,

            // The format to show on the `input` element
            format: 'd mmmm, yyyy',

            // Classes
            klass: {

                table: prefix + 'table',

                header: prefix + 'header',

                navPrev: prefix + 'nav--prev',
                navNext: prefix + 'nav--next',
                navDisabled: prefix + 'nav--disabled',

                month: prefix + 'month',
                year: prefix + 'year',

                selectMonth: prefix + 'select--month',
                selectYear: prefix + 'select--year',

                weekdays: prefix + 'weekday',

                day: prefix + 'day',
                disabled: prefix + 'day--disabled',
                selected: prefix + 'day--selected',
                highlighted: prefix + 'day--highlighted',
                now: prefix + 'day--today',
                infocus: prefix + 'day--infocus',
                outfocus: prefix + 'day--outfocus',

                footer: prefix + 'footer',

                buttonClear: prefix + 'button--clear',
                buttonToday: prefix + 'button--today',
                buttonClose: prefix + 'button--close'
            }
        }
    })(Picker.klasses().picker + '__')





    /**
     * Extend the picker to add the date picker.
     */
    Picker.extend('pickadate', DatePicker)


}));




/*!
 * Time picker for pickadate.js v3.5.6
 * http://amsul.github.io/pickadate.js/time.htm
 */

(function (factory) {

    // AMD.
    if (typeof define == 'function' && define.amd)
        define(['picker', 'jquery'], factory)

    // Node.js/browserify.
    else if (typeof exports == 'object')
        module.exports = factory(require('./picker.js'), require('jquery'))

    // Browser globals.
    else factory(Picker, jQuery)

}(function (Picker, $) {


    /**
     * Globals and constants
     */
    var HOURS_IN_DAY = 24,
        MINUTES_IN_HOUR = 60,
        HOURS_TO_NOON = 12,
        MINUTES_IN_DAY = HOURS_IN_DAY * MINUTES_IN_HOUR,
        _ = Picker._



    /**
     * The time picker constructor
     */
    function TimePicker(picker, settings) {

        var clock = this,
            elementValue = picker.$node[0].value,
            elementDataValue = picker.$node.data('value'),
            valueString = elementDataValue || elementValue,
            formatString = elementDataValue ? settings.formatSubmit : settings.format

        clock.settings = settings
        clock.$node = picker.$node

        // The queue of methods that will be used to build item objects.
        clock.queue = {
            interval: 'i',
            min: 'measure create',
            max: 'measure create',
            now: 'now create',
            select: 'parse create validate',
            highlight: 'parse create validate',
            view: 'parse create validate',
            disable: 'deactivate',
            enable: 'activate'
        }

        // The component's item object.
        clock.item = {}

        clock.item.clear = null
        clock.item.interval = settings.interval || 30
        clock.item.disable = (settings.disable || []).slice(0)
        clock.item.enable = -(function (collectionDisabled) {
            return collectionDisabled[0] === true ? collectionDisabled.shift() : -1
        })(clock.item.disable)

        clock.
            set('min', settings.min).
            set('max', settings.max).
            set('now')

        // When there�s a value, set the `select`, which in turn
        // also sets the `highlight` and `view`.
        if (valueString) {
            clock.set('select', valueString, {
                format: formatString
            })
        }

        // If there�s no value, default to highlighting �today�.
        else {
            clock.
                set('select', null).
                set('highlight', clock.item.now)
        }

        // The keycode to movement mapping.
        clock.key = {
            40: 1, // Down
            38: -1, // Up
            39: 1, // Right
            37: -1, // Left
            go: function (timeChange) {
                clock.set(
                    'highlight',
                    clock.item.highlight.pick + timeChange * clock.item.interval,
                    { interval: timeChange * clock.item.interval }
                )
                this.render()
            }
        }


        // Bind some picker events.
        picker.
            on('render', function () {
                var $pickerHolder = picker.$root.children(),
                    $viewset = $pickerHolder.find('.' + settings.klass.viewset),
                    vendors = function (prop) {
                        return ['webkit', 'moz', 'ms', 'o', ''].map(function (vendor) {
                            return (vendor ? '-' + vendor + '-' : '') + prop
                        })
                    },
                    animations = function ($el, state) {
                        vendors('transform').map(function (prop) {
                            $el.css(prop, state)
                        })
                        vendors('transition').map(function (prop) {
                            $el.css(prop, state)
                        })
                    }
                if ($viewset.length) {
                    animations($pickerHolder, 'none')
                    $pickerHolder[0].scrollTop = ~~$viewset.position().top - ($viewset[0].clientHeight * 2)
                    animations($pickerHolder, '')
                }
            }, 1).
            on('open', function () {
                picker.$root.find('button').attr('disabled', false)
            }, 1).
            on('close', function () {
                picker.$root.find('button').attr('disabled', true)
            }, 1)

    } //TimePicker


    /**
     * Set a timepicker item object.
     */
    TimePicker.prototype.set = function (type, value, options) {

        var clock = this,
            clockItem = clock.item

        // If the value is `null` just set it immediately.
        if (value === null) {
            if (type == 'clear') type = 'select'
            clockItem[type] = value
            return clock
        }

        // Otherwise go through the queue of methods, and invoke the functions.
        // Update this as the time unit, and set the final value as this item.
        // * In the case of `enable`, keep the queue but set `disable` instead.
        //   And in the case of `flip`, keep the queue but set `enable` instead.
        clockItem[(type == 'enable' ? 'disable' : type == 'flip' ? 'enable' : type)] = clock.queue[type].split(' ').map(function (method) {
            value = clock[method](type, value, options)
            return value
        }).pop()

        // Check if we need to cascade through more updates.
        if (type == 'select') {
            clock.set('highlight', clockItem.select, options)
        }
        else if (type == 'highlight') {
            clock.set('view', clockItem.highlight, options)
        }
        else if (type == 'interval') {
            clock.
                set('min', clockItem.min, options).
                set('max', clockItem.max, options)
        }
        else if (type.match(/^(flip|min|max|disable|enable)$/)) {
            if (clockItem.select && clock.disabled(clockItem.select)) {
                clock.set('select', value, options)
            }
            if (clockItem.highlight && clock.disabled(clockItem.highlight)) {
                clock.set('highlight', value, options)
            }
            if (type == 'min') {
                clock.set('max', clockItem.max, options)
            }
        }

        return clock
    } //TimePicker.prototype.set


    /**
     * Get a timepicker item object.
     */
    TimePicker.prototype.get = function (type) {
        return this.item[type]
    } //TimePicker.prototype.get


    /**
     * Create a picker time object.
     */
    TimePicker.prototype.create = function (type, value, options) {

        var clock = this

        // If there�s no value, use the type as the value.
        value = value === undefined ? type : value

        // If it�s a date object, convert it into an array.
        if (_.isDate(value)) {
            value = [value.getHours(), value.getMinutes()]
        }

        // If it�s an object, use the �pick� value.
        if ($.isPlainObject(value) && _.isInteger(value.pick)) {
            value = value.pick
        }

        // If it�s an array, convert it into minutes.
        else if ($.isArray(value)) {
            value = +value[0] * MINUTES_IN_HOUR + (+value[1])
        }

        // If no valid value is passed, set it to �now�.
        else if (!_.isInteger(value)) {
            value = clock.now(type, value, options)
        }

        // If we�re setting the max, make sure it�s greater than the min.
        if (type == 'max' && value < clock.item.min.pick) {
            value += MINUTES_IN_DAY
        }

        // If the value doesn�t fall directly on the interval,
        // add one interval to indicate it as �passed�.
        if (type != 'min' && type != 'max' && (value - clock.item.min.pick) % clock.item.interval !== 0) {
            value += clock.item.interval
        }

        // Normalize it into a �reachable� interval.
        value = clock.normalize(type, value, options)

        // Return the compiled object.
        return {

            // Divide to get hours from minutes.
            hour: ~~(HOURS_IN_DAY + value / MINUTES_IN_HOUR) % HOURS_IN_DAY,

            // The remainder is the minutes.
            mins: (MINUTES_IN_HOUR + value % MINUTES_IN_HOUR) % MINUTES_IN_HOUR,

            // The time in total minutes.
            time: (MINUTES_IN_DAY + value) % MINUTES_IN_DAY,

            // Reference to the �relative� value to pick.
            pick: value % MINUTES_IN_DAY
        }
    } //TimePicker.prototype.create


    /**
     * Create a range limit object using an array, date object,
     * literal �true�, or integer relative to another time.
     */
    TimePicker.prototype.createRange = function (from, to) {

        var clock = this,
            createTime = function (time) {
                if (time === true || $.isArray(time) || _.isDate(time)) {
                    return clock.create(time)
                }
                return time
            }

        // Create objects if possible.
        if (!_.isInteger(from)) {
            from = createTime(from)
        }
        if (!_.isInteger(to)) {
            to = createTime(to)
        }

        // Create relative times.
        if (_.isInteger(from) && $.isPlainObject(to)) {
            from = [to.hour, to.mins + (from * clock.settings.interval)];
        }
        else if (_.isInteger(to) && $.isPlainObject(from)) {
            to = [from.hour, from.mins + (to * clock.settings.interval)];
        }

        return {
            from: createTime(from),
            to: createTime(to)
        }
    } //TimePicker.prototype.createRange


    /**
     * Check if a time unit falls within a time range object.
     */
    TimePicker.prototype.withinRange = function (range, timeUnit) {
        range = this.createRange(range.from, range.to)
        return timeUnit.pick >= range.from.pick && timeUnit.pick <= range.to.pick
    }


    /**
     * Check if two time range objects overlap.
     */
    TimePicker.prototype.overlapRanges = function (one, two) {

        var clock = this

        // Convert the ranges into comparable times.
        one = clock.createRange(one.from, one.to)
        two = clock.createRange(two.from, two.to)

        return clock.withinRange(one, two.from) || clock.withinRange(one, two.to) ||
            clock.withinRange(two, one.from) || clock.withinRange(two, one.to)
    }


    /**
     * Get the time relative to now.
     */
    TimePicker.prototype.now = function (type, value/*, options*/) {

        var interval = this.item.interval,
            date = new Date(),
            nowMinutes = date.getHours() * MINUTES_IN_HOUR + date.getMinutes(),
            isValueInteger = _.isInteger(value),
            isBelowInterval

        // Make sure �now� falls within the interval range.
        nowMinutes -= nowMinutes % interval

        // Check if the difference is less than the interval itself.
        isBelowInterval = value < 0 && interval * value + nowMinutes <= -interval

        // Add an interval because the time has �passed�.
        nowMinutes += type == 'min' && isBelowInterval ? 0 : interval

        // If the value is a number, adjust by that many intervals.
        if (isValueInteger) {
            nowMinutes += interval * (
                isBelowInterval && type != 'max' ?
                    value + 1 :
                    value
            )
        }

        // Return the final calculation.
        return nowMinutes
    } //TimePicker.prototype.now


    /**
     * Normalize minutes to be �reachable� based on the min and interval.
     */
    TimePicker.prototype.normalize = function (type, value/*, options*/) {

        var interval = this.item.interval,
            minTime = this.item.min && this.item.min.pick || 0

        // If setting min time, don�t shift anything.
        // Otherwise get the value and min difference and then
        // normalize the difference with the interval.
        value -= type == 'min' ? 0 : (value - minTime) % interval

        // Return the adjusted value.
        return value
    } //TimePicker.prototype.normalize


    /**
     * Measure the range of minutes.
     */
    TimePicker.prototype.measure = function (type, value, options) {

        var clock = this

        // If it�s anything false-y, set it to the default.
        if (!value) {
            value = type == 'min' ? [0, 0] : [HOURS_IN_DAY - 1, MINUTES_IN_HOUR - 1]
        }

        // If it�s a string, parse it.
        if (typeof value == 'string') {
            value = clock.parse(type, value)
        }

        // If it�s a literal true, or an integer, make it relative to now.
        else if (value === true || _.isInteger(value)) {
            value = clock.now(type, value, options)
        }

        // If it�s an object already, just normalize it.
        else if ($.isPlainObject(value) && _.isInteger(value.pick)) {
            value = clock.normalize(type, value.pick, options)
        }

        return value
    } ///TimePicker.prototype.measure


    /**
     * Validate an object as enabled.
     */
    TimePicker.prototype.validate = function (type, timeObject, options) {

        var clock = this,
            interval = options && options.interval ? options.interval : clock.item.interval

        // Check if the object is disabled.
        if (clock.disabled(timeObject)) {

            // Shift with the interval until we reach an enabled time.
            timeObject = clock.shift(timeObject, interval)
        }

        // Scope the object into range.
        timeObject = clock.scope(timeObject)

        // Do a second check to see if we landed on a disabled min/max.
        // In that case, shift using the opposite interval as before.
        if (clock.disabled(timeObject)) {
            timeObject = clock.shift(timeObject, interval * -1)
        }

        // Return the final object.
        return timeObject
    } //TimePicker.prototype.validate


    /**
     * Check if an object is disabled.
     */
    TimePicker.prototype.disabled = function (timeToVerify) {

        var clock = this,

            // Filter through the disabled times to check if this is one.
            isDisabledMatch = clock.item.disable.filter(function (timeToDisable) {

                // If the time is a number, match the hours.
                if (_.isInteger(timeToDisable)) {
                    return timeToVerify.hour == timeToDisable
                }

                // If it�s an array, create the object and match the times.
                if ($.isArray(timeToDisable) || _.isDate(timeToDisable)) {
                    return timeToVerify.pick == clock.create(timeToDisable).pick
                }

                // If it�s an object, match a time within the �from� and �to� range.
                if ($.isPlainObject(timeToDisable)) {
                    return clock.withinRange(timeToDisable, timeToVerify)
                }
            })

        // If this time matches a disabled time, confirm it�s not inverted.
        isDisabledMatch = isDisabledMatch.length && !isDisabledMatch.filter(function (timeToDisable) {
            return $.isArray(timeToDisable) && timeToDisable[2] == 'inverted' ||
                $.isPlainObject(timeToDisable) && timeToDisable.inverted
        }).length

        // If the clock is "enabled" flag is flipped, flip the condition.
        return clock.item.enable === -1 ? !isDisabledMatch : isDisabledMatch ||
            timeToVerify.pick < clock.item.min.pick ||
            timeToVerify.pick > clock.item.max.pick
    } //TimePicker.prototype.disabled


    /**
     * Shift an object by an interval until we reach an enabled object.
     */
    TimePicker.prototype.shift = function (timeObject, interval) {

        var clock = this,
            minLimit = clock.item.min.pick,
            maxLimit = clock.item.max.pick/*,
        safety = 1000*/

        interval = interval || clock.item.interval

        // Keep looping as long as the time is disabled.
        while ( /*safety &&*/ clock.disabled(timeObject)) {

            /*safety -= 1
            if ( !safety ) {
                throw 'Fell into an infinite loop while shifting to ' + timeObject.hour + ':' + timeObject.mins + '.'
            }*/

            // Increase/decrease the time by the interval and keep looping.
            timeObject = clock.create(timeObject.pick += interval)

            // If we've looped beyond the limits, break out of the loop.
            if (timeObject.pick <= minLimit || timeObject.pick >= maxLimit) {
                break
            }
        }

        // Return the final object.
        return timeObject
    } //TimePicker.prototype.shift


    /**
     * Scope an object to be within range of min and max.
     */
    TimePicker.prototype.scope = function (timeObject) {
        var minLimit = this.item.min.pick,
            maxLimit = this.item.max.pick
        return this.create(timeObject.pick > maxLimit ? maxLimit : timeObject.pick < minLimit ? minLimit : timeObject)
    } //TimePicker.prototype.scope


    /**
     * Parse a string into a usable type.
     */
    TimePicker.prototype.parse = function (type, value, options) {

        var hour, minutes, isPM, item, parseValue,
            clock = this,
            parsingObject = {}

        // If it�s already parsed, we�re good.
        if (!value || typeof value != 'string') {
            return value
        }

        // We need a `.format` to parse the value with.
        if (!(options && options.format)) {
            options = options || {}
            options.format = clock.settings.format
        }

        // Convert the format into an array and then map through it.
        clock.formats.toArray(options.format).map(function (label) {

            var
                substring,

                // Grab the formatting label.
                formattingLabel = clock.formats[label],

                // The format length is from the formatting label function or the
                // label length without the escaping exclamation (!) mark.
                formatLength = formattingLabel ?
                    _.trigger(formattingLabel, clock, [value, parsingObject]) :
                    label.replace(/^!/, '').length

            // If there's a format label, split the value up to the format length.
            // Then add it to the parsing object with appropriate label.
            if (formattingLabel) {
                substring = value.substr(0, formatLength)
                parsingObject[label] = substring.match(/^\d+$/) ? +substring : substring
            }

            // Update the time value as the substring from format length to end.
            value = value.substr(formatLength)
        })

        // Grab the hour and minutes from the parsing object.
        for (item in parsingObject) {
            parseValue = parsingObject[item]
            if (_.isInteger(parseValue)) {
                if (item.match(/^(h|hh)$/i)) {
                    hour = parseValue
                    if (item == 'h' || item == 'hh') {
                        hour %= 12
                    }
                }
                else if (item == 'i') {
                    minutes = parseValue
                }
            }
            else if (item.match(/^a$/i) && parseValue.match(/^p/i) && ('h' in parsingObject || 'hh' in parsingObject)) {
                isPM = true
            }
        }

        // Calculate it in minutes and return.
        return (isPM ? hour + 12 : hour) * MINUTES_IN_HOUR + minutes
    } //TimePicker.prototype.parse


    /**
     * Various formats to display the object in.
     */
    TimePicker.prototype.formats = {

        h: function (string, timeObject) {

            // If there's string, then get the digits length.
            // Otherwise return the selected hour in "standard" format.
            return string ? _.digits(string) : timeObject.hour % HOURS_TO_NOON || HOURS_TO_NOON
        },
        hh: function (string, timeObject) {

            // If there's a string, then the length is always 2.
            // Otherwise return the selected hour in "standard" format with a leading zero.
            return string ? 2 : _.lead(timeObject.hour % HOURS_TO_NOON || HOURS_TO_NOON)
        },
        H: function (string, timeObject) {

            // If there's string, then get the digits length.
            // Otherwise return the selected hour in "military" format as a string.
            return string ? _.digits(string) : '' + (timeObject.hour % 24)
        },
        HH: function (string, timeObject) {

            // If there's string, then get the digits length.
            // Otherwise return the selected hour in "military" format with a leading zero.
            return string ? _.digits(string) : _.lead(timeObject.hour % 24)
        },
        i: function (string, timeObject) {

            // If there's a string, then the length is always 2.
            // Otherwise return the selected minutes.
            return string ? 2 : _.lead(timeObject.mins)
        },
        a: function (string, timeObject) {

            // If there's a string, then the length is always 4.
            // Otherwise check if it's more than "noon" and return either am/pm.
            return string ? 4 : MINUTES_IN_DAY / 2 > timeObject.time % MINUTES_IN_DAY ? 'a.m.' : 'p.m.'
        },
        A: function (string, timeObject) {

            // If there's a string, then the length is always 2.
            // Otherwise check if it's more than "noon" and return either am/pm.
            return string ? 2 : MINUTES_IN_DAY / 2 > timeObject.time % MINUTES_IN_DAY ? 'AM' : 'PM'
        },

        // Create an array by splitting the formatting string passed.
        toArray: function (formatString) { return formatString.split(/(h{1,2}|H{1,2}|i|a|A|!.)/g) },

        // Format an object into a string using the formatting options.
        toString: function (formatString, itemObject) {
            var clock = this
            return clock.formats.toArray(formatString).map(function (label) {
                return _.trigger(clock.formats[label], clock, [0, itemObject]) || label.replace(/^!/, '')
            }).join('')
        }
    } //TimePicker.prototype.formats




    /**
     * Check if two time units are the exact.
     */
    TimePicker.prototype.isTimeExact = function (one, two) {

        var clock = this

        // When we�re working with minutes, do a direct comparison.
        if (
            (_.isInteger(one) && _.isInteger(two)) ||
            (typeof one == 'boolean' && typeof two == 'boolean')
        ) {
            return one === two
        }

        // When we�re working with time representations, compare the �pick� value.
        if (
            (_.isDate(one) || $.isArray(one)) &&
            (_.isDate(two) || $.isArray(two))
        ) {
            return clock.create(one).pick === clock.create(two).pick
        }

        // When we�re working with range objects, compare the �from� and �to�.
        if ($.isPlainObject(one) && $.isPlainObject(two)) {
            return clock.isTimeExact(one.from, two.from) && clock.isTimeExact(one.to, two.to)
        }

        return false
    }


    /**
     * Check if two time units overlap.
     */
    TimePicker.prototype.isTimeOverlap = function (one, two) {

        var clock = this

        // When we�re working with an integer, compare the hours.
        if (_.isInteger(one) && (_.isDate(two) || $.isArray(two))) {
            return one === clock.create(two).hour
        }
        if (_.isInteger(two) && (_.isDate(one) || $.isArray(one))) {
            return two === clock.create(one).hour
        }

        // When we�re working with range objects, check if the ranges overlap.
        if ($.isPlainObject(one) && $.isPlainObject(two)) {
            return clock.overlapRanges(one, two)
        }

        return false
    }


    /**
     * Flip the �enabled� state.
     */
    TimePicker.prototype.flipEnable = function (val) {
        var itemObject = this.item
        itemObject.enable = val || (itemObject.enable == -1 ? 1 : -1)
    }


    /**
     * Mark a collection of times as �disabled�.
     */
    TimePicker.prototype.deactivate = function (type, timesToDisable) {

        var clock = this,
            disabledItems = clock.item.disable.slice(0)


        // If we�re flipping, that�s all we need to do.
        if (timesToDisable == 'flip') {
            clock.flipEnable()
        }

        else if (timesToDisable === false) {
            clock.flipEnable(1)
            disabledItems = []
        }

        else if (timesToDisable === true) {
            clock.flipEnable(-1)
            disabledItems = []
        }

        // Otherwise go through the times to disable.
        else {

            timesToDisable.map(function (unitToDisable) {

                var matchFound

                // When we have disabled items, check for matches.
                // If something is matched, immediately break out.
                for (var index = 0; index < disabledItems.length; index += 1) {
                    if (clock.isTimeExact(unitToDisable, disabledItems[index])) {
                        matchFound = true
                        break
                    }
                }

                // If nothing was found, add the validated unit to the collection.
                if (!matchFound) {
                    if (
                        _.isInteger(unitToDisable) ||
                        _.isDate(unitToDisable) ||
                        $.isArray(unitToDisable) ||
                        ($.isPlainObject(unitToDisable) && unitToDisable.from && unitToDisable.to)
                    ) {
                        disabledItems.push(unitToDisable)
                    }
                }
            })
        }

        // Return the updated collection.
        return disabledItems
    } //TimePicker.prototype.deactivate


    /**
     * Mark a collection of times as �enabled�.
     */
    TimePicker.prototype.activate = function (type, timesToEnable) {

        var clock = this,
            disabledItems = clock.item.disable,
            disabledItemsCount = disabledItems.length

        // If we�re flipping, that�s all we need to do.
        if (timesToEnable == 'flip') {
            clock.flipEnable()
        }

        else if (timesToEnable === true) {
            clock.flipEnable(1)
            disabledItems = []
        }

        else if (timesToEnable === false) {
            clock.flipEnable(-1)
            disabledItems = []
        }

        // Otherwise go through the disabled times.
        else {

            timesToEnable.map(function (unitToEnable) {

                var matchFound,
                    disabledUnit,
                    index,
                    isRangeMatched

                // Go through the disabled items and try to find a match.
                for (index = 0; index < disabledItemsCount; index += 1) {

                    disabledUnit = disabledItems[index]

                    // When an exact match is found, remove it from the collection.
                    if (clock.isTimeExact(disabledUnit, unitToEnable)) {
                        matchFound = disabledItems[index] = null
                        isRangeMatched = true
                        break
                    }

                    // When an overlapped match is found, add the �inverted� state to it.
                    else if (clock.isTimeOverlap(disabledUnit, unitToEnable)) {
                        if ($.isPlainObject(unitToEnable)) {
                            unitToEnable.inverted = true
                            matchFound = unitToEnable
                        }
                        else if ($.isArray(unitToEnable)) {
                            matchFound = unitToEnable
                            if (!matchFound[2]) matchFound.push('inverted')
                        }
                        else if (_.isDate(unitToEnable)) {
                            matchFound = [unitToEnable.getFullYear(), unitToEnable.getMonth(), unitToEnable.getDate(), 'inverted']
                        }
                        break
                    }
                }

                // If a match was found, remove a previous duplicate entry.
                if (matchFound) for (index = 0; index < disabledItemsCount; index += 1) {
                    if (clock.isTimeExact(disabledItems[index], unitToEnable)) {
                        disabledItems[index] = null
                        break
                    }
                }

                // In the event that we�re dealing with an overlap of range times,
                // make sure there are no �inverted� times because of it.
                if (isRangeMatched) for (index = 0; index < disabledItemsCount; index += 1) {
                    if (clock.isTimeOverlap(disabledItems[index], unitToEnable)) {
                        disabledItems[index] = null
                        break
                    }
                }

                // If something is still matched, add it into the collection.
                if (matchFound) {
                    disabledItems.push(matchFound)
                }
            })
        }

        // Return the updated collection.
        return disabledItems.filter(function (val) { return val != null })
    } //TimePicker.prototype.activate


    /**
     * The division to use for the range intervals.
     */
    TimePicker.prototype.i = function (type, value/*, options*/) {
        return _.isInteger(value) && value > 0 ? value : this.item.interval
    }


    /**
     * Create a string for the nodes in the picker.
     */
    TimePicker.prototype.nodes = function (isOpen) {

        var
            clock = this,
            settings = clock.settings,
            selectedObject = clock.item.select,
            highlightedObject = clock.item.highlight,
            viewsetObject = clock.item.view,
            disabledCollection = clock.item.disable

        return _.node(
            'ul',
            _.group({
                min: clock.item.min.pick,
                max: clock.item.max.pick,
                i: clock.item.interval,
                node: 'li',
                item: function (loopedTime) {
                    loopedTime = clock.create(loopedTime)
                    var timeMinutes = loopedTime.pick,
                        isSelected = selectedObject && selectedObject.pick == timeMinutes,
                        isHighlighted = highlightedObject && highlightedObject.pick == timeMinutes,
                        isDisabled = disabledCollection && clock.disabled(loopedTime),
                        formattedTime = _.trigger(clock.formats.toString, clock, [settings.format, loopedTime])
                    return [
                        _.trigger(clock.formats.toString, clock, [_.trigger(settings.formatLabel, clock, [loopedTime]) || settings.format, loopedTime]),
                        (function (klasses) {

                            if (isSelected) {
                                klasses.push(settings.klass.selected)
                            }

                            if (isHighlighted) {
                                klasses.push(settings.klass.highlighted)
                            }

                            if (viewsetObject && viewsetObject.pick == timeMinutes) {
                                klasses.push(settings.klass.viewset)
                            }

                            if (isDisabled) {
                                klasses.push(settings.klass.disabled)
                            }

                            return klasses.join(' ')
                        })([settings.klass.listItem]),
                        'data-pick=' + loopedTime.pick + ' ' + _.ariaAttr({
                            role: 'option',
                            label: formattedTime,
                            selected: isSelected && clock.$node.val() === formattedTime ? true : null,
                            activedescendant: isHighlighted ? true : null,
                            disabled: isDisabled ? true : null
                        })
                    ]
                }
            }) +

            // * For Firefox forms to submit, make sure to set the button�s `type` attribute as �button�.
            _.node(
                'li',
                _.node(
                    'button',
                    settings.clear,
                    settings.klass.buttonClear,
                    'type=button data-clear=1' + (isOpen ? '' : ' disabled') + ' ' +
                    _.ariaAttr({ controls: clock.$node[0].id })
                ),
                '', _.ariaAttr({ role: 'presentation' })
            ),
            settings.klass.list,
            _.ariaAttr({ role: 'listbox', controls: clock.$node[0].id })
        )
    } //TimePicker.prototype.nodes







    /**
     * Extend the picker to add the component with the defaults.
     */
    TimePicker.defaults = (function (prefix) {

        return {

            // Clear
            clear: 'Clear',

            // The format to show on the `input` element
            format: 'h:i A',

            // The interval between each time
            interval: 30,

            // Picker close behavior
            closeOnSelect: true,
            closeOnClear: true,

            // Classes
            klass: {

                picker: prefix + ' ' + prefix + '--time',
                holder: prefix + '__holder',

                list: prefix + '__list',
                listItem: prefix + '__list-item',

                disabled: prefix + '__list-item--disabled',
                selected: prefix + '__list-item--selected',
                highlighted: prefix + '__list-item--highlighted',
                viewset: prefix + '__list-item--viewset',
                now: prefix + '__list-item--now',

                buttonClear: prefix + '__button--clear'
            }
        }
    })(Picker.klasses().picker)





    /**
     * Extend the picker to add the time picker.
     */
    Picker.extend('pickatime', TimePicker)


}));




/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
; (function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module. 
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS 
        factory(require('jquery'));
    } else {
        // Browser globals 
        factory(window.jQuery || window.Zepto);
    }
}(function ($) {

    /*>>core*/
    /**
     * 
     * Magnific Popup Core JS file
     * 
     */


    /**
     * Private static constants
     */
    var CLOSE_EVENT = 'Close',
        BEFORE_CLOSE_EVENT = 'BeforeClose',
        AFTER_CLOSE_EVENT = 'AfterClose',
        BEFORE_APPEND_EVENT = 'BeforeAppend',
        MARKUP_PARSE_EVENT = 'MarkupParse',
        OPEN_EVENT = 'Open',
        CHANGE_EVENT = 'Change',
        NS = 'mfp',
        EVENT_NS = '.' + NS,
        READY_CLASS = 'mfp-ready',
        REMOVING_CLASS = 'mfp-removing',
        PREVENT_CLOSE_CLASS = 'mfp-prevent-close';


    /**
     * Private vars 
     */
    /*jshint -W079 */
    var mfp, // As we have only one instance of MagnificPopup object, we define it locally to not to use 'this'
        MagnificPopup = function () { },
        _isJQ = !!(window.jQuery),
        _prevStatus,
        _window = $(window),
        _document,
        _prevContentType,
        _wrapClasses,
        _currPopupType;


    /**
     * Private functions
     */
    var _mfpOn = function (name, f) {
        mfp.ev.on(NS + name + EVENT_NS, f);
    },
        _getEl = function (className, appendTo, html, raw) {
            var el = document.createElement('div');
            el.className = 'mfp-' + className;
            if (html) {
                el.innerHTML = html;
            }
            if (!raw) {
                el = $(el);
                if (appendTo) {
                    el.appendTo(appendTo);
                }
            } else if (appendTo) {
                appendTo.appendChild(el);
            }
            return el;
        },
        _mfpTrigger = function (e, data) {
            mfp.ev.triggerHandler(NS + e, data);

            if (mfp.st.callbacks) {
                // converts "mfpEventName" to "eventName" callback and triggers it if it's present
                e = e.charAt(0).toLowerCase() + e.slice(1);
                if (mfp.st.callbacks[e]) {
                    mfp.st.callbacks[e].apply(mfp, $.isArray(data) ? data : [data]);
                }
            }
        },
        _getCloseBtn = function (type) {
            if (type !== _currPopupType || !mfp.currTemplate.closeBtn) {
                mfp.currTemplate.closeBtn = $(mfp.st.closeMarkup.replace('%title%', mfp.st.tClose));
                _currPopupType = type;
            }
            return mfp.currTemplate.closeBtn;
        },
        // Initialize Magnific Popup only when called at least once
        _checkInstance = function () {
            if (!$.magnificPopup.instance) {
                /*jshint -W020 */
                mfp = new MagnificPopup();
                mfp.init();
                $.magnificPopup.instance = mfp;
            }
        },
        // CSS transition detection, http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
        supportsTransitions = function () {
            var s = document.createElement('p').style, // 's' for style. better to create an element if body yet to exist
                v = ['ms', 'O', 'Moz', 'Webkit']; // 'v' for vendor

            if (s['transition'] !== undefined) {
                return true;
            }

            while (v.length) {
                if (v.pop() + 'Transition' in s) {
                    return true;
                }
            }

            return false;
        };



    /**
     * Public functions
     */
    MagnificPopup.prototype = {

        constructor: MagnificPopup,

        /**
         * Initializes Magnific Popup plugin. 
         * This function is triggered only once when $.fn.magnificPopup or $.magnificPopup is executed
         */
        init: function () {
            var appVersion = navigator.appVersion;
            mfp.isLowIE = mfp.isIE8 = document.all && !document.addEventListener;
            mfp.isAndroid = (/android/gi).test(appVersion);
            mfp.isIOS = (/iphone|ipad|ipod/gi).test(appVersion);
            mfp.supportsTransition = supportsTransitions();

            // We disable fixed positioned lightbox on devices that don't handle it nicely.
            // If you know a better way of detecting this - let me know.
            mfp.probablyMobile = (mfp.isAndroid || mfp.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent));
            _document = $(document);

            mfp.popupsCache = {};
        },

        /**
         * Opens popup
         * @param  data [description]
         */
        open: function (data) {

            var i;

            if (data.isObj === false) {
                // convert jQuery collection to array to avoid conflicts later
                mfp.items = data.items.toArray();

                mfp.index = 0;
                var items = data.items,
                    item;
                for (i = 0; i < items.length; i++) {
                    item = items[i];
                    if (item.parsed) {
                        item = item.el[0];
                    }
                    if (item === data.el[0]) {
                        mfp.index = i;
                        break;
                    }
                }
            } else {
                mfp.items = $.isArray(data.items) ? data.items : [data.items];
                mfp.index = data.index || 0;
            }

            // if popup is already opened - we just update the content
            if (mfp.isOpen) {
                mfp.updateItemHTML();
                return;
            }

            mfp.types = [];
            _wrapClasses = '';
            if (data.mainEl && data.mainEl.length) {
                mfp.ev = data.mainEl.eq(0);
            } else {
                mfp.ev = _document;
            }

            if (data.key) {
                if (!mfp.popupsCache[data.key]) {
                    mfp.popupsCache[data.key] = {};
                }
                mfp.currTemplate = mfp.popupsCache[data.key];
            } else {
                mfp.currTemplate = {};
            }



            mfp.st = $.extend(true, {}, $.magnificPopup.defaults, data);
            mfp.fixedContentPos = mfp.st.fixedContentPos === 'auto' ? !mfp.probablyMobile : mfp.st.fixedContentPos;

            if (mfp.st.modal) {
                mfp.st.closeOnContentClick = false;
                mfp.st.closeOnBgClick = false;
                mfp.st.showCloseBtn = false;
                mfp.st.enableEscapeKey = false;
            }


            // Building markup
            // main containers are created only once
            if (!mfp.bgOverlay) {

                // Dark overlay
                mfp.bgOverlay = _getEl('bg').on('click' + EVENT_NS, function () {
                    mfp.close();
                });

                mfp.wrap = _getEl('wrap').attr('tabindex', -1).on('click' + EVENT_NS, function (e) {
                    if (mfp._checkIfClose(e.target)) {
                        mfp.close();
                    }
                });

                mfp.container = _getEl('container', mfp.wrap);
            }

            mfp.contentContainer = _getEl('content');
            if (mfp.st.preloader) {
                mfp.preloader = _getEl('preloader', mfp.container, mfp.st.tLoading);
            }


            // Initializing modules
            var modules = $.magnificPopup.modules;
            for (i = 0; i < modules.length; i++) {
                var n = modules[i];
                n = n.charAt(0).toUpperCase() + n.slice(1);
                mfp['init' + n].call(mfp);
            }
            _mfpTrigger('BeforeOpen');


            if (mfp.st.showCloseBtn) {
                // Close button
                if (!mfp.st.closeBtnInside) {
                    mfp.wrap.append(_getCloseBtn());
                } else {
                    _mfpOn(MARKUP_PARSE_EVENT, function (e, template, values, item) {
                        values.close_replaceWith = _getCloseBtn(item.type);
                    });
                    _wrapClasses += ' mfp-close-btn-in';
                }
            }

            if (mfp.st.alignTop) {
                _wrapClasses += ' mfp-align-top';
            }



            if (mfp.fixedContentPos) {
                mfp.wrap.css({
                    overflow: mfp.st.overflowY,
                    overflowX: 'hidden',
                    overflowY: mfp.st.overflowY
                });
            } else {
                mfp.wrap.css({
                    top: _window.scrollTop(),
                    position: 'absolute'
                });
            }
            if (mfp.st.fixedBgPos === false || (mfp.st.fixedBgPos === 'auto' && !mfp.fixedContentPos)) {
                mfp.bgOverlay.css({
                    height: _document.height(),
                    position: 'absolute'
                });
            }



            if (mfp.st.enableEscapeKey) {
                // Close on ESC key
                _document.on('keyup' + EVENT_NS, function (e) {
                    if (e.keyCode === 27) {
                        mfp.close();
                    }
                });
            }

            _window.on('resize' + EVENT_NS, function () {
                mfp.updateSize();
            });


            if (!mfp.st.closeOnContentClick) {
                _wrapClasses += ' mfp-auto-cursor';
            }

            if (_wrapClasses)
                mfp.wrap.addClass(_wrapClasses);


            // this triggers recalculation of layout, so we get it once to not to trigger twice
            var windowHeight = mfp.wH = _window.height();


            var windowStyles = {};

            if (mfp.fixedContentPos) {
                if (mfp._hasScrollBar(windowHeight)) {
                    var s = mfp._getScrollbarSize();
                    if (s) {
                        windowStyles.marginRight = s;
                    }
                }
            }

            if (mfp.fixedContentPos) {
                if (!mfp.isIE7) {
                    windowStyles.overflow = 'hidden';
                } else {
                    // ie7 double-scroll bug
                    $('body, html').css('overflow', 'hidden');
                }
            }



            var classesToadd = mfp.st.mainClass;
            if (mfp.isIE7) {
                classesToadd += ' mfp-ie7';
            }
            if (classesToadd) {
                mfp._addClassToMFP(classesToadd);
            }

            // add content
            mfp.updateItemHTML();

            _mfpTrigger('BuildControls');

            // remove scrollbar, add margin e.t.c
            $('html').css(windowStyles);

            // add everything to DOM
            mfp.bgOverlay.add(mfp.wrap).prependTo(mfp.st.prependTo || $(document.body));

            // Save last focused element
            mfp._lastFocusedEl = document.activeElement;

            // Wait for next cycle to allow CSS transition
            setTimeout(function () {

                if (mfp.content) {
                    mfp._addClassToMFP(READY_CLASS);
                    mfp._setFocus();
                } else {
                    // if content is not defined (not loaded e.t.c) we add class only for BG
                    mfp.bgOverlay.addClass(READY_CLASS);
                }

                // Trap the focus in popup
                _document.on('focusin' + EVENT_NS, mfp._onFocusIn);

            }, 16);

            mfp.isOpen = true;
            mfp.updateSize(windowHeight);
            _mfpTrigger(OPEN_EVENT);

            return data;
        },

        /**
         * Closes the popup
         */
        close: function () {
            if (!mfp.isOpen) return;
            _mfpTrigger(BEFORE_CLOSE_EVENT);

            mfp.isOpen = false;
            // for CSS3 animation
            if (mfp.st.removalDelay && !mfp.isLowIE && mfp.supportsTransition) {
                mfp._addClassToMFP(REMOVING_CLASS);
                setTimeout(function () {
                    mfp._close();
                }, mfp.st.removalDelay);
            } else {
                mfp._close();
            }
        },

        /**
         * Helper for close() function
         */
        _close: function () {
            _mfpTrigger(CLOSE_EVENT);

            var classesToRemove = REMOVING_CLASS + ' ' + READY_CLASS + ' ';

            mfp.bgOverlay.detach();
            mfp.wrap.detach();
            mfp.container.empty();

            if (mfp.st.mainClass) {
                classesToRemove += mfp.st.mainClass + ' ';
            }

            mfp._removeClassFromMFP(classesToRemove);

            if (mfp.fixedContentPos) {
                var windowStyles = { marginRight: '' };
                if (mfp.isIE7) {
                    $('body, html').css('overflow', '');
                } else {
                    windowStyles.overflow = '';
                }
                $('html').css(windowStyles);
            }

            _document.off('keyup' + EVENT_NS + ' focusin' + EVENT_NS);
            mfp.ev.off(EVENT_NS);

            // clean up DOM elements that aren't removed
            mfp.wrap.attr('class', 'mfp-wrap').removeAttr('style');
            mfp.bgOverlay.attr('class', 'mfp-bg');
            mfp.container.attr('class', 'mfp-container');

            // remove close button from target element
            if (mfp.st.showCloseBtn &&
                (!mfp.st.closeBtnInside || mfp.currTemplate[mfp.currItem.type] === true)) {
                if (mfp.currTemplate.closeBtn)
                    mfp.currTemplate.closeBtn.detach();
            }


            if (mfp.st.autoFocusLast && mfp._lastFocusedEl) {
                $(mfp._lastFocusedEl).focus(); // put tab focus back
            }
            mfp.currItem = null;
            mfp.content = null;
            mfp.currTemplate = null;
            mfp.prevHeight = 0;

            _mfpTrigger(AFTER_CLOSE_EVENT);
        },

        updateSize: function (winHeight) {

            if (mfp.isIOS) {
                // fixes iOS nav bars https://github.com/dimsemenov/Magnific-Popup/issues/2
                var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
                var height = window.innerHeight * zoomLevel;
                mfp.wrap.css('height', height);
                mfp.wH = height;
            } else {
                mfp.wH = winHeight || _window.height();
            }
            // Fixes #84: popup incorrectly positioned with position:relative on body
            if (!mfp.fixedContentPos) {
                mfp.wrap.css('height', mfp.wH);
            }

            _mfpTrigger('Resize');

        },

        /**
         * Set content of popup based on current index
         */
        updateItemHTML: function () {
            var item = mfp.items[mfp.index];

            // Detach and perform modifications
            mfp.contentContainer.detach();

            if (mfp.content)
                mfp.content.detach();

            if (!item.parsed) {
                item = mfp.parseEl(mfp.index);
            }

            var type = item.type;

            _mfpTrigger('BeforeChange', [mfp.currItem ? mfp.currItem.type : '', type]);
            // BeforeChange event works like so:
            // _mfpOn('BeforeChange', function(e, prevType, newType) { });

            mfp.currItem = item;

            if (!mfp.currTemplate[type]) {
                var markup = mfp.st[type] ? mfp.st[type].markup : false;

                // allows to modify markup
                _mfpTrigger('FirstMarkupParse', markup);

                if (markup) {
                    mfp.currTemplate[type] = $(markup);
                } else {
                    // if there is no markup found we just define that template is parsed
                    mfp.currTemplate[type] = true;
                }
            }

            if (_prevContentType && _prevContentType !== item.type) {
                mfp.container.removeClass('mfp-' + _prevContentType + '-holder');
            }

            var newContent = mfp['get' + type.charAt(0).toUpperCase() + type.slice(1)](item, mfp.currTemplate[type]);
            mfp.appendContent(newContent, type);

            item.preloaded = true;

            _mfpTrigger(CHANGE_EVENT, item);
            _prevContentType = item.type;

            // Append container back after its content changed
            mfp.container.prepend(mfp.contentContainer);

            _mfpTrigger('AfterChange');
        },


        /**
         * Set HTML content of popup
         */
        appendContent: function (newContent, type) {
            mfp.content = newContent;

            if (newContent) {
                if (mfp.st.showCloseBtn && mfp.st.closeBtnInside &&
                    mfp.currTemplate[type] === true) {
                    // if there is no markup, we just append close button element inside
                    if (!mfp.content.find('.mfp-close').length) {
                        mfp.content.append(_getCloseBtn());
                    }
                } else {
                    mfp.content = newContent;
                }
            } else {
                mfp.content = '';
            }

            _mfpTrigger(BEFORE_APPEND_EVENT);
            mfp.container.addClass('mfp-' + type + '-holder');

            mfp.contentContainer.append(mfp.content);
        },


        /**
         * Creates Magnific Popup data object based on given data
         * @param  {int} index Index of item to parse
         */
        parseEl: function (index) {
            var item = mfp.items[index],
                type;

            if (item.tagName) {
                item = { el: $(item) };
            } else {
                type = item.type;
                item = { data: item, src: item.src };
            }

            if (item.el) {
                var types = mfp.types;

                // check for 'mfp-TYPE' class
                for (var i = 0; i < types.length; i++) {
                    if (item.el.hasClass('mfp-' + types[i])) {
                        type = types[i];
                        break;
                    }
                }

                item.src = item.el.attr('data-mfp-src');
                if (!item.src) {
                    item.src = item.el.attr('href');
                }
            }

            item.type = type || mfp.st.type || 'inline';
            item.index = index;
            item.parsed = true;
            mfp.items[index] = item;
            _mfpTrigger('ElementParse', item);

            return mfp.items[index];
        },


        /**
         * Initializes single popup or a group of popups
         */
        addGroup: function (el, options) {
            var eHandler = function (e) {
                e.mfpEl = this;
                mfp._openClick(e, el, options);
            };

            if (!options) {
                options = {};
            }

            var eName = 'click.magnificPopup';
            options.mainEl = el;

            if (options.items) {
                options.isObj = true;
                el.off(eName).on(eName, eHandler);
            } else {
                options.isObj = false;
                if (options.delegate) {
                    el.off(eName).on(eName, options.delegate, eHandler);
                } else {
                    options.items = el;
                    el.off(eName).on(eName, eHandler);
                }
            }
        },
        _openClick: function (e, el, options) {
            var midClick = options.midClick !== undefined ? options.midClick : $.magnificPopup.defaults.midClick;


            if (!midClick && (e.which === 2 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey)) {
                return;
            }

            var disableOn = options.disableOn !== undefined ? options.disableOn : $.magnificPopup.defaults.disableOn;

            if (disableOn) {
                if ($.isFunction(disableOn)) {
                    if (!disableOn.call(mfp)) {
                        return true;
                    }
                } else { // else it's number
                    if (_window.width() < disableOn) {
                        return true;
                    }
                }
            }

            if (e.type) {
                e.preventDefault();

                // This will prevent popup from closing if element is inside and popup is already opened
                if (mfp.isOpen) {
                    e.stopPropagation();
                }
            }

            options.el = $(e.mfpEl);
            if (options.delegate) {
                options.items = el.find(options.delegate);
            }
            mfp.open(options);
        },


        /**
         * Updates text on preloader
         */
        updateStatus: function (status, text) {

            if (mfp.preloader) {
                if (_prevStatus !== status) {
                    mfp.container.removeClass('mfp-s-' + _prevStatus);
                }

                if (!text && status === 'loading') {
                    text = mfp.st.tLoading;
                }

                var data = {
                    status: status,
                    text: text
                };
                // allows to modify status
                _mfpTrigger('UpdateStatus', data);

                status = data.status;
                text = data.text;

                mfp.preloader.html(text);

                mfp.preloader.find('a').on('click', function (e) {
                    e.stopImmediatePropagation();
                });

                mfp.container.addClass('mfp-s-' + status);
                _prevStatus = status;
            }
        },


        /*
            "Private" helpers that aren't private at all
         */
        // Check to close popup or not
        // "target" is an element that was clicked
        _checkIfClose: function (target) {

            if ($(target).hasClass(PREVENT_CLOSE_CLASS)) {
                return;
            }

            var closeOnContent = mfp.st.closeOnContentClick;
            var closeOnBg = mfp.st.closeOnBgClick;

            if (closeOnContent && closeOnBg) {
                return true;
            } else {

                // We close the popup if click is on close button or on preloader. Or if there is no content.
                if (!mfp.content || $(target).hasClass('mfp-close') || (mfp.preloader && target === mfp.preloader[0])) {
                    return true;
                }

                // if click is outside the content
                if ((target !== mfp.content[0] && !$.contains(mfp.content[0], target))) {
                    if (closeOnBg) {
                        // last check, if the clicked element is in DOM, (in case it's removed onclick)
                        if ($.contains(document, target)) {
                            return true;
                        }
                    }
                } else if (closeOnContent) {
                    return true;
                }

            }
            return false;
        },
        _addClassToMFP: function (cName) {
            mfp.bgOverlay.addClass(cName);
            mfp.wrap.addClass(cName);
        },
        _removeClassFromMFP: function (cName) {
            this.bgOverlay.removeClass(cName);
            mfp.wrap.removeClass(cName);
        },
        _hasScrollBar: function (winHeight) {
            return ((mfp.isIE7 ? _document.height() : document.body.scrollHeight) > (winHeight || _window.height()));
        },
        _setFocus: function () {
            (mfp.st.focus ? mfp.content.find(mfp.st.focus).eq(0) : mfp.wrap).focus();
        },
        _onFocusIn: function (e) {
            if (e.target !== mfp.wrap[0] && !$.contains(mfp.wrap[0], e.target)) {
                mfp._setFocus();
                return false;
            }
        },
        _parseMarkup: function (template, values, item) {
            var arr;
            if (item.data) {
                values = $.extend(item.data, values);
            }
            _mfpTrigger(MARKUP_PARSE_EVENT, [template, values, item]);

            $.each(values, function (key, value) {
                if (value === undefined || value === false) {
                    return true;
                }
                arr = key.split('_');
                if (arr.length > 1) {
                    var el = template.find(EVENT_NS + '-' + arr[0]);

                    if (el.length > 0) {
                        var attr = arr[1];
                        if (attr === 'replaceWith') {
                            if (el[0] !== value[0]) {
                                el.replaceWith(value);
                            }
                        } else if (attr === 'img') {
                            if (el.is('img')) {
                                el.attr('src', value);
                            } else {
                                el.replaceWith($('<img>').attr('src', value).attr('class', el.attr('class')));
                            }
                        } else {
                            el.attr(arr[1], value);
                        }
                    }

                } else {
                    template.find(EVENT_NS + '-' + key).html(value);
                }
            });
        },

        _getScrollbarSize: function () {
            // thx David
            if (mfp.scrollbarSize === undefined) {
                var scrollDiv = document.createElement("div");
                scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
                document.body.appendChild(scrollDiv);
                mfp.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);
            }
            return mfp.scrollbarSize;
        }

    }; /* MagnificPopup core prototype end */




    /**
     * Public static functions
     */
    $.magnificPopup = {
        instance: null,
        proto: MagnificPopup.prototype,
        modules: [],

        open: function (options, index) {
            _checkInstance();

            if (!options) {
                options = {};
            } else {
                options = $.extend(true, {}, options);
            }

            options.isObj = true;
            options.index = index || 0;
            return this.instance.open(options);
        },

        close: function () {
            return $.magnificPopup.instance && $.magnificPopup.instance.close();
        },

        registerModule: function (name, module) {
            if (module.options) {
                $.magnificPopup.defaults[name] = module.options;
            }
            $.extend(this.proto, module.proto);
            this.modules.push(name);
        },

        defaults: {

            // Info about options is in docs:
            // http://dimsemenov.com/plugins/magnific-popup/documentation.html#options

            disableOn: 0,

            key: null,

            midClick: false,

            mainClass: '',

            preloader: true,

            focus: '', // CSS selector of input to focus after popup is opened

            closeOnContentClick: false,

            closeOnBgClick: true,

            closeBtnInside: true,

            showCloseBtn: true,

            enableEscapeKey: true,

            modal: false,

            alignTop: false,

            removalDelay: 0,

            prependTo: null,

            fixedContentPos: 'auto',

            fixedBgPos: 'auto',

            overflowY: 'auto',

            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',

            tClose: 'Close (Esc)',

            tLoading: 'Loading...',

            autoFocusLast: true

        }
    };



    $.fn.magnificPopup = function (options) {
        _checkInstance();

        var jqEl = $(this);

        // We call some API method of first param is a string
        if (typeof options === "string") {

            if (options === 'open') {
                var items,
                    itemOpts = _isJQ ? jqEl.data('magnificPopup') : jqEl[0].magnificPopup,
                    index = parseInt(arguments[1], 10) || 0;

                if (itemOpts.items) {
                    items = itemOpts.items[index];
                } else {
                    items = jqEl;
                    if (itemOpts.delegate) {
                        items = items.find(itemOpts.delegate);
                    }
                    items = items.eq(index);
                }
                mfp._openClick({ mfpEl: items }, jqEl, itemOpts);
            } else {
                if (mfp.isOpen)
                    mfp[options].apply(mfp, Array.prototype.slice.call(arguments, 1));
            }

        } else {
            // clone options obj
            options = $.extend(true, {}, options);

            /*
             * As Zepto doesn't support .data() method for objects
             * and it works only in normal browsers
             * we assign "options" object directly to the DOM element. FTW!
             */
            if (_isJQ) {
                jqEl.data('magnificPopup', options);
            } else {
                jqEl[0].magnificPopup = options;
            }

            mfp.addGroup(jqEl, options);

        }
        return jqEl;
    };

    /*>>core*/

    /*>>inline*/

    var INLINE_NS = 'inline',
        _hiddenClass,
        _inlinePlaceholder,
        _lastInlineElement,
        _putInlineElementsBack = function () {
            if (_lastInlineElement) {
                _inlinePlaceholder.after(_lastInlineElement.addClass(_hiddenClass)).detach();
                _lastInlineElement = null;
            }
        };

    $.magnificPopup.registerModule(INLINE_NS, {
        options: {
            hiddenClass: 'hide', // will be appended with `mfp-` prefix
            markup: '',
            tNotFound: 'Content not found'
        },
        proto: {

            initInline: function () {
                mfp.types.push(INLINE_NS);

                _mfpOn(CLOSE_EVENT + '.' + INLINE_NS, function () {
                    _putInlineElementsBack();
                });
            },

            getInline: function (item, template) {

                _putInlineElementsBack();

                if (item.src) {
                    var inlineSt = mfp.st.inline,
                        el = $(item.src);

                    if (el.length) {

                        // If target element has parent - we replace it with placeholder and put it back after popup is closed
                        var parent = el[0].parentNode;
                        if (parent && parent.tagName) {
                            if (!_inlinePlaceholder) {
                                _hiddenClass = inlineSt.hiddenClass;
                                _inlinePlaceholder = _getEl(_hiddenClass);
                                _hiddenClass = 'mfp-' + _hiddenClass;
                            }
                            // replace target inline element with placeholder
                            _lastInlineElement = el.after(_inlinePlaceholder).detach().removeClass(_hiddenClass);
                        }

                        mfp.updateStatus('ready');
                    } else {
                        mfp.updateStatus('error', inlineSt.tNotFound);
                        el = $('<div>');
                    }

                    item.inlineElement = el;
                    return el;
                }

                mfp.updateStatus('ready');
                mfp._parseMarkup(template, {}, item);
                return template;
            }
        }
    });

    /*>>inline*/

    /*>>ajax*/
    var AJAX_NS = 'ajax',
        _ajaxCur,
        _removeAjaxCursor = function () {
            if (_ajaxCur) {
                $(document.body).removeClass(_ajaxCur);
            }
        },
        _destroyAjaxRequest = function () {
            _removeAjaxCursor();
            if (mfp.req) {
                mfp.req.abort();
            }
        };

    $.magnificPopup.registerModule(AJAX_NS, {

        options: {
            settings: null,
            cursor: 'mfp-ajax-cur',
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },

        proto: {
            initAjax: function () {
                mfp.types.push(AJAX_NS);
                _ajaxCur = mfp.st.ajax.cursor;

                _mfpOn(CLOSE_EVENT + '.' + AJAX_NS, _destroyAjaxRequest);
                _mfpOn('BeforeChange.' + AJAX_NS, _destroyAjaxRequest);
            },
            getAjax: function (item) {

                if (_ajaxCur) {
                    $(document.body).addClass(_ajaxCur);
                }

                mfp.updateStatus('loading');

                var opts = $.extend({
                    url: item.src,
                    success: function (data, textStatus, jqXHR) {
                        var temp = {
                            data: data,
                            xhr: jqXHR
                        };

                        _mfpTrigger('ParseAjax', temp);

                        mfp.appendContent($(temp.data), AJAX_NS);

                        item.finished = true;

                        _removeAjaxCursor();

                        mfp._setFocus();

                        setTimeout(function () {
                            mfp.wrap.addClass(READY_CLASS);
                        }, 16);

                        mfp.updateStatus('ready');

                        _mfpTrigger('AjaxContentAdded');
                    },
                    error: function () {
                        _removeAjaxCursor();
                        item.finished = item.loadError = true;
                        mfp.updateStatus('error', mfp.st.ajax.tError.replace('%url%', item.src));
                    }
                }, mfp.st.ajax.settings);

                mfp.req = $.ajax(opts);

                return '';
            }
        }
    });

    /*>>ajax*/

    /*>>image*/
    var _imgInterval,
        _getTitle = function (item) {
            if (item.data && item.data.title !== undefined)
                return item.data.title;

            var src = mfp.st.image.titleSrc;

            if (src) {
                if ($.isFunction(src)) {
                    return src.call(mfp, item);
                } else if (item.el) {
                    return item.el.attr(src) || '';
                }
            }
            return '';
        };

    $.magnificPopup.registerModule('image', {

        options: {
            markup: '<div class="mfp-figure">' +
                '<div class="mfp-close"></div>' +
                '<figure>' +
                '<div class="mfp-img"></div>' +
                '<figcaption>' +
                '<div class="mfp-bottom-bar">' +
                '<div class="mfp-title"></div>' +
                '<div class="mfp-counter"></div>' +
                '</div>' +
                '</figcaption>' +
                '</figure>' +
                '</div>',
            cursor: 'mfp-zoom-out-cur',
            titleSrc: 'title',
            verticalFit: true,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },

        proto: {
            initImage: function () {
                var imgSt = mfp.st.image,
                    ns = '.image';

                mfp.types.push('image');

                _mfpOn(OPEN_EVENT + ns, function () {
                    if (mfp.currItem.type === 'image' && imgSt.cursor) {
                        $(document.body).addClass(imgSt.cursor);
                    }
                });

                _mfpOn(CLOSE_EVENT + ns, function () {
                    if (imgSt.cursor) {
                        $(document.body).removeClass(imgSt.cursor);
                    }
                    _window.off('resize' + EVENT_NS);
                });

                _mfpOn('Resize' + ns, mfp.resizeImage);
                if (mfp.isLowIE) {
                    _mfpOn('AfterChange', mfp.resizeImage);
                }
            },
            resizeImage: function () {
                var item = mfp.currItem;
                if (!item || !item.img) return;

                if (mfp.st.image.verticalFit) {
                    var decr = 0;
                    // fix box-sizing in ie7/8
                    if (mfp.isLowIE) {
                        decr = parseInt(item.img.css('padding-top'), 10) + parseInt(item.img.css('padding-bottom'), 10);
                    }
                    item.img.css('max-height', mfp.wH - decr);
                }
            },
            _onImageHasSize: function (item) {
                if (item.img) {

                    item.hasSize = true;

                    if (_imgInterval) {
                        clearInterval(_imgInterval);
                    }

                    item.isCheckingImgSize = false;

                    _mfpTrigger('ImageHasSize', item);

                    if (item.imgHidden) {
                        if (mfp.content)
                            mfp.content.removeClass('mfp-loading');

                        item.imgHidden = false;
                    }

                }
            },

            /**
             * Function that loops until the image has size to display elements that rely on it asap
             */
            findImageSize: function (item) {

                var counter = 0,
                    img = item.img[0],
                    mfpSetInterval = function (delay) {

                        if (_imgInterval) {
                            clearInterval(_imgInterval);
                        }
                        // decelerating interval that checks for size of an image
                        _imgInterval = setInterval(function () {
                            if (img.naturalWidth > 0) {
                                mfp._onImageHasSize(item);
                                return;
                            }

                            if (counter > 200) {
                                clearInterval(_imgInterval);
                            }

                            counter++;
                            if (counter === 3) {
                                mfpSetInterval(10);
                            } else if (counter === 40) {
                                mfpSetInterval(50);
                            } else if (counter === 100) {
                                mfpSetInterval(500);
                            }
                        }, delay);
                    };

                mfpSetInterval(1);
            },

            getImage: function (item, template) {

                var guard = 0,

                    // image load complete handler
                    onLoadComplete = function () {
                        if (item) {
                            if (item.img[0].complete) {
                                item.img.off('.mfploader');

                                if (item === mfp.currItem) {
                                    mfp._onImageHasSize(item);

                                    mfp.updateStatus('ready');
                                }

                                item.hasSize = true;
                                item.loaded = true;

                                _mfpTrigger('ImageLoadComplete');

                            }
                            else {
                                // if image complete check fails 200 times (20 sec), we assume that there was an error.
                                guard++;
                                if (guard < 200) {
                                    setTimeout(onLoadComplete, 100);
                                } else {
                                    onLoadError();
                                }
                            }
                        }
                    },

                    // image error handler
                    onLoadError = function () {
                        if (item) {
                            item.img.off('.mfploader');
                            if (item === mfp.currItem) {
                                mfp._onImageHasSize(item);
                                mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src));
                            }

                            item.hasSize = true;
                            item.loaded = true;
                            item.loadError = true;
                        }
                    },
                    imgSt = mfp.st.image;


                var el = template.find('.mfp-img');
                if (el.length) {
                    var img = document.createElement('img');
                    img.className = 'mfp-img';
                    if (item.el && item.el.find('img').length) {
                        img.alt = item.el.find('img').attr('alt');
                    }
                    item.img = $(img).on('load.mfploader', onLoadComplete).on('error.mfploader', onLoadError);
                    img.src = item.src;

                    // without clone() "error" event is not firing when IMG is replaced by new IMG
                    // TODO: find a way to avoid such cloning
                    if (el.is('img')) {
                        item.img = item.img.clone();
                    }

                    img = item.img[0];
                    if (img.naturalWidth > 0) {
                        item.hasSize = true;
                    } else if (!img.width) {
                        item.hasSize = false;
                    }
                }

                mfp._parseMarkup(template, {
                    title: _getTitle(item),
                    img_replaceWith: item.img
                }, item);

                mfp.resizeImage();

                if (item.hasSize) {
                    if (_imgInterval) clearInterval(_imgInterval);

                    if (item.loadError) {
                        template.addClass('mfp-loading');
                        mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src));
                    } else {
                        template.removeClass('mfp-loading');
                        mfp.updateStatus('ready');
                    }
                    return template;
                }

                mfp.updateStatus('loading');
                item.loading = true;

                if (!item.hasSize) {
                    item.imgHidden = true;
                    template.addClass('mfp-loading');
                    mfp.findImageSize(item);
                }

                return template;
            }
        }
    });

    /*>>image*/

    /*>>zoom*/
    var hasMozTransform,
        getHasMozTransform = function () {
            if (hasMozTransform === undefined) {
                hasMozTransform = document.createElement('p').style.MozTransform !== undefined;
            }
            return hasMozTransform;
        };

    $.magnificPopup.registerModule('zoom', {

        options: {
            enabled: false,
            easing: 'ease-in-out',
            duration: 300,
            opener: function (element) {
                return element.is('img') ? element : element.find('img');
            }
        },

        proto: {

            initZoom: function () {
                var zoomSt = mfp.st.zoom,
                    ns = '.zoom',
                    image;

                if (!zoomSt.enabled || !mfp.supportsTransition) {
                    return;
                }

                var duration = zoomSt.duration,
                    getElToAnimate = function (image) {
                        var newImg = image.clone().removeAttr('style').removeAttr('class').addClass('mfp-animated-image'),
                            transition = 'all ' + (zoomSt.duration / 1000) + 's ' + zoomSt.easing,
                            cssObj = {
                                position: 'fixed',
                                zIndex: 9999,
                                left: 0,
                                top: 0,
                                '-webkit-backface-visibility': 'hidden'
                            },
                            t = 'transition';

                        cssObj['-webkit-' + t] = cssObj['-moz-' + t] = cssObj['-o-' + t] = cssObj[t] = transition;

                        newImg.css(cssObj);
                        return newImg;
                    },
                    showMainContent = function () {
                        mfp.content.css('visibility', 'visible');
                    },
                    openTimeout,
                    animatedImg;

                _mfpOn('BuildControls' + ns, function () {
                    if (mfp._allowZoom()) {

                        clearTimeout(openTimeout);
                        mfp.content.css('visibility', 'hidden');

                        // Basically, all code below does is clones existing image, puts in on top of the current one and animated it

                        image = mfp._getItemToZoom();

                        if (!image) {
                            showMainContent();
                            return;
                        }

                        animatedImg = getElToAnimate(image);

                        animatedImg.css(mfp._getOffset());

                        mfp.wrap.append(animatedImg);

                        openTimeout = setTimeout(function () {
                            animatedImg.css(mfp._getOffset(true));
                            openTimeout = setTimeout(function () {

                                showMainContent();

                                setTimeout(function () {
                                    animatedImg.remove();
                                    image = animatedImg = null;
                                    _mfpTrigger('ZoomAnimationEnded');
                                }, 16); // avoid blink when switching images

                            }, duration); // this timeout equals animation duration

                        }, 16); // by adding this timeout we avoid short glitch at the beginning of animation


                        // Lots of timeouts...
                    }
                });
                _mfpOn(BEFORE_CLOSE_EVENT + ns, function () {
                    if (mfp._allowZoom()) {

                        clearTimeout(openTimeout);

                        mfp.st.removalDelay = duration;

                        if (!image) {
                            image = mfp._getItemToZoom();
                            if (!image) {
                                return;
                            }
                            animatedImg = getElToAnimate(image);
                        }

                        animatedImg.css(mfp._getOffset(true));
                        mfp.wrap.append(animatedImg);
                        mfp.content.css('visibility', 'hidden');

                        setTimeout(function () {
                            animatedImg.css(mfp._getOffset());
                        }, 16);
                    }

                });

                _mfpOn(CLOSE_EVENT + ns, function () {
                    if (mfp._allowZoom()) {
                        showMainContent();
                        if (animatedImg) {
                            animatedImg.remove();
                        }
                        image = null;
                    }
                });
            },

            _allowZoom: function () {
                return mfp.currItem.type === 'image';
            },

            _getItemToZoom: function () {
                if (mfp.currItem.hasSize) {
                    return mfp.currItem.img;
                } else {
                    return false;
                }
            },

            // Get element postion relative to viewport
            _getOffset: function (isLarge) {
                var el;
                if (isLarge) {
                    el = mfp.currItem.img;
                } else {
                    el = mfp.st.zoom.opener(mfp.currItem.el || mfp.currItem);
                }

                var offset = el.offset();
                var paddingTop = parseInt(el.css('padding-top'), 10);
                var paddingBottom = parseInt(el.css('padding-bottom'), 10);
                offset.top -= ($(window).scrollTop() - paddingTop);


                /*
    
                Animating left + top + width/height looks glitchy in Firefox, but perfect in Chrome. And vice-versa.
    
                 */
                var obj = {
                    width: el.width(),
                    // fix Zepto height+padding issue
                    height: (_isJQ ? el.innerHeight() : el[0].offsetHeight) - paddingBottom - paddingTop
                };

                // I hate to do this, but there is no another option
                if (getHasMozTransform()) {
                    obj['-moz-transform'] = obj['transform'] = 'translate(' + offset.left + 'px,' + offset.top + 'px)';
                } else {
                    obj.left = offset.left;
                    obj.top = offset.top;
                }
                return obj;
            }

        }
    });



    /*>>zoom*/

    /*>>iframe*/

    var IFRAME_NS = 'iframe',
        _emptyPage = '//about:blank',

        _fixIframeBugs = function (isShowing) {
            if (mfp.currTemplate[IFRAME_NS]) {
                var el = mfp.currTemplate[IFRAME_NS].find('iframe');
                if (el.length) {
                    // reset src after the popup is closed to avoid "video keeps playing after popup is closed" bug
                    if (!isShowing) {
                        el[0].src = _emptyPage;
                    }

                    // IE8 black screen bug fix
                    if (mfp.isIE8) {
                        el.css('display', isShowing ? 'block' : 'none');
                    }
                }
            }
        };

    $.magnificPopup.registerModule(IFRAME_NS, {

        options: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe>' +
                '</div>',

            srcAction: 'iframe_src',

            // we don't care and support only one default type of URL by default
            patterns: {
                youtube: {
                    index: 'youtube.com',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: '/',
                    src: '//player.vimeo.com/video/%id%?autoplay=1'
                },
                gmaps: {
                    index: '//maps.google.',
                    src: '%id%&output=embed'
                }
            }
        },

        proto: {
            initIframe: function () {
                mfp.types.push(IFRAME_NS);

                _mfpOn('BeforeChange', function (e, prevType, newType) {
                    if (prevType !== newType) {
                        if (prevType === IFRAME_NS) {
                            _fixIframeBugs(); // iframe if removed
                        } else if (newType === IFRAME_NS) {
                            _fixIframeBugs(true); // iframe is showing
                        }
                    }// else {
                    // iframe source is switched, don't do anything
                    //}
                });

                _mfpOn(CLOSE_EVENT + '.' + IFRAME_NS, function () {
                    _fixIframeBugs();
                });
            },

            getIframe: function (item, template) {
                var embedSrc = item.src;
                var iframeSt = mfp.st.iframe;

                $.each(iframeSt.patterns, function () {
                    if (embedSrc.indexOf(this.index) > -1) {
                        if (this.id) {
                            if (typeof this.id === 'string') {
                                embedSrc = embedSrc.substr(embedSrc.lastIndexOf(this.id) + this.id.length, embedSrc.length);
                            } else {
                                embedSrc = this.id.call(this, embedSrc);
                            }
                        }
                        embedSrc = this.src.replace('%id%', embedSrc);
                        return false; // break;
                    }
                });

                var dataObj = {};
                if (iframeSt.srcAction) {
                    dataObj[iframeSt.srcAction] = embedSrc;
                }
                mfp._parseMarkup(template, dataObj, item);

                mfp.updateStatus('ready');

                return template;
            }
        }
    });



    /*>>iframe*/

    /*>>gallery*/
    /**
     * Get looped index depending on number of slides
     */
    var _getLoopedId = function (index) {
        var numSlides = mfp.items.length;
        if (index > numSlides - 1) {
            return index - numSlides;
        } else if (index < 0) {
            return numSlides + index;
        }
        return index;
    },
        _replaceCurrTotal = function (text, curr, total) {
            return text.replace(/%curr%/gi, curr + 1).replace(/%total%/gi, total);
        };

    $.magnificPopup.registerModule('gallery', {

        options: {
            enabled: false,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: true,
            arrows: true,

            tPrev: 'Previous (Left arrow key)',
            tNext: 'Next (Right arrow key)',
            tCounter: '%curr% of %total%'
        },

        proto: {
            initGallery: function () {

                var gSt = mfp.st.gallery,
                    ns = '.mfp-gallery';

                mfp.direction = true; // true - next, false - prev

                if (!gSt || !gSt.enabled) return false;

                _wrapClasses += ' mfp-gallery';

                _mfpOn(OPEN_EVENT + ns, function () {

                    if (gSt.navigateByImgClick) {
                        mfp.wrap.on('click' + ns, '.mfp-img', function () {
                            if (mfp.items.length > 1) {
                                mfp.next();
                                return false;
                            }
                        });
                    }

                    _document.on('keydown' + ns, function (e) {
                        if (e.keyCode === 37) {
                            mfp.prev();
                        } else if (e.keyCode === 39) {
                            mfp.next();
                        }
                    });
                });

                _mfpOn('UpdateStatus' + ns, function (e, data) {
                    if (data.text) {
                        data.text = _replaceCurrTotal(data.text, mfp.currItem.index, mfp.items.length);
                    }
                });

                _mfpOn(MARKUP_PARSE_EVENT + ns, function (e, element, values, item) {
                    var l = mfp.items.length;
                    values.counter = l > 1 ? _replaceCurrTotal(gSt.tCounter, item.index, l) : '';
                });

                _mfpOn('BuildControls' + ns, function () {
                    if (mfp.items.length > 1 && gSt.arrows && !mfp.arrowLeft) {
                        var markup = gSt.arrowMarkup,
                            arrowLeft = mfp.arrowLeft = $(markup.replace(/%title%/gi, gSt.tPrev).replace(/%dir%/gi, 'left')).addClass(PREVENT_CLOSE_CLASS),
                            arrowRight = mfp.arrowRight = $(markup.replace(/%title%/gi, gSt.tNext).replace(/%dir%/gi, 'right')).addClass(PREVENT_CLOSE_CLASS);

                        arrowLeft.click(function () {
                            mfp.prev();
                        });
                        arrowRight.click(function () {
                            mfp.next();
                        });

                        mfp.container.append(arrowLeft.add(arrowRight));
                    }
                });

                _mfpOn(CHANGE_EVENT + ns, function () {
                    if (mfp._preloadTimeout) clearTimeout(mfp._preloadTimeout);

                    mfp._preloadTimeout = setTimeout(function () {
                        mfp.preloadNearbyImages();
                        mfp._preloadTimeout = null;
                    }, 16);
                });


                _mfpOn(CLOSE_EVENT + ns, function () {
                    _document.off(ns);
                    mfp.wrap.off('click' + ns);
                    mfp.arrowRight = mfp.arrowLeft = null;
                });

            },
            next: function () {
                mfp.direction = true;
                mfp.index = _getLoopedId(mfp.index + 1);
                mfp.updateItemHTML();
            },
            prev: function () {
                mfp.direction = false;
                mfp.index = _getLoopedId(mfp.index - 1);
                mfp.updateItemHTML();
            },
            goTo: function (newIndex) {
                mfp.direction = (newIndex >= mfp.index);
                mfp.index = newIndex;
                mfp.updateItemHTML();
            },
            preloadNearbyImages: function () {
                var p = mfp.st.gallery.preload,
                    preloadBefore = Math.min(p[0], mfp.items.length),
                    preloadAfter = Math.min(p[1], mfp.items.length),
                    i;

                for (i = 1; i <= (mfp.direction ? preloadAfter : preloadBefore); i++) {
                    mfp._preloadItem(mfp.index + i);
                }
                for (i = 1; i <= (mfp.direction ? preloadBefore : preloadAfter); i++) {
                    mfp._preloadItem(mfp.index - i);
                }
            },
            _preloadItem: function (index) {
                index = _getLoopedId(index);

                if (mfp.items[index].preloaded) {
                    return;
                }

                var item = mfp.items[index];
                if (!item.parsed) {
                    item = mfp.parseEl(index);
                }

                _mfpTrigger('LazyLoad', item);

                if (item.type === 'image') {
                    item.img = $('<img class="mfp-img" />').on('load.mfploader', function () {
                        item.hasSize = true;
                    }).on('error.mfploader', function () {
                        item.hasSize = true;
                        item.loadError = true;
                        _mfpTrigger('LazyLoadError', item);
                    }).attr('src', item.src);
                }


                item.preloaded = true;
            }
        }
    });

    /*>>gallery*/

    /*>>retina*/

    var RETINA_NS = 'retina';

    $.magnificPopup.registerModule(RETINA_NS, {
        options: {
            replaceSrc: function (item) {
                return item.src.replace(/\.\w+$/, function (m) { return '@2x' + m; });
            },
            ratio: 1 // Function or number.  Set to 1 to disable.
        },
        proto: {
            initRetina: function () {
                if (window.devicePixelRatio > 1) {

                    var st = mfp.st.retina,
                        ratio = st.ratio;

                    ratio = !isNaN(ratio) ? ratio : ratio();

                    if (ratio > 1) {
                        _mfpOn('ImageHasSize' + '.' + RETINA_NS, function (e, item) {
                            item.img.css({
                                'max-width': item.img[0].naturalWidth / ratio,
                                'width': '100%'
                            });
                        });
                        _mfpOn('ElementParse' + '.' + RETINA_NS, function (e, item) {
                            item.src = st.replaceSrc(item, ratio);
                        });
                    }
                }

            }
        }
    });

    /*>>retina*/
    _checkInstance();
}));
// Custom scrolling speed with jQuery
// Source: github.com/ByNathan/jQuery.scrollSpeed
// Version: 1.0.2

/*
(function($) {
    
    jQuery.scrollSpeed = function(step, speed, easing) {
        
        var $document = $(document),
            $window = $(window),
            $body = $('html, body'),
            option = easing || 'default',
            root = 0,
            scroll = false,
            scrollY,
            scrollX,
            view;
            
        if (window.navigator.msPointerEnabled)
        
            return false;
            
        $window.on('mousewheel DOMMouseScroll', function(e) {
            
            var deltaY = e.originalEvent.wheelDeltaY,
                detail = e.originalEvent.detail;
                scrollY = $document.height() > $window.height();
                scrollX = $document.width() > $window.width();
                scroll = true;
            
            if (scrollY) {
                
                view = $window.height();
                    
                if (deltaY < 0 || detail > 0)
            
                    root = (root + view) >= $document.height() ? root : root += step;
                
                if (deltaY > 0 || detail < 0)
            
                    root = root <= 0 ? 0 : root -= step;
                
                $body.stop().animate({
            
                    scrollTop: root
                
                }, speed, option, function() {
            
                    scroll = false;
                
                });
            }
            
            if (scrollX) {
                
                view = $window.width();
                    
                if (deltaY < 0 || detail > 0)
            
                    root = (root + view) >= $document.width() ? root : root += step;
                
                if (deltaY > 0 || detail < 0)
            
                    root = root <= 0 ? 0 : root -= step;
                
                $body.stop().animate({
            
                    scrollLeft: root
                
                }, speed, option, function() {
            
                    scroll = false;
                
                });
            }
            
            return false;
            
        }).on('scroll', function() {
            
            if (scrollY && !scroll) root = $window.scrollTop();
            if (scrollX && !scroll) root = $window.scrollLeft();
            
        }).on('resize', function() {
            
            if (scrollY && !scroll) view = $window.height();
            if (scrollX && !scroll) view = $window.width();
            
        });       
    };
    
    jQuery.easing.default = function (x,t,b,c,d) {
    
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    };
    
})(jQuery);

*/

/**
 * Created by IntelliJ IDEA.
 *
 * User: phil
 * Date: 15/11/12
 * Time: 11:04 AM
 *
 */
(function ($) {

    var self = this, container, running = false, currentY = 0, targetY = 0, oldY = 0, maxScrollTop = 0, minScrollTop, direction, onRenderCallback = null,
        fricton = 0.95, // higher value for slower deceleration
        vy = 0,
        stepAmt = 1,
        minMovement = 0.1,
        ts = 0.1;

    var updateScrollTarget = function (amt) {
        targetY += amt;
        vy += (targetY - oldY) * stepAmt;

        oldY = targetY;


    }
    var render = function () {
        if (vy < -(minMovement) || vy > minMovement) {

            currentY = (currentY + vy);
            if (currentY > maxScrollTop) {
                currentY = vy = 0;
            } else if (currentY < minScrollTop) {
                vy = 0;
                currentY = minScrollTop;
            }

            container.scrollTop(-currentY);

            vy *= fricton;

            //   vy += ts * (currentY-targetY);
            // scrollTopTweened += settings.tweenSpeed * (scrollTop - scrollTopTweened);
            // currentY += ts * (targetY - currentY);

            if (onRenderCallback) {
                onRenderCallback();
            }
        }
    }
    var animateLoop = function () {
        if (!running) return;
        requestAnimFrame(animateLoop);
        render();
        //log("45","animateLoop","animateLoop", "",stop);
    }
    var onWheel = function (e) {
        e.preventDefault();
        var evt = e.originalEvent;

        var delta = evt.detail ? evt.detail * -1 : evt.wheelDelta / 40;
        var dir = delta < 0 ? -1 : 1;
        if (dir != direction) {
            vy = 0;
            direction = dir;
        }

        //reset currentY in case non-wheel scroll has occurred (scrollbar drag, etc.)
        currentY = -container.scrollTop();

        updateScrollTarget(delta);
    }

    /*
     * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
     */
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };


    })();

    /*
     * http://jsbin.com/iqafek/2/edit
     */
    var normalizeWheelDelta = function () {
        // Keep a distribution of observed values, and scale by the
        // 33rd percentile.
        var distribution = [], done = null, scale = 30;
        return function (n) {
            // Zeroes don't count.
            if (n == 0) return n;
            // After 500 samples, we stop sampling and keep current factor.
            if (done != null) return n * done;
            var abs = Math.abs(n);
            // Insert value (sorted in ascending order).
            outer: do { // Just used for break goto
                for (var i = 0; i < distribution.length; ++i) {
                    if (abs <= distribution[i]) {
                        distribution.splice(i, 0, abs);
                        break outer;
                    }
                }
                distribution.push(abs);
            } while (false);
            // Factor is scale divided by 33rd percentile.
            var factor = scale / distribution[Math.floor(distribution.length / 3)];
            if (distribution.length == 500) done = factor;
            return n * factor;
        };
    }();


    $.fn.smoothWheel = function () {
        //  var args = [].splice.call(arguments, 0);
        var options = jQuery.extend({}, arguments[0]);
        return this.each(function (index, elm) {

            if (!('ontouchstart' in window)) {
                container = $(this);
                container.bind("mousewheel", onWheel);
                container.bind("DOMMouseScroll", onWheel);

                //set target/old/current Y to match current scroll position to prevent jump to top of container
                targetY = oldY = container.get(0).scrollTop;
                currentY = -targetY;

                minScrollTop = container.get(0).clientHeight - container.get(0).scrollHeight;
                if (options.onRender) {
                    onRenderCallback = options.onRender;
                }
                if (options.remove) {
                    log("122", "smoothWheel", "remove", "");
                    running = false;
                    container.unbind("mousewheel", onWheel);
                    container.unbind("DOMMouseScroll", onWheel);
                } else if (!running) {
                    running = true;
                    animateLoop();
                }

            }
        });
    };


})(jQuery);
$(document).ready(function () {
    // meet the team
    if ($('#theTeamTiles').length) {
        $('#theTeamTiles .galtls-item').on('click', function (e) {
            e.preventDefault();
            var $el = $(this);

            $el.addClass('is-current').toggleClass('is-expanded');
            var $other = $el.parents('#theTeamTiles').find('.is-expanded').not('.is-current');
            $other.removeClass('is-expanded is-current');
            $other.find('.galtls-detail ').slideUp(0);
            $el.removeClass('is-current');

            var $detail = $el.find('.galtls-detail');

            $detail.css({
                'width': $el.parents('#theTeamTiles').outerWidth(),
                'left': -($el.position().left + 5)
            });

            if (!$el.hasClass('is-expanded')) {
                $detail.slideUp(0);
            } else {
                $detail.slideDown();
            }
        });

        var timeOutTeamTiles;
        $(window).on('resize', function () {
            if (timeOutTeamTiles) {
                clearTimeout(timeOutTeamTiles);
            };

            timeOutTeamTiles = setTimeout(function () {
                // your code 
                if ($('#theTeamTiles .galtls-item.is-expanded').length) {
                    var $current = $('#theTeamTiles .galtls-item.is-expanded');
                    $current.find('.galtls-detail').css({
                        'width': $('#theTeamTiles').outerWidth(),
                        'left': -($current.position().left + 5)
                    });
                }

            }, 350);
        });
    };


    /*-------------------------------------------------------------------------------------------------------------------
		THE TEAM SORTING AND FILTER
    -------------------------------------------------------------------------------------------------------------------*/
    // The Team Tiles sorting    
    var $sortFilterTeamGrid = $('#theTeamTiles'),
        $sizerTeamGrid = $sortFilterTeamGrid.find('.shuffle__sizer');

    $sortFilterTeamGrid.imagesLoaded().progress(function () {
        $sortFilterTeamGrid.shuffle({
            itemSelector: '.galtls-item',
            sizer: $sizerTeamGrid
        });

        //Meet the team
        $('#teamSorting').on('change', function () {
            var $select = $(this).val(),
                opts = {};

            $('#theTeamTiles').find('.galtls-detail').slideUp(0);
            $('#theTeamTiles').find('.is-expanded').removeClass('is-expanded');

            // We're given the element wrapped in jQuery
            if ($select === 'Name') {
                opts = {
                    by: function ($el) {
                        return $el.data('name');
                    }
                };
            } else if ($select === 'Position') {
                opts = {
                    by: function ($el) {
                        return $el.data('position').toLowerCase();
                    }
                };
            }
            // Filter elements
            $sortFilterTeamGrid.shuffle('sort', opts);
        });


    });

    // The Team Tiles filter
    var $locationTeamGrid = $('#teamFilter').find('.sidnav-heading .sidnav-check');
    var $locationLabelTeamGrid = $('#teamFilter').find('.sidnav-heading a');
    var $categoryTeamGrid = $('#teamFilter').find('.sidnav-body a');

    var valueInArrayTeam = function(arr, location, category) {
		var arrIdx = -1;
		for(var a = 0; a < arr.length; a++) {
			var locationArray = location ? location.split(',') : []

			if(locationArray.includes($(arr[a]['location']).selector)) {
				arrIdx =a;
				a=arr.length;
			}
		};

        if (arrIdx != -1) {
            if (category != "") {
                // if has category
                if ($.inArray(category, $(arr[arrIdx]['categories'])) != -1) {
                    return true;
                } else {
                    return false;
                }
            } else {
                // if doesn't a have category
                return true;
            }
        } else {
            return false;
        };
    };

    var filterTeamTiles = function () {
        var group = [];

        for (var a = 0; a < $locationTeamGrid.length; a++) {
            var $loc = $($locationTeamGrid[a]);
            if ($loc.hasClass('is-checked')) {

                var $cat = [],
                    $child = $loc.parent().siblings('.sidnav-body').find('a');

                for (var b = 0; b < $child.length; b++) {
                    var $ch = $($child[b]);
                    if ($ch.hasClass('is-selected')) {
                        $cat.push($ch.data('category'));
                    }
                }

                group.push({ 'location': $($locationTeamGrid[a]).data('location'), 'categories': $cat });
            }
        };

        //console.log(group);

        if (group.length > 0) {
            $sortFilterTeamGrid.shuffle('shuffle', function ($el, shuffle) {
                var $newElement = "";

                $.each($el, function (index, value) {

                    if (valueInArrayTeam(group, $(value).data('location'), $(value).data('category'))) {
                        $newElement += value;
                    }

                });

                return $newElement;

            });


        } else {
            $sortFilterTeamGrid.shuffle('shuffle', 'all');
        }
    };

    $locationLabelTeamGrid.on('click', function () {
        if ($(this).parents().hasClass('is-nosubnav')) {
            $(this).siblings("span").trigger("click");
        }
    });

    $locationTeamGrid.on('click', function () {
        filterTeamTiles();
    });

    $categoryTeamGrid.on('click', function () {
        filterTeamTiles();
    });
});
$(document).ready(function () {

    /*-------------------------------------------------------------------------------------------------------------------
       AGENTS SORTING AND FILTER
   -------------------------------------------------------------------------------------------------------------------*/
    // Agents Tiles sorting
    var $sortFilterAgentGrid = $('#agentTiles'),
        $sizerAgentGrid = $sortFilterAgentGrid.find('.shuffle__sizer');


    $sortFilterAgentGrid.shuffle({
        itemSelector: '.agent-item',
        sizer: $sizerAgentGrid
    });

    $('#agentSorting').on('change', function () {

        var $select = $(this).val(),
            opts = {};



        // We're given the element wrapped in jQuery
        if ($select === 'city') {
            opts = {
                by: function ($el) {
                    return $el.data('city');
                }
            };
        } else if ($select === 'agent name') {
            opts = {
                by: function ($el) {
                    return $el.data('name').toLowerCase();
                }
            };
        } else if ($select === 'country') {
            opts = {
                by: function ($el) {
                    return $el.data('country').toLowerCase();
                }
            };
        }

        // Filter elements
        $sortFilterAgentGrid.shuffle('sort', opts);
    });

    // Agent Tiles filter
    var $countryAgentGrid = $('#agentFilter').find('.sidnav-heading .sidnav-check');
    var $cityAgentGrid = $('#agentFilter').find('.sidnav-body a');

    var valueInArrayAgent = function (arr, country, city) {
        var arrIdx = -1;
        for (var a = 0; a < arr.length; a++) {
            if ($(arr[a]['country']).selector === country) {
                arrIdx = a;
                a = arr.length;
            }
        }

        if (arrIdx != -1) {
            if ($.inArray(city, $(arr[arrIdx]['cities'])) != -1) {
                return true;
            }
        } else {
            return false;
        }
    };

    var filterAgentTiles = function () {
        var group = [];

        for (var a = 0; a < $countryAgentGrid.length; a++) {
            var $cntry = $($countryAgentGrid[a]);
            if ($cntry.hasClass('is-checked')) {

                var $cat = [],
                    $city = $cntry.parent().siblings('.sidnav-body').find('a');

                for (var b = 0; b < $city.length; b++) {
                    var $ch = $($city[b]);
                    if ($ch.hasClass('is-selected')) {
                        $cat.push($ch.data('city'));
                    }
                }

                group.push({ 'country': $($countryAgentGrid[a]).data('country'), 'cities': $cat });
            }
        };

        if (group.length > 0) {
            $sortFilterAgentGrid.shuffle('shuffle', function ($el, shuffle) {
                var $newElement = "";

                $.each($el, function (index, value) {

                    if (valueInArrayAgent(group, $(value).data('country'), $(value).data('city'))) {
                        $newElement += value;
                    }

                });

                return $newElement;

            });


        } else {
            $sortFilterAgentGrid.shuffle('shuffle', 'all');
        }
    };

    $countryAgentGrid.on('click', function () {
        filterAgentTiles();
    });

    $cityAgentGrid.on('click', function () {
        filterAgentTiles();
    });

});
$(document).ready(function () {
    function checkAttrubute(attr) {
        if (typeof attr !== typeof undefined && attr !== false) {
            return true;
        } else {
            return false;
        }
    };

    $(document).on("click", '.btnSubmitValidate', function (e) {
        var status = true,
            $form = $(this).parents('.form-wrapper'),
            $control = $form.find('.form-control'),
            $radio = $form.find('.radio'),
            $checkbox = $form.find('.checkbox');

        // cleanup the form
        $form.find('.error').removeClass('error');

        //form control
        for (var a = 0; a < $control.length; a++) {
            var $el = $($control[a]);
            if ($el.closest('.form-item').is(":visible")) {
                if (checkAttrubute($el.attr('required'))) {
                    if ($el.val() === "" || $el.val() === null) {
                        status = false;
                        $el.closest('.form-item').addClass('error');
                    } else {
                        // validate email
                        if ($el.attr('type') === "email") {
                            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                            if (!re.test($el.val())) {
                                status = false;
                                $el.closest('.form-item').addClass('error');
                            }
                        };

                        // validate range
                        if ($el.hasClass('rangeValidation')) {
                            if (checkAttrubute($el.attr('data-min-value'))) {
                                if (parseInt($el.val()) < $el.data('min-value')) {
                                    status = false;
                                    $el.closest('.form-item').addClass('error');
                                };
                            };
                        };

                        // validate on relates 
                        if (checkAttrubute($el.attr('data-relates'))) {
                            var $relates = $el.data('relates');

                            if ($el.val() === $($relates).val()) {
                                status = false;
                                $($relates).closest('.form-item').addClass('error');
                            }
                        };
                    };
                };
            };
        };

        // radio button
        for (var a = 0; a < $radio.length; a++) {
            var $el = $($radio[a]),
                $input = $el.find('input[type="radio"]'),
                $wrapper = $el.closest('.form-item'),
                isRequired = false;


            if ($wrapper.is(":visible")) {

                for (var b = 0; b < $input.length; b++) {
                    if (checkAttrubute($($input[b]).attr('required'))) {
                        isRequired = true;
                    };
                };

                if (isRequired) {
                    if (typeof $el.find('input[type="radio"]:checked').val() === typeof undefined) {
                        $wrapper.addClass('error');
                        status = false;
                    };
                };
            };
        };

        // checkbox
        for (var a = 0; a < $checkbox.length; a++) {
            var $el = $($checkbox[a]),
                $wrapper = $el.closest('.form-item');



            if ($wrapper.is(":visible")) {
                var $input = $el.find('input[type="checkbox"]');

                if (checkAttrubute($input.attr('required'))) {
                    if ($input.prop("checked") === false) {
                        $wrapper.addClass('error');
                        status = false;
                    };
                };
            };
        };

        ////Capcha
        //if (typeof grecaptcha !== "undefined") {
        //    var response = grecaptcha.getResponse();
        //    $("#gcaptcharesponse").val(response);
        //    if (response === "") {
        //        status = false;
        //        console.log("Google recaptcha failed.");
        //        //$wrapper.addClass('error');
        //    }
        //}


        if (!status) {
            e.preventDefault();
            var body = $("html, body"),
                getScrollTop = $form.find(".error:first").offset().top - 90;

            getScrollTop = getScrollTop > 0 ? getScrollTop : 0;

            body.stop().animate({ scrollTop: getScrollTop }, '500', 'swing');

        }
        else {
            $(".btnSubmitApplication").addClass("disabled");
        }
    });


    //================================== form error remove ===============================  
    $('.form-control').on('focus', function () {
        $(this).parents('.error').removeClass('error');
    });

    $('.radio label, .bootstrap-select.form-control .dropdown-toggle, .checkbox-list label, .checkbox-list input[type="checkbox"], .checkbox label, .checkbox input[type="checkbox"]').on('click', function () {
        $(this).parents('.error').removeClass('error');
    });

    //================================== form show hide =============================== 

    $('.radio.showhide').each(function () {
        var $this = $(this),
            $input = $this.find('input[type="radio"]');

        $input.on("click", function () {
            if ($(this).val() === $this.data('default')) {

                if (checkAttrubute($this.attr('data-opposite'))) {
                    $($this.data('opposite')).collapse('hide');
                }

                $($this.data('target')).collapse('show');

            } else {
                if (checkAttrubute($this.attr('data-opposite'))) {
                    $($this.data('opposite')).collapse('show');
                }

                $($this.data('target')).collapse('hide');
            }
        });

    });




    if ($("[data-collapse]").length > 0) {
        /*
     * Collapse plugin for jQuery
     * --
     * source: http://github.com/danielstocks/jQuery-Collapse/
     * site: http://webcloud.se/jQuery-Collapse
     *
     * @author Daniel Stocks (http://webcloud.se)
     * Copyright 2013, Daniel Stocks
     * Released under the MIT, BSD, and GPL Licenses.
     */

        (function ($, exports) {

            // Constructor
            function Collapse(el, options) {
                options = options || {};
                var _this = this,
                    query = options.query || "> :even";

                $.extend(_this, {
                    $el: el,
                    options: options,
                    sections: [],
                    isAccordion: options.accordion || false,
                    db: options.persist ? jQueryCollapseStorage(el.get(0).id) : false
                });

                // Figure out what sections are open if storage is used
                _this.states = _this.db ? _this.db.read() : [];

                // For every pair of elements in given
                // element, create a section
                _this.$el.find(query).each(function () {
                    new jQueryCollapseSection($(this), _this);
                });

                // Capute ALL the clicks!
                (function (scope) {
                    _this.$el.on("click", "[data-collapse-summary] " + (scope.options.clickQuery || ""),
                        $.proxy(_this.handleClick, scope));

                    _this.$el.bind("toggle close open",
                        $.proxy(_this.handleEvent, scope));

                }(_this));
            }

            Collapse.prototype = {
                handleClick: function (e, state) {
                    e.preventDefault();
                    state = state || "toggle";
                    var sections = this.sections,
                        l = sections.length;
                    while (l--) {
                        if ($.contains(sections[l].$summary[0], e.target)) {
                            sections[l][state]();
                            break;
                        }
                    }
                },
                handleEvent: function (e) {
                    if (e.target == this.$el.get(0)) return this[e.type]();
                    this.handleClick(e, e.type);
                },
                open: function (eq) {
                    this._change("open", eq);
                },
                close: function (eq) {
                    this._change("close", eq);
                },
                toggle: function (eq) {
                    this._change("toggle", eq);
                },
                _change: function (action, eq) {
                    if (isFinite(eq)) return this.sections[eq][action]();
                    $.each(this.sections, function (i, section) {
                        section[action]();
                    });
                }
            };

            // Section constructor
            function Section($el, parent) {

                if (!parent.options.clickQuery) $el.wrapInner('<span />');

                $.extend(this, {
                    isOpen: false,
                    $summary: $el.attr("data-collapse-summary", ""),
                    $details: $el.next(),
                    options: parent.options,
                    parent: parent
                });
                parent.sections.push(this);

                // Check current state of section
                var state = parent.states[this._index()];

                if (state === 0) {
                    this.close(true);
                }
                else if (this.$summary.is(".open") || state === 1) {
                    this.open(true);
                } else {
                    this.close(true);
                }
            }

            Section.prototype = {
                toggle: function () {
                    this.isOpen ? this.close() : this.open();
                },
                close: function (bypass) {
                    this._changeState("close", bypass);
                },
                open: function (bypass) {
                    var _this = this;
                    if (_this.options.accordion && !bypass) {
                        $.each(_this.parent.sections, function (i, section) {
                            section.close();
                        });
                    }
                    _this._changeState("open", bypass);
                },
                _index: function () {
                    return $.inArray(this, this.parent.sections);
                },
                _changeState: function (state, bypass) {

                    var _this = this;
                    _this.isOpen = state == "open";
                    if ($.isFunction(_this.options[state]) && !bypass) {
                        _this.options[state].apply(_this.$details);
                    } else {
                        _this.$details[_this.isOpen ? "show" : "hide"]();
                    }

                    _this.$summary.toggleClass("open", state !== "close");
                    _this.$details.attr("aria-hidden", state === "close");
                    _this.$summary.attr("aria-expanded", state === "open");
                    _this.$summary.trigger(state === "open" ? "opened" : "closed", _this);
                    if (_this.parent.db) {
                        _this.parent.db.write(_this._index(), _this.isOpen);
                    }
                }
            };

            // Expose in jQuery API
            $.fn.extend({
                collapse: function (options, scan) {
                    var nodes = (scan) ? $("body").find("[data-collapse]") : $(this);
                    return nodes.each(function () {
                        var settings = (scan) ? {} : options,
                            values = $(this).attr("data-collapse") || "";
                        $.each(values.split(" "), function (i, v) {
                            if (v) settings[v] = true;
                        });
                        new Collapse($(this), settings);
                    });
                }
            });

            // Expose constructor to
            // global namespace
            exports.jQueryCollapse = Collapse;
            exports.jQueryCollapseSection = Section;

            //jQuery DOM Ready
            $(function () {
                $.fn.collapse(false, true);
            });

        })(window.jQuery, window);
    };




});



