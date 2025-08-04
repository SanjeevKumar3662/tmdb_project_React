import { useState } from "react";
import "./PageNav.css";

const PageNav = ({ prevClick, nextClick, page, setPage }) => {
  const [isEdit, setEdit] = useState(false);
  function onPageEditClick(e) {
    const newPage = parseInt(e.target.value);//string to number
    if (isFinite(newPage)) {//on valid number, no NaN or Infinity
      setPage(newPage);
    }

    console.log(newPage);
    setEdit(() => !isEdit);
  }

  return (
    <section className="page-nav">
      <button onClick={prevClick}>Prev</button>

      {isEdit ? (
        <input
          onBlur={onPageEditClick}
          type="number"
          placeholder="set page no."
        ></input>
      ) : (
        <button onClick={() => setEdit(() => !isEdit)}>On Page: {page}</button>
      )}

      <button onClick={nextClick}>Next</button>
    </section>
  );
};

export default PageNav;
