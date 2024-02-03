import React, { useEffect, useState } from "react";
import MainComponent from "./MainComponent";
import Search from "./Search";
import ProductModel from "../../../models/products";
import { useAuth } from "../../../hooks/useAuth";

const CardPrincipal = ({ showBill, bill, setBill, config, billComponent }) => {
  const [IconDeplier, setIconDeplier] = useState(true);
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState({});
  const [current, setCurrent] = useState("quantity");
  const [showSearch, setShowSearch] = useState(false);
  const {logout} = useAuth()
  useEffect(() => {
    if (barcode.length > 5) {
      ProductModel.fetchByBarcode(barcode)
        .then((data) => {
          console.log(data);
          if (data) setProduct(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [barcode]);
  useEffect(() => {
    const barcodeScaned = function (e) {
      setBarcode(e.detail.scanCode);
    };
    document.addEventListener("scan", barcodeScaned);
    console.log(document);
    return () => {
      document.removeEventListener("scan", barcodeScaned);
    };
  }, []);
  const selected = (item) => {
    setProduct(item);
    setShowSearch(false);
  };
  const searchBarcode = (e) => {
    e.preventDefault();
    console.log(barcode);
  };
  return (
    <>
      {showSearch ? (
        <Search hide={() => setShowSearch(false)} resultSelected={selected} />
      ) : (
        ""
      )}
      <section className="cardPrincipal d-flex flex-column">
        {/* div header */}
        <div className="factureHeader d-flex justify-content-between ">
          <div className="factureHeaderAbout">
            <div className="factureHeaderAboutNaire d-flex h-100">
              <form
                onSubmit={searchBarcode}
                className="w-100 d-flex barcode-box"
              >
                <span className="fas fa-barcode"></span>
                <input
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  onFocus={() => setCurrent("barcode")}
                  className="barcode"
                  type="text"
                  placeholder="Code barre"
                />
              </form>
            </div>
          </div>
          <div className="priceTaxe">
            <div className="d-flex flex-column justify-content-between h-100 priceTaxeNaire">
              <p className="d-flex justify-content-between carTax">
                <span>Monnaie : </span>
                <span>{config.currency}</span>
              </p>
              <p className="d-flex justify-content-between carTax">
                <span>TVA : </span>
                <span>{config.tva} %</span>
              </p>
              <p className="d-flex justify-content-between carTax">
                <span>TAUX : </span>
                <span>{config.taux}</span>
              </p>
            </div>
          </div>
        </div>

        {/* div main */}

        <div className="principalMainNaire d-flex">
          <div className="d-flex flex-column h-100 verticalAction">
            <div>
              <div
                className="action flex-center"
                onClick={() => {
                  setIconDeplier(!IconDeplier);
                  showBill();
                }}
              >
                <p className="iconAction">
                  <i
                    className={
                      IconDeplier
                        ? "fas fa-angle-double-left"
                        : "fas fa-angle-double-right"
                    }
                  ></i>
                </p>
                <p></p>
              </div>
              <div
                className="action flex-center flex-column"
                onClick={(e) => {
                  setShowSearch(true);
                }}
              >
                <p className="iconAction">
                  <i className="fas fa-search"></i>
                </p>
                <p className="textAction">Search</p>
              </div>
              <div className="action flex-center flex-column ">
                <p className="iconAction">
                  <i className="fas fa-balance-scale"></i>
                </p>
                <p className="textAction">Facture</p>
              </div>
              <div className="action flex-center flex-column">
                <p
                  className="iconAction"
                  onClick={() =>logout()}
                >
                  <i className="fas fa-power-off"></i>
                </p>
                <p className="textAction">Quitter</p>
              </div>
              <div className="action flex-center"></div>
              <div className="action flex-center"></div>
              <div className="action flex-center"></div>
              <div className="action flex-center"></div>
            </div>
          </div>
          <MainComponent
            product={product}
            bill={bill}
            setBill={setBill}
            barcode={barcode}
            current={current}
            config={config}
            setBarcode={setBarcode}
            setCurrent={setCurrent}
            billComponent={billComponent}
          />
        </div>
      </section>
    </>
  );
};

export default CardPrincipal;
