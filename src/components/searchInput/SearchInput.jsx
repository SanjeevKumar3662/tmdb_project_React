import { useNavigate } from "react-router-dom";
import "./searchInput.css";

const SearchInput = () => {
  const navigate = useNavigate();
  return (
    <div className="search-input">

    <input
      onKeyDown={(e) => {
        e.key === "Enter" && navigate(`/search/${e.target.value}`);
      }}
      type="text"
      placeholder="Search for a movie or a person"
      />
      </div>
  );
};

export default SearchInput;
