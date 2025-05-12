import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVerifiedPhones: 0,
    totalSellers: 0,
    totalBusinessAccounts: 0,
    totalTransactionsToday: 0,
    totalRevenueGenerated: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        console.log('Fetching dashboard stats...');
        const response = await api.get('/dashboard');
        console.log('Dashboard response:', response.data);
        
        if (isMounted) {
          setStats(response.data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        if (isMounted) {
          setError(err.response?.data?.message || 'Failed to fetch dashboard statistics');
          setLoading(false);
          
          if (err.response?.status === 401) {
            navigate('/login');
          }
        }
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
      </div>
      <div className="stats-grid">
        <div className="stats-card">
          <h3>Total Users</h3>
          <p className="stats-value">{stats.totalUsers}</p>
        </div>
        <div className="stats-card">
          <h3>Total Sellers</h3>
          <p className="stats-value">{stats.totalSellers}</p>
        </div>
                <div className="stats-card">
          <h3>Total Bussines Acounts</h3>
          <p className="stats-value">{stats.totalBusinessAccounts}</p>
        </div>
        <div className="stats-card">
          <h3>Total Verified Phones</h3>
          <p className="stats-value">{stats.totalVerifiedPhones}</p>
        </div>
        <div className="stats-card">
          <h3>Transaction Today</h3>
          <p className="stats-value">{stats.totalTransactionsToday}</p>
        </div>
        <div className="stats-card">
          <h3>Revenue Generated</h3>
          <p className="stats-value">Rs. {stats.totalRevenueGenerated}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;