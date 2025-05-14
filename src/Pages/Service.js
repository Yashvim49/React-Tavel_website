// src/components/Service.js
import React, { useContext, useEffect } from 'react';
import serviceContext from '../Admin/context/services/serviceContetxt'
import '../Styles/Service.css';

const Service = () => {
    const context = useContext(serviceContext);
    const { services, getService } = context;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        getService();
    }, [getService]);

    return (
        <>
            <div className="service-header text-center mb-4">
                <h2>Our Travel Services</h2>
            </div>
            <h2 className="text-center services-title">Services</h2>
            <div className="container">

                <div className="row g-4">
                    {services && services.length > 0 ? (
                        services.map((item) => (
                            <div className="col-md-4">
                                <div className="card text-center h-100 shadow-sm service-card">
                                    <img src={item.img} alt={item.title} className="card-img-top w-50 mx-auto mt-4" />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center">Loading services...</div>
                    )}

                </div>
            </div>
        </>
    );
};

export default Service;
