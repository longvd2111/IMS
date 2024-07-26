import React, { useContext } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import "../../assets/css/interview-css/Interview.css";
import { FaRegHandPointUp } from "react-icons/fa";
import {
  InterviewResult,
  InterviewStatus,
  optionsPosition,
} from "~/data/Constants";
import { convertToDay, convertToHour } from "~/utils/Validate";
import { AuthContext } from "~/contexts/auth/AuthContext";

const InterviewTable = ({ dataInterviews }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Candidate Name</th>
          <th>Recruiter</th>
          <th>Schedule</th>
          <th>Result</th>
          <th>Status</th>
          <th>Job</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {dataInterviews && dataInterviews.length > 0 ? (
          dataInterviews.map((interview) => (
            <tr key={interview.id}>
              <td>{interview?.title}</td>
              <td>{interview?.candidate?.fullName || "NaN"}</td>
              <td>{interview?.recruiterDTO?.name || "NaN"}</td>
              <td>
                {convertToDay(interview?.scheduleTimeFrom)}{" "}
                {convertToHour(interview?.scheduleTimeFrom)}-
                {convertToHour(interview?.scheduleTimeTo)}
              </td>
              <td>
                {
                  InterviewResult.find(
                    (ir) => ir.value === interview?.interviewResult
                  )?.label
                }
              </td>
              <td>
                {
                  InterviewStatus.find(
                    (is) => is.value === interview?.interviewStatus
                  )?.label
                }
              </td>
              <td>
                {
                  optionsPosition.find((cp) => cp.value == interview?.position)
                    ?.label
                }
              </td>
              <td>
                <FaEye
                  className="action__icon"
                  onClick={() => navigate(`/interview/${interview.id}`)}
                  style={{ cursor: "pointer" }}
                />
                {user?.role === "user" ? (
                  <FaRegHandPointUp
                    className="action__icon"
                    onClick={() => navigate(`/interview/${interview.id}`)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <BiEdit
                    className="action__icon"
                    onClick={() => navigate(`/interview/edit/${interview.id}`)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" style={{ textAlign: "center" }}>
              No item matches with your search data. Please try again.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default InterviewTable;
