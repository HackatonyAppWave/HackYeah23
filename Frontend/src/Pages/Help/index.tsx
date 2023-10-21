import "./index.css";

export default function Help() {
  return (
    <>
      <section className="container-fluid help-bg">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="help-h2">Jak mozemy ci pomoc?</h2>
            </div>
            <div className="col-12 col-md-4">
              <div className="help-img1"></div>
              <h3 className="help-h3">Personalna Ankieta</h3>
              <p className="help-p">
                {" "}
                Nasza funkcja ankiety personalizującej pozwala nam lepiej poznać
                Twoje zainteresowania, umiejętności i cele życiowe, co umożliwia
                dostarczenie spersonalizowanych rekomendacji dotyczących
                odpowiedniego kierunku zawodowego lub edukacyjnego, abyś mógł
                osiągnąć sukces.
              </p>
            </div>
            <div className="col-12 col-md-4">
              <div className="help-img2"></div>
              <h3 className="help-h3">Profesor GPT</h3>
              <p className="help-p">
                Profesor GPT przeprowadzi z toba rozmowe, analizując twoje
                zainteresowania, umiejętności i cele, aby dostarczyć
                spersonalizowane sugestie dotyczące ścieżki zawodowej i
                edukacyjnej, pomagając ci znaleźć właściwą drogę do sukcesu.
                Dzięki tej funkcji, bedziesz mogl łatwiej zrozumieć swoje
                możliwości i podjąć informowane decyzje dotyczące dalszego
                kształcenia i kariery zawodowej.
              </p>
            </div>
            <div className="col-12 col-md-4">
              <div className="help-img3"></div>
              <h3 className="help-h3">Smart Wyszukiwarka</h3>
              <p className="help-p">
                Smart wyszukiwarka pomoze ci odnaleźć odpowiednią ścieżkę
                edukacyjną, analizując twoje zainteresowania, umiejętności i
                cele, aby zaproponować najlepsze opcje szkoły średniej lub
                studiów. Dzięki temu narzędziu bedziesz mogl szybko znaleźć
                drogę edukacyjną, która najlepiej odpowiada twoim indywidualnym
                potrzebom i aspiracjom życiowym.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
