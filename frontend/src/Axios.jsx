import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 10000,
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
