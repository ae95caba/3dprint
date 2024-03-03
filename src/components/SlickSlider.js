import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import React from "react"
import Slider from "react-slick"

export default function SlickSlider({
  children,
  //Animation speed in milliseconds
  //Delay between each auto scroll (in milliseconds),

  fade,
}) {
  var settings = {
    arrows: true,
    fade: fade,
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return <Slider {...settings}>{children}</Slider>
}
