import React, {useContext, useState} from 'react';
// import {Link} from "react-router-dom";

export default function () {
  const [show, setShow] = useState(false);

  const handleClick = e => {
    e.preventDefault();
    setShow(!show);
  }
  return (
    <nav className="main-header navbar navbar-expand navbar-dark custom-navbar-primary">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i
            className="fas fa-bars"/></a>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={e => e.preventDefault()}>
            ადმინისტრატორი
          </a>
        </li>
        <li className={`nav-item dropdown ${show ? "show" : ""}`}>
          <a className="nav-link" href="#" onClick={e => handleClick(e)}>
            <i className="fas fa-cog"/>
          </a>
          <div className={`dropdown-menu dropdown-menu-sm dropdown-menu-right ${show ? "show" : ""}`}>
            <a href="/" className="dropdown-item">
              <i className="fas fa-location-arrow"/>
              &nbsp;&nbsp;საიტზე გადასვლა
            </a>

            <div className="dropdown-divider"/>

            <a href="/logout" className="dropdown-item">
              <i className="fas fa-sign-out-alt"/>
              &nbsp;&nbsp;გამოსვლა
            </a>
          </div>
        </li>
      </ul>
    </nav>

  )
}
