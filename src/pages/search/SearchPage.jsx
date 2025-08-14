import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./searchPage.css";
import Card from "../../components/card/Card";

const SearchPage = ({ query_type = "movie", page = 1 }) => {
  const [searchRes, setSearchRes] = useState(null);
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
      <div className="flex-search-container">
        {searchRes &&
          searchRes.results.map((ele) => {
            return <Card key={ele.id} cssClass={"card"} {...ele} />;
          })}
      </div>
    </div>
  );
};

export default SearchPage;
