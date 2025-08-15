import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "./searchPage.css";
import Card from "../../components/card/Card";
import PageNav from "../../components/pageNav/PageNav";
import Slider from "react-slick";

const SearchPage = () => {
  const [searchRes, setSearchRes] = useState(null);
  const [query_type, setQuery_type] = useState("movie");

  const queryArr = [
    "movie",
    "tv",
    "person",
    "collection",
    "company",
    "keyword",
  ];

  //for getting page from url
  const [searchParams, setSearchParams] = useSearchParams(); //used to read query params from url
  //this returns a string so parse it
  const pageFromURL = parseInt(searchParams.get("page") || 1);
  const [page, setPage] = useState(pageFromURL);

  useEffect(() => {
    setSearchParams({ page }); //updates the page sting in url
  }, [page, setSearchParams]);
  //end

  //this will reset the page to 1, when we choose a dif list
  useEffect(() => {
    setPage(1);
  }, []);

  const { query } = useParams();
  useEffect(() => {
    try {
      const fetchSearchResults = async () => {
        const res = await fetch(
          `https://first-backend-eight.vercel.app/search/${query_type}/${query}/${page}`
        );
        const data = await res.json();
        console.log(data);
        setSearchRes(data);
      };
      fetchSearchResults();
    } catch (e) {
      console.error(e);
    }
  }, [query_type, query, page]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 200,
    slidesToShow: 8,
    slidesToScroll: 5,
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
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 768, // small tablets / large phones
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 550, // tablets
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480, // mobile phones
        settings: {
          slidesToShow: 2.05,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="search-container">
      {/* <h1>Base Search Fuction ...</h1> */}
      <div className="query-slider">
        <Slider {...settings}>
          {queryArr &&
            queryArr.map((type) => (
              <button onClick={() => setQuery_type(type)}>{type}</button>
            ))}
        </Slider>
      </div>
      <div>
        <span>Total pages {searchRes && searchRes.total_pages}</span>
        <span>Total Results : {searchRes && searchRes.total_results}</span>
      </div>
      <PageNav
        prevClick={() => setPage(page > 1 ? () => page - 1 : page)}
        nextClick={() => setPage(() => page + 1)}
        page={page}
        setPage={setPage}
      ></PageNav>
      <div className="flex-search-container">
        {searchRes &&
          searchRes.results.map((ele) => {
            return <Card key={ele.id} cssClass={"card"} {...ele} />;
          })}
      </div>
      <PageNav
        prevClick={() => setPage(page > 1 ? () => page - 1 : page)}
        nextClick={() => setPage(() => page + 1)}
        page={page}
        setPage={setPage}
      ></PageNav>
    </div>
  );
};

export default SearchPage;
