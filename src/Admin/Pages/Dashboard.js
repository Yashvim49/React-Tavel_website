import React from 'react'
import Sidebar from '../Components/Sidebar'
import '../Styles/Dashboard.css';

const Dashboard = () => {
  return (
    <>
     <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Welcome to Admin Dashboard</h1>
      </div>
    </div>
    </>
  )
}

export default Dashboard