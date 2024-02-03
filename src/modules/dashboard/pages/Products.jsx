import { useEffect, useState } from "react";
import ProductModel from "../../../models/products";
import "../styles/products.scss";
import { toast } from "react-toastify";
import EditProduct from "../components/EditProduct";
import DialogModal from "../components/DialogModal";
import { useNavigate } from "react-router-dom";
import DataTableBase from "../components/DataTable";



function Products() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setQuery] = useState("");
  const [edition, setEditionState] = useState({ state: false, id: 0 });
  const [deleteModal, toggleDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState();
  const [critical, setCritical] = useState(0);
  const changeLocation = useNavigate();
  const hideEdition = () => {
    setEditionState({ state: false, id: 0 });
  };
  useEffect(() => {
    ProductModel.fetch().then((data) => {
      setProducts(data);
    });
    ProductModel.getConfigs().then((data) => {
      setCritical(data.critical);
    });
  }, []);
  useEffect(() => {
    if (searchQuery.length >= 2) {
      ProductModel.search(searchQuery)
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          toast.error("Impossible de charger les produits", {
            autoClose: 5000,
          });
          console.log(error);
        });
    }
  }, [searchQuery]);
  useEffect(() => {
    if (edition.state === false) {
      ProductModel.fetch().then((data) => {
        setProducts(data);
      });
    }
  }, [edition]);
  const queryChanged = (e) => {
    setQuery(e.target.value);
  };
  const handleEdition = (id) => {
    setEditionState({ state: true, id });
  };
  const deleteProduct = (id) => {
    const toastID = toast.loading("Suppression en cours ...");
    ProductModel.deleteProduct(id)
      .then((data) => {
        console.log(data);
        toast.update(toastID, {
          render: `Produit effacé !`,
          type: "success",
          isLoading: false,
          progress: 0,
          autoClose: 4000,
        });
      })
      .catch((error) => {
        console.log(error);
        let msg =
          error.response && error.response.data
            ? error.response.data.error
            : error.message;
        toast.update(toastID, {
          render: `Une erreur s'est produite (${msg}) `,
          type: "error",
          isLoading: false,
          progress: 0,
          autoClose: 6000,
        });
      });
  };
  const handleDeleteDialog = (product) => {
    setProductToDelete(product);
    toggleDeleteModal(true);
  };
  const exportProducts = () => {
    const toastID = toast.loading("Construction du CSV ...");
    ProductModel.export()
      .then((data) => {
        const file = new Blob([data], { type: "text/csv" });
        const href = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "produits-export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
        toast.update(toastID, {
          render: "Importation réussi !",
          type: "success",
          isLoading: false,
          progress: 0,
          autoClose: 6000,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.update(toastID, {
          render: `Une erreur s'est produite (${error.message}) `,
          type: "error",
          isLoading: false,
          progress: 0,
          autoClose: 6000,
        });
      });
  };
  const columns = [
    {
      name: "Produit",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Code Barre",
      selector: (row) => row.barcode,
    },
    {
      name: "Prix",
      selector: (row) => parseInt(row.price),
      sortable: true,
    },
    {
      name: "Quantité",
      selector: (row) => parseInt(row.quantity),
      sortable: true,
      conditionalCellStyles: [
        {
          when: row => parseInt(row.quantity) < parseInt(critical),
          style:{
            backgroundColor: 'rgba(242, 38, 19, 0.9)',
					  color: 'white'
          }
        }
      ]
    },
    {
      name: 'Actions',
      button: true,
      cell: row => (
        <div className="actions">
              <i
                className="fas fa-pen"
                onClick={() => handleEdition(row.id)}
              ></i>
              <i
                className="fas fa-close"
                onClick={() => handleDeleteDialog(row)}
              ></i>
            </div>
      ),
    },
  ];
  return (
    <div className="container products">
      {edition.state && <EditProduct id={edition.id} hide={hideEdition} />}
      {deleteModal && (
        <DialogModal hideModal={() => toggleDeleteModal(false)}>
          <div>
            <h3>
              Voulez-vous Vraiment supprimer le produit <br />
              {productToDelete.product_name} ?
            </h3>
            <div className="actions-btn">
              <button
                className="btn btn-primary"
                onClick={() => toggleDeleteModal(false)}
              >
                <i className="fas fa-close"></i> Annuler
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteProduct(productToDelete.id);
                  toggleDeleteModal(false);
                }}
              >
                <i className="fas fa-trash"></i> Supprimer
              </button>
            </div>
          </div>
        </DialogModal>
      )}
      <div className="action-bar">
        <div className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={queryChanged}
            name=""
            id=""
            placeholder="Rechercher..."
          />
        </div>
        <div className="buttons-bar">
          <button
            className="btn btn-primary"
            onClick={(e) => changeLocation("/dashboard/add")}
          >
            <i className="fas fa-plus"></i> Ajouter
          </button>
        </div>
        <div className="buttons-bar">
          <button className="btn btn-success" onClick={exportProducts}>
            <i className="fas fa-download"></i> Télécharger
          </button>
        </div>
      </div>
      <DataTableBase columns={columns} data={products} selectableRows />
    </div>
  );
}

export default Products;
