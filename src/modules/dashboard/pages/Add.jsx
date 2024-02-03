import React, { useState } from "react";
import ProductModel from "../../../models/products";
import Papa from "papaparse";
import "../styles/add.scss";
import { toast } from "react-toastify";
import ShowBarcode from "../components/Barcode";

function Add() {
  let productsUp;
  const [products, setProducts] = useState([]);
  const [barcode, setBarcode] = useState("");
  const [hidden, toogleHidden] = useState(true);
  const [notImported, setNotImported] = useState([]);

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const toastID = toast.loading("Importation ...");
          console.log(result.data);
          ProductModel.importCSV(JSON.stringify(result.data))
            .then((data) => {
              if(data.not_imported){
                toast.update(toastID, {
                  render: `${data.not_imported.length} produit${data.not_imported.length>1?"s n'ont":" n'a"}  pas été importé${data.not_imported.length>1?"s":""}`,
                  type: "warning",
                  isLoading: false,
                  progress: 0,
                  autoClose: 6000,
                });
                setNotImported(data.not_imported);
              }else{
                toast.update(toastID, {
                  render: "Les produits ont étés ajoutés",
                  type: "success",
                  isLoading: false,
                  progress: 0,
                  autoClose: 6000,
                });
                setNotImported([]);
              }
              console.log(data);
            })
            .catch((error) => {
              let msg =
                error.response && error.response.data
                  ? error.response.data.error
                  : error.message;
              if(error.response?.data.not_imported){
                setNotImported(error.response.data.not_imported)
              }
              toast.update(toastID, {
                render: `Une erreur s'est produite (${msg}) `,
                type: "error",
                isLoading: false,
                progress: 0,
                autoClose: 6000,
              });
              console.log(error);
            });
        },
      });
    }
  };

  const generateBarcode = (key) => {
    productsUp = [ ...products ];
    let currentCode = productsUp[key]["barcode"];
    console.log(currentCode);
    if (currentCode.length > 3) {
      setBarcode(currentCode);
      toogleHidden(false);
    } else {
      productsUp[key]["barcode"] = Date.now().toString();
      setBarcode(productsUp[key]["barcode"]);
      setProducts(productsUp);
      toogleHidden(false);
    }
  };
  const removeItem = (key) => {
    try {
      productsUp = [ ...products ];
      productsUp.splice(key,1);
      setProducts(productsUp);
    } catch (error) {
      console.log(error);
    }
  };
  const addItem = () => {
    productsUp = [...products]
    let newProduct = {
      id : new Date().getTime(),
      barcode : "",
      product_name :"",
      quantity : "0",
      purchase_price:"0",
      price : "0" 
    }
    productsUp.push(newProduct)
    setProducts(productsUp);
  };
  //save product
  const saveProducts = () => {
    const toastID = toast.loading("Verification des champs ...");
    let productsUp = [ ...products ];
    console.log(products,"One")
    for (let key = 0; key < productsUp.length; key++) {
      const value = productsUp[key]
      if (value["product_name"].length < 1 || (value["barcode"].toString()).length < 3) {
        console.log(key,value["product_name"])
        productsUp.splice(key,1);
        key--
      }
    }
    console.log(productsUp);
    setProducts(productsUp);
    if (productsUp.length === 0) {
      toast.update(toastID, {
        render: "Ajoutez et remplissez les produits",
        type: "error",
        isLoading: false,
        autoClose: 6000,
      });
      return;
    }
    toast.update(toastID, { render: "Enregistrement ..." });
    ProductModel.create(productsUp)
      .then((response) => {
        setProducts([]);
        toast.update(toastID, {
          render: "Les produits ont étés ajoutés",
          type: "success",
          isLoading: false,
          progress: 0,
          autoClose: 6000,
        });
        console.log(response);
      })
      .catch((error) => {
        let msg =
          error.response && error.response.data
            ? error.response.data.error
            : error.message;
        toast.update(toastID, {
          render: `Une erreur s'est produite (${msg}) `,
          type: "error",
          isLoading: false,
          progress: 0,
          autoClose: 6000,
        });
        console.log(error);
      });
  };

  const modifyProduct = (id, value, productKey) => {
    productsUp = [ ...products ];
    let toBeTrimed = ["product_name", "barcode"]
    if (productKey in toBeTrimed) value.trim();
    productsUp[id][productKey] = value;
    setProducts(productsUp);
  };
  const listItems = products.map((item,key) => {

    return item ? (
      <tr key={key} className="list-item">
        <td>
          <input
            type="text"
            name="product_name"
            value={item.product_name}
            onChange={(e) => {
              modifyProduct(key, e.target.value, e.target.name);
            }}
          />
        </td>
        <td>
          <input
            type="text"
            name="barcode"
            value={item.barcode}
            onChange={(e) => {
              modifyProduct(key, e.target.value, e.target.name);
            }}
          />
        </td>
        <td>
          <input
            type="number"
            name="purchase_price"
            value={item.purchase_price}
            onChange={(e) => {
              modifyProduct(key, e.target.value, e.target.name);
            }}
          />
        </td>
        <td>
          <input
            type="number"
            name="price"
            value={item.price}
            onChange={(e) => {
              modifyProduct(key, e.target.value, e.target.name);
            }}
          />
        </td>
        
        <td>
          <input
            type="number"
            name="quantity"
            value={item.quantity}
            onChange={(e) => {
              modifyProduct(key, e.target.value, e.target.name);
            }}
          />
        </td>
        <td className="actions">
          <i
            className="fas fa-barcode"
            onClick={() => generateBarcode(key)}
          ></i>
          <i className="fas fa-close" onClick={() => removeItem(key)}></i>
        </td>
      </tr>
    ):null;
  });
  const errorLogImports = notImported.length ? notImported.map((item,key) => {
    return (<li key={key}>
      Ligne : <b>{item[0]}</b> === <i>{item[1]}</i>
    </li>)
  }):"";
  return (
    <>
      {!hidden && (
        <ShowBarcode hide={() => toogleHidden(true)} barcode={barcode} />
      )}
      <div className="container">
        <div className="card list-card">
          <div className="card-header">
            <span className="card-title">Ajouter des produits</span>
            <div className="buttons">
              <button className="btn btn-primary" onClick={addItem}>
                <i className="fas fa-plus"></i> Ajouter Un produit
              </button>
              <button className="btn btn-success" onClick={saveProducts}>
                <i className="fas fa-save"></i> Enregistrer
              </button>
            </div>
          </div>
          <div className="card-body content">
            <table>
              <thead>
                <tr>
                  <th>Nom du produit</th>
                  <th>Code Barre</th>
                  <th>Prix D'achat</th>
                  <th>Prix de vente</th>
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
      <div className="container">
        <div className="import-box">
          <h3>
            Vous Pouvez aussi importer un Fichier CSV contenant vos Produits
          </h3>
          <div className="import-group">
            <label htmlFor="csv-input" className="btn btn-primary">
              <i className="fas fa-download"></i> Importer
            </label>
            <input
              type="file"
              name=""
              id="csv-input"
              accept=".csv"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <h6 >NB : Les données du CSV doivent etre ordonées de la sorte [produit, code, prix, quantité] <br />
        Le champ quantité est optionnel
        </h6>
      </div>
      <div className="container">

      {notImported.length ? (
      <div className="error-log">
        <ul>
          {errorLogImports}
        </ul>
      </div>
      ):""}
      </div>
    </>
  );
}

export default Add;
