import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { Row, Col, Modal } from "react-bootstrap";
import "../../assets/css/offer-css/offer.css";
import { Container, Form } from "react-bootstrap";
import ApiService from "../../services/serviceApiOffer";
import { toast } from "react-toastify";

import {
  departmentOffer,
  constractType,
  offerLevel,
  offerPosition,
  getButtonsByStatus,
} from "~/data/Constants";
const DetailOffer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [detailOffer, setDetailOffer] = useState({
    candidate: {},
    interviewDTO: [],
  });

  const loadData = async (id) => {
    try {
      const response = await ApiService.ApiDetailOffer(id);
      if (response && response.id) {
        setDetailOffer(response);
      } else {
        throw new Error("Invalid data received from API");
      }
    } catch (error) {
      console.error("Error loading offer details:", error);
    }
  };
  useEffect(() => {
    loadData(id);
  }, [id]);

  const buttons = getButtonsByStatus(detailOffer.offerStatus);
  const formData = {
    id: id,
    candidateId: detailOffer.candidate
      ? Number(Object.keys(detailOffer.candidate)[0])
      : null,
    contractType: detailOffer.contractType || "",
    position: detailOffer.position || "",
    offerLevel: detailOffer.offerLevel || "",
    approvedBy: 4,
    interviewSchedule: detailOffer.interviewSchedule?.id,
    recruiterOwnerId: detailOffer.recruiterOwner?.id,
    contractFrom: detailOffer.contractFrom
      ? new Date(detailOffer.contractFrom).toISOString().split("T")[0]
      : "",
    contractTo: detailOffer.contractTo
      ? new Date(detailOffer.contractTo).toISOString().split("T")[0]
      : "",
    dueDate: detailOffer.dueDate
      ? new Date(detailOffer.dueDate).toISOString().split("T")[0]
      : "",
    basicSalary: detailOffer.basicSalary || 0,
    note: detailOffer.note || "",
    email: detailOffer.email || "",
    offerStatus: detailOffer.offerStatus || "",
    department: detailOffer.department || "",
  };
  console.log(detailOffer.department, "de");
  const handleStatusChange = async (newStatus) => {
    try {
      const dataSubmit = {
        ...formData,
        offerStatus: newStatus,
      };

      console.log(
        "Data being sent for status change:",
        JSON.stringify(dataSubmit, null, 2)
      );

      const response = await ApiService.ApiEditOffer(dataSubmit);
      console.log(`Offer status has been successfully updated!`, response.data);
      toast(`Offer status has been successfully updated!`);
      navigate("/offer");
    } catch (error) {
      console.error("Error changing offer status:", error);
      toast("Error changing offer status. Please try again.");
    }
  };

  console.log(detailOffer, "detailOffer");
  return (
    <Container className="mb-3">
      <div className="breadcrumb__group">
        <span className="breadcrumb-link" onClick={() => navigate("/offer")}>
          Offer List
        </span>
        <FaAngleRight />
        <span className="breadcrumb-link__active">Detail Offer</span>
      </div>
      <div className="created-by">
        <p>Create on 26/06/2024, Last update by MaiNT47, Today</p>
      </div>

      <div className="content-offer-form" key={detailOffer.id}>
        <Row>
          <Form>
            <Row>
              <div className="button-offer btn-top">
                {buttons.topButtons.map((button, index) => (
                  <button
                    key={index}
                    type="button"
                    className="button-submit"
                    style={button.style}
                    onClick={() => {
                      if (button.status) {
                        if (button.status === "CANCELLED_OFFER") {
                          setShowCancelModal(true);
                        } else {
                          handleStatusChange(button.status);
                        }
                      } else if (button.action === "EDIT") {
                        navigate(`/offer/edit/${detailOffer.id}`);
                      } else if (button.action === "CANCEL") {
                        navigate("/offer");
                      }
                    }}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            </Row>
            <Row>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Candidate
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Label>
                      {Object.values(detailOffer.candidate || {}).join(", ")}
                    </Form.Label>
                  </Col>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Contract Type
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Label>
                      {constractType[detailOffer.contractType] || ""}
                    </Form.Label>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            {/* Second Row */}
            <Row>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Position
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Label>
                      {offerPosition[detailOffer.position] || ""}
                    </Form.Label>
                  </Col>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Level
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Label>
                      {offerLevel[detailOffer.offerLevel] || ""}
                    </Form.Label>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            {/* Third Row */}
            <Row>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Approver
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Label>{detailOffer.approvedBy || "N/A"}</Form.Label>
                  </Col>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Department
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Label>
                      {departmentOffer[detailOffer.department] || ""}
                    </Form.Label>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            {/* Fourth Row */}
            <Row>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Interview Info
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Label>
                      Interviewer:{" "}
                      {detailOffer.interviewSchedule
                        ? detailOffer.interviewSchedule.interviewerDto
                            .map((interviewer) => interviewer.name)
                            .join(", ")
                        : ""}
                    </Form.Label>
                  </Col>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Recruiter Owner
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Label>
                      {detailOffer.recruiterOwner?.name || ""}
                    </Form.Label>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            {/* Fifth Row */}
            <Row>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Contract Period
                  </Form.Label>
                  <Col sm={9}>
                    <Row>
                      <Col sm={2}>From</Col>

                      <Col sm={3}>
                        <Form.Label>
                          {detailOffer.contractFrom
                            ? detailOffer.contractFrom.join("-")
                            : ""}
                        </Form.Label>
                      </Col>
                      <Col sm={2}>To</Col>
                      <Col sm={5}>
                        <Form.Label>
                          {detailOffer.contractTo
                            ? detailOffer.contractTo.join("-")
                            : ""}
                        </Form.Label>
                      </Col>
                    </Row>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Due Date
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Label>
                      {detailOffer.dueDate ? detailOffer.dueDate.join("-") : ""}
                    </Form.Label>
                  </Col>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                      {detailOffer &&
                      detailOffer.interviewSchedule &&
                      detailOffer.interviewSchedule.notes
                        ? detailOffer.interviewSchedule.notes
                        : "No notes available"}
                    </Form.Label>
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Basic Salary
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Label>{detailOffer.basicSalary} VND</Form.Label>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            {/* Sixth Row */}
            <Row>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Status
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Label>{detailOffer.offerStatus || ""}</Form.Label>
                  </Col>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Note
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Label>{detailOffer.note || ""}</Form.Label>

                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            {/* Fifth Row */}

            {/* Submit and Cancel Buttons */}
            <Row>
              <div className="button-offer btn-bottom">
                {buttons.bottomButtons.map((button, index) => (
                  <button
                    key={index}
                    type="button"
                    className="button-submit"
                    onClick={() => {
                      if (button.action === "EDIT") {
                        navigate(`/offer/edit/${detailOffer.id}`);
                      } else if (button.action === "CANCEL") {
                        navigate("/offer");
                      }
                    }}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            </Row>
          </Form>
        </Row>
      </div>
      <div>
        <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <h5 style={{ textAlign: "center" }}>
              Are you sure you want to cancel this offer?
            </h5>
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: "center" }}>
            <button
              className="button-form"
              onClick={() => {
                handleStatusChange("CANCELLED_OFFER");
                setShowCancelModal(false);
              }}
            >
              Yes
            </button>
            <button
              className="button-form"
              onClick={() => setShowCancelModal(false)}
            >
              No
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};

export default DetailOffer;
