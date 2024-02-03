import React, { useEffect, useState } from "react";
import "../styles/board.scss";
import ProductModel from "../../../models/products";
import { toast } from "react-toastify";
import { NumericFormat } from "react-number-format";
function Board() {
  const [overview,setOverview] = useState({});
  const [mostSelled,setMostSelled] = useState([]);
  const [lastReceipt,setLastReceipt] = useState({});
  const [config, setConfig] = useState({});
  let listItems;
  useEffect(()=>{
    try {
      ProductModel.getOverview().then(data=>{
        console.log(data)
        setOverview(data);
      })
      ProductModel.getMostSelled().then(data=>{
        console.log(data)
        setMostSelled(data);
      })
      ProductModel.getLastReceipt().then(data=>{
        if(data.products){
          data.products = JSON.parse(data.products)
          setLastReceipt(data);
        }
      })
      ProductModel.getConfigs().then((data) => {
        setConfig(data);
      });
    } catch (error) {
      console.log(error)
      let msg =
          error.response && error.response.data
            ? error.response.data.error
            : error.message;
      toast.error(`Impossible de charger la configuration (${msg})`, {
        autoClose: 5000,
      });
    }
  },[])
  let products = lastReceipt.products
  if(typeof products !== "undefined"){
    listItems = Object.keys(products).map((key) => {
      let item = products[key];
      return (
        <tr key={item.id} className="list-item">
          <td>{item.product_name}</td>
          <td>{item.price}</td>
          <td>{item.quantity}
          </td>
        </tr>
      );
    });
  }
  console.log(mostSelled)
let most = mostSelled.map((item,key) => {
    return (
      <tr key={key} className="list-item">
        <td>{item.product_name}</td>
        <td>{item.totalQuantity}
        </td>
      </tr>
    );
  });
  return (
    <div className="container">
      <div className="w-container">
        <div className="widget">
          <div className="left">
            <div className="title">Articles en Stock</div>
            <div className="description"><NumericFormat value={overview.totalQuantity} displayType="text" thousandSeparator=" " /></div>
          </div>
          <div className="right">
            <i className="fas fa-book"></i>
          </div>
        </div>
        <div className="widget">
          <div className="left">
            <div className="title">Valeur en Stock</div>
            <div className="description"><NumericFormat value={overview.stockValue} displayType="text" thousandSeparator=" " /> {config.currency}</div>
          </div>
          <div className="right">
            <i className="fas fa-dollar"></i>
          </div>
        </div>
        <div className="widget">
          <div className="left">
            <div className="title">Entrés de ce mois</div>
            <div className="description"><NumericFormat value={overview.monthValue} displayType="text" thousandSeparator=" " /> {config.currency}</div>
          </div>
          <div className="right">
            <i className="fas fa-dollar"></i>
          </div>
        </div>
        <div className="widget">
          <div className="left">
            <div className="title">Articles ecoulés</div>
            <div className="description"><NumericFormat value={overview.totalSell} displayType="text" thousandSeparator=" " /></div>
          </div>
          <div className="right">
            <i className="fas fa-book"></i>
          </div>
        </div>
      </div>
      <div className="card-group">
        <div className="card list-card">
          <div className="card-header">
            <span className="card-title">Produits les plus vendus</span>
          </div>
          <div className="card-body content">
            <table>
              <thead>
                <tr>
                  <th>Nom du produit</th>
                  <th>Quantité</th>
                </tr>
              </thead>
              <tbody className="add-list">{most}</tbody>
            </table>
          </div>
        </div>
        <div className="card list-card">
          <div className="card-header">
            <span className="card-title">Dernier bon de reception</span>
          </div>
          <div className="card-body content">
            <table>
              <thead>
                <tr>
                  <th>Nom du produit</th>
                  <th>Prix</th>
                  <th>Quantité</th>
                </tr>
              </thead>
              <tbody className="add-list">{listItems}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
