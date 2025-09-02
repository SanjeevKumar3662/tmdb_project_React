import { useState, useEffect } from "react";
import "./mediaCredits.css";
import Card from "../card/Card";
import "../slidingCards/slidingCards.css";// because of lazy loading, styles for slider was imported on refresh

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MediaCredits({ media_type, id }) {
  const [media, setMedia] = useState(null);
  

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://first-backend-eight.vercel.app/media_credits/${media_type}/${id}`
        );
        let data = await response.json();

        setMedia(data);
        // console.log("credits -> ", data.cast[0]);
      } catch (e) {
        console.log("error while fetching movie details", e);
      }
    };
    fetchDetails();
  }, [id, media_type]);

  // console.log("media -> ",media);
const settings = {
    dots: false,
    infinite: media && media.cast.length <= 8 ? false : true,
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

  return (
    <>
      {/* <SlidingCards media_type={"movie"} id={id}/> */}
      <div className="credits-slider">
        <h1>Credits</h1>
        <Slider {...settings}>
          {media &&
            media.cast.map((person) => (
              <div key={person.id}>
                <Card
                  cssClass={"sliding-cards"}
                  {...person}
                  linkTo={"person_details"}
                ></Card>
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
}

export default MediaCredits;
