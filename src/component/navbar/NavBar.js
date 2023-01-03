import { deleteUser } from "firebase/auth";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import "./navbar.css";

export default function NavBar() {
  const [click, setClick] = useState(false);

  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();


  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  const deletePermenat = async () => {
    try {
      // eslint-disable-next-line no-restricted-globals
      let text = confirm("Are you sure you want to delete account?");
      if (text === true) {
        await deleteUser(user);
        navigate("/login");
      }
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        alert("Require user to sign in again.");
      }
    }
  }

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <div className="nav-logo">
            <i className="fa fa-trophy"></i>
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/"
                activeclassname="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/blog"
                activeclassname="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/details"
                activeclassname="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Details
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/task"
                activeclassname="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Task Details
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/login"
                activeclassname="active"
                className="nav-links"
                onClick={click ? handleLogout : null}
              >
                LogOut
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeclassname="active"
                className="nav-links"
                onClick={deletePermenat}
              >
                Delete Account
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </div>
  );
}
