import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../../assets/css/interview-css/Interview.css";
import { FaAngleRight } from "react-icons/fa6";
import { fetchInterviewDetail } from "~/services/interviewServices";
import { convertToDay, convertToHour } from "~/utils/Validate";
import {
  InterviewResult,
  InterviewStatus,
  optionsPosition,
} from "~/data/Constants";
import { Container, Row } from "react-bootstrap";

const InterviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState({});

  const getInterview = async (id) => {
    let res = await fetchInterviewDetail(id);
    // console.log(res);
    if (res) {
      setInterview(res);
    } else {
      console.error("No data returned from API");
    }
  };

  useEffect(() => {
    // console.log("chay ue");
    getInterview(id);
  }, []);

  return (
    <Container>
      <div className="breadcrumb__group">
        <span
          className="breadcrumb-link "
          onClick={() => navigate("/interview")}
        >
          Interview Schedule List
        </span>
        <FaAngleRight />
        <span className="breadcrumb-link__active">
          Interview Schedule Details
        </span>
      </div>

      <Container className="schedule">
        <Row style={{ float: "right", width: "100%" }}>
          <div className="schedule__add">
            <div className="schedule__add-item">
              <Link className="button-form button-form--primary">
                Send remaider
              </Link>
            </div>
          </div>
        </Row>

        <Container className="schedule__main">
          <Container className="schedule__left">
            <div className="schedule__row">
              <div className="schedule__label">Schedule title:</div>
              <div className="schedule__value">{interview?.title}</div>
            </div>

            <div className="schedule__row">
              <div className="schedule__label">Candidate name:</div>
              <div className="schedule__value">
                {interview?.candidate?.fullName}
              </div>
            </div>
            <div className="schedule__row">
              <div className="schedule__label">Schedule Time:</div>
              <div className="schedule__value">
                {interview?.scheduleTimeFrom
                  ? convertToDay(interview?.scheduleTimeFrom)
                  : "N/A"}{" "}
                From{" "}
                {interview?.scheduleTimeFrom
                  ? convertToHour(interview?.scheduleTimeFrom)
                  : "N/A"}{" "}
                To{" "}
                {interview?.scheduleTimeTo
                  ? convertToHour(interview.scheduleTimeTo)
                  : "N/A"}
              </div>
            </div>
            <div className="schedule__row">
              <div className="schedule__label">Notes:</div>
              <div className="schedule__value">
                {interview?.note ? interview.note : "NaN"}
              </div>
            </div>
          </Container>

          <div className="schedule__right">
            <div className="schedule__row">
              <div className="schedule__label">Job:</div>
              <div className="schedule__value">
                {
                  optionsPosition.find((cp) => cp.value == interview?.position)
                    ?.label
                }
              </div>
            </div>
            <div className="schedule__row">
              <div className="schedule__label">Interviewer:</div>
              <div className="schedule__value">
                {interview?.interviewerSet?.map((item) => item.name).join(", ")}
              </div>
            </div>
            <div className="schedule__row">
              <div className="schedule__label">Location:</div>
              <div className="schedule__value">{interview?.location}</div>
            </div>
            <div className="schedule__row">
              <div className="schedule__label">Recruiter owner:</div>
              <div className="schedule__value">
                {interview?.recruiterDTO?.name}
              </div>
            </div>
            <div className="schedule__row">
              <div className="schedule__label">Meeting ID:</div>
              <div className="schedule__value">
                <a
                  href={interview?.meetingId ? interview.meetingId : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {interview?.meetingId || "No Meeting ID"}
                </a>
              </div>
            </div>

            <div className="schedule__row">
              <div className="schedule__label">Result:</div>
              <div className="schedule__value">
                {
                  InterviewResult.find(
                    (ir) => ir.value === interview?.interviewResult
                  )?.label
                }
              </div>
            </div>
            <div className="schedule__row">
              <div className="schedule__label">Status:</div>
              <div className="schedule__value">
                {
                  InterviewStatus.find(
                    (is) => is.value === interview?.interviewStatus
                  )?.label
                }
              </div>
            </div>
          </div>
        </Container>

        <div className="button-group">
          <Link className="button-form" to={`/interview/edit/${id}`}>
            Edit
          </Link>
          <Link className="button-form" onClick={() => navigate(-1)}>
            Cancel
          </Link>
        </div>
      </Container>
    </Container>
  );
};

export default InterviewDetail;
