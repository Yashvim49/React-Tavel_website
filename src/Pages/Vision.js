import React from 'react'
import VisionItems from '../Data/VisionItem';
import '../Styles/Vision.css'

const Vision = () => {
    return (
        <>
            <div className="vision-header text-center mb-4">
                <h2>We believe travel is the best investment you make in yourself</h2>
            </div>
            <h2 className="text-center vision-title">Our Vision</h2>
            <div className="container">
                <div className="row">
                    {VisionItems.map((item) => (
                        <div className="col-md-3">
                            <div className="card text-center h-100 shadow-sm">
                                <img src={item.image} alt={item.title} className="card-img-top p-3" style={{ height: '100px', objectFit: 'contain' }} />
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
    )
}

export default Vision