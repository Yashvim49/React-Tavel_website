import React, { useContext, useEffect } from 'react'
import '../Styles/Vision.css'
import visionContext from '../Admin/context/visions/visionContetxt'


const Vision = () => {
    const context = useContext(visionContext);
    const { visions, getVision } = context;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        getVision();
    }, [getVision]);
    return (
        <>
            <div className="vision-header text-center mb-4">
                <h2>We believe travel is the best investment you make in yourself</h2>
            </div>
            <h2 className="text-center vision-title">Our Vision</h2>
            <div className="container">
                <div className="row">
                {visions && visions.length > 0 ? (
                        visions.map((item) => (
                        <div className="col-md-3 mb-4">
                            <div className="card text-center h-100 shadow-sm">
                                <img src={item.img} alt={item.title} className="card-img-top p-3" style={{ height: '100px', objectFit: 'contain' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.description}</p>
                                </div>
                            </div>
                        </div>
                     ))
                     ) : (
                         <div className="text-center">Loading Visions...</div>
                     )}
                </div>
            </div>
        </>
    )
}

export default Vision