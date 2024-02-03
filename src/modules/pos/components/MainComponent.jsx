import React, { useCallback, useEffect, useState } from "react";
import ActionsModales from "./microComponents/ActionModales";
import ManageArticles from "./ManageArticles";
import Modales from "./microComponents/Modales";
import { toast } from "react-toastify";
import ProductModel from "../../../models/products";
import { useReactToPrint } from "react-to-print";

const MainComponent = ({
  product,
  bill,
  setBill,
  barcode,
  setBarcode,
  current,
  setCurrent,
  billComponent,
  config,
}) => {
  let [showClavierBtn, setShowClavier] = useState("");
  const [quantity, setQuantity] = useState("");
  const [printDisabled, setPrintDisabled] = useState(false);
  const [currentBillItem, setCurrentBillItem] = useState({ quatity: "1" });
  const [showArticleManager, setShowArticleManager] = useState(false);
  const setItemValue = useCallback(
    function (key, value) {
      let item = { ...currentBillItem };
      item[key] = value;
      setCurrentBillItem(item);
    },
    [currentBillItem]
  );
  useEffect(() => {
    if (Object.keys(bill).length < 1) setPrintDisabled(true);
    else setPrintDisabled(false);
  }, [bill]);
  useEffect(() => {
    let item = {
      id: product.id,
      product_name: product.product_name,
      price: product.price,
      maxQuantity: product.quantity,
    };
    setQuantity("");
    setCurrentBillItem(item);
  }, [product]);
  function clickClavier(inputValue) {
    let action = current === "quantity" ? setQuantity : setBarcode;
    let value = current === "quantity" ? quantity : barcode;
    inputValue === "clear"
      ? action("")
      : inputValue === "remove"
      ? action(value.substring(0, value.length - 1))
      : action(value + inputValue);
    if (current === "quantity") setItemValue("quantity", quantity);
  }
  function showClavier() {
    showClavierBtn.length > 3
      ? setShowClavier("")
      : setShowClavier("showClavier");
  }
  function hiddenClavier() {
    setShowClavier("showClavier hiddenClavier ");
    setTimeout(() => {
      setShowClavier("");
    }, 300);
  }
  const [modal, setModal] = useState("");
  function showModal(modal) {
    setModal(<Modales closeModal={closeModal} modal={modal} />);
  }
  function closeModal() {
    setModal("");
  }
  function addToBill() {
    if (!(currentBillItem.maxQuantity && currentBillItem.price)) {
      toast.error("Selectionnez un produit valide", { autoClose: 1500 });
      return;
    }
    if (isNaN(parseInt(quantity)) || parseInt(quantity) <= 0) {
      toast.error("Mettez une quantité valide", { autoClose: 1500 });
      return;
    }
    if (parseInt(quantity) > currentBillItem.maxQuantity) {
      toast.error("Le stock est insuffisant", { autoClose: 1500 });
    } else {
      let currentProduct = { ...currentBillItem };
      currentProduct.quantity = parseInt(quantity);
      currentProduct.total = parseInt(quantity) * currentProduct.price;
      let billCopy = { ...bill };
      if (currentProduct.id in billCopy) {
        let product = billCopy[currentProduct.id];
        if (
          product.quantity + parseInt(quantity) >
          currentProduct.maxQuantity
        ) {
          let rest = currentProduct.maxQuantity - product.quantity;
          toast.error(
            `Le stock est insuffisant, il ne reste que ${rest} Pieces`,
            { autoClose: 2000 }
          );
          return;
        }
        product.quantity += parseInt(quantity);
        product.total = product.quantity * currentProduct.price;
      } else billCopy[currentProduct.id] = currentProduct;
      setBill(billCopy);
      setQuantity("");
    }
  }
  function printBill() {
    setPrintDisabled(true);
    let total = 0;
    Object.keys(bill).map((key) => {
      let product = bill[key];
      return (total += parseInt(product.total));
    });
    if (Object.keys(bill).length < 1 && total > 0) {
      toast.error(`La facture est vide`, { autoClose: 2000 });
      return;
    }
    const toastID = toast.loading("Enregistrement...");
    ProductModel.saveBill({ bill, total })
      .then((data) => {
        console.log(data);
        handlePrint();
        toast.update(toastID, {
          render: `La modification du produit ${product.product_name} a réussi`,
          type: "success",
          isLoading: false,
          progress: 0,
          autoClose: 4000,
        });
        setBill({});
        setPrintDisabled(true);
      })
      .catch((error) => {
        toast.update(toastID, {
          render: `Une erreur s'est produite (${error.message}) `,
          type: "error",
          isLoading: false,
          progress: 0,
          autoClose: 4000,
        });
        console.log(error);
        setPrintDisabled(true);
      });
  }
  const handlePrint = useReactToPrint({
    content: () => billComponent.current,
  });
  return (
    <div className="manyActionPrincipal">
      <div className={"hero " + showClavierBtn}>
        <div className="h-100 p-10 d-flex">
          <div className="h-100">
            <img className="h-100" src="/img/logo.png" alt="" />
          </div>
          <div className="articleBannerDetails w-100 h-100 d-flex justify-content-center flex-column">
            <h2>{product.product_name}</h2>
            <p>
              <span>Quantité : </span>{" "}
              <input
                className="inputFocus"
                onClick={(e) => e.stopPropagation()}
                onFocus={() => setCurrent("quantity")}
                type="number"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                name=""
                id=""
              />
            </p>
            <p>
              <span>PRIX en ({config.currency}) </span>
              <span>{product.price} </span>{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="main_action d-flex w-100 ">
        <div className={"allAct " + showClavierBtn}>
          <div
            className="claviers w-100"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="act flex-center"></div>
            <div className="act flex-center"></div>
            <div className="act flex-center"></div>
            <div className="act flex-center"></div>
            <div
              className="act flex-center"
              onClick={() => {
                clickClavier("7");
              }}
            >
              7
            </div>
            <div
              className="act flex-center"
              onClick={() => {
                clickClavier("8");
              }}
            >
              8
            </div>
            <div
              className="act flex-center"
              onClick={() => {
                clickClavier("9");
              }}
            >
              9
            </div>
            <div
              className="act flex-center"
              onClick={() => {
                clickClavier("remove");
              }}
            >
              <i className="fas fa-arrow-left"></i>
            </div>
            <div
              className="act flex-center"
              onClick={() => {
                clickClavier("4");
              }}
            >
              4
            </div>
            <div
              className="act flex-center"
              onClick={() => {
                clickClavier("5");
              }}
            >
              5
            </div>
            <div
              className="act flex-center"
              onClick={() => {
                clickClavier("6");
              }}
            >
              6
            </div>
            <div
              className="act flex-center"
              onClick={() => {
                clickClavier("clear");
              }}
            >
              C
            </div>
            <div
              className="act flex-center"
              onClick={() => {
                clickClavier("1");
              }}
            >
              1
            </div>
            <div
              className="act flex-center"
              onClick={() => {
                clickClavier("2");
              }}
            >
              2
            </div>
            <div
              className="act flex-center"
              onClick={() => {
                clickClavier("3");
              }}
            >
              3
            </div>
            <div
              className="act flex-center"
              onClick={() => {
                clickClavier("0");
              }}
            >
              0
            </div>
            <div
              className="act flex-center"
              onClick={() => {
                clickClavier(".");
              }}
            >
              .
            </div>
            <div
              className="act flex-center"
              onClick={() => {
                clickClavier("00");
              }}
            >
              .00
            </div>
            <div className="act flex-center res" onClick={addToBill}>
              Suivant
            </div>
            <div className="act flex-center"></div>
            <div className="act flex-center"></div>
            <div className="act flex-center"></div>
            <div
              className="act flex-center flex-column closeClavierBtn "
              onClick={hiddenClavier}
            >
              <p className="iconAction">
                <i className="fas fa-times-circle"></i>
              </p>
              <p className="textAction">Fermer</p>
            </div>
          </div>
        </div>
        <div className="d-flex aside">
          <div className="asideGrid">
            <div className="gridCardAside"></div>
            <div className="gridCardAside"></div>
            <div
              className="gridCardAside trois flex-center"
              onClick={() => {
                setShowArticleManager(true);
              }}
            >
              <i className="fas fa-close"></i> Retirer les produits
            </div>

            <div
              className="gridCardAside quatre flex-center"
              onClick={() => {
                showModal(
                  <ActionsModales
                    closeModal={closeModal}
                    actionMsg="Vider"
                    action={() => {
                      setBill({});
                    }}
                    message="Voulez vous vider la facture ? "
                  />
                );
              }}
            >
              <i className="fas fa-trash"></i> Vider la facture
            </div>
            <div
              className={
                "gridCardAside cinq flex-center " +
                (printDisabled ? "disabled" : "")
              }
              onClick={printBill}
            >
              <i className="fas fa-print"></i> Imprimer la facture
            </div>
            <div
              className="gridCardAside flex-center showClavierBtn flex-column "
              onClick={showClavier}
            >
              <p className="iconAction">
                <i className="fas fa-keyboard"></i>
              </p>
              <p className="textAction">Clavier</p>
            </div>
          </div>
        </div>
      </div>
      {showArticleManager ? (
        <ManageArticles
          closeModal={() => setShowArticleManager(false)}
          bill={bill}
          setBill={setBill}
        />
      ) : (
        ""
      )}
      {modal}
    </div>
  );
};

export default MainComponent;
