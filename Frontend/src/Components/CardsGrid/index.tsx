import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const CardsGrid: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    // Function to update isMobile when the window is resized
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={isMobile ? "container-fluid p-0 h-100" : "row gx-0 h-100"}>
      <Link to="/profesor" className="col-link col-md-6">
        <div className="card card--blue mx-0">
          <div className="card-body">
            <h3 className="card-title">Profesor GPT</h3>
          </div>
        </div>
      </Link>
      <Link to="/ankieta" className="col-link col-md-6">
        <div className="card card--white mx-0">
          <div className="card-body">
            <h3 className="card-title">Profil</h3>
          </div>
        </div>
      </Link>

      <Link to="/profesor" className="col-link col-md-6">
        <div className="card card--white mx-0">
          <div className="card-body">
            <h3 className="card-title">Złoty Strzał</h3>
          </div>
        </div>
      </Link>

      <Link to="" className="col-link col-md-6">
        <div className="card card--blue mx-0">
          <div className="card-body">
            <h3 className="card-title">Wyszukiwarka</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardsGrid;
