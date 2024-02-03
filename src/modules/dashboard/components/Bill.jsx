import React from "react";
import "../styles/bill.scss"
const Bill = ({ infos }) => {
  return (
      <div className="bill-container">
        <div className="receipt_header">
          <h1>
            <span>{infos.companyName}</span>
          </h1>
          <h2>
            Addresse: {infos.adress} <span>{infos.phone}</span>
          </h2>
        </div>

        <div className="receipt_body">
          <div className="date_time_con">
            <div className="date">{""}</div>
            <div className="time">
              {new Intl.DateTimeFormat("fr-FR", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date().getTime())}
            </div>
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
                <tr>
                  <td>Item-no-1</td>
                  <td>200</td>
                  <td>40$</td>
                  <td>8000$</td>
                </tr>
                <tr>
                  <td>Item-no-2</td>
                  <td>200</td>
                  <td>40$</td>
                  <td>8000$</td>
                </tr>
                <tr>
                  <td>Item-no-3</td>
                  <td>200</td>
                  <td>40$</td>
                  <td>8000$</td>
                </tr>
              </tbody>

              <tfoot>
                <tr>
                  <td>Total</td>
                  <td></td>
                  <td></td>
                  <td>24 000 $</td>
                </tr>

                <tr>
                  <td>TVA</td>
                  <td></td>
                  <td></td>
                  <td>{((24000*parseInt(infos.tva))/100)} {infos.currency}</td>
                </tr>
                <tr>
                  <td>Total H.T</td>
                  <td></td>
                  <td></td>
                  <td>{24000-((24000*parseInt(infos.tva))/100)} {infos.currency}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <h3>{infos.goodbye}</h3>
      </div>
  );
};

export default Bill;
