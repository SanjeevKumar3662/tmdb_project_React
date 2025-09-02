import React from "react";
import Card from "../../components/card/Card";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const PersonCreditSlider = ({ personCredits, link }) => {
  const settings = {
    dots: false,
    infinite: personCredits && personCredits.cast.length <= 8 ? false : true,
    speed: 200,
    slidesToShow: 8,
    slidesToScroll: 5,
    lazyLoadBuffer: 3,
    responsive: [
      {
        breakpoint: 1350, // tablets
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024, // tablets
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768, // small tablets / large phones
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 620, // tablets
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 520, // mobile phones
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  //  personCredits && console.log(personCredits);
  return (
    <Slider {...settings}>
      {personCredits &&
        personCredits.cast.map((person) => (
          <div key={person.id}>
            <Card cssClass={"sliding-cards"} {...person} linkTo={link}></Card>
          </div>
        ))}
    </Slider>
  );
};
