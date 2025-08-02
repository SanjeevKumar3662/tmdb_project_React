const PageNav = ({prevClick,nextClick, page}) => {
  return (
    <section className="page-nav">
      <button onClick={prevClick}>
        Prev
      </button>
      <span>Current on Page {page}</span>
      <button onClick={nextClick}>Next</button>
    </section>
  );
};

export default PageNav;
