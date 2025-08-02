import "./PageNav.css"

const PageNav = ({prevClick,nextClick, page}) => {
  return (
    <section className="page-nav">
      <button onClick={prevClick}>
        Prev
      </button>
      <span>On Page: {page}</span>
      <button onClick={nextClick}>Next</button>
    </section>
  );
};

export default PageNav;
