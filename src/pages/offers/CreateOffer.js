import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { FaAngleRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/offer-css/offer.css";
import "../../assets/css/candidate-css/CandidateDetail.css";
import {
  departmentOffer,
  constractType,
  offerLevel,
  offerPosition,
} from "~/data/Constants";
import ApiService from "~/services/serviceApiOffer";
import { fetchAllCandidate } from "~/services/candidateApi";
import ApiUser from "~/services/usersApi";

export default function CreateOffer() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [interview, setInterview] = useState([]);
  const [users, setUsers] = useState([]);
  const [dateError, setDateError] = useState("");
  const [interviewNotes, setInterviewNotes] = useState("");
  const [formData, setFormData] = useState({
    candidateId: "",
    contractType: "",
    position: "",
    offerLevel: "",
    approvedBy: "",
    department: "",
    interviewSchedule: "",
    recruiterOwnerId: "",
    contractFrom: "",
    contractTo: "",
    dueDate: "",
    basicSalary: "",
    note: "",
    email: "null",
    offerStatus: "WAITING_FOR_APPROVAL",
  });

  const loadData = async () => {
    try {
      const response = await fetchAllCandidate();
      setCandidates(response.data);
      const responseInter = await ApiService.ApiInterview();
      setInterview(responseInter.data);
      const responseUser = await ApiUser.getUsers();
      setUsers(responseUser.data);
    } catch (error) {
      console.error("Error loading:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // const Interview = interview.map((item) => {
  //   return item.interviewerSet.map((it) => it.name);
  // });
  // // console.log(users, "USER");
  // // console.log(Interview, "Interview");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const newState = { ...prevState, [name]: value };

      if (
        name === "contractFrom" ||
        name === "contractTo" ||
        name === "dueDate"
      ) {
        const from = name === "contractFrom" ? value : newState.contractFrom;
        const to = name === "contractTo" ? value : newState.contractTo;
        const due = name === "dueDate" ? value : newState.dueDate;
        const today = new Date().toISOString().split("T")[0];

        if (from && to && new Date(from) > new Date(to)) {
          setDateError("Start date cannot be after end date");
        } else if (due && new Date(due) < new Date(today)) {
          setDateError("Due date cannot be in the past");
        } else {
          setDateError("");
        }
      }

      if (name === "interviewSchedule") {
        const selectedInterview = interview.find(
          (i) => i.id === parseInt(value)
        );
        if (selectedInterview) {
          newState[name] = {
            id: selectedInterview.id,
            interviewerDto: selectedInterview.interviewerSet.map(
              (interviewer) => ({
                id: interviewer.id,
                name: interviewer.name,
              })
            ),
            notes: selectedInterview.note,
          };
          setInterviewNotes(selectedInterview.note || "");
        } else {
          newState[name] = null;
          setInterviewNotes("");
        }
      } else {
        newState[name] = value;
      }

      if (name === "note" && value.length > 500) {
        return prevState;
      }

      return newState;
    });
  };
  console.log(formData, "formdta");
  console.log(interviewNotes, "setInterviewNotes");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dateError) {
      alert("Please correct the date errors before submitting.");
      return;
    }
    try {
      const response = await ApiService.ApiAddOffer(formData);
      console.log("Offer added successfully:", response.data);
      alert("Sucessfully created offer");
      navigate("/offer");
    } catch (error) {
      console.error("Error adding offer:", error);
      alert("Failed to created offer");
    }
  };

  const handleAssignMe = () => {
    const currentUserId = localStorage.getItem("currentUserId");
    console.log("Current User ID from localStorage:", currentUserId);
    if (!currentUserId) {
      alert("Unable to assign. Current user information not available.");
      return;
    }

    const currentUser = users.find(
      (user) => user.id === currentUserId && user.userRole === "ROLE_RECRUITER"
    );
    console.log("Users array:", users); // Log users array
    console.log("Matching current user:", currentUser); // Log currentUser
    if (currentUser) {
      setFormData((prevState) => ({
        ...prevState,
        recruiterOwnerId: currentUser.id,
      }));
    } else {
      alert("You don't have recruiter privileges.");
    }
  };

  return (
    <Container className="mb-3">
      <div className="breadcrumb__group">
        <span className="breadcrumb-link" onClick={() => navigate("/offer")}>
          Offer List
        </span>
        <FaAngleRight />
        <span className="breadcrumb-link__active">Create Offer</span>
      </div>
      <div className="content-offer-form">
        <Row>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Candidate <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      name="candidateId"
                      value={formData.candidateId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Candidate Name</option>
                      {Array.isArray(candidates) &&
                        candidates
                          .filter((ca) => ca.candidateStatus !== "BANNED")
                          .map((candidate) => (
                            <option key={candidate.id} value={candidate.id}>
                              {candidate.fullName}
                            </option>
                          ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Contract Type <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      name="contractType"
                      value={formData.contractType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a type of contract</option>
                      {Object.entries(constractType).map(([value, name]) => (
                        <option key={value} value={value}>
                          {name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Position <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a Position</option>
                      {Object.entries(offerPosition).map(([value, name]) => (
                        <option key={value} value={value}>
                          {name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Level <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      name="offerLevel"
                      value={formData.offerLevel}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a level</option>
                      {Object.entries(offerLevel).map(([value, name]) => (
                        <option key={value} value={value}>
                          {name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Approver <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      name="approvedBy"
                      value={formData.approvedBy}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select an approver</option>
                      {Array.isArray(users) &&
                        users
                          .filter((user) => user.userRole === "ROLE_MANAGER")
                          .map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.fullName}
                            </option>
                          ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Department<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a department</option>
                      {Object.entries(departmentOffer).map(([value, name]) => (
                        <option key={value} value={value}>
                          {name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Interview info <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      name="interviewSchedule"
                      value={
                        formData.interviewSchedule
                          ? formData.interviewSchedule.id
                          : ""
                      }
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select an interview schedule</option>
                      {Array.isArray(interview) &&
                        interview.map((inter) => (
                          <option key={inter.id} value={inter.id}>
                            {inter.title} -{" "}
                            {inter.interviewerSet
                              .map((interviewer) => interviewer.name)
                              .join(", ")}
                          </option>
                        ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Recruiter Owner <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      name="recruiterOwnerId"
                      value={formData.recruiterOwnerId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Recruiter Owner</option>
                      {Array.isArray(users) &&
                        users
                          .filter((user) => user.userRole === "ROLE_RECRUITER")
                          .map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.fullName}-{user.username}
                            </option>
                          ))}
                    </Form.Select>
                    <Link className="text-assigned" onClick={handleAssignMe}>
                      Assign to me
                    </Link>
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Contract Period
                  </Form.Label>
                  <Col sm={9}>
                    <Row>
                      From
                      <Col>
                        <Form.Control
                          size="sm"
                          className="w-100"
                          type="date"
                          name="contractFrom"
                          value={formData.contractFrom}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </Col>
                      To
                      <Col>
                        <Form.Control
                          size="sm"
                          className="w-100"
                          type="date"
                          name="contractTo"
                          value={formData.contractTo}
                          onChange={handleInputChange}
                          min={
                            formData.contractFrom ||
                            new Date().toISOString().split("T")[0]
                          }
                        />
                      </Col>
                    </Row>
                    {dateError && (
                      <div className="text-danger">{dateError}</div>
                    )}
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Due Date <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Interview Notes
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      as="textarea"
                      readOnly
                      value={interviewNotes}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Basic Salary <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      placeholder="Enter basic salary"
                      name="basicSalary"
                      value={formData.basicSalary}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 6, offset: 6 }} className="mb-3">
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Note
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      as="textarea"
                      placeholder="Type a note"
                      style={{ minHeight: "100px" }}
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      maxLength={500}
                    />
                    <Form.Text muted>
                      {formData.note.length}/500 characters
                    </Form.Text>
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <div className="button-offer btn-bottom">
                <button type="submit" className="button-submit">
                  Submit
                </button>
                <button
                  type="button"
                  className="button-submit"
                  onClick={() => navigate("/offer")}
                >
                  Cancel
                </button>
              </div>
            </Row>
          </Form>
        </Row>
      </div>
    </Container>
  );
}
