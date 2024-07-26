import { values } from "lodash";

//PageSize
const PAGE_SIZE = 10;
export { PAGE_SIZE };

//Role user
const ROLE_ADMIN = "ROLE_ADMIN";
const ROLE_INTERVIEWER = "ROLE_INTERVIEWER";
const ROLE_MANAGER = "ROLE_MANAGER";
const ROLE_RECRUITER = "ROLE_RECRUITER";

export const userRole = [
  { value: ROLE_ADMIN, label: "Admin" },
  { value: ROLE_INTERVIEWER, label: "Interview" },
  { value: ROLE_MANAGER, label: "Manager" },
  { value: ROLE_RECRUITER, label: "Recruiter" },
];

// status trang list interview
export const InterviewStatus = [
  { value: "NEW", label: "New" },
  { value: "INVITED", label: "Invited" },
  { value: "INTERVIEWED", label: "Interviewed" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "OPEN", label: "Open" },
];

//-----------------------------------

//interview result
// eslint-disable-next-line no-shadow-restricted-names

// const NaN = "NaN";
// const PASS = "Pass";
// const FAIL = "Fail";

export const InterviewResult = [
  { value: "PASS", label: "Pass" },
  { value: "FAIL", label: "Fail" },
];

//Candidate result

// candidate skill

// gender
const MALE = "Male";
const FEMALE = "Female";

export const CandidateGender = {
  MALE,
  FEMALE,
};

//Candidate Status
const OPEN = "Open";
const CLOSED = "Closed";
const BANNED = "Banned";

export const CandidateStatus = {
  OPEN,
  CLOSED,
  BANNED,
};
//Candidate Current Position
const BACKEND_DEVELOPER = "Backend Developer";
const HR = "HR";
const BUSINESS_ANALYST = "Business Analyst";
const TESTER = "Tester";
const PROJECT_MANAGER = "Project Manager";
export const CandidatePosition = {
  BACKEND_DEVELOPER,
  HR,
  BUSINESS_ANALYST,
  TESTER,
  PROJECT_MANAGER,
};
//Candidate Highest Level
const HIGH_SCHOOL = "High School";
const BACHELOR_DEGREE = "Bachelor's Degree";
const MASTMASTER_DEGREEERS = "Master Degree";
const PHD = "PHD";
export const CandidateLevel = {
  HIGH_SCHOOL,
  BACHELOR_DEGREE,
  MASTMASTER_DEGREEERS,
  PHD,
};

const optionsUserRole = [
  { value: "ROLE_RECRUITER", label: "Recruiter" },
  { value: "ROLE_INTERVIEWER", label: "Interviewer" },
  { value: "ROLE_MANAGER", label: "Manager" },
  { value: "ROLE_ADMIN", label: "Admin" },
];

const optionsSkills = [
  { value: 1, label: "Java" },
  { value: 2, label: "Nodejs" },
  { value: 3, label: ".Net" },
  { value: 4, label: "C++" },
  { value: 5, label: "Business Analyst" },
  { value: 6, label: "Communication" },
];

const optionsPosition = [
  { value: "BACKEND_DEVELOPER", label: "Backend Developer" },
  { value: "BUSINESS_ANALYST", label: "Business Analyst" },
  { value: "TESTER", label: "Tester" },
  { value: "HR", label: "HR" },
  { value: "PROJECT_MANAGER", label: "Project Manager" },
  { value: "NOT_AVAILABLE", label: "Not Available" },
];

const optionsGender = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

const optionsLevel = [
  { value: "HIGH_SCHOOL", label: "High School" },
  { value: "BACHELOR_DEGREE", label: "Bachelor's Degree" },
  { value: "MASTER_DEGREE", label: "Master's Degree" },
  { value: "PHD", label: "PhD" },
];

const optionsRecruiter = [
  { value: 1, label: "admin" },
  { value: 2, label: "Admin" },
  { value: 3, label: "Manager" },
  { value: 4, label: "Recruiter" },
];

const optionsStatus = [
  { value: "OPEN", label: "Open" },
  { value: "BAN", label: "Ban" },
];

const optionsDepartment = [
  { value: "IT", label: "IT" },
  { value: "HR", label: "HR" },
  { value: "FINANCE", label: "Finance" },
  { value: "COMMUNICATION", label: "Communication" },
  { value: "MARKETING", label: "Marketing" },
  { value: "ACCOUNTING", label: "Accounting" },

  // Add other departments as needed
];
const optionsUserStatus = [
  { value: "ACTIVE", label: "Active" },
  { value: "DEACTIVATED", label: "Deactivated" },
];

export {
  optionsSkills,
  optionsPosition,
  optionsGender,
  optionsLevel,
  optionsRecruiter,
  optionsStatus,
  optionsUserRole,
  optionsDepartment,
  optionsUserStatus,
};

// Header
const HOME = "Home";
const CANDIDATE = "Candidate";
const JOB = "Job";
const INTERVIEW = "Interview Schedule";
const OFFER = "Offer";
const USER = "User";
const LINK_HOME = "/";
const LINK_CANDIDATE = "/candidate";
const LINK_JOB = "/job";
const LINK_INTERVIEW = "/interview";
const LINK_OFFER = "/offer";
const LINK_USER = "/user";

