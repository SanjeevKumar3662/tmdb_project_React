import { useState } from "react";
import "./PageNav.css";

const PageNav = ({ prevClick, nextClick, page, setPage }) => {
  const [isEdit, setEdit] = useState(false);
  function onPageEditClick(e) {
    if(e.key === "Enter"){
      console.log("enter");
      const newPage = parseInt(e.target.value); //string to number
      if (isFinite(newPage) && newPage >= 1) {
        //on valid number, no NaN or Infinity
        setPage(newPage);
      }
      
      console.log(newPage);
      setEdit(() => !isEdit);
    }
  }

  return (
    <section className="page-nav">
      <button onClick={prevClick}>Prev</button>

      {isEdit ? (
        <input
          onKeyDown={onPageEditClick}
          onBlur={()=>setEdit(false)}
          type="number"
          min={1}
          placeholder="Enter Page No."
        ></input>
      ) : (
        <button onClick={() => setEdit(() => !isEdit)}>On Page: {page}</button>
      )}

      <button onClick={nextClick}>Next</button>
    </section>
  );
};

export default PageNav;
