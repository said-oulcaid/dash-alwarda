import { useState } from "react";
import "./NavBar.css";
import { IoMenu } from "react-icons/io5";
import { SlClose } from "react-icons/sl";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/apiCalls/auth";
import { useNavigate } from "react-router-dom";
import { GoScreenNormal, GoScreenFull } from "react-icons/go";

function NavBar({ sideOpen, setSideOpan }) {
  const [profilDropDownOpen, SetProfilDropDownOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate  = useNavigate();
  const handelLogOut = () => {
    dispatch(logOut());
  };
  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFullScreen(!fullScreen);
    } else {
      document.documentElement.requestFullscreen();
      setFullScreen(!fullScreen);
    }
  };
  return (
    <>
      <div className="NavBar-content ">
        <div>
          <button onClick={() => setSideOpan(!sideOpen)}>
            <IoMenu />
          </button>
          <button onClick={() => navigate(-1)}>
            <IoArrowBackCircleOutline />
          </button>
        </div>
        <div className="d-flex align-items-center">
          <button className="full-scren mx-2" onClick={toggleFullScreen}>
            {fullScreen ? <GoScreenNormal /> : <GoScreenFull />}
          </button>
          <div
            className="Profil-nav"
            onClick={() => SetProfilDropDownOpen(true)}
          >
            <img src={require("./images/avatar.jpg")} alt="" />
          </div>
        </div>
      </div>
      {profilDropDownOpen && (
        <div className="profil-dropDown">
          <div className="user-profil">
            <span>User Profile</span>
            <button
              className="close-profil-dropDown"
              onClick={() => SetProfilDropDownOpen(!profilDropDownOpen)}
            >
              <SlClose />
            </button>
          </div>
          <span className="user-name">
            {user && `${user.user.firstname} ${user.user.lastname} `}
          </span>
          <span className="user-role">
            {user && user.user.isOwner ? "Owner" : "Administrator"}
          </span>
          <span className="user-email">{user && user.user.email}</span>
          <button className="logout-btn" onClick={handelLogOut}>
            Logout
          </button>
        </div>
      )}
    </>
  );
}

export default NavBar;
