import React, { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "~/contexts/auth/AuthContext";
import { CheckUrl, userRole } from "~/data/Constants";
import "~/assets/css/Header.css";

export default function Header() {
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();
  const name = user ? user.name : "Guest";
  const role = user
    ? userRole.find((ur) => ur.value === user.role)?.label
    : "Unknown";
  const listPage = Object.values(CheckUrl);

  const currentPage = listPage.find((p) => location.pathname.includes(p.link));

  return (
    <div className="header-container">
      <div className="header-left">
        <h1 className="title">{currentPage?.name}</h1>
      </div>

      <div className="header-right">
        <ul className="header-right-main">
          <li className="user__info">
            <h5 className="user__info-name">{name}</h5>
            <p className="user__info-position">{role}</p>
          </li>
          <li className="user__setting">
            <div className="user__setting-icon">
              <FaUserCircle className="user__setting-icon-son" />
            </div>
            <ul className="user__setting-dropdown">
              <li className="dropdown__item">
                <Link to="/user-management" className="dropdown__item-link">
                  <LuUser2 className="dropdown__item-icon" />
                  User management
                </Link>
              </li>
              <li className="dropdown__item">
                <Link to="/my-account" className="dropdown__item-link">
                  <IoSettingsOutline className="dropdown__item-icon" />
                  My account
                </Link>
              </li>
              <li onClick={logout} className="dropdown__item">
                <Link to="/" className="dropdown__item-link">
                  <MdOutlineLogout className="dropdown__item-icon" />
                  LogOut
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
