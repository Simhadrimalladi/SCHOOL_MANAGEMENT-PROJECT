import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000/api" });

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// export const getAllFees = async () => {
//   const res = await axios.get("/api/fees");
//   return res.data;
// };

// export const createFee = async (fee) => {
//   const res = await axios.post("/api/fees", fee);
//   return res.data;
// };

// export const updateFee = async (id, fee) => {
//   const res = await axios.put(`/api/fees/${id}`, fee);
//   return res.data;
// };

// export const deleteFee = async (id) => {
//   const res = await axios.delete(`/api/fees/${id}`);
//   return res.data;
// };
export const getAllFees  = () => api.get ("/fees"      ).then(r => r.data);
export const createFee   = (fee) => api.post("/fees",     fee).then(r => r.data);
export const updateFee   = (id,fee)=>api.put(`/fees/${id}`,fee).then(r => r.data);
export const deleteFee   = (id) => api.delete(`/fees/${id}`).then(r => r.data);