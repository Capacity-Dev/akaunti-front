import React, { useState } from "react";
import Search from "../components/Search";
import { toast } from "react-toastify";
import ProductModel from "../../../models/products";

function Receipt() {
  let productsUp;
  const [products, setProducts] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const selected = (item) => {
    item.quantity = 0;
    addItem(item);
    setShowSearch(false);
  };
  const removeItem = (key) => {
    key = key.toString();
    try {
      productsUp = { ...products };
      delete productsUp[key];
      setProducts(productsUp);
    } catch (error) {
      console.log(error);
    }
  }
  const addItem = (item) => {
    let key = item.id.toString();
    if (!(key in products)) {
      productsUp = { ...products };
      productsUp[key] = item;
      setProducts(productsUp);
    }
  };
  const modifyProduct = (key, value, productKey) => {
    productsUp = {...products};
    let toBeTrimed = ["product_name", "barcode"]
    if (productKey in toBeTrimed) value.trim();
    productsUp[key][productKey] = value;
    setProducts(productsUp);
  };
   //save product
   const saveProducts = () => {
    const toastID = toast.loading("Verification des champs ...");
    productsUp = { ...products };

    for (const [key, value] of Object.entries(productsUp)) {
      if (value.quantity < 1) {
        delete productsUp[key];
      }
    }
    if (Object.keys(productsUp).length === 0) {
      toast.update(toastID, {
        render: "Ajoutez des produits avant !",
        type: "error",
        isLoading: false,
        autoClose: 6000,
      });
      return;
    }
    setProducts(productsUp);
    toast.update(toastID, { render: "Enregistrement ..." });
    ProductModel.addReceipt(products)
      .then((response) => {
        setProducts({})
        toast.update(toastID, {
          render: "Les produits ont étés ajoutés",
          type: "success",
          isLoading: false,
          progress:0,
          autoClose: 6000,
  
        });
        console.log(response);
      })
      .catch((error) => {
        toast.update(toastID, {
          render: `Une erreur s'est produite (${error.message}) `,
          type: "error",
          isLoading: false,
          progress:0,
          autoClose: 6000,
        });
        console.log(error);
      });
  };

  const listItems = Object.keys(products).map((key) => {
    let item = products[key];
    return (
      <tr key={item.id} className="list-item">
        <td>{item.product_name}</td>
        <td>{}
          <input
            type="number"
            name="price"
            value={item.price ? item.price : ""}
            onChange={(e) => {
              modifyProduct(key, e.target.value, e.target.name);
            }}
          />
        </td>
        <td>
          <input
            type="number"
            name="quantity"
            value={item.quantity ? item.quantity : ""}
            onChange={(e) => {
              modifyProduct(key, e.target.value, e.target.name);
            }}
          />
        </td>
        <td>
          <i className="fas fa-close" onClick={() => removeItem(item.id)}></i>
        </td>
      </tr>
    );
  });
  return (
    <div className="container">
      {showSearch ? (
        <Search hide={()=>setShowSearch(false)} resultSelected={selected} />
      ) : (
        ""
      )}
      <div className="card list-card">
        <div className="card-header">
          <span className="card-title">Bon de Réception</span>
          <div className="buttons">
            <button
              className="btn btn-primary"
              onClick={() => setShowSearch(true)}
            >
              <i className="fas fa-plus"></i> Ajouter
            </button>
            <button
              className="btn btn-success"
              onClick={saveProducts}
            >
              <i className="fas fa-save"></i> Enregistrer
            </button>
          </div>
        </div>
        <div className="card-body content">
          <table>
            <thead>
              <tr>
                <th>Nom du produit</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Supp.</th>
              </tr>
            </thead>
            <tbody className="add-list">
              {/* Displaying added items */}
              {listItems}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
