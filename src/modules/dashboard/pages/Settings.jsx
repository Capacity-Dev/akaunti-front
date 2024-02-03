import React, { useEffect, useState } from "react";
import Bill from "../components/Bill";
import "../styles/settings.scss";
import ProductModel from "../../../models/products";
import { toast } from "react-toastify";
function Settings() {
  const [billInfos, setInfos] = useState({
    companyName: "",
    goodbye: "A bientôt ! ",
    adress: "",
    phone: "",
    taux: "",
    tva: "",
    currency: "",
    critical:""
  });
  useEffect(() => {
    ProductModel.getConfigs()
      .then((data) => {
        console.log(data);
        setInfos(data);
      })
      .catch((error) => {
        let msg =
          error.response && error.response.data
            ? error.response.data.error
            : error.message;
        toast.error(`Impossible de charger la configuration (${msg})`, {
          autoClose: 5000,
        });
      });
  }, []);
  const changeValue = (key, value) => {
    let infosCopy = { ...billInfos };
    infosCopy[key] = value;
    setInfos(infosCopy);
  };
  const saveInfos = (type) => {
    let data = {};
    if (type === "bill") {
      data = {
        companyName: billInfos.companyName,
        adress: billInfos.adress,
        phone: billInfos.phone,
        goodbye: billInfos.goodbye,
      };
    } else if (type === "globals") {
      data = {
        tva: billInfos.tva,
        currency: billInfos.currency,
        taux: billInfos.taux,
        critical: billInfos.critical,
      };
    } else {
      return;
    }
    console.log(data)
    ProductModel.saveConfigs({ type, data })
      .then((data) => {
        console.log(data);
        toast.success(`Modifications sauvegardées`, {
          autoClose: 5000,
        });
      })
      .catch((error) => {
        let msg =
          error.response && error.response.data
            ? error.response.data.error
            : error.message;
        toast.error(`Impossible de charger la configuration (${msg})`, {
          autoClose: 5000,
        });
      });
  };
  return (
    <div className="settings-container">
      <div className="cards">
        <div className="card">
          <h2>Informations figurant sur la facture</h2>
          <div>
            <div className="form-group">
              <label htmlFor={""}>Nom de l'Entreprise</label>
              <input
                type="text"
                value={billInfos.companyName}
                onChange={(e) => changeValue("companyName", e.target.value)}
              />
            </div>
            {/* <div className="form-group">
            <label htmlFor={"price-"}>Logo</label>
            <input type="text" value={billInfos.companyLogo} onChange={(e)=>changeValue('companyLogo',e.target.value)}/>
          </div> */}
            <div className="form-group">
              <label htmlFor={""}>Adresse</label>
              <input
                type="text"
                value={billInfos.adress}
                onChange={(e) => changeValue("adress", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={""}>Numero Tel.</label>
              <input
                type="tel"
                value={billInfos.phone}
                onChange={(e) => changeValue("phone", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={""}>Texte d'Au revoir</label>
              <input
                type="text"
                value={billInfos.goodbye}
                onChange={(e) => changeValue("goodbye", e.target.value)}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-success"
                onClick={() => saveInfos("bill")}
              >
                <i className="fas fa-save"></i> Enregistrer
              </button>
            </div>
          </div>
        </div>
        <div className="card">
          <h2>Informations Globaux</h2>
          <div>
            <div className="form-group">
              <label htmlFor={""}>TVA</label>
              <input
                type="number"
                value={billInfos.tva}
                onChange={(e) => changeValue("tva", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={"taux-config"}>TAUX</label>
              <input
                type="number"
                value={billInfos.taux}
                onChange={(e) => changeValue("taux", e.target.value)}
                id="taux-config"
              />
            </div>
            <div className="form-group">
              <label htmlFor={"currency-config"}>Monnaie</label>
              <input
                type="text"
                value={billInfos.currency}
                onChange={(e) => changeValue("currency", e.target.value)}
                id="currency-config"
              />
            </div>
            <div className="form-group">
              <label htmlFor={"critical-confi"}>
                Seuil Critique des Produits
              </label>
              <input
                type="number"
                value={billInfos.critical}
                onChange={(e) => changeValue("critical", e.target.value)}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-success"
                onClick={() => saveInfos("globals")}
              >
                <i className="fas fa-save"></i> Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bill-preview">
        <Bill infos={billInfos} />
      </div>
    </div>
  );
}

export default Settings;
