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
        console.log(data.results);
        setSearchRes(data.results);
      };
      fetchSearchResults();
    } catch (e) {
      console.error(e);
    }
  }, [query_type, query, page]);

  return (
    <>
      <h1>Base Search Fuction : More Updates Comming..</h1>
      <div className="search-container">
        {searchRes &&
          searchRes.map((ele) => {
            return <Card key={ele.id} cssClass={"card"} {...ele} />;
          })}
      </div>
    </>
  );
};

export default SearchPage;
