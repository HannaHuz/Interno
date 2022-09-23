import $ from 'jquery';
import 'slick-slider';

$(function(){

  $('.carousel').slick({
    arrows: false,
    dots: true,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1
        }
      },
    ]
  })

})