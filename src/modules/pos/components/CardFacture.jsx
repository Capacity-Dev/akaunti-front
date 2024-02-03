import React from "react";
import FactureHeader from "./FactureHeader";
import FactureMain from "./FactureMain";
import FactureNavMenu from "./FactureNavMenu";

const CardFacture = ({ showFactureCard, hiddenCardFact,bill,config,billComponent }) => {
  return (
    <section
      className={"card_facture d-flex flex-column h-100 " + showFactureCard}
    >
      <FactureHeader
        showFactureCard={showFactureCard}
        hiddenCardFact={hiddenCardFact}
      />
      <FactureMain bill={bill} config={config} billComponent={billComponent} />
      <div className="factureSearch">
        <div className="d-flex justify-content-center">
          <i className="fas fa-print"></i>
          Imprimer
        </div>
      </div>
      <FactureNavMenu />
    </section>
  );
};

export default CardFacture;
