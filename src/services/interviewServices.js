import axios from "./customize-axios";

const fetchInterview = (index, pageSize) => {
  return axios.get(`/api/interviews?index=${index}&size=1000`);
};

const fetchInterviewDetail = (id) => {
  return axios.get(`/api/interviews/${id}`);
};

// const postCreateUser = (name, job) => {
//   return axios.post("/api/users", { name: name, job: job });
// };

// const putUpdateUser = (id, name, job) => {
//   return axios.put(`./api/users/${id}`, { name: name, job: job });
// };

export { fetchInterview, fetchInterviewDetail };
