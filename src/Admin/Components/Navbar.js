import React from 'react'

const Navbar = () => {
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
                    <button className="sort-button">
                        <i className="fa-solid fa-sort"></i> Sort
                    </button>
                    <button className="filter-button">
                        <i className="fa-solid fa-filter"></i> Filter
                    </button>
                    <button className="account-button">
                        <i className="fa-regular fa-user"></i> Me
                    </button>
                    <button className="add-button">+ Add Customer</button>
                </div>
            </div>
        </>
    )
}

export default Navbar