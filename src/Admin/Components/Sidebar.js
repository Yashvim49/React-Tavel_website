import React, { useEffect } from 'react';
import '../Styles/Sidebar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const taskCount = 2;
const bizConnectCount = 7;

const Sidebar = () => {
  const location = useLocation();
    const currentPath = location.pathname;
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/admin'); 
    }
  }, [navigate]);
    return (

      <div className="sidebar">
        {/* Logo */}
        <div className="sidebar-logo">
          <Link to="#" className="brand">
            <img src="/images/logo.png" alt="WanderWise Logo" className="logo-img" />
            <span>WanderWise</span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="sidebar-section">
          <Link className={`side-link ${currentPath === '/admin/dashboard' ? 'active' : ''}`} to="/admin/dashboard "><i className="fa-solid fa-gauge"></i> Dashboard</Link>
          <Link  className={`side-link ${currentPath === '/admin/service' ? 'active' : ''}`} to="/admin/service "><i className="fas fa-handshake"></i> Service</Link>
          <Link  className={`side-link ${currentPath === '/admin/vision' ? 'active' : ''}`} to="/admin/vision "><i className="fa-solid fa-eye"></i> Vision</Link>
          <Link  className={`side-link ${currentPath === '/admin/faq' ? 'active' : ''}`} to="/admin/faq "> <i className="fa-solid fa-question"></i> Faqs</Link>
          <Link to="#" className="task-link">
            <i className="fa-solid fa-briefcase"></i>
            <span className="link-label">Tasks</span>
            {taskCount > 0 && <span className="count-badge">{taskCount}</span>}
          </Link>

          <Link to="#"><i className="fa-solid fa-chart-line"></i> Activity</Link>
          <Link to="#"><i className="fa-solid fa-users"></i> Customers</Link>
          <Link to="#"><i className="fa-solid fa-gear"></i> Settings</Link>
        </div>

        {/* Projects */}
        <h4 className="section-title">Projects</h4>
        <div className="sidebar-section">
          <Link to="#" className="task-link">
            <i className="fa-solid fa-bolt-lightning"></i>
            <span className="link-label">BizConnect</span>
            {bizConnectCount > 0 && <span className="count-badge">{bizConnectCount}</span>}
          </Link>
          <Link to="#"><i className="fa-solid fa-arrow-up-right-dots"></i> Growth Hub</Link>
          <Link to="#"><i className="fa-solid fa-shuffle"></i> Conversion Path</Link>
          <Link to="#"><i className="fa-solid fa-bullhorn"></i> Marketing</Link>
        </div>

        {/* Members */}
        <h4 className="section-title">Members <span><i className="fa-solid fa-plus"></i></span></h4>
        <div className="sidebar-section">

          <div className="text-image-row">
            <img src="https://cdn.prod.website-files.com/6600e1eab90de089c2d9c9cd/662c092880a6d18c31995dfd_66236531e8288ee0657ae7a7_Business%2520Professional.webp" alt="Sandra Perry" className="profile-img" />
            <div className="text-content">
              <h4>Sandra Perry</h4>
              <p>Product Manager</p>
            </div>
          </div>
          <div className="text-image-row">
            <img src="https://techcloudltd.com/wp-content/uploads/2024/06/Posing-and-facial-expressions-for-professional-male-headshots-1-1024x727.webp" alt="Sandra Perry" className="profile-img" />
            <div className="text-content">
              <h4>Anatony Cardenes</h4>
              <p>Sales Manager</p>
            </div>
          </div>
          <div className="text-image-row">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn8AjZgzH-nX-51el_14JWv00IEBWqiTGsIg&s" alt="Sandra Perry" className="profile-img" />
            <div className="text-content">
              <h4>Jahan Due</h4>
              <p>Growth Manager</p>
            </div>
          </div>
          <div className="text-image-row">
            <img src="https://wallpapers.com/images/hd/professional-profile-pictures-1427-x-1920-txfewtw6mcg0y6hk.jpg" alt="Sandra Perry" className="profile-img" />
            <div className="text-content">
              <h4>Sanem Caar</h4>
              <p>Seo Specialist</p>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="text-image-row">
            <img src="https://wallpapers.com/images/hd/professional-profile-pictures-1168-x-1164-394dus1go9limvka.jpg" alt="Sandra Perry" className="profile-img" />

            <span className="member-name">Ammer Carud</span>
            <i className="fa-solid fa-arrow-right-from-bracket logout-icon"></i>

          </div>
        </div>




      </div>
    );
  };

  export default Sidebar;
