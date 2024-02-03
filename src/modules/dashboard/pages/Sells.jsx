import { useEffect, useState } from "react";
import ProductModel from "../../../models/products";
import "../styles/products.scss";
import { toast } from "react-toastify";
import DataTableBase from "../components/DataTable";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { NumericFormat } from "react-number-format";



function Sells() {
  const [searchQuery, setQuery] = useState("m");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [total, setTotal] = useState(0);
  const [productsList, setProducts] = useState([]);
  useEffect(() => {
    ProductModel.getSells("m").then((data) => {
      console.log(data);
      setProducts(data.products ? data.products : []);
      setTotal(data.total ? data.total : 0);
    });
  }, []);
  const columns = [
    {
      name: "Produit",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Prix",
      selector: (row) => parseInt(row.totalPrice),
      sortable: true,
    },
    {
      name: "Quantité",
      selector: (row) => row.totalQuantity,
      sortable: true,
    }
    
  ]
  const queryChanged = (e) => {
    setQuery(e.target.value);
    ProductModel.getSells(e.target.value)
      .then((data) => {
        setProducts(data.products ? data.products : []);
        setTotal(data.total ? data.total : 0);
        console.log(data);
      })
      .catch((error) => {
        toast.error("Impossible de charger les produits", {
          autoClose: 5000,
        });
        console.log(error);
      });
  };
  return (
    <div className="container products">
      <div className="action-bar">
        <div className="search-bar">
          <select value={searchQuery} onChange={queryChanged}>
            <option value="m">Mensuel</option>
            <option value="d">Journalier</option>
          </select>
        </div>
          {searchQuery === "m" ? (
            <DatePicker
              selected={selectedMonth}
              onChange={(date) => setSelectedMonth(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />):<DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} /> }
        <div className="buttons-bar">
          <button className="btn btn-primary">
            <span><NumericFormat value={total} displayType="text" thousandSeparator=" " /></span>
          </button>
        </div>
      </div>
      <DataTableBase columns={columns} data={productsList} selectableRows />
    </div>
  );
}

export default Sells;
