import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../styles/content.scss";
import Board from "../pages/Board";
import Add from "../pages/Add";
import Products from "../pages/Products";
import Receipt from "../pages/Receipt";
import Sells from "../pages/Sells";
import Settings from "../pages/Settings";
import Users from "../pages/Users";

function Content(props) {
  return (
    <section className="main">
      <div className="header">
        <a href="#!" className="menu-toggler" onClick={props.toggleSidebar}>
          <i className="fas fa-bars"></i>
        </a>
        <div className="action-buttons">
          <Link to={'add'} className="action">
            <i className="fas fa-plus icon"></i>
            <span className="text nav-text">Nouveaux produits</span>
          </Link>
          <Link to={'receipt'} className="action">
            <i className="fas fa-file-import icon"></i>
            <span className="text nav-text">Bons de reception </span>
          </Link>
        </div>
      </div>
      <div className="content" id="main-content">
        <Routes>
          <Route path="" element={<Board />}></Route>
          <Route path="board" element={<Board />}></Route>
          <Route path="add" element={<Add />}></Route>
          <Route path="receipt" element={<Receipt />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="sells" element={<Sells />}></Route>
          <Route path="users" element={<Users />}></Route>
          <Route path="settings" element={<Settings />}></Route>
        </Routes>
      </div>
    </section>
  );
}

export default Content;
