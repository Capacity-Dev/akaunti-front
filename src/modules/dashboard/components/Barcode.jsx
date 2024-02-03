import React, { useRef } from "react";

import Modal from "./Modal";
import Barcode from "react-barcode";
import "../styles/barcode.scss";
import svg2Img from "@ferdipret/svg-2-img";
import { useReactToPrint } from "react-to-print";

function ShowBarcode({ hide, barcode }) {
  const barcodeComponent = useRef(null);
  const saveImage = () => {
    console.log(barcodeComponent.current.renderElementRef.current);
    svg2Img(barcodeComponent.current.renderElementRef.current, {
      format: "jpeg",
      downloadFileName: "barcode-auto-generated",
    });
  };
  const handlePrint = useReactToPrint({
    content: () => barcodeComponent.current.renderElementRef.current,
  });
  return (
    <Modal
      hideModal={hide}
      element={
        <div className="b-container">
          <div className="wrapper">
            <Barcode value={barcode} ref={barcodeComponent} id="barcode" />
          </div>
          <div className="actions">
            <span className="btn btn-success" onClick={saveImage}>
              <i className="fas fa-save"></i> Enregistrer
            </span>
            <span className="btn btn-primary" onClick={handlePrint}>
              <i className="fas fa-print"></i> Imprimer
            </span>
          </div>
        </div>
      }
    />
  );
}

export default ShowBarcode;
