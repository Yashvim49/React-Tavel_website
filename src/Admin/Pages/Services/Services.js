import React, { useState, useContext, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar'
import serviceContext from '../../context/services/serviceContetxt'
import Servicesitem from './Servicesitem';
import AddServices from './AddServices';
import '../../Styles/Services.css'

const Services = ({showAlert}) => {
    const context = useContext(serviceContext);
    const { services, getService, editService } = context;

    useEffect(() => {
        getService();
    }, []);

    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        etitle: "",
        edescription: "",
        eimage: ""
    });


    const updateServices = (currentService) => {
        setFormData({ id: currentService._id, etitle: currentService.title, edescription: currentService.description, eimage: currentService.img })
        setShowEditForm(true);
        setShowAddForm(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editService(formData.id, formData.etitle, formData.edescription, formData.eimage);
        setShowEditForm(false);
    }




    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    return (
        <>
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
                        <button className="add-button" onClick={() =>{ setShowAddForm(true);setShowEditForm(false);}}>+ Add Services</button>
                    </div>
                </div>

                {/* Conditional Form Rendering */}
                <AddServices showForm={showAddForm} setShowForm={setShowAddForm} showAlert={showAlert} />

                {showEditForm && (
                    <form className="service-form" onSubmit={handleSubmit}>
                        <h3>Edit </h3>
                        <input type="text" id="etitle" name="etitle" placeholder="Title" value={formData.etitle} onChange={handleChange} required />
                        <textarea name="edescription" id="edescription" placeholder="Description" value={formData.edescription} onChange={handleChange} required ></textarea>
                        <input type="text" id="eimage" name="eimage" placeholder="Image URL" value={formData.eimage} onChange={handleChange} required />
                        <div className="form-buttons">
                            <button type="submit">Update</button>
                            <button type="button" onClick={() =>setShowEditForm(false)}>Cancel</button>
                        </div>
                    </form>
                )}

                {/* show list */}

                <div className="container" style={{marginTop:'20px'}}>
                    {services.length === 0 && 'No services to display'}
                </div>

                {services.length > 0 && (
                    <table className="service-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <Servicesitem
                                    key={service._id}
                                    service={service}
                                    updateServices={updateServices}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
</>
    );
};

export default Services;
