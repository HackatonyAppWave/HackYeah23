import "./index.css";
import React, {useState} from "react";
import { motion } from "framer-motion";
import { saveToLocalStorage, postData } from "../../utils";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleLogin = () => {
    const apiUrl = "http://127.0.0.1:8000/api/login"
    postData(apiUrl, {"email": email}).then((response)=>{
      saveToLocalStorage("email", email)
      if (response["created"]){
        return navigate("/ankieta")
      }else{
        return navigate("/platform")
      }
    });
  }

  return (
    <>
      <section className="container-fluid login-bg d-flex flex-column justify-content-center align-items-center">
        <div className="container">
          <div className="row d-flex flex-column justify-content-center align-items-center">
            <div className="col-12 col-sm-6 col-md-4 input-container d-flex flex-column align-items-center">
              <h2 className="text-center pt-2 log-h2">Wejscie do platformy</h2>
              <input
                type="text"
                className="inp-txt mb-4"
                typeof="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05, cursor: "pointer" }}
                whileTap={{ scale: 0.95 }}
              >
                <p className="btn-p b-bg p-3" onClick={handleLogin}>Zaloguj</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
