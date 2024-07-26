import React, { useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import '../../assets/css/job-css/JobForm.css';
import { createJobs } from "~/services/jobApi";
import { toast } from "react-toastify";

export default function CreateForm() {
  const navigate = useNavigate();

  const optionsBenefits = [
    { value: 1, label: "Lunch" },
    { value: 2, label: "25-day Leave" },
    { value: 3, label: "Healthcare Insurance" },
    { value: 4, label: "Hybrid working" },
    { value: 5, label: "Travel" },
  ];

  const optionsLevel = [
    { value: "FRESHER", label: "Fresher" },
    { value: "JUNIOR", label: "Junior" },
    { value: "SENIOR", label: "Senior" },
    { value: "LEADER", label: "Leader" },
    { value: "TRAINER", label: "Trainer" },
    { value: "MENTOR", label: "Mentor" },
  ];

  const optionsSkill = [
    { value: 1, label: "Java" },
    { value: 2, label: "Nodejs" },
    { value: 3, label: ".Net" },
    { value: 4, label: "C++" },
    { value: 5, label: "Business Analyst" },
    { value: 6, label: "Communication" },
  ];

  const [formValues, setFormValues] = useState({
    jobTitle: "",
    startDate: "",
    endDate: "",
    salaryFrom: "",
    salaryTo: "",
    workingAddress: "",
    description: "",
    jobStatus: "OPEN"
  });

  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.jobTitle) newErrors.jobTitle = "Job Title is required";
    if (selectedSkills.length === 0) newErrors.skills = "Skills are required";
    if (!formValues.startDate) newErrors.startDate = "Start Date is required";
    if (!formValues.endDate) newErrors.endDate = "End Date is required";

    const startDate = new Date(formValues.startDate);
    const endDate = new Date(formValues.endDate);
    const currentDate = new Date();

    if (startDate <= currentDate) {
      newErrors.startDate = "Start date must be later than current date";
    }

    if (endDate <= startDate) {
      newErrors.endDate = "End date must be later than Start date";
    }
    if (Number(formValues.salaryFrom) >= Number(formValues.salaryTo)) {
      newErrors.salaryRange = "Salary From must be less than Salary To";
    }
    if (!formValues.salaryFrom) newErrors.salaryFrom = "Salary From is required";
    if (!formValues.salaryTo) newErrors.salaryTo = "Salary To is required";
   
    if (!formValues.workingAddress) newErrors.workingAddress = "Working Address is required";
    if (!formValues.description) newErrors.description = "Description is required";
    if (selectedBenefits.length === 0) newErrors.benefits = "At least one Benefit is required";
    if (selectedLevel.length === 0) newErrors.level = "At least one Level is required";

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const payload = {
      ...formValues,
      skillIds: selectedSkills.map((skill) => skill.value),
      benifitIds: selectedBenefits.map((benefit) => benefit.value),
      jobLevel: selectedLevel.map((level) => level.value).join(','),
    };

    console.log('Payload to be sent:', payload);

    createJobs(payload)
      .then(response => {
        // console.log('Job created successfully!', response.data);
        toast.success("Job created successfully!")
        navigate('/job'); 
      })
      .catch(error => {
        console.error('There was an error creating the job!', error);
        toast.error('Error creating job. Please try again.');
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minStartDate = tomorrow.toISOString().split("T")[0];

  const minEndDate = formValues.startDate
    ? new Date(new Date(formValues.startDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    : minStartDate;

  return (
    <Container className="mb-3">
      <div className="breadcrumb__group">
        <span className="breadcrumb-link" onClick={() => navigate("/job")}>
          Job List
        </span>
        <FaAngleRight />
        <span className="">Create Job</span>
      </div>
      <div className="content-job-form">
        <Row>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Job Title <span style={{color:"red"}}>*</span>
                  </Form.Label>
                  <Col sm={7}>
                    <Form.Control
                      type="text"
                      name="jobTitle"
                      value={formValues.jobTitle}
                      onChange={handleChange}
                      placeholder="Enter Job Title"
                      isInvalid={!!errors.jobTitle}
                    />
                    <Form.Control.Feedback type="invalid">{errors.jobTitle}</Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Skills <span style={{color:"red"}}>*</span>
                  </Form.Label>
                  <Col sm={7}>
                    <Select
                      isMulti
                      value={selectedSkills}
                      onChange={setSelectedSkills}
                      options={optionsSkill}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                    {errors.skills && (
                      <div className="invalid-feedback d-block">{errors.skills}</div>
                    )}
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Start Date <span style={{color:"red"}}>*</span>
                  </Form.Label>
                  <Col sm={7}>
                    <Form.Control
                      type="date"
                      name="startDate"
                      value={formValues.startDate}
                      onChange={handleChange}
                      placeholder="Enter Start Date"
                      min={minStartDate}
                      isInvalid={!!errors.startDate}
                    />
                    <Form.Control.Feedback type="invalid">{errors.startDate}</Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    End Date <span style={{color:"red"}}>*</span>
                  </Form.Label>
                  <Col sm={7}>
                    <Form.Control
                      type="date"
                      name="endDate"
                      value={formValues.endDate}
                      onChange={handleChange}
                      placeholder="Enter End Date"
                      min={minEndDate}
                      isInvalid={!!errors.endDate}
                      disabled={!!errors.startDate}
                    />
                    <Form.Control.Feedback type="invalid">{errors.endDate}</Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Salary Range <span style={{color:"red"}}>*</span>
                  </Form.Label>
                  <Col sm={7}>
                    <Row>
                      <Col sm={2}>From</Col>
                      <Col sm={4}>
                        <Form.Control
                          type="text"
                          name="salaryFrom"
                          min = {0}
                          value={formValues.salaryFrom}
                          onChange={handleChange}
                          isInvalid={!!errors.salaryFrom}
                        />
                      </Col>
                      <Col sm={2}>To</Col>
                      <Col sm={4}>
                        <Form.Control
                          type="text"
                          min = {0}
                          name="salaryTo"
                          value={formValues.salaryTo}
                          onChange={handleChange}
                          isInvalid={!!errors.salaryTo}
                        />
                      </Col>
                    </Row>
                    <Form.Control.Feedback type="invalid">{errors.salaryFrom || errors.salaryTo}</Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Benefits <span style={{color:"red"}}>*</span>
                  </Form.Label>
                  <Col sm={7}>
                    <Select
                      isMulti
                      value={selectedBenefits}
                      onChange={setSelectedBenefits}
                      options={optionsBenefits}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                    {errors.benefits && (
                      <div className="invalid-feedback d-block">{errors.benefits}</div>
                    )}
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label style={{display:"flex"}} column sm={4}>
                    Working Address <span style={{color:"red"}}> *</span>
                  </Form.Label>
                  <Col sm={7}>
                    <Form.Control
                      type="text"
                      name="workingAddress"
                      value={formValues.workingAddress}
                      onChange={handleChange}
                      placeholder="Enter Working Address"
                      isInvalid={!!errors.workingAddress}
                    />
                    <Form.Control.Feedback type="invalid">{errors.workingAddress}</Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6} className="mb-3">
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Level <span style={{color:"red"}}>*</span>
                  </Form.Label>
                  <Col sm={7}>
                    <Select
                      isMulti
                      value={selectedLevel}
                      onChange={setSelectedLevel}
                      options={optionsLevel}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                    {errors.level && (
                      <div className="invalid-feedback d-block">{errors.level}</div>
                    )}
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={{ span: 6, offset: 6 }} className="mb-3">
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Description <span style={{color:"red"}}>*</span>
                  </Form.Label>
                  <Col sm={7}>
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={formValues.description}
                      onChange={handleChange}
                      placeholder="Enter Description"
                      style={{ minHeight: "100px" }}
                      isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <br />
            <Row>
              <div className="button-job">
                <button type="submit" className="button-submit">
                  Submit
                </button>
                <button
                  type="button"
                  className="button-submit"
                  onClick={() => navigate("/job")}
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
