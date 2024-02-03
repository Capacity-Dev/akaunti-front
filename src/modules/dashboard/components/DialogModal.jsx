import React from "react";
//import ProductModel from "../../../models/products";

function DialogModal({children}) {
  
  return (
    <div className="overlay">
      <div className="DialogModal">
        {children}
      </div>
    </div>
  );
}

export default DialogModal;
