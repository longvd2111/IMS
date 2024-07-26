import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Alert } from "react-bootstrap";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../assets/css/job-css/JobList.css";
import { fetchAllJobs, deleteJobs } from "~/services/jobApi";
import SearchJob from "./SearchJob";
import Pagination from "~/components/common/Pagination";

export default function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalJob, setModalJob] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  const navigate = useNavigate();

  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await fetchAllJobs();
        if (res.data) {
          setJobs(res.data);
          setFilteredJobs(res.data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    getJobs();
  }, []);

  const handleDeleteClick = (job) => {
    setModalJob(job);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteJobs(modalJob.id);
      const updatedJobs = jobs.filter((item) => item.id !== modalJob.id);
      setJobs(updatedJobs);
      setFilteredJobs(updatedJobs);
      setAlertMessage(`Deleted job`);
      setShowAlert(true);
    } catch (error) {
      console.error("Error deleting job:", error);
    } finally {
      setShowModal(false);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  const formatDate = (dateArray) => {
    if (Array.isArray(dateArray) && dateArray.length === 3) {
      const [year, month, day] = dateArray;
      const formattedDay = day.toString().padStart(2, "0");
      const formattedMonth = month.toString().padStart(2, "0");
      return `${formattedDay}/${formattedMonth}/${year}`;
    }
    return "";
  };

  const handleModalClose = () => setShowModal(false);
  const handleAlertClose = () => setShowAlert(false);

  const userRole = JSON.parse(localStorage.getItem("user")).role;

  const handleSearch = (query, status) => {
    const filtered = jobs.filter((job) => {
      const matchesTitle = job.jobTitle.toLowerCase().includes(query.toLowerCase());
      const matchesSkill = job.requiredSkillSet.some((skill) =>
        skill.name.toLowerCase().includes(query.toLowerCase())
      );
      const matchesLevel = job.jobLevel.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "" || job.jobStatus === status;
      return (matchesTitle || matchesSkill || matchesLevel) && matchesStatus;
    });
    setFilteredJobs(filtered);
    setCurrentPage(1);
  };
  const handlePageChange = (page) => {
    if (page > 0 && page <= Math.ceil(filteredJobs.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);
  return (
    <>
      <SearchJob onSearch={handleSearch} />
      {loading ? (
        <div>Loading....</div>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Required Skills</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayJobs.length > 0 ? (
                displayJobs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.jobTitle}</td>
                    <td>
                      {job.requiredSkillSet.map((skill, index) => (
                        <span key={index}>
                          {skill.name}
                          {index < job.requiredSkillSet.length - 1 && ", "}
                        </span>
                      ))}
                    </td>
                    <td>{formatDate(job.startDate)}</td>
                    <td>{formatDate(job.endDate)}</td>
                    <td>{job.jobStatus}</td>
                    <td>{job.jobLevel}</td>
                    <td>
                      <FaEye
                        onClick={() => navigate(`/job/${job.id}`)}
                        style={{ cursor: "pointer", marginRight: "10px" }}
                      />
                      {["ROLE_RECRUITER", "ROLE_MANAGER", "ROLE_ADMIN"].includes(userRole) && (
                        <>
                          <FaEdit
                            onClick={() => navigate(`edit/${job.id}`)}
                            style={{ cursor: "pointer", marginRight: "10px" }}
                          />
                          <FaTrash
                            onClick={() => handleDeleteClick(job)}
                            style={{ cursor: "pointer", marginRight: "10px" }}
                          />
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No item matches with your search data. Please try again.</td>
                </tr>
              )}
            </tbody>
          </Table>
          <Pagination
           currentPage={currentPage}
           totalItems={Math.ceil(filteredJobs.length / itemsPerPage)}
           onPageChange={handlePageChange}
          
          />

          <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <h4 style={{ textAlign: "center" }}>Are you sure you want to delete this job?</h4>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModalClose}>
                Cancel
              </Button>
              <Button variant="secondary" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="alert-job">
            <Alert show={showAlert} variant="success" onClose={handleAlertClose} dismissible>
              <Alert.Heading>Success</Alert.Heading>
              <p>{alertMessage}</p>
            </Alert>
          </div>
        </>
      )}
    </>
  );
}
