import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import "./index.css";
import { getFromLocalStorage, postData, fetchData } from "../../utils";
import { Link, useNavigate } from "react-router-dom";

const ProfesorPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [chats, setChats] = useState<any>([]);
  const [messages, setMessages] = useState<any>([]);
  const [chosenChat, setChosenChat] = useState<any>(0);
  const navigate = useNavigate();

  const sendMessage = (e: any) => {
    e.preventDefault();
    let email = getFromLocalStorage("email");
    if (email != null && inputValue) {
      const apiUrl = "http://127.0.0.1:8000/api/profesor-gpt";

      const dataToSend = {
        email: email,
        chat_id: chats[chosenChat].id,
        users_message: inputValue,
      };

      postData(apiUrl, dataToSend)
        .then((response) => {
          setInputValue("");
          setMessages([...messages, response]);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    let email = getFromLocalStorage("email");
    if (email != null) {
      const apiUrl = `http://127.0.0.1:8000/api/profesor-gpt?email=${email}`;

      fetchData(apiUrl)
        .then((data) => {
          console.log("Data fetched:", data);
          data.reverse();
          setChats(data);

          let chat_id = data[chosenChat].id;
          fetchData(
            `http://127.0.0.1:8000/api/get-messages?chat_id=${chat_id}&email=${email}`
          ).then((data) => {
            setMessages(data);
            console.log(data);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  const changeChat = (idx: any) => {
    let email = getFromLocalStorage("email");
    setChosenChat(idx);
    let chat_id = chats[idx].id;
    fetchData(
      `http://127.0.0.1:8000/api/get-messages?chat_id=${chat_id}&email=${email}`
    ).then((data) => {
      setMessages(data);
      console.log("messages", data);
    });
  };

  const isButtonDisabled = inputValue.length === 0;

  return (
    <section className="profesor-page">
      <div className="container-fluid m-0 p-0 h-100">
        <div className="row h-100">
          <div className="col-md-3 d-none d-md-block p-0">
            {/* Go back */}
            <span onClick={() => navigate(-1)} className="goback">
              &lt;-- Powrót
            </span>

            {/* Chats */}
            <div className="profesor-navigation">
              <span className="label-chats">Konweracje</span>

              <ul className="profesor-navigation__list">
                {chats.map((item: any, idx: any) => {
                  if (idx == chosenChat) {
                    return (
                      <li
                        onClick={() => changeChat(idx)}
                        className="profesor-navigation__item profesor-navigation__item--chosen"
                      >
                        <h3 className="profesor-navigation__h3">
                          {item.title ? item.title : "New chat"}
                        </h3>
                      </li>
                    );
                  } else {
                    return (
                      <li
                        onClick={() => changeChat(idx)}
                        className="profesor-navigation__item"
                      >
                        <h3 className="profesor-navigation__h3">
                          {item.title ? item.title : "New chat"}
                        </h3>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
          <div className="col-md-9 p-0">
            {/* Chat */}
            <div className="profesor-chat">
              <h1 className="profesor-chat__title">Profesor GPT</h1>
              <div className="profesor-chat__body">
                <div className="profesor-chat__conv">
                  {messages.length != 0 ? (
                    <p className="profesor-chat__par">
                      Jestem twoim Profesorem GPT. Opowiedz o swoich
                      zainteresowaniach a ja postaram się Ci pomóc jak najlepiej
                      umiem! Jestem modelem językowym AI i zostałem
                      zaprogramowany, tak aby pomóc Ci w wyborze twojej ścieżki
                      edukacyjnej.
                    </p>
                  ) : (
                    <ul className="conversation">
                      {messages.map((item: any) => {
                        return (
                          <>
                            <li className="message user-message">
                              {item.users_message}
                            </li>
                            <li className="message chat-message">
                              {item.response}
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  )}
                </div>
                <form action="#" className="profesor-chat__form">
                  <input
                    type="text"
                    className="form__input"
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                  />
                  <button
                    className="form__btn"
                    disabled={isButtonDisabled}
                    onClick={sendMessage}
                  >
                    GO
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfesorPage;
