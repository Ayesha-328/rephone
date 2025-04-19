import { useState, useEffect } from 'react';
import axios from 'axios';
import StatsCard from '../components/StatsCard';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVerifiedPhones: 0,
    totalSellers: 0,
    totalBusinessAccounts: 0,
    ongoingDisputes: 0,
    totalTransactionsToday: 0,
    totalRevenueGenerated: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="grid">
        <StatsCard title="Total Users" value={stats.totalUsers} />
        <StatsCard title="Total Verified Phones" value={stats.totalVerifiedPhones} />
        <StatsCard title="Ongoing Disputes" value={stats.ongoingDisputes} />
        <StatsCard title="Transaction Today" value={stats.totalTransactionsToday} />
        <StatsCard title="Revenue Generated" value={stats.totalRevenueGenerated} />
      </div>
    </div>
  );
};

export default Dashboard;