/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../styles/sidebar.scss";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

function Sidebar(props) {
  const {logout} = useAuth()
  const toggleMode = () => {
    document.body.classList.toggle("dark");
  };
  return (
    <nav className={props.isClosed ? "sidebar closed" : "sidebar"}>
      <header>
        <div className="image-text">
          <span className="image">
            <img src="/img/logo.png" alt="Akaunti" />
          </span>
        </div>
        <i
          className="fas fa-chevron-right toggler"
          onClick={props.toggleSidebar}
        ></i>
      </header>
      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-NavLinks">
            <li className="nav-NavLink">
              <NavLink to={"board"}>
                  <i className="fas fa-home icon"></i>
                  <span className="text nav-text">Tableau de bord</span>
              </NavLink>
            </li>
            <li className="nav-NavLink">
              <NavLink to={"products"}>
                  <i className="fas fa-box-open icon"></i>
                  <span className="text nav-text">Articles</span>
              </NavLink>
            </li>
            <li className="nav-NavLink">
              <NavLink to={"sells"}>
                  <i className="fas fa-money-check icon"></i>
                  <span className="text nav-text">Ventes</span>
              </NavLink>
            </li>
            <li className="nav-NavLink">
              <NavLink to={"users"}>
                  <i className="fas fa-users icon"></i>
                  <span className="text nav-text">Utilisateurs</span>
              </NavLink>
            </li>
            <li className="nav-NavLink">
              <NavLink to={"settings"}>
                  <i className="fas fa-cogs icon"></i>
                  <span className="text nav-text">Parametres</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="bottom-content">
          <li className="">
            <a href={"#"} onClick={(e)=>{
              e.preventDefault()
              logout()
            }}>
              <i className="fas fa-power-off icon"></i>
              <span className="text nav-text">Se déconnecter</span>
            </a>
          </li>
          <li className="mode">
            <div className="moon-sun">
              <i className="fas fa-moon icon moon"></i>
              <i className="fas fa-sun icon sun"></i>
            </div>
            <span className="mode-text text">Mode sombre</span>
            <div className="toggle-switch" onClick={toggleMode}>
              <span className="switch"></span>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
