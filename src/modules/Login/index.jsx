import React, { useRef, useState } from "react";
import "./style.scss";
import UserModel from "../../models/users";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  let username = useRef(null);
  let password = useRef(null);
  let [path,setPath] =useState("/");
  const {login,isAuthenticated} = useAuth();
  const [info,setInfo] = useState("")
  console.log(isAuthenticated())
  const connect = (username, password) => {
    let user = {
      username: username.current.value,
      passwd: password.current.value,
    };
    UserModel.login(user)
      .then((res) => {
        if(typeof res.username == 'undefined'){
          console.log(res)
          throw Error("Une erreur s'est produite")
        }
        if(res.privillege === "admin" || res.privillege === "root") setPath("/dashboard")
        login(res)
      })
      .catch((error) => {
        let msg =
          error.response && error.response.data
            ? error.response.data.error
            : error.message;
        console.log(msg)
        setInfo(msg)
      });
  };
  return isAuthenticated() ? <Navigate
  to={{
    pathname: path
  }}
/>: (
    <div className="login-container">
      <div className="left-side">
        <div>
          <h1>
            Bienvenue Dans <i id="akaunti">Akaunti</i> !
          </h1>
          <p>Gerez Votre Activité efficacement et Simplement !</p>
        </div>
      </div>
      <div className="right-side">
        <form
          action=""
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            connect(username, password);
          }}
          id="form"
        >
          
          <div className="login-form-group">
            {
                info?<span className="info">{info}</span>:""
            }
          </div>
          <div className="login-form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              ref={username}
              autoComplete="username"
              name="username"
              id="username"
              required
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="password">Mot de Passe</label>
            <input
              type="password"
              ref={password}
              id="password"
              name="passwd"
              autoComplete="current-password"
              required
            />
          </div>
          <div className="login-form-group">
            <button type="submit" id="button">
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}