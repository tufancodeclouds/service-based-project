$(document).ready(function () {
  $('.slick-slider').slick({
    autoplay: true,
    autoplaySpeed: 1200,
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1200,
    fade: true,
    cssEase: 'ease-in-out',
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>'
  });

  $(".quotes").slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1200,
    dots: true,
    arrows: false,
    speed: 1200,
    cssEase: 'ease-in-out',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
});