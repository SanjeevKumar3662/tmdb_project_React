import "./homePage.css";

const homePage = () => {
  return (
    <main>
      <section className="hero">
        <div className="heroText">
        <span>Wellcome !</span>
        <span>This is a Movie Database Website by SanjeevKumar3662</span>
        </div>
        <input type="text" placeholder="Search for a movie or a person"/>
      </section>
    </main>
  );
};

export default homePage;
