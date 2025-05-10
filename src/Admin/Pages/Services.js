import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import '../Styles/Services.css';

const Services = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New Service:', formData);
        // Optionally send to backend or save to local state here

        // Reset and hide form
        setFormData({ title: '', description: '', image: '' });
        setShowForm(false);
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="services-content">
                <div className="dashboard-header">
                    <div className="left-controls">
                        <div className="search-wrapper">
                            <i className="fa-solid fa-magnifying-glass icon-left" />
                            <input type="text" placeholder="Search Services" className="search" />
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
                        <button className="add-button" onClick={() => setShowForm(true)}>+ Add Services</button>
                    </div>
                </div>

                {/* Conditional Form Rendering */}
                {showForm && (
                    <form className="service-form" onSubmit={handleSubmit}>
                        <h3>Add New Service</h3>
                        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required ></textarea>
                        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
                        <div className="form-buttons">
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Services;
