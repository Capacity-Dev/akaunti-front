import React, { useEffect, useState } from "react";

import "../styles/search.scss";
import Modal from "./Modal";
import ProductModel from "../../../models/products";

function Search(props) {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const search = (e) => {
    setValue(e.target.value);
  };
  useEffect(()=>{
    ProductModel.search("").then((data) => {
      console.log(data);
      setData(data);
    });
  },[])
  useEffect(() => {
    if (value.length > 2) {
      ProductModel.search(value).then((data) => {
        console.log(data);
        setData(data);
      });
    }
  }, [value]);
  const listItems = data.map((item) => {
    return (
      <li
        key={item.id}
        className="list-item"
        onClick={() => props.resultSelected(item)}
      >
        <span>{item.product_name}</span>
        <span>{item.price} $</span>
        <span>{item.quantity} Pcs</span>
      </li>
    );
  });
  return (
    <Modal
      hideModal={props.hide}
      element={
        <div className="search-box">
          <div className="search-bar">
            <input
              type="text"
              value={value}
              onChange={search}
              placeholder="Rechercher un produit..."
            />
          </div>
          <div className="results">
            <ul className="result-list">{listItems}</ul>
          </div>
        </div>
      }
    />
  );
}

export default Search;
