import { useEffect, useState } from "react";
import "../styles/products.scss";
import { toast } from "react-toastify";
import EditUser from "../components/EditUser";
import DialogModal from "../components/DialogModal";
import UserModel from "../../../models/users";

function Users() {
  const [users, setusers] = useState([]);
  const [searchQuery, setQuery] = useState("");
  const [edition, setEditionState] = useState({ state: false, id: 0 });
  const [deleteModal, toggleDeleteModal] = useState(false);
  const [userToDelete, setuserToDelete] = useState();
  const [newUser, setNewUser] = useState(false);
  const hideEdition = () => {
    setEditionState({ state: false, id: 0 });
  };
  useEffect(() => {
    UserModel.fetch().then((data) => {
      setusers(data);
    });
  }, []);
  useEffect(() => {
    if (searchQuery.length >= 2) {
      UserModel.search(searchQuery)
        .then((data) => {
          setusers(data);
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
    if(edition.state === false) {
      UserModel.fetch().then((data) => {
        setusers(data);
      });
    }
  }, [edition]);
  const queryChanged = (e) => {
    setQuery(e.target.value);
  };
  const handleEdition = (id) => {
    setEditionState({ state: true, id });
  };
  const deleteuser = (id) => {
    const toastID = toast.loading("Suppression en cours ...");
    UserModel.delete(id)
      .then((data) => {
        console.log(data);
        toast.update(toastID, {
          render: `Utilisateur effacé !`,
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
  const handleDeleteDialog = (key) => {
    setuserToDelete(users[key]);
    toggleDeleteModal(true);
  };
  const listItems = users.map((user, key) => {
    return (
      <tr key={key} className="list-item">
        <td>{user.usrname}</td>
        <td>{user.profession}</td>
        <td>{user.privillege}</td>
        <td>
          <div className="actions">
            <i
              className="fas fa-pen"
              onClick={() => handleEdition(user.id)}
            ></i>
            <i
              className="fas fa-close"
              onClick={() => handleDeleteDialog(key)}
            ></i>
          </div>
        </td>
      </tr>
    );
  });
  return (
    <div className="container users">
      {edition.state && <EditUser id={edition.id} hide={hideEdition} />}
      {newUser && <EditUser  hide={()=>setNewUser(false)} />}
      {deleteModal && (
        <DialogModal hideModal={() => toggleDeleteModal(false)}>
          <div>
            <h3>
              Voulez-vous Vraiment supprimer l'utilisateur <br />
              {userToDelete.usrname} ?
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
                  deleteuser(userToDelete.id);
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
          <button className="btn btn-success" onClick={()=>setNewUser(true)}>
            <i className="fas fa-add"></i>
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Utilisateur</th>
            <th>fonction</th>
            <th>privillege</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{listItems}</tbody>
      </table>
    </div>
  );
}

export default Users;
