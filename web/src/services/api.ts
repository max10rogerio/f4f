import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost",
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});
