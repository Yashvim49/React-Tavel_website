import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../Styles/Navbar.css'

const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <nav className="navbar fixed-top navbar-expand-lg bg-dark navbar-dark shadow-lg">
            <div className="container-fluid">
                <Link
                    className="navbar-brand d-flex align-items-center gap-2"
                    to="/"
                    style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                >
                    <img
                        src="/images/logo.png"
                        alt="WanderWise Logo"
                        className="logo-img"
                    />
                    <span className="main-title">WanderWise</span>
                </Link>


                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="col">
                        <ul className="nav justify-content-end">
                            <li className="nav-item">
                                <Link className={`nav-link ${currentPath === '/' ? 'active' : ''}`} to="/"><i className="fa-solid fa-house"></i>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${currentPath === '/about' ? 'active' : ''}`} to="/about"><i className="fas fa-user-tie"></i>About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${currentPath === '/service' ? 'active' : ''}`} to="/service"><i className="fas fa-handshake"></i>Service</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${currentPath === '/vision' ? 'active' : ''}`} to="/vision"><i className="fa-solid fa-eye"></i>Vision</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${currentPath === '/faq' ? 'active' : ''}`} to="/faq"><i className="fa-solid fa-question"></i>FAQ</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar