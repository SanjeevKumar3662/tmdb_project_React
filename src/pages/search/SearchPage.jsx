import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "./searchPage.css";
import Card from "../../components/card/Card";
import PageNav from "../../components/pageNav/PageNav";
import Slider from "react-slick";
import SearchInput from "../../components/searchInput/SearchInput";

const SearchPage = () => {
  const [searchRes, setSearchRes] = useState(null);
  //for getting page from url
  const [searchParams, setSearchParams] = useSearchParams(); //used to read query params from url
  const queryTypeFromURL = searchParams.get("query_type") || "movie";

  const [query_type, setQuery_type] = useState(queryTypeFromURL);

  //this returns a string so parse it
  const pageFromURL = parseInt(searchParams.get("page") || 1);
  const [page, setPage] = useState(pageFromURL);

  useEffect(() => {
    setSearchParams({ query_type, page }); //updates the page sting in url
  }, [query_type, page, setSearchParams]);
  //end

  //this will reset the page to 1, when we choose a dif list
  useEffect(() => {
    setPage(1);
  }, [query_type]);

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
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const queryArr = [
    {
      query: "multi",
      text: "All",
      info: "Shows Combination of Movie, TV and People",
    },
    { query: "movie", text: "Movie", info: "Shows movie results" },
    { query: "tv", text: "TV", info: "Shows tv results" },
    { query: "person", text: "Person", info: "Shows persons" },
    { query: "collection", text: "Collection", info: "Shows Collections" },
    { query: "company", text: "Company", info: "Shows Companies" },
    { query: "keyword", text: "Keywords", info: "Lists related keywords" },
  ];

  return (
    <div className="search-container">
      {/* <h1>Base Search Fuction ...</h1> */}
      <SearchInput />
      <div className="query-slider">
        <Slider {...settings}>
          {queryArr &&
            queryArr.map((obj) => (
              <button
                className="btn"
                onClick={() => setQuery_type(obj.query)}
                title={obj.info}
              >
                {obj.text}
              </button>
            ))}
        </Slider>
      </div>
      <div className="search-meta-info">
        <span className="btn">
          Total pages {searchRes && searchRes.total_pages}
        </span>
        <span className="btn">
          Total Results : {searchRes && searchRes.total_results}
        </span>
      </div>

      <div className="flex-search-container">
        {searchRes &&
          searchRes.results.map((ele) => {
            return <Card page={page} key={ele.id} cssClass={"card"} {...ele} />;
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