export const CheckUrl = [
  { name: CANDIDATE, link: LINK_CANDIDATE },
  { name: JOB, link: LINK_JOB },
  { name: INTERVIEW, link: LINK_INTERVIEW },
  { name: OFFER, link: LINK_OFFER },
  { name: USER, link: LINK_USER },
  { name: HOME, link: LINK_HOME },
];
////// offer

export const departmentOffer = {
  IT: "IT",
  HR: "HR",
  MARKETING: "Marketing",
  FINANCE: "Finance",
  COMMUNICATION: "Communication",
  ACCOUNTING: "Accounting",
};

export const offerLevel = {
  FRESHER_1: "Fresher 1",
  JUNIOR_2_1: "Junior 2.1",
  JUNIOR_2_2: "Junior 2.2",
  SENIOR_3_1: "Senior 3.1",
  SENIOR_3_2: "Senior 3.2",
  DELIVER: "Delivery",
  LEADER: "Leader",
  MANAGER: "Manager",
  VICE_HEAD: "Vice Head",
};

export const statusOffer = {
  WAITING_FOR_APPROVAL: "Waiting for approval",
  APPROVED_OFFER: "Approved offer",
  REJECTED_OFFER: "Rejected offer",
  CANCELLED_OFFER: "Cancelled offer",
  WAITING_FOR_RESPONSE: "Waiting for response",
  ACCEPTED_OFFER: "Accepted offer",
  DECLINED_OFFER: "Declined offer",
};

export const constractType = {
  TRIAL_TWO_MONTH: "Trial 2 months",
  TRAINEE_THREE_MONTH: "Trainee 3 months",
  ONE_YEAR: "One year",
  THREE_YEAR: "Three years",
  UNLIMITED: "Unlimited",
};

export const offerPosition = {
  BACKEND_DEVELOPER: "Backend Developer",
  BUSINESS_ANALYST: "Business Analyst",
  TESTER: "Tester",
  HR: "HR",
  PROJECT_MANAGER: "Project Manager",
  NOT_AVAILABLE: "Not Available",
};

// Thêm vào cuối file Constants.js

export const getButtonsByStatus = (status) => {
  switch (status) {
    case "WAITING_FOR_APPROVAL":
      return {
        topButtons: [
          {
            label: "Approve",
            status: "APPROVED_OFFER",
            style: { background: "#acecab" },
          },
          {
            label: "Reject",
            status: "REJECTED_OFFER",
            style: { backgroundColor: "#f2979d" },
          },
          {
            label: "Cancel Offer",
            status: "CANCELLED_OFFER",
            style: { backgroundColor: "#f2979d" },
          },
        ],
        bottomButtons: [
          {
            label: "Edit",
            action: "EDIT",
          },
          { label: "Cancel", action: "CANCEL" },
        ],
      };
    case "APPROVED_OFFER":
      return {
        topButtons: [
          {
            label: "Mark as sent to candidate",
            status: "WAITING_FOR_RESPONSE",
            style: { backgroundColor: "#b0cdfa" },
          },
          {
            label: "Cancel Offer",
            status: "CANCELLED_OFFER",
            style: { backgroundColor: "#f2979d" },
          },
        ],
        bottomButtons: [],
      };
    case "WAITING_FOR_RESPONSE":
      return {
        topButtons: [
          {
            label: "Accepted Offer",
            status: "ACCEPTED_OFFER",
            style: { backgroundColor: "#b0cdfa" },
          },
          {
            label: "Declined Offer",
            status: "DECLINED_OFFER",
            style: { backgroundColor: "#fad3b0" },
          },
          {
            label: "Cancel Offer",
            status: "CANCELLED_OFFER",
            style: { backgroundColor: "#f2979d" },
          },
        ],
        bottomButtons: [],
      };
    case "ACCEPTED_OFFER":
      return {
        topButtons: [
          {
            label: "Cancel Offer",
            status: "CANCELLED_OFFER",
            style: { backgroundColor: "#f2979d" },
          },
        ],
        bottomButtons: [],
      };
    case "REJECTED_OFFER":
    case "DECLINED_OFFER":
    case "CANCELLED_OFFER":
    default:
      return { topButtons: [], bottomButtons: [] };
  }
};
////

export const headersExport = [
  { label: "No.", key: "id" },
  { label: "Candidate ID", key: "candidate.1" },
  { label: "Candidate name", key: "candidate.2" },
  { label: "Approved by", key: "approvedBy" },
  { label: "Contract type", key: "contractType" },
  { label: "Position", key: "position" },
  { label: "Level", key: "offerLevel" },
  { label: "Department", key: "department" },
  { label: "Recruiter owner", key: "recruiterOwner.name" },
  { label: "Interviewer", key: "interviewSchedule.interviewerDto[0].name" },
  { label: "Contract start from", key: "contractFrom" },
  { label: "Contract to", key: "contractTo" },
  { label: "Basic salary", key: "basicSalary" },
  { label: "Interview notes", key: "note" },
];

////user
export const roleUser = {
  ROLE_RECRUITER: "Recruiter",
  ROLE_INTERVIEWER: "Interviewer",
  ROLE_MANAGER: "Manager",
  ROLE_ADMIN: "Admin",
};
export const statusUser = {
  ACTIVE: "Active",
  DEACTIVATED: "Deactivated",
};
//////
