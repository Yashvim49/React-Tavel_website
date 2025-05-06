// src/components/Service.js
import React from 'react';
import serviceItems from '../Data/ServiceItem';
import '../Styles/Service.css';

const Service = () => {
    return (
        <>
            <div className="service-header text-center mb-4">
                <h2>Our Travel Services</h2>
            </div>
            <h2 className="text-center services-title">Services</h2>
            <div className="container">

            <div className="row g-4">
                {serviceItems.map((item) => (
                    <div className="col-md-4">
                        <div className="card text-center h-100 shadow-sm service-card">
                            <img src={item.image} alt={item.title} className="card-img-top w-50 mx-auto mt-4" />
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </>
    );
};

export default Service;
