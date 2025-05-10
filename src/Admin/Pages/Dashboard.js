import React from 'react'
import Sidebar from '../Components/Sidebar'
import '../Styles/Dashboard.css';
import Newscustomerchart from '../Dashboard_Item/Newscustomerchart'
import SemiCircularChart from '../Dashboard_Item/Guageroundchart'
import Dashboardcard from '../Dashboard_Item/Dashboardcard'
import Navbar from '../Components/Navbar'
const Dashboard = () => {
    
  return (
    <>
      <div className="dashboard-layout">
        {/* import sidebar here */}
        <Sidebar />
        <div className="dashboard-content">
          {/* import navbar here */}
         <Navbar/>

          {/* Chart 1 come from newscustomer chart from dashboard item*/}
          <div className="chart-section">
            <div className="chart-card">
              <h2 className="chart-title">New Customers</h2>
              <Newscustomerchart />
            </div>


            {/* chart 2 come from dashboard_item in guagerounfchart*/}
            <div className="guagechart-container">
              <SemiCircularChart percentage={68} label="Successful deal" />
            </div>


            <div className="Task-progress">
              <h3 className="Task_number">53</h3>
              <span className="line-one">Tasks <br />In Progress<i className="fa-solid fa-arrow-right arrow"></i>
              </span>
            </div>

            <div className="Task-progress2">
              <h3 className="prepayments"><i className="fa-solid fa-dollar-sign"></i>15,890</h3>
              <span className="line-one">Prepayments<br />From Customers<i className="fa-solid fa-arrow-right arrow"></i></span>
            </div>
          </div>

          {/* //card come from dashbord_item in dashboardcard*/}
          <div className="card-layout">
          <Dashboardcard/>
          </div>

        </div>
      </div >
    </>
  );
};

export default Dashboard;
