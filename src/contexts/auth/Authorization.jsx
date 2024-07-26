import React, { useContext } from "react";
import { AuthContext } from "~/contexts/auth/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { userRole } from "~/data/Constants";

const Authorization = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  const ROLE_INTERVIEWER = userRole.find(
    (role) => role.value === "ROLE_INTERVIEWER"
  );

  if (!isAuthenticated() && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  if (
    isAuthenticated() &&
    (location.pathname === "/login" || location.pathname === "/forgot-pw")
  ) {
    return <Navigate to="/" replace />;
  }

  if (user) {
    if (
      user.role === ROLE_INTERVIEWER.value &&
      [
        "/offer",
        "/offer/",
        "/offer/add",
        "/offer/edit",
        "/candidate/add",
        "/candidate/edit",
        "/job/add",
        "/job/edit",
        "/interview/add",
        "/interview/edit",
      ].some((path) => location.pathname.startsWith(path))
    ) {
      // console.log(
      //   "Redirecting to no-permission because user is an interviewer and trying to access restricted pages"
      // );
      return <Navigate to="/no-permission" replace />;
    }
  }

  return <>{children}</>;
};

export default Authorization;
