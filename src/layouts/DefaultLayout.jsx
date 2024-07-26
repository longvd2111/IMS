// DefaultLayout.js
import Header from "~/components/common/Header";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "~/components/common/Navbar";
import { useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";

function DefaultLayout() {
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== "/login";

  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <div className="container1">
      {shouldShowNavbar && (
        <Navbar
          isExpanded={isExpanded}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      )}
      <div className={`main-content ${isExpanded ? "expanded" : ""}`}>
        {shouldShowNavbar && <Header />}
        <div className="main-content__son">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
