import { NavLink, useLocation } from "react-router-dom";
import "./SideBar.css";
import { FaUserGroup } from "react-icons/fa6";
import { SlClose, SlArrowDown, SlArrowRight } from "react-icons/sl";
import { useEffect, useState } from "react";

function SideBar({ sideOpen, setSideOpan }) {
  const location = useLocation();
  const [isPaiementActive, setIsPaiementActive] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  useEffect(() => {
    const isActive = location.pathname.startsWith("/paiement");
    setIsPaiementActive(isActive);
  }, [location]);

  return (
    <div
      className={`sideBar-container ${sideOpen ? "sideBarClose" : "sideBarOpen"
        }`}
    >
      <div className="side-header">
        <span>Alwarda</span>
        <button className="close-side-bar" onClick={() => setSideOpan(true)} ><SlClose /></button>
      </div>
      <div className="side-links overflow-auto">
        <div className="side-link">
          <NavLink to="/eleve" activeClassName="active">
            <FaUserGroup />
            <span>Elève</span>
          </NavLink>
        </div>
        <div className="side-link">
          <NavLink to="/enseignant" activeClassName="active">
            <FaUserGroup />
            <span>Enseignant</span>
          </NavLink>
        </div>
        <div className="side-link">
          <NavLink to="/centre" activeClassName="active">
            <FaUserGroup />
            <span>Centre</span>
          </NavLink>
        </div>
        <div className="side-link">
          <NavLink to="/niveau" activeClassName="active">
            <FaUserGroup />
            <span>Niveau</span>
          </NavLink>
        </div>
        <div className="side-link">
          <NavLink to="/matiere" activeClassName="active">
            <FaUserGroup />
            <span>Matiere</span>
          </NavLink>
        </div>
        <div
          className={`side-link with-dropdown ${isPaiementActive ? 'active' : ''}`}
          onMouseEnter={() => setIsDropdownVisible(true)}
          onMouseLeave={() => setIsDropdownVisible(false)}
        >
          <NavLink to="/paiement" activeClassName="active">
            <FaUserGroup />
            <span>Paiement</span>
            {isDropdownVisible ? <SlArrowDown className="arrow-icon" /> : <SlArrowRight className="arrow-icon" />}
          </NavLink>
          <div className="dropDown">
            <NavLink to="/paiement/eleve" activeClassName="active">
              <FaUserGroup />
              <span>Sub Paiement 1</span>
            </NavLink>
            <NavLink to="/paiement/sub2" activeClassName="active">
              <FaUserGroup />
              <span>Sub Paiement 2</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
