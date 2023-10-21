import "./index.css";

export default function AboutUs() {
  return (
    <section className="container-fluid about-bg" id="about">
      <div className="container">
        <div className="row">
          <h2 className="about-h2">O nas</h2>
          <div className="col-12 col-md-5">
            <p className="about-p">
              Nasza innowacyjna platforma, oparta na sztucznej inteligencji,
              upraszcza wybór uczelni i kierunku studiów po liceum, dostarczając
              spersonalizowane rekomendacje na podstawie preferencji
              użytkownika. Pomagamy młodym absolwentom oszczędzić czas i
              wysiłek, zapewniając łatwy dostęp do informacji potrzebnych do
              podjęcia mądrej decyzji edukacyjnej. Naszym celem jest pomóc
              każdemu znaleźć idealną ścieżkę akademicką.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
