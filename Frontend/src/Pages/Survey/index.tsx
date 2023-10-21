import "./index.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { getFromLocalStorage, postData } from "../../utils";
import { useNavigate } from "react-router-dom";

export default function Survey() {
  const [formData, setFormData] = useState({
    likesWorkingWithPeople: "",
    likesChallenges: "",
    likesStudyingInForeignLang: "",
    likesDormitory: "",
    pastSchoolProfile: "",
    expectedSalary: "",
    likesScienceClubs: "",
    wantedStudyLevel: "",
    myGoodSites: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const apiReqData = {
      email: getFromLocalStorage("email"),
      answers: [
        {
          question: 3,
          content: formData.likesWorkingWithPeople,
        },
        {
          question: 4,
          content: formData.likesChallenges,
        },
        {
          question: 12,
          content: formData.likesStudyingInForeignLang,
        },
        {
          question: 7,
          content: formData.pastSchoolProfile,
        },
        {
          question: 11,
          content: formData.expectedSalary,
        },
        {
          question:
            8,
            content: formData.likesScienceClubs,
        },
        {
          question: 9,
          content: formData.wantedStudyLevel,
        },
        {
          question: 10,
          content: formData.myGoodSites,
        },
      ],
    };
    console.log("Dane z formularza:", apiReqData);
    postData("http://127.0.0.1:8000/api/survey/create/", apiReqData).then((response) => {
      navigate("/profesor")
    });
  };

  return (
    <>
      <section className="container-fluid survey-bg d-flex">
        <div className="container text-center">
          <div className="row">
            <div className="col-12">
              <h2 className="surv-h2">Ankieta Wstepna</h2>
              <form>
                <div className="surv-hold">
                  <p className="surv-p">Czy lubisz prace z ludzmi?</p>
                  <input
                    name="likesWorkingWithPeople"
                    type="radio"
                    value="Tak"
                    onChange={handleInputChange}
                  />
                  <label className="surv-marg">Tak</label>
                  <input
                    name="likesWorkingWithPeople"
                    type="radio"
                    value="Nie"
                    onChange={handleInputChange}
                  />
                  <label>Nie</label>
                </div>

                <div className="surv-hold">
                  <p className="surv-p">Czy lubisz wyzwania?</p>
                  <input
                    name="likesChallenges"
                    type="radio"
                    value="Tak"
                    onChange={handleInputChange}
                  />
                  <label className="surv-marg">Tak</label>
                  <input
                    name="likesChallenges"
                    type="radio"
                    value="Nie"
                    onChange={handleInputChange}
                  />
                  <label>Nie</label>
                </div>

                <div className="surv-hold">
                  <p className="surv-p">
                    Czy interesują cię kierunki prowadzone w języku obcym?
                  </p>
                  <input
                    name="likesStudyingInForeignLang"
                    type="radio"
                    value="Tak"
                    onChange={handleInputChange}
                  />
                  <label className="surv-marg">Tak</label>
                  <input
                    name="likesStudyingInForeignLang"
                    type="radio"
                    value="Nie"
                    onChange={handleInputChange}
                  />
                  <label>Nie</label>
                </div>

                <div className="surv-hold">
                  <p className="surv-p">Jak ważny jest dla ciebie akademik?</p>
                  <label>(Od 1 do 10):</label>
                  <input
                    name="likesDormitory"
                    type="number"
                    min="1"
                    max="10"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="surv-hold">
                  <p className="surv-p">
                    Jaki profil szkoły popodstawowej ukończyłeś?
                  </p>
                  <input
                    name="pastSchoolProfile"
                    type="text"
                    placeholder="Profil"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="surv-hold">
                  <p className="surv-p">
                    Jakie masz oczekiwanie finansowe co do pracy po studiach?
                  </p>
                  <input
                    name="expectedSalary"
                    type="text"
                    placeholder="Np. 42000"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="surv-hold">
                  <p className="surv-p">
                    Czy interesują cię koła naukowe lub organizacje studenckie?
                  </p>
                  <input
                    name="likesScienceClubs"
                    type="radio"
                    value="Tak"
                    onChange={handleInputChange}
                  />
                  <label className="surv-marg">Tak</label>
                  <input
                    name="likesScienceClubs"
                    type="radio"
                    value="Nie"
                    onChange={handleInputChange}
                  />
                  <label>Nie</label>
                </div>

                <div className="surv-hold">
                  <p className="surv-p">Jaki stopień studiów cię interesuje?</p>
                  <input
                    name="wantedStudyLevel"
                    type="radio"
                    value="Licencjackie"
                    onChange={handleInputChange}
                  />
                  <label className="surv-marg">Licencjackie</label>
                  <input
                    name="wantedStudyLevel"
                    type="radio"
                    value="Inzynier"
                    onChange={handleInputChange}
                  />
                  <label className="surv-marg">Inzynier</label>
                  <input
                    name="wantedStudyLevel"
                    type="radio"
                    value="Magister"
                    onChange={handleInputChange}
                  />
                  <label className="surv-marg">Magister</label>
                </div>

                <div className="surv-hold">
                  <p className="surv-p">Opisz swoje mocne strony</p>
                  <input
                    name="myGoodSites"
                    type="text"
                    placeholder=""
                    onChange={handleInputChange}
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.05, cursor: "pointer" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                  >
                    <p className="btn-surv b-bg-surv p-3">Wyslij</p>
                  </motion.div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
