import React, { useState, useEffect } from "react";
import "./index.css";
import CardsGrid from "../../Components/CardsGrid";

const PlatformPage: React.FC = () => {
  return (
    <section className="platform-page">
      <div className="container-fluid m-0 p-0 h-100 d-flex flex-md-row flex-column">
        <div className="row m-0 h-100">
          <div className="col-lg-6 p-5 platform-body">
            <h3 className="platform-body__title ">Jak możemy Ci pomóc?</h3>
            <div className="d-none d-lg-block">
              <div className="platform-body__stats">
                <p className="platform-body__par">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Voluptatum autem, magnam, iure, tempore nemo facere totam
                  veniam suscipit error quia recusandae ipsam molestias sunt?
                  Natus fuga culpa quae iste minima. Lorem ipsum dolor, sit amet
                  consectetur adipisicing elit. Voluptatum autem, magnam, iure,
                  tempore nemo facere totam veniam suscipit error quia
                  recusandae ipsam molestias sunt? Natus fuga culpa quae iste
                  minima. Natus fuga culpa quae iste minima. Lorem ipsum dolor,
                  sit amet consectetur adipisicing elit. Voluptatum autem,
                  magnam, iure, tempore nemo facere totam veniam suscipit error
                  quia recusandae ipsam molestias sunt? Natus fuga culpa quae
                  iste minima.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 p-0">
            <div className="platform-grid">
              <CardsGrid />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformPage;
