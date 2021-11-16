import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";

const Navbar = (props) => {
  const [sidebar, setSidebar] = useState(false);
  const { jerseys, setJerseys } = props;
  const showSidebar = () => setSidebar(!sidebar);

  const history = useHistory();

  const handleLogout = () => {
    // console.log("HELLO THERE");
    props.setUser(null);
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload();
    // console.log("GENERAL KENOBI");
  };

  return (
    <>
      {" "}
      <nav>
        <ul className="nav-links">
          <li> {!props.user && <a href="/login"> Login</a>}</li>{" "}
          <li>{!props.user && <a href="/register">Register</a>}</li>
          <li>
            {" "}
            {props.user && (
              <a href="/" onClick={handleLogout}>
                Logout
              </a>
            )}
          </li>
          <li>
            <Link to="/cart">
              <FaIcons.FaCartPlus className="cart-icon" />
            </Link>
          </li>
        </ul>
      </nav>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          {" "}
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>{" "}
        </div>{" "}
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            {" "}
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>{" "}
        <div>
          <a href="/login" className="login"></a>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
