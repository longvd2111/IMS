import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../assets/css/candidate-css/CandidateDetail.css";
import { FaAngleRight } from "react-icons/fa6";
import { Row, Col } from "react-bootstrap";
import { fetchCandidateById, updateCandidate } from "~/services/candidateApi";
import { fetchAllUser } from "~/services/userServices";
import {
  CandidateGender,
  CandidateLevel,
  CandidatePosition,
  CandidateStatus,
} from "~/data/Constants";
import { toast } from "react-toastify";
import { optionsSkills } from "~/data/Constants";

const CandidateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCandidateById = async () => {
      try {
        let res = await fetchCandidateById(id);
        console.log("API response:", res);
        if (res) {
          const candidate = res;
          console.log("Selected Candidate:", candidate);
          setCandidate(candidate);
          console.log("asdasd", candidate);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching candidate:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchAllUser(0, 1000)
      .then((response) => {
        const users = response.data;
        const recruiters = users
          .filter((user) => user.userRole === "ROLE_RECRUITER")
          .map((user) => ({
            value: user.id,
            label: user.fullName,
          }));
        setRecruiters(recruiters);
      })
      .catch((error) => {
        console.error("lỗi user rồi", error);
        toast.error("Error fetching users. Please try again.");
      });

    getCandidateById();
  }, [id]);

  const handleBanCandidate = async () => {
    try {
      const recruiter = recruiters.find(
        (user) => user.label === candidate.recruiter
      );
      if (!recruiter) {
        throw new Error("Recruiter not found");
      }

      // Convert skills array to array of integers directly
      const skillIds = candidate.skills
        .map((skill) => {
          const skillOption = optionsSkills.find(
            (option) => option.label.toLowerCase() === skill.toLowerCase()
          );
          return skillOption ? skillOption.value : null;
        })
        .filter((value) => value !== null);

      console.log("skillIds:", skillIds); // Log skillIds for verification

      const updatedCandidate = {
        id: id,
        candidateStatus: "BANNED",
        recruiterId: recruiter.value,
        address: candidate.address,
        attachFile: candidate.attachFile,
        candidatePosition: candidate.candidatePosition,
        dob: candidate.dob
          ? new Date(candidate.dob).toISOString().split("T")[0]
          : "",
        email: candidate.email,
        fullName: candidate.fullName,
        gender: candidate.gender,
        highestLevel: candidate.highestLevel,
        note: candidate.note,
        skillIds: skillIds,
        phone: candidate.phone
      };

      await updateCandidate(updatedCandidate);
      toast.success("Candidate has been banned successfully");
      navigate(`/candidate`);
    } catch (error) {
      toast.error("Error banning candidate. Please try again.");
      console.error("Error banning candidate:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error)
    return <div>There was an error loading the candidate details.</div>;
  if (!candidate) return <div>Candidate not found</div>;

  const formatDate = (dobArray) => {
    const [year, month, day] = dobArray;

    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");
    return `${formattedMonth}/${formattedDay}/${year}`;
  };

  return (
    <div className="candidate-detail-container">
      <div className="candidate-title">
        <div className="breadcrumb__group">
          <span
            className="breadcrumb-link"
            onClick={() => navigate("/candidate")}
          >
            Candidate List
          </span>
          <FaAngleRight />
          <span className="breadcrumb-link__active">Candidate Information</span>
        </div>
      </div>

      <div className="candidate-ban">
        <button
          className="button-form button-form--danger"
          onClick={handleBanCandidate}
        >
          Ban Candidate
        </button>
      </div>

      <div className="candidate-detail">
        <div className="section">
          <div className="section-personal-info">
            <h5>I. Personal information</h5>
            <Row>
              <Col>
                <p>
                  <strong>Full name:</strong> {candidate.fullName}
                </p>
                <p>
                  <strong>D.O.B:</strong> {formatDate(candidate.dob)}
                </p>
                <p>
                  <strong>Phone number:</strong> {candidate.phone}
                </p>
              </Col>
              <Col>
                <p>
                  <strong>Email:</strong> {candidate.email}
                </p>
                <p>
                  <strong>Address:</strong> {candidate.address}
                </p>
                <p>
                  <strong>Gender:</strong> {CandidateGender[candidate.gender]}
                </p>
              </Col>
            </Row>
          </div>

          <div className="section-professional-info">
            <h5>II. Professional information</h5>
            <Row>
              <Col>
                <p>
                  <strong>CV attachment:</strong>{" "}
                  <a href={`/api/candidates/${candidate.id}/download-cv`}>
                    CV-{candidate.fullName}.pdf
                  </a>
                </p>
                <p>
                  <strong>Current Position:</strong>{" "}
                  {CandidatePosition[candidate.candidatePosition]}
                </p>
                <p>
                  <strong>Skills:</strong>{" "}
                  {candidate.skills &&
                    candidate.skills.map((skill) => (
                      <span key={skill} className="badge m-1">
                        {skill}
                      </span>
                    ))}
                </p>
                <p>
                  <strong>Recruiter:</strong> {candidate.recruiter}
                </p>
              </Col>
              <Col>
                <p>
                  <strong>Status:</strong>{" "}
                  {CandidateStatus[candidate.candidateStatus]}
                </p>
                <p>
                  <strong>Year of Experience:</strong>{" "}
                  {candidate.yearExperience}
                </p>
                <p>
                  <strong>Highest level:</strong>{" "}
                  {CandidateLevel[candidate.highestLevel]}
                </p>
                <p>
                  <strong>Note:</strong> {candidate.note}
                </p>
              </Col>
            </Row>
          </div>
        </div>
        <div className="actions">
          <button
            className="button-form"
            onClick={() => navigate(`/candidate/edit/${candidate.id}`)}
          >
            Edit
          </button>
          <button className="button-form" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetail;
