import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "./searchPage.css";
import Card from "../../components/card/Card";
import PageNav from "../../components/pageNav/PageNav";

const SearchPage = ({ query_type = "movie"}) => {
  const [searchRes, setSearchRes] = useState(null);

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

  return (
    <div className="search-container">
      {/* <h1>Base Search Fuction ...</h1> */}
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
