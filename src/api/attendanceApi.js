// src/api/attendanceApi.js
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000/api" });

// 🔑 attach token exactly like your other APIs
api.interceptors.request.use((cfg) => {
  const t = localStorage.getItem("token");
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

/* -------------------- CRUD -------------------- */
export const getAllAttendance  = () => api.get ("/attendance/all").then(r => r.data);
export const createAttendance  = (body) => api.post("/attendance/mark", body).then(r => r.data);
export const updateAttendance  = (id, body) => api.put (`/attendance/${id}`, body).then(r => r.data);
export const deleteAttendance  = (id)      => api.delete(`/attendance/${id}`).then(r => r.data);
   