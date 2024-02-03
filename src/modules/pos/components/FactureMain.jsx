import React from "react";

const FactureMain = ({ bill,config,billComponent }) => {
  let total = 0;
  Object.keys(bill).map((key) => {
    let product = bill[key];
    return (total += parseInt(product.total));
  });
  let tbody = Object.keys(bill).map((key) => {
    let product = bill[key];
    return (
      <tr key={key}>
        <td>{product.product_name}</td>
        <td>{product.quantity}</td>
        <td>{product.price}</td>
        <td>{product.total}</td>
      </tr>
    );
  });
  return (
    <div className="receipt-container" ref={billComponent}>
      <div className="bill-container">
        <div className="receipt_header">
          <h1>
            <span>{config.companyName}</span>
          </h1>
          <h2>
            Addresse: {config.adress} <span>Tel: {config.phone}</span>
          </h2>
        </div>

        <div className="receipt_body">
          <div className="date_time_con">
            <div className="date">{''}</div>
            <div className="time">{(new Intl.DateTimeFormat('fr-FR',{ dateStyle:'medium',timeStyle: 'short'})).format(new Date().getTime())}</div>
          </div>

          <div className="items">
            <table>
              <thead>
                <tr>
                <th>ITEM</th>
                <th>QTY</th>
                <th>PRIX</th>
                <th>TOT.</th>
                </tr>
              </thead>

              <tbody>
                {tbody}
              </tbody>

              <tfoot>
                <tr>
                  <td>Total</td>
                  <td></td>
                  <td></td>
                  <td>{total} {config.currency}</td>
                </tr>

                <tr>
                  <td>TVA</td>
                  <td></td>
                  <td></td>
                  <td>{((total*parseInt(config.tva))/100)} {config.currency}</td>
                </tr>

                <tr>
                  <td>Total HT</td>
                  <td></td>
                  <td></td>
                  <td>{total-((total*parseInt(config.tva))/100)} {config.currency}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <h3>{config.goodbye}</h3>
      </div>
    </div>
  );
};

export default FactureMain;
