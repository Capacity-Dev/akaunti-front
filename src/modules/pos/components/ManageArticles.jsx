import React, { useState } from "react";
import Modal from "./Modal";

function ManageArticles({ closeModal, bill, setBill }) {
  const [state, setState] = useState(true);
  function refresh() {
    setState(!state);
  }
  function removeItem(key) {
    try {
      let productsUp = { ...bill };
      delete productsUp[key];
      setBill(productsUp);
      refresh();
    } catch (error) {
      console.log(error);
    }
  }
  let tableBody = Object.keys(bill).map((key) => {
    let product = bill[key];
    return (
      <tr key={key}>
        <td>{product.product_name}</td>
        <td>{product.quantity}</td>
        <td>
          <div className="actions">
            <i className="fas fa-close" onClick={() => removeItem(key)}></i>
          </div>
        </td>
      </tr>
    );
  });
  return (
    <Modal hideModal={closeModal} element={
      <table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>{(state || !state) ? tableBody : ""}</tbody>
      </table>
    } />
  );
}

export default ManageArticles;
