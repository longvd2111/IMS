import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { Row, Col } from "react-bootstrap";
import "../../assets/css/offer-css/offer.css";
import { Container, Form } from "react-bootstrap";
import ApiService from "../../services/serviceApiOffer";
import { fetchAllCandidate } from "~/services/candidateApi";
import ApiUser from "~/services/usersApi";
import {
  departmentOffer,
  constractType,
  offerLevel,
  offerPosition,
} from "~/data/Constants";

const EditOffer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offerDetail, setOfferDetail] = useState({});
  const [candidates, setCandidateDTO] = useState([]);
  const [interview, setInterviewDTO] = useState([]);
  const [users, setUsers] = useState([]);
  const [dateError, setDateError] = useState("");
  const [formData, setFormData] = useState({
    id: "",
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
    offerStatus: "",
  });

  const loadData = async (id) => {
    try {
      const response = await ApiService.ApiDetailOffer(id);
      setOfferDetail(response);
      setFormData((prevState) => ({
        ...prevState,
        ...response,
        id: response.id || null,
        email: response.email || "null",
        offerStatus: response.offerStatus || "",
      }));
      console.log(response.data, "data");
      const responseCa = await fetchAllCandidate();
      setCandidateDTO(responseCa.data);
      const responseInter = await ApiService.ApiInterview();
      setInterviewDTO(responseInter.data);
      const responseUser = await ApiUser.getUsers();
      setUsers(responseUser.data);
    } catch (error) {
      console.error("Error loading offer details:", error);
    }
  };

  useEffect(() => {
    loadData(id);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const newState = { ...prevState, [name]: value };
      if (name !== "offerStatus") {
        newState.offerStatus = prevState.offerStatus;
      }
      if (name === "contractFrom" || name === "contractTo") {
        const from = name === "contractFrom" ? value : newState.contractFrom;
        const to = name === "contractTo" ? value : newState.contractTo;

        if (from && to) {
          if (new Date(from) > new Date(to)) {
            setDateError("Start date cannot be after end date");
          } else {
            setDateError("");
          }
        }

        const today = new Date().toISOString().split("T")[0];
        if (from < today) {
          setDateError("Start date cannot be in the past");
        }
      }
      if (name === "note" && value.length > 500) {
        return prevState;
      }
      return newState;
    });
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    if (dateError) {
      alert("Please correct the date errors before submitting.");
      return;
    }
    try {
      const dataToSubmit = {
        ...formData,
        offerStatus: formData.offerStatus || offerDetail.offerStatus,
      };
      const responseEdit = await ApiService.ApiEditOffer(dataToSubmit);
      console.log("Change has been successfully updated", responseEdit.data);
      alert("Change has been successfully updated");
      navigate("/offer");
    } catch (error) {
      console.error("Error editing offer:", error);
      alert("Failed to updated change");
    }
  };
  console.log(formData, "formdta");
  return (
    <Container className="mb-3">
      <div className="breadcrumb__group">
        <span className="breadcrumb-link" onClick={() => navigate("/offer")}>
          Offer List
        </span>
        <FaAngleRight />
        <span className="breadcrumb-link__active">Edit Offer</span>
      </div>
      <div className="content-offer-form">
        <Row>
          <Form onSubmit={handleEdit}>
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
                      candidates.filter((ca)=>ca.candidateStatus !== "BANNED" )
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
                      value={formData.interviewSchedule}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select an interview schedule</option>
                      {Array.isArray(interview) &&
                        interview.map((inter) => (
                          <option key={inter.id} value={inter.id}>
                           
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
                    <Link
                      className="text-assigned"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          recruiterOwnerId: "currentUser",
                        }))
                      }
                    >
                      Assigned to me
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
                    <Form.Label>
                      {offerDetail &&
                      offerDetail.interviewSchedule &&
                      offerDetail.interviewSchedule.notes
                        ? offerDetail.interviewSchedule.notes
                        : "No notes available"}
                    </Form.Label>
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
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Status
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Label>{offerDetail.offerStatus}</Form.Label>
                  </Col>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>
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
};

export default EditOffer;
