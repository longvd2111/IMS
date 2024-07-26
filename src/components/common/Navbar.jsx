import React from "react";
import { Col, Nav, Row } from "react-bootstrap";
import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaFileAlt,
  FaCheckCircle,
  FaUserCircle,
} from "react-icons/fa";
import "~/assets/css/Navbar.css";

const Sidebar = ({ isExpanded, handleMouseEnter, handleMouseLeave }) => {
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`sidebar ${isExpanded ? "expanded" : ""}`}
    >
      <Row>
        <Col sm={6}>
          <div className="logo">DEV</div>
        </Col>
        <Col sm={6}>
          <div className="logo-text">IMS</div>
        </Col>
      </Row>
      <Nav className="flex-column">
        <Nav.Link href="/" className="nav-link">
          <FaHome size={24} className="nav-icon" />
          <span className="nav-label">Home</span>
        </Nav.Link>
        <Nav.Link href="/candidate" className="nav-link">
          <FaUser size={24} className="nav-icon" />
          <span className="nav-label">Candidate</span>
        </Nav.Link>
        <Nav.Link href="/job" className="nav-link">
          <FaBriefcase size={24} className="nav-icon" />
          <span className="nav-label">Job</span>
        </Nav.Link>
        <Nav.Link href="/interview" className="nav-link">
          <FaFileAlt size={24} className="nav-icon" />
          <span className="nav-label">Interview</span>
        </Nav.Link>
        <Nav.Link href="/offer" className="nav-link">
          <FaCheckCircle size={24} className="nav-icon" />
          <span className="nav-label">Offer</span>
        </Nav.Link>
        <Nav.Link href="/user" className="nav-link">
          <FaUserCircle size={24} className="nav-icon" />
          <span className="nav-label">User</span>
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
