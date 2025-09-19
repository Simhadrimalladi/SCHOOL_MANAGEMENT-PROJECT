import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/teachers';

export const getAllTeachers = async () => {
  return await axios.get(BASE_URL);
};
