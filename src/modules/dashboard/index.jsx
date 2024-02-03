import "./index.scss";
import React, { useState } from "react";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";

function Dashboard() {
  const [closed, setClosed] = useState(true);

  const toggleSidebar = () => {
    closed ? setClosed(false) : setClosed(true);
  };
  return (
    <>
        <Sidebar toggleSidebar={toggleSidebar} isClosed={closed} />
        <Content toggleSidebar={toggleSidebar} />
      <div id="download-comp"></div>
    </>
  );
}

export default Dashboard;
