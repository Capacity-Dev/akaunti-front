import React, { useCallback, useEffect, useState } from "react";
import Modal from "./Modal";
import UserModel from "../../../models/users";
import { toast } from "react-toastify";

function EditUser({ hide, id }) {
  const [passwd, setPasswd] = useState("");
  const [user, setUser] = useState({
    usrname: "",
    profession: "",
    privillege: "user",
  });
  const [canChangePass, setCanChangePass] = useState(false);
  const modifyUser = (key, value) => {
    let copyUser = { ...user };
    copyUser[key] = value;
    setUser(copyUser);
  };
  let newUser = !id;
  const fillUser = useCallback(() => {
    if (id) {
      console.log(id);
      UserModel.get(id)
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          let msg =
            error.response && error.response.data
              ? error.response.data.error
              : error.message;
          toast.error(`Impossible de charger les informations (${msg})`, {
            autoClose: 5000,
          });
          hide();
        });
    }
  }, [id, hide]);
  useEffect(() => {
    fillUser();
  }, [fillUser]);
  const saveUser = () => {
    if (!(user.usrname.length > 2 && user.profession)) {
      toast.error(`Remplissez Correctement toutes les informations`, {
        autoClose: 5000,
      });
      return;
    }
    const toastID = toast.loading("Enregistrement ...");
    if (newUser) {
      let copyUser = { ...user };
      copyUser["passwd"] = passwd;
      UserModel.create(copyUser)
        .then((data) => {
          toast.update(toastID, {
            render: `Utilisateur Créé !`,
            type: "success",
            autoClose: 5000,
          });
        })
        .catch((error) => {
          let msg =
            error.response && error.response.data
              ? error.response.data.error
              : error.message;
          toast.update(toastID, {
            render: `Impossible d'ajouter cet Utilisateur (${msg})`,
            isLoading: false,
            progress: 0,
            type: "error",
            autoClose: 5000,
          });
        });
    } else {
      UserModel.update(user)
        .then((data) => {
          console.log(data);
          toast.update(toastID, {
            render: `Utilisateur Modifié !`,
            isLoading: false,
            type: "success",
            autoClose: 5000,
          });
        })
        .catch((error) => {
          console.log(error);
          let msg =
            error.response && error.response.data
              ? error.response.data.error
              : error.message;
          toast.update(toastID, {
            render: `Impossible d'enregistrer les informations (${msg})`,
            isLoading: false,
            progress: 0,
            type: "error",
            autoClose: 5000,
          });
        });
    }
  };
  return (
    <Modal
      hideModal={hide}
      element={
        <div className="edit-container">
          <div className="form-group">
            <h1>
              {newUser
                ? "Nouvel Utilisateur"
                : "Modifier l'Utilisateur " + user.usrname}
            </h1>
          </div>
          {newUser && (
            <div className="form-group">
              <label htmlFor={"user-name-"}>Nom d'Utilisateur</label>
              <input
                type="text"
                value={user.usrname}
                onChange={(e) => modifyUser("usrname", e.target.value)}
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor={"profession-"}>Fonction</label>
            <input
              type="text"
              value={user.profession}
              onChange={(e) => modifyUser("profession", e.target.value)}
              id={"profession-"}
            />
          </div>
          <div className="form-group">
            <label htmlFor={"privillege-"}>Privillege</label>
            <select
              value={user.privillege}
              onChange={(e) => modifyUser("privillege", e.target.value)}
              id={"privillege-"}
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>
          {!newUser && (
            <div className="form-group">
              <label htmlFor={"canChangePass-"}>modifier le mot de passe</label>
              <input
                type="checkbox"
                name="canChangePass"
                id="canChangePass"
                value={canChangePass}
                onChange={(e) => setCanChangePass(e.target.checked)}
              />
            </div>
          )}
          {(newUser || canChangePass) && (
            <div className="form-group">
              <label htmlFor={"passwd-"}>Mot de passe</label>
              <input
                type="password"
                value={passwd}
                onChange={(e) => setPasswd(e.target.value)}
                id={"passwd-"}
              />
            </div>
          )}
          <div className="form-group">
            <button className="btn btn-success" onClick={saveUser}>
              <i className="fas fa-save"></i> Enregistrer
            </button>
          </div>
        </div>
      }
    />
  );
}

export default EditUser;
