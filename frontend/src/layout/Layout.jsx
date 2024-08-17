import React, { useState } from "react";
import SideBar from "../components/sideBar/SideBar";
import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";

function Layout() {
  const [sideOpen, setSideOpan] = useState(true)

  return (
    <div className="d-flex">
      <SideBar sideOpen={sideOpen} setSideOpan={setSideOpan} />
      <div className="w-100 main-content">
        <NavBar sideOpen={sideOpen} setSideOpan={setSideOpan} />
          <Outlet />
      </div>
    </div>
  );
}

export default Layout;
