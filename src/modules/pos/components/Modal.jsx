import React from "react";

function Modal({element,hideModal}) {
  return (
    <div className="overlay">
      <div className="modal">
          <i id="modalCloser" className="fas fa-close" onClick={hideModal}></i>
        {element}
      </div>
    </div>
  );
}

export default Modal;
