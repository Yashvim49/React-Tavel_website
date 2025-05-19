import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  let navigate = useNavigate();
    const handellogout = () => {
        localStorage.removeItem('token');
        navigate('/admin');
      }
    return (
        <>
            <div className="dashboard-header">

                <div className="left-controls">
                    <div className="search-wrapper">
                        <i className="fa-solid fa-magnifying-glass icon-left" />
                        <input type="text" placeholder="Search Customer" className="search" />
                    </div>
                </div>

                <div className="right-controls">
                    <button className="account-button">
                        <i className="fa-regular fa-user"></i> Me
                    </button>
                    <button className="add-button">+ Add Customer</button>
                    {!localStorage.getItem('token') ? <form>
            </form> : <button onClick={handellogout} className="logout-button">Logout <i className="fa-solid fa-arrow-right-from-bracket"/></button>}
                </div>
            </div>
        </>
    )
}

export default Navbar