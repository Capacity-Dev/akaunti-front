import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Routes,Route,BrowserRouter } from "react-router-dom";
import Dashboard from "./modules/dashboard";
import Pos from "./modules/pos";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./modules/Login";
import { AuthContext } from "./context/AuthContext";
import { useState } from "react";

function App() {
  const mainUser = JSON.parse(window.sessionStorage.getItem("user"))
  let [user, setUser] = useState(mainUser || null)

  return (
    <>
    <AuthContext.Provider value={{user,setUser}}>
      <ToastContainer autoClose={8000} />
      <BrowserRouter>
        <Routes>
          <Route name={"login"} path="/login" element={<Login/>} />
          <Route name={"dashboard"} path="/dashboard/*" element={<ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>}></Route>
          <Route name={"pos"} path="/*" element={
            <ProtectedRoute>
              <Pos/>
            </ProtectedRoute>
          }></Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
    </>
  );
}

export default App;
