import { useEffect, useState } from "react";
import Modal from "./Modal";
import ProductModel from "../../../models/products";
import "../styles/editproduct.scss"
import { toast } from "react-toastify";

function EditProduct({id,hide}) {
  const [quantity,setQuantity] = useState({});
  const [product_name,setproduct_name] = useState({});
  const [price,setPrice] = useState({});
  useEffect(()=>{
    ProductModel.get(id).then(data=>{
      setproduct_name(data.product_name)
      setPrice(data.price)
      setQuantity(data.quantity)
    }).catch(error=>{

    })

  },[id])
  const saveProduct = () => {
    if(product_name.length < 1){
      toast.error("Remplissez le champ \"Nom du Produit\"",{
        autoClose:400
      })
      return
    }else{
      const toastID = toast.loading("Enregistrement...");
      let product = {
        id,
        product_name,
        quantity,
        price
      }
      ProductModel.update(product).then((data)=>{
        console.log(data)
        toast.update(toastID, {
          render: `La modification du produit ${product.product_name} a réussi`,
          type: "success",
          isLoading: false,
          progress:0,
          autoClose: 4000
        });
        hide();
      }).catch(error=>{
        toast.update(toastID, {
          render: `Une erreur s'est produite (${error.message}) `,
          type: "error",
          isLoading: false,
          progress:0,
          autoClose: 4000,
        });
        console.log(error)
      })
    }
  }
  return (
    <Modal
      hideModal={hide}
      element={
        <div className="edit-container">
          <div className="form-group">
            <label htmlFor={"product-name-"+id}>Nom du produit</label>
            <input type="text" onChange={(e)=>{setproduct_name(e.target.value)}} value={product_name} id={"product-name-"+id}/>
          </div>
          <div className="form-group">
            <label htmlFor={"price-"+id}>Prix</label>
            <input type="number" onChange={(e)=>{setPrice(e.target.value)}} value={price} id={"price-"+id}/>
          </div>
          <div className="form-group">
            <label htmlFor={"quantity-"+id}>Quantité</label>
            <input type="number" onChange={(e)=>{setQuantity(e.target.value)}} value={quantity} id={"quantity-"+id}/>
          </div>
          <div className="form-group">
            <button className="btn btn-success" onClick={saveProduct}><i className="fas fa-save"></i> Enregistrer</button>
          </div>
      </div>
      }
    />
  );
}

export default EditProduct;
