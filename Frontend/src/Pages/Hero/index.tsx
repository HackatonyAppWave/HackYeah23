import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
import logo from "../../assets/main-logo.png";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <>
      <section className="hero-bg d-flex flex-column align-items-center justify-content-center">
        <img src={logo} alt="Logo" className="logo" id="logo-img" />
        <div className="container position-relative">
          <div className="row">
            <div className="col-12 col-md-7 col-lg-6">
              <h1 className="hero-h1">Odkryj swoja przyszlosc za pomoca AI</h1>
              <h2 className="hero-h2">
                Nasza innowacyjna platforma wykorzystuje sztuczną inteligencję,
                aby uprościć proces wyboru uczelni i kierunku studiów po liceum,
                zapewniając młodym absolwentom szybkie i dokładne wsparcie w
                znalezieniu najlepszej ścieżki edukacyjnej.
              </h2>
              <div className="b-holder">
                <NavLink to={"/login"}>
                  <motion.div
                    className="b b-blue"
                    whileHover={{ scale: 1.05, cursor: "pointer" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <p className="m-0">Zaloguj</p>
                  </motion.div>
                </NavLink>
                <motion.div
                  className="b b-black"
                  whileHover={{ scale: 1.05, cursor: "pointer" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a href="#about" className="link">
                    <p className="m-0">O nas</p>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
