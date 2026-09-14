$('.carrossel-destaques').slick({
    infinite: false,
    dots: false,
    arrows: true,
    centerMode: true,
    variableWidth: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    appendArrows: $('#box__destaques .custom-slick-control'),
    responsive: [{
        breakpoint: 768,
        settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
        }
    },
    {
        breakpoint: 480,
        settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
        }
    }
    ]
});