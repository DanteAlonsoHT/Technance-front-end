/// Menu
import MetisMenu from "metismenujs";
import React, { Component } from "react";

/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new MetisMenu(this.$el);
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

class SideBar extends Component {
  /// Open menu
  componentDidMount() {
    // sidebar open/close
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);
  }
  state = {
    newEvent: false,
    loveEmoji: false,
  };
  Showhandler() {
    this.setState({ show: true });
    console.log(this.state.show);
  }
  Hidehandler() {
    this.setState({ show: false });
  }
  render() {
    /// Path
    let path = window.location.pathname;
    path = path.split("/");
    path = path[path.length - 1];

    /// Active menu
    let dashBoard = [
      "",
    ],
        profile = [
          "app/app-profile",
          "app/contact-us",
        ];

    return (
      <div className="deznav">
        <PerfectScrollbar className="deznav-scroll">
          <MM className="metismenu" id="menu">
            <li className={`${dashBoard.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow ai-icon" to="#" >
                <i class='bx bx-book-reader'></i>
                <span className="nav-text">Dashboard</span>
              </Link>
              <ul className={`${dashBoard.includes(path) ? "mm-collapse mm-show" : ""}`}>
                <li>
                  <Link className={`${path === "/" || path === "app" ? "mm-active" : ""}`} to="/" onClick={() => this.props.onClick3()}><i class='bx bx-book-reader'></i>Dashboard</Link>
                </li>
              </ul>
            </li>
            <li className={`${profile.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow ai-icon" to="#" >
                <i className='bx bx-edit bx-sm'></i>
                <span className="nav-text">Cuenta</span>
              </Link>
              <ul className={`${profile.includes(path) ? "mm-collapse mm-show" : ""}`}>
                <li>
                  <Link className={`${path === "app/app-profile" ? "mm-active" : ""}`} onClick={() => this.props.onClick()} to="app-profile"><i className='bx bxs-user-circle mr-1'></i>Mi Perfil</Link>
                </li>
                <li>
                  <Link className={`${path === "app/contact-us" ? "mm-active" : ""}`} onClick={() => this.props.onClick()} to="contact-us"><i className='bx bx-envelope mr-1'></i>Contáctanos</Link>
                </li>
              </ul>
            </li>
            <div className="copyright">
              <p>
                <strong>Technance's Team</strong> © 2023 Todos los derechos reservados
              </p>
              <p>
                Hecho con{" "}
                <span
                  className={`${this.state.loveEmoji ? "heart heart-blast" : "heart"
                    }`}
                  onClick={() =>
                    this.setState({ loveEmoji: !this.state.loveEmoji })
                  }
                ></span>{" "}
                por Technance's Team
              </p>
            </div>
          </MM>
        </PerfectScrollbar>
      </div >
    );
  }
}

export default SideBar;
