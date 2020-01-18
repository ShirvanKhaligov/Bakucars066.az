"use strict";

/**
 * [TABLE OF CONTENT]
 * 
 * 1. Mobile Menu
 * 2. Active Slider
 * 3. Date & Time Picker
 * 4. Ratting Input
 * 5. Color Filter Input
 * 6. Google map
 * 7. Lightbox for Gallery
 * 8. isInViewport jQuery Plugin
 * 9. Animated CountUp
 * 10. Preloader
 */
(function($) {
    /**
     * 1. Main Nav Menu
     */
    $('#rn-navbar-toggler').on('click', function() {
        var toggler = $(this);
        toggler.toggleClass('rn-active').next().toggleClass('rn-navbar-active');
    });
    $('.rn-navbar li > a').on('click', function(e) {
        var item = $(this);

        if (item.next().length) {
            e.preventDefault();
            e.stopPropagation();
            item.toggleClass('rn-active').parent().siblings().find('> a').removeClass('rn-active');
        }
    });
    /**
     * 2. Custom Data for Slider
     */

    $('.beactive').addClass('active').removeClass('beactive');
    /**
     * 3. Date & Time Picker
     */

    var dropDateStart = new Date();
    var pickupDate = flatpickr("#pickup-date", {
        minDate: new Date(),
        onChange: function onChange(selectedDates, dateStr) {
            var tmpDate = new Date(dateStr);
            dropDateStart.setDate(tmpDate.getDate() + 1);
        }
    });
    var pickupTime = flatpickr("#pickup-time", {
        enableTime: true,
        noCalendar: true
    });
    var dropDate = flatpickr("#drop-date", {
        minDate: new Date(),
        onOpen: [function(selectedDates, dateStr, instance) {
            if (pickupDate.selectedDates.length) {
                instance.set('minDate', dropDateStart);
            }
        }]
    });
    var dropTime = flatpickr("#drop-time", {
        enableTime: true,
        noCalendar: true
    });
    /**
     * 4. Ratting Input for Car Review
     */

    $('.rn-rating-input').each(function() {
        var inputContainer = $(this),
            valueInput = inputContainer.find('.rn-rating-value-input'),
            starInput = inputContainer.find('.rn-rating-main-input');
        starInput.starrr({
            change: function change(e, value) {
                valueInput.val(value);
            }
        });
    });
    /**
     * 5. Car Search Color Filter
     */

    $(".rn-car-color-filter input[type=checkbox]").change(function() {
        var checkbox = $(this),
            checked = checkbox.is(':checked');
        $(".rn-car-color-filter input[type=checkbox]").prop('checked', false);

        if (checked) {
            checkbox.prop('checked', true);
        }
    });
    /**
     * 6. Google map
     */

    var initGoogleMap = function initGoogleMap(element) {
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 11,
            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(40.6700, -73.9400),
            // New York
            // How you would like to style the map. 
            // This is where you would paste any style found on Snazzy Maps.
            styles: [{
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#444444"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                    "color": "#f2f2f2"
                }]
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 45
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                    "color": "#e3eef3"
                }, {
                    "visibility": "on"
                }]
            }]
        };
        var icon = {
            path: 'M15,50a1.287,1.287,0,0,1-.991-.473c0-.009-.02-.026-.034-.05l-.029-.039A84.381,84.381,0,0,1,7.031,38.557,68.782,68.782,0,0,1,2.207,27.518,40.679,40.679,0,0,1,0,15a15,15,0,0,1,30,0,40.679,40.679,0,0,1-2.207,12.52,69.449,69.449,0,0,1-4.819,11.039A84.5,84.5,0,0,1,16.05,49.433l-.029.04c-.015.023-.029.04-.034.048A1.306,1.306,0,0,1,15,50ZM15,7.5A7.5,7.5,0,1,0,22.5,15,7.507,7.507,0,0,0,15,7.5Z',
            fillColor: '#42db0c',
            fillOpacity: 1,
            scale: 1,
            strokeWeight: 0
        };
        var map = new google.maps.Map(element, mapOptions);
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(40.6700, -73.9400),
            map: map,
            icon: icon,
            title: 'Snazzy!'
        });
        var infowindow = new google.maps.InfoWindow({
            content: '1425 Pointe Lane, Miami<br />Florida – 33169, USA'
        });
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    };

    var googleMap = document.getElementById('rn-google-map');

    if (googleMap) {
        initGoogleMap(googleMap);
    }
    /**
     * 7. Lightbox for Gallery
     */


    $('.rn-lightbox-images').magnificPopup({
        delegate: 'a.rn-lightbox-image',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300,
            // don't foget to change the duration also in CSS
            opener: function opener(element) {
                return element.find('img');
            }
        }
    });
    /**
     * 8. Vievport Checking plugin
     */

    $.fn.isInViewport = function() {
        var $this = $(this),
            elementTop = $this.offset().top,
            elementBottom = elementTop + $this.outerHeight(),
            $window = $(window);
        var viewportTop = $window.scrollTop();
        var viewportBottom = viewportTop + $window.height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    };
    /**
     * 9. Animated CountUp
     */


    $(window).on('scroll', function() {
        animateCounters();
    });

    var animateCounters = function animateCounters() {
        $('.rn-counter-item').each(function() {
            var countUpItem = $(this);

            if (countUpItem.isInViewport() && !countUpItem.prop('animated')) {
                countUpItem.prop('animated', true).find('.rn-counter-number').prop('Counter', 0).animate({
                    Counter: parseInt(countUpItem.text())
                }, {
                    duration: 4000,
                    easing: 'swing',
                    step: function step(now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            }
        });
    };
})(jQuery);
/**
 * 10. Preloader
 */


$(window).on('load', function() {
    $('#preloader').fadeOut("slow");
    $('#preloader-overlayer').fadeOut("slow");
    $('body').removeClass('rn-preloader');
});