// src/api/teacherApi.js

const BASE_URL = "http://localhost:3000/api/teacher";  // use singular if backend uses /api/teacher

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const fetchTeachers = async () => {
  const res = await fetch(`${BASE_URL}/all`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch teachers");
  return res.json();
};

export const createTeacher = async (teacher) => {
  const res = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(teacher),
  });
  if (!res.ok) throw new Error("Failed to create teacher");
  return res.json();
};

export const updateTeacher = async (id, teacher) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(teacher),
  });
  if (!res.ok) throw new Error("Failed to update teacher");
  return res.json();
};

export const deleteTeacher = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete teacher");
  return res.json();
};
