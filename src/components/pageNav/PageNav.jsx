import { useState } from "react";
import "./PageNav.css";

const PageNav = ({ prevClick, nextClick, page, setPage }) => {
  const [isEdit, setEdit] = useState(false);
  function onPageEditClick(e) {
    setPage(e.target.value)
    setEdit(() => !isEdit);
  }

  return (
    <section className="page-nav">
      <button onClick={prevClick}>Prev</button>

      {isEdit ? (
        <input onBlur={onPageEditClick} type="text" placeholder="set page no." ></input>
      ) : (
        <button onClick={()=>setEdit(() => !isEdit)}>On Page: {page}</button>
      )}

      <button onClick={nextClick}>Next</button>
    </section>
  );
};

export default PageNav;
