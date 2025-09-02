import "./slidingCards.css";
import Card from "../../components/card/Card";
// import { useEffect, useState } from "react";

//for slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
//slider end

const SlidingCards = ({
  media_type,
  list_type,
  credits,
  videos,
  otherData,
  isFetch = true,
}) => {
  // const [movies, setMovies] = useState(null);
  const page = 1;

  otherData && console.log(otherData[0]);

  const { data: movies } = useQuery({
    queryKey: [media_type, list_type, page],
    queryFn: fetchData,
  });

  async function fetchData() {
    const response = await fetch(
      `https://first-backend-eight.vercel.app/media_lists/${media_type}/${list_type}/${page}`
    );
    const data = await response.json();
    return await data.results;
  }

  const settings = {
    dots: false,
    infinite: credits && credits.length <= 8 ? false : true,
    speed: 200,
    slidesToShow: 8,
    slidesToScroll: 5,
    lazyLoad: videos ? false : true,
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

  // credits && console.log("this", credits.length);
  // otherData && console.log("this", otherData[0]);
  return (
    <>
      <Slider {...settings}>
        {movies &&
          media_type !== "credits" &&
          movies.map((movie) => (
            <div key={movie.id}>
              <Card
                page={page}
                cssClass={"sliding-cards"}
                {...movie}
                linkTo={media_type + "_details"}
              ></Card>
            </div>
          ))}

        {
          // this is for person page credits for can be tv or a movie
          otherData &&
            otherData.map((ele) => (
              <div key={ele.id}>
                <Card
                  page={page}
                  cssClass={"sliding-cards"}
                  {...ele}
                  linkTo={media_type + "_details"}
                ></Card>
              </div>
            ))
        }

        {media_type === "credits" &&
          credits &&
          credits.map((person) => (
            <div key={person.id}>
              <Card
                cssClass={"sliding-cards"}
                {...person}
                linkTo={"person_details"}
              ></Card>
            </div>
          ))}
      </Slider>
    </>
  );
};
export default SlidingCards;
