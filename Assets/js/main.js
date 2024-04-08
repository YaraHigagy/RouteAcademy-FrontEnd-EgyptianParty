/* ========== SlideToggle ========== */

$('.singer').on('click', 'h3', function() {
    $(this).parent('.singer').siblings().each(function() {
        $(this).removeClass('active')
            .children('p').slideUp(600);
    });
    $(this).siblings('p').slideToggle(600)
        .parent().addClass('active');
})

/* ===== Solution without 'active' class form gemini But more lines ===== */
// $('.singer').on('click', 'h3', function() {
//     // Get the clicked singer element's sibling paragraph
//     var clickedSingerParagraph = $(this).siblings('p');

//     // Loop through all singer elements
//     $(this).parent('.singer').siblings().each(function() {
//         // Get the current singer element's paragraph
//         var currentSingerParagraph = $(this).children('p');

//         // If the current singer element is not the clicked one
//         if (currentSingerParagraph != clickedSingerParagraph) {
//             // Slide up any open paragraphs
//             currentSingerParagraph.slideUp(600);
//         }
//     });

//     // Toggle the visibility of the clicked singer's paragraph
//     clickedSingerParagraph.slideToggle(600);
// });

/* ========== Time Count Down ========== */
var duration, interval, date;

// $('#getDate').change(function () {
//     this.date = `${$(this).val()}T22:00:00`;
// });
// var eventDateRow = Date.parse(date);

var eventDateRow = Date.parse('2024-05-10T22:00:00');
$(document).ready(function() {
    countdown();  // To avoid delay
    interval = setInterval(countdown, 1000);
});

/**
 * display the countdown timer's values
 */
function countdown() {
    let eventDate = getDuration(eventDateRow);

    $('#days').text('-' + eventDate.days + 'd');
    $('#hours').text(eventDate.hours + 'h');
    $('#minutes').text(eventDate.minutes + 'm');
    $('#seconds').text(eventDate.seconds + 's');

    if (duration <= 0) {
        clearInterval(interval);
        $('.countdown').text('... 🎊 🥳 Celebrate Party! 🎉🎉...');
        $('.countdown').children().css('display', 'none');
    }

    duration -= 1000;
}

/**
 * 
 * @param {*} eventDate 
 * @returns object: {duration, days, hours, minutes, seconds}
 */
function getDuration(endTime) {
    const duration = endTime - $.now();
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    const hours = Math.floor(duration / (1000 * 60 * 60) % 24);
    const minutes = Math.floor((duration / (1000 * 60))) % 60;
    const seconds = Math.floor((duration / (1000))) % 60;

    return {duration, days, hours, minutes, seconds}
}

/* ========== Textarea Count Down ========== */

var counter = 100;
$('#chars').text(counter);

$('[name="message"]').on('input propertychange', function(e) {
    var text = e.target.value;

    counter = 100 - text.length;
    $('#chars').text(counter);

    if(text.length > 100) {
        e.target.value = text.slice(0, 100) + '';
        e.preventDefault();
        $('#chars').text('your available character finished');
    }
})

/* ========== Navbar scroll ========== */

// const navListArr = [];

// $('header ul').children('li').each(function() {
//     var navRef = $(this).children('a').attr('href');
//     navListArr.push(navRef);
// })

const homeOffsetTop = $('#hero').offset().top;
const detailsOffsetTop = $('#details').offset().top;
const durationOffsetTop = $('#duration').offset().top;
const contactOffsetTop = $('#contact').offset().top;

var navList = [
    {
        ref: '#hero',
        offsetTop: homeOffsetTop,
    },
    {
        ref: '#details',
        offsetTop: detailsOffsetTop,
    },
    {
        ref: '#duration',
        offsetTop: durationOffsetTop,
    },
    {
        ref: '#contact',
        offsetTop: contactOffsetTop,
    },
]

/* navigate between sections when clicking on navbar's links */
$('header ul>li>a').on('click', function() {
    const currSection = $(this).attr('href');
    const secOffsetTop = $(currSection).offset().top;
    $('html', 'body').animate({scrollTop: secOffsetTop}, 2000);
    
    $(this).addClass('text-accent')
    .parent('li').siblings()
    .children('a').each(function() {
        $(this).removeClass('text-accent')
    });
})

/* Change anchors' text-color while scrolling through refered sections */
$(window).on('scroll', function () {
    if($('header .offcanvas').hasClass('show')) {
        navList.forEach(nav => {
            linkColorChanging(nav.ref, nav.offsetTop);
        })
    } 
})

function linkColorChanging(ref, offsetTop) {
    if($(window).scrollTop() >= (offsetTop - 300) ) {
        $(`header ul>li>a[href="${ref}"]`).addClass('text-accent')
            .parent('li').siblings()
            .children('a').each(function() {
                $(this).removeClass('text-accent')
            });
}
}

/* ========== Hero section animation with navbar ========== */

$('#open-nav').on('click', function() {
    $('#hero').children().each(function() {
        $('#hero .container').animate({left: '100px'}, 500);
        $('#hero #open-nav').animate({left: '250px'}, 300);
    })
})

$('header .btn-close').on('click', function() {
    $('#hero').children().each(function() {
        $('#hero .container').animate({left: '0'}, 500);
        $('#hero #open-nav').animate({left: '0'}, 300);
    })
})
