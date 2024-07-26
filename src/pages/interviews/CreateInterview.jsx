import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import "../../assets/css/interview-css/Interview.css";
import { fetchAllUser } from "~/services/userServices";
import { userRole } from "~/data/Constants";
import _ from "lodash";
import { fetchAllJobs } from "~/services/jobApi";
import { fetchAllCandidate } from "~/services/candidateApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext, useAuth } from "~/contexts/auth/AuthContext";

const CreateInterview = () => {
  const [optionInterviews, setOptionInterviews] = useState([]);
  const [optionRecruiters, setOptionRecruiters] = useState([]);
  const [optionJobs, setOptionJobs] = useState([]);
  const [optionCandidates, setOptionCandidates] = useState([]);

  useEffect(() => {
    getInterviewer(0, 1000);
    getRecruiter(0, 1000);
    getJob(0, 1000);
    getCandidate();
  }, []);

  const getCandidate = async (index, pageSize) => {
    let res = await fetchAllCandidate();
    if (res && res.data) {
      const clonedListCandidates = res.data;
      setOptionCandidates(
        clonedListCandidates.map((item) => ({
          value: item.id,
          label: item.fullName,
        }))
      );
    }
  };

  const getInterviewer = async (index, pageSize) => {
    let res = await fetchAllUser(index, pageSize);
    const ROLE_INTERVIEWER = userRole.find(
      (role) => role.value === "ROLE_INTERVIEWER"
    );
    if (res && res.data) {
      const clonedListInterviewers = _.filter(
        res.data,
        (o) => o.userRole === ROLE_INTERVIEWER.value
      );
      setOptionInterviews(
        clonedListInterviewers.map((i) => ({
          value: i.id,
          label: i.fullName,
        }))
      );
    }
  };

  const getRecruiter = async (index, pageSize) => {
    let res = await fetchAllUser(index, pageSize);
    const ROLE_RECRUITER = userRole.find(
      (role) => role.value === "ROLE_RECRUITER"
    );
    if (res && res.data) {
      const clonedListRecruiters = _.filter(
        res.data,
        (o) => o.userRole === ROLE_RECRUITER.value
      );
      setOptionRecruiters(
        clonedListRecruiters.map((r) => ({
          value: r.id,
          label: r.fullName,
        }))
      );
    }
  };

  const getJob = async (index, pageSize) => {
    let res = await fetchAllJobs(index, pageSize);
    if (res && res.data) {
      setOptionJobs(
        res.data.map((job) => ({
          value: job.id,
          label: job.jobTitle,
        }))
      );
    }
  };

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      candidateId: 0,
      scheduleDate: "",
      scheduleTimeFrom: "",
      scheduleTimeTo: "",
      note: "",
      jobId: 0,
      interviewerSet: [],
      location: "",
      recruiterId: 0,
      meetingId: "",
      interviewResult: "FAIL",
      interviewStatus: "CANCELLED",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("You must fill in this section!"),
      candidateId: Yup.string().required("You must select an option!"),
      jobId: Yup.string().required("You must select an option!"),
      interviewerSet: Yup.array().required(
        "You must select at least an option!"
      ),
      scheduleDate: Yup.date()
        .min(new Date(), "Schedule must be today or in the future")
        .required("Schedule date is required!"),
      scheduleTimeFrom: Yup.string()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format")
        .required("Start time is required!"),
      scheduleTimeTo: Yup.string()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format")
        .required("End time is required!")
        .test(
          "is-greater",
          "End time must be later than start time",
          function (value) {
            const { scheduleTimeFrom } = this.parent;
            if (!scheduleTimeFrom || !value) return true;
            return value > scheduleTimeFrom;
          }
        ),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Container className="mb-3 edit-interview-container">
      <div className="breadcrumb__group">
        <span
          className="breadcrumb-link"
          onClick={() => navigate("/interview")}
        >
          Interview Schedule List
        </span>
        <FaAngleRight />
        <span className="breadcrumb-link__active">New Interview Schedule</span>
      </div>

      {/* <div className="interview-page_link">
        <Link
          className="button-form button-form--danger"
          to={`/interview/create`}
        >
          Cancel Candidate
        </Link>
      </div> */}

      <div className="content-interview-form">
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            {/* Interview Information */}

            {/* Schedule Title */}
            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Schedule Title<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      placeholder="Type a title..."
                      {...formik.getFieldProps("title")}
                    />
                    {formik.touched.title && formik.errors.title ? (
                      <div className="text-danger">{formik.errors.title}</div>
                    ) : null}
                  </Col>
                </Form.Group>
              </Col>

              {/* Job Option */}
              <Col xs={12} md={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Job<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Select
                      value={optionJobs.find(
                        (job) => job.value === formik.values.jobId
                      )}
                      onChange={(selectedOption) =>
                        formik.setFieldValue("jobId", selectedOption.value)
                      }
                      className="basic-single-select"
                      options={optionJobs}
                      classNamePrefix="select"
                      placeholder="Select a Job"
                    />
                    {formik.touched.jobId && formik.errors.jobId ? (
                      <div className="text-danger">{formik.errors.jobId}</div>
                    ) : null}
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            {/* Candidate Name and Interviewers */}
            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Candidate Name<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Select
                      value={optionCandidates.find(
                        (candidate) =>
                          candidate.value === formik.values.candidateId
                      )}
                      onChange={(selectedOption) =>
                        formik.setFieldValue(
                          "candidateId",
                          selectedOption.value
                        )
                      }
                      options={optionCandidates}
                      className="basic-single-select"
                      classNamePrefix="select"
                      placeholder="Select a Candidate"
                    />
                    {formik.touched.candidateId && formik.errors.candidateId ? (
                      <div className="text-danger">
                        {formik.errors.candidateId}
                      </div>
                    ) : null}
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Interviewers<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Select
                      isMulti
                      value={optionInterviews.filter((interviewer) =>
                        formik.values.interviewerSet.includes(interviewer.value)
                      )}
                      onChange={(selectedOptions) =>
                        formik.setFieldValue(
                          "interviewerSet",
                          selectedOptions.map((option) => option.value)
                        )
                      }
                      options={optionInterviews}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Select interviewers"
                    />
                    {formik.touched.interviewerSet &&
                    formik.errors.interviewerSet ? (
                      <div className="text-danger">
                        {formik.errors.interviewerSet}
                      </div>
                    ) : null}
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            {/* Date and Location */}
            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Schedule Date<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="date"
                      {...formik.getFieldProps("scheduleDate")}
                    />
                    {formik.touched.scheduleDate &&
                    formik.errors.scheduleDate ? (
                      <div className="text-danger">
                        {formik.errors.scheduleDate}
                      </div>
                    ) : null}
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Location<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      placeholder="Type a location..."
                      {...formik.getFieldProps("location")}
                    />
                    {formik.touched.location && formik.errors.location ? (
                      <div className="text-danger">
                        {formik.errors.location}
                      </div>
                    ) : null}
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            {/* Time and Recruiter */}
            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    From<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="time"
                      {...formik.getFieldProps("scheduleTimeFrom")}
                    />
                    {formik.touched.scheduleTimeFrom &&
                    formik.errors.scheduleTimeFrom ? (
                      <div className="text-danger">
                        {formik.errors.scheduleTimeFrom}
                      </div>
                    ) : null}
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    To<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="time"
                      {...formik.getFieldProps("scheduleTimeTo")}
                    />
                    {formik.touched.scheduleTimeTo &&
                    formik.errors.scheduleTimeTo ? (
                      <div className="text-danger">
                        {formik.errors.scheduleTimeTo}
                      </div>
                    ) : null}
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            {/* Recruiter */}
            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Recruiter<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Select
                      value={optionRecruiters.find(
                        (recruiter) =>
                          recruiter.value === formik.values.recruiterId
                      )}
                      onChange={(selectedOption) =>
                        formik.setFieldValue(
                          "recruiterId",
                          selectedOption.value
                        )
                      }
                      options={optionRecruiters}
                      className="basic-single-select"
                      classNamePrefix="select"
                      placeholder="Select a recruiter"
                    />
                    {formik.touched.recruiterId && formik.errors.recruiterId ? (
                      <div className="text-danger">
                        {formik.errors.recruiterId}
                      </div>
                    ) : null}
                  </Col>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group as={Row} style={{ alignItems: "normal" }}>
                  <Form.Label column sm={3}>
                    Note
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      {...formik.getFieldProps("note")}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            {/* Submit button */}
            <Row className="mt-4">
              <Col className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="button-form button-form--primary"
                >
                  Create Schedule
                </button>
                <button
                  className="button-form button-form--primary"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
              </Col>
            </Row>
          </Row>
        </Form>
      </div>
    </Container>
  );
};

export default CreateInterview;
