// // src/api/studentApi.js
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000/api" });

api.interceptors.request.use((cfg) => {
  const t = localStorage.getItem("token");
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

/* ------------ CRUD ------------- */
export const getAllStudents = async () => {
  const { data } = await api.get("/students"); // GET http://localhost:3000/api/students
  // backend returns array of students, so just return data directly
  return data;
};          

export const createStudent = (student) =>
  api.post("/students", student).then(res => res.data); 
     
export const updateStudent = (id, student) =>
  api.put(`/students/${id}`, student).then(res => res.data);

export const deleteStudent = async (id) => {
  const { data } = await api.delete(`/students/${id}`);
  return data;
};  // D
