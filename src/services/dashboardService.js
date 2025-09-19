// src/services/dashboardService.js
import api from '../api/axios';

export const getDashboardStats = async () => {
  const [teachers, students, parents, classes] = await Promise.all([
    api.get('/teachers/count'),
    api.get('/students/count'),
    api.get('/parents/count'),
    api.get('/classes/count'),
  ]);

  return {
    teachers: teachers.data.count,
    students: students.data.count,
    parents:  parents.data.count,
    classes:  classes.data.count,
  };
};
