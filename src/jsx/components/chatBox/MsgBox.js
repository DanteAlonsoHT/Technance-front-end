import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { store } from "../../../store/store";
import { addMessage } from "../../../store/actions/MessageActions";

const MsgBox = ({ avatar1, openMsg, PerfectScrollbar, offMsg }) => {
  const stateRedux = store.getState();
  const data = stateRedux.auth.auth;

  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);
  const [message, setMessage] = useState("");

  const { messages } = stateRedux.messages;

  const avatar2 = `${
    process.env.NODE_ENV === "development" &&
    process.env.REACT_APP_BACK_END_URL_DEV
  }${data.userDetails.image_profile}`;
  return (
    <div className={`card chat dz-chat-history-box ${openMsg ? "" : "d-none"}`}>
      <div className="card-header chat-list-header text-center">
        <Link to={"#"} className="dz-chat-history-back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
            version="1.1"
          >
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <polygon points="0 0 24 0 24 24 0 24" />
              <rect
                fill="#000000"
                opacity="0.3"
                transform="translate(15.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-15.000000, -12.000000) "
                x="14"
                y="7"
                width="2"
                height="10"
                rx="1"
              />
              <path
                d="M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z"
                fill="#000000"
                fillRule="nonzero"
                transform="translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997) "
              />
            </g>
          </svg>
        </Link>
        <div>
          <h6 className="mb-1">Chat con AI Bot</h6>
          <p className="mb-0 text-success">En linea</p>
        </div>
        <div className="dropdown">
          <Link to={"#"} data-toggle="dropdown" aria-expanded="false">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              version="1.1"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <rect x="0" y="0" width="24" height="24" />
                <circle fill="#000000" cx="5" cy="12" r="2" />
                <circle fill="#000000" cx="12" cy="12" r="2" />
                <circle fill="#000000" cx="19" cy="12" r="2" />
              </g>
            </svg>
          </Link>
          <ul
            className={`dropdown-menu dropdown-menu-right ${
              toggle ? "show" : ""
            }`}
          >
            <li className="dropdown-item" onClick={() => setToggle(false)}>
              <i className="fa fa-user-circle text-primary mr-2"></i> Ver perfil
            </li>
            <li className="dropdown-item" onClick={() => setToggle(false)}>
              <i className="fa fa-users text-primary mr-2"></i> Add to close
              friends
            </li>
            <li className="dropdown-item" onClick={() => setToggle(false)}>
              <i className="fa fa-plus text-primary mr-2"></i> Add to group
            </li>
            <li className="dropdown-item" onClick={() => setToggle(false)}>
              <i className="fa fa-ban text-primary mr-2"></i> Block
            </li>
          </ul>
        </div>
      </div>
      <PerfectScrollbar
        className={`card-body msg_card_body dz-scroll ${
          openMsg ? "ps ps--active-y" : ""
        } `}
        id="DZ_W_Contacts_Body3"
      >
        {!!messages.length &&
          messages.map((mes) => {
            if (mes.type === "Decoded") {
              return (
                <div className="d-flex justify-content-start mb-4">
                  <div className="img_cont_msg">
                    <i class="bx bx-bot bx-md rounded-circle user_img_msg"></i>
                  </div>
                  <div className="msg_cotainer ml-3">
                  {mes.message}
                    <span className="msg_time">{String(mes.date).slice(16,21).concat(' HRS')}, Hoy</span>
                  </div>
                </div>
              );
            } else if (mes.type === "Encoded") {
              return (
                <div className="d-flex justify-content-end mb-4">
                  <div className="msg_cotainer_send">
                    {mes.message}
                    <span className="msg_time_send">{String(mes.date).slice(16,21).concat(' HRS')}, Hoy</span>
                  </div>
                  <div className="img_cont_msg">
                    <img
                      src={avatar2}
                      className="rounded-circle user_img_msg"
                      alt=""
                    />
                  </div>
                </div>
              );
            }
          })}
      </PerfectScrollbar>
      <div className="card-footer type_msg">
        <div className="input-group">
          <textarea
            className="form-control"
            placeholder="Escribe tu mensaje..."
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (message !== "") {
                  dispatch(
                    addMessage({
                      type: "Encoded",
                      message: message,
                      date: new Date(),
                    })
                  );
                  setMessage("");
                  fetch(
                    `${
                      process.env.NODE_ENV === "development"
                        ? process.env.REACT_APP_BACK_END_URL_DEV
                        : process.env.REACT_APP_BACK_END_URL_PROD
                    }/api/users/chat_bot/`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ message: message }),
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      dispatch(
                        addMessage({
                          type: "Decoded",
                          message: data,
                          date: new Date(),
                        })
                      );
                    })
                    .catch((error) => console.log(error));
                }
              }}
            >
              <i className="fa fa-location-arrow"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MsgBox;
