import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { createCandidate } from '~/services/candidateApi';
import '../../assets/css/candidate-css/CandidateCreateForm.css';
import {
  optionsSkills,
  optionsPosition,
  optionsGender,
  optionsLevel,
  optionsRecruiter,
  optionsStatus,
} from '~/data/Constants';
import {isValidDOB,isValidEmail,isValidPhone} from '~/utils/Validate';
import { toast } from "react-toastify";
import { fetchAllUser } from "~/services/userServices";

export default function CreateCandidate() {
  const navigate = useNavigate();
  const [recruiters, setRecruiters] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    address: "",
    phone: "",
    gender: null,
    candidatePosition: null,
    yearExperience: "",
    highestLevel: null,
    skillIds: [],
    note: "",
    recruiterId: null,
    candidateStatus: { value: "OPEN", label: "Open" },
    attachFile: "",
  });

  const handleChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File selected:", file);
      setFormData({ ...formData, attachFile: file.name }); 
    
    }
  };
    useEffect(() => {
        fetchAllUser(0,1000)
        .then(response => {
          const users = response.data;
          const recruiters = users.filter(user => user.userRole ==='ROLE_RECRUITER').map(user=>({
            value: user.id,
            label: user.fullName
          }));
          setRecruiters(recruiters);
        })
        .catch(error=>{
          console.error('lỗi user rồi',error);
          toast.error('Error fetching users. Please try again.')
        });
    },[]);


    const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      toast.error("Invalid email address. Please input localpart@domainpart!");
      return;
    }

    if (!isValidPhone(formData.phone)) {
     
      toast.error("Phone number must be exactly 10 numbers. Please try again!");
      return;
    }

    if (formData.dob && !isValidDOB(formData.dob)) {
      toast.error("Date of Birth must be in the past please!");
      return;
    }

    const payload = {
      ...formData,
      gender: formData.gender?.value,
      candidatePosition: formData.candidatePosition?.value,
      highestLevel: formData.highestLevel?.value,
      skillIds: formData.skillIds.map(skill => skill.value),
      recruiterId: formData.recruiterId?.value,
      candidateStatus: formData.candidateStatus?.value,
    };

    createCandidate(payload)
      .then(response => {
        console.log('Candidate created successfully!', response.data);
        toast.success('Candidate created successfully!');
        navigate('/candidate'); // Navigate back to the candidate list page after successful creation
      })
      .catch(error => {
        console.error('There was an error creating the candidate!', error);
        toast.error('Error creating candidate. Please try again.');
      });
  };

  return (
    <Container className="mb-3">
      <div className="breadcrumb__group">
        <span className="breadcrumb-link" onClick={() => navigate("/candidate")}>
          Candidate List
        </span>
        <FaAngleRight />
        <span className="breadcrumb-link__active">Create Candidate</span>
      </div>
      <div className="content-candidate-form">
        <Row>
          <Form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <h5>I. Personal Information</h5>
            <Row className="mb-3">
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Full Name <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      placeholder="Type a name..."
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName')(e.target.value)}
                      required
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Email <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      placeholder="Type an email..."
                      value={formData.email}
                      onChange={(e) => handleChange('email')(e.target.value)}
                      required
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    D.O.B
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="date"
                      value={formData.dob}
                      onChange={(e) => handleChange('dob')(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Address
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      placeholder="Type an address..."
                      value={formData.address}
                      onChange={(e) => handleChange('address')(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Phone Number
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="tel"
                      placeholder="Type a number..."
                      value={formData.phone}
                      onChange={(e) => handleChange('phone')(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Gender <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Select
                      value={formData.gender}
                      onChange={handleChange('gender')}
                      options={optionsGender}
                      className="basic-single-select"
                      classNamePrefix="select"
                      isClearable
                      required
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            {/* Professional Information */}
            <h5>II. Professional Information</h5>
            <Row className="mb-3">
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    CV Attachment
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="file"
                      onChange={handleFileChange}
                    />
                    {formData.attachFile && (
                      <small>Current file: {formData.attachFile}</small>
                    )}
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Year of Experience
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="number"
                      placeholder="Type a number"
                      value={formData.yearExperience}
                      onChange={(e) => handleChange('yearExperience')(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Current Position <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Select
                      value={formData.candidatePosition}
                      onChange={handleChange('candidatePosition')}
                      options={optionsPosition}
                      className="basic-single-select"
                      classNamePrefix="select"
                      isClearable
                      required
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Highest Level <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Select
                      value={formData.highestLevel}
                      onChange={handleChange('highestLevel')}
                      options={optionsLevel}
                      className="basic-single-select"
                      classNamePrefix="select"
                      isClearable
                      required
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Skills <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Select
                      value={formData.skillIds}
                      onChange={handleChange('skillIds')}
                      options={optionsSkills}
                      isMulti
                      className="basic-multi-select"
                      classNamePrefix="select"
                      required
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Note
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.note}
                      onChange={(e) => handleChange('note')(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
            <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Recruiter
                  </Form.Label>
                  <Col sm={9}>
                    <Select
                      value={formData.recruiterId}
                      onChange={handleChange('recruiterId')}
                      options={recruiters}
                      placeholder="Select recruiter..."
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Status <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Select
                      value={formData.candidateStatus}
                      onChange={handleChange('candidateStatus')}
                      options={optionsStatus}
                      className="basic-single-select"
                      classNamePrefix="select"
                      isClearable
                      required
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12}>
              <div className="button-candidate" >
                <button type="submit" className="button-form">
                  Add Candidate
                </button>
                <button type="button" className="button-form" onClick={()=> navigate("/candidate")}>Cancel</button>
                </div>
              </Col>
            </Row>
          </Form>
        </Row>
      </div>
    </Container>
  );
}
