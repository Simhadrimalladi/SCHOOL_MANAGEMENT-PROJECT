import React, { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";

function HomePage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Loading......</p>;

  return (
    <div>
      <h2>Total Teachers: {stats.teachers}</h2>
      <h2>Total Students: {stats.students}</h2>
      <h2>Total Parents: {stats.parents}</h2>
      <h2>Fees: {stats.Fees}</h2>
      <h2>Total sections: {stats.sections}</h2>
    </div>
  );
}

export default HomePage;
