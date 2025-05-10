import React, { useState } from 'react'
import { Contacteditem } from '../Data/carditem'

const Dashboardcard = () => {
  const [expanded, setExpandedIndex] = useState(false);

  const handleCardClick = (index) => {
    setExpandedIndex(expanded === index ? null : index);
  };

  return (
    <>
      <div className="row">
        <div className="col-3 d-grid gap-3">
          <div className="title1">
            <p className="card_main_title">Contacted</p>
            <h6 className="status-count">12 ⇅</h6>
          </div>
          {/* //card data of col 1 */}
          {Contacteditem.map((contactitem,index) => (
            <div key={index} className={`card ${expanded === index ? 'expanded' : ''}`} onClick={() => handleCardClick(index)}>
              <div className="card-body">
                <h5 className="card-title menu">{contactitem.title}<span><i className="fa-solid fa-ellipsis-vertical"></i></span></h5>
                <p className="card-text">{contactitem.description}</p>
                {expanded === index && (
                  <>
                    <p className="card-text"><i className="fa-solid fa-location-dot"></i> {contactitem.address}</p>
                    <p className="card-text"><i className="fa-regular fa-envelope"></i> {contactitem.email}</p>
                    <div className="text-image-row">
                      <img src={contactitem.img} alt="Sandra Perry" className="profile-img" />
                      <div className="text-content">
                        <p>{contactitem.position}</p>
                        <h4>{contactitem.member_name}</h4>
                      </div>
                    </div>
                  </>
                )}
                <div className="end-title">
                  <h6 className="status-date"><i className="fa-regular fa-calendar"></i> {contactitem.date}</h6>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div>
                      <i className="fa-regular fa-comment-dots"></i>{contactitem.comment}
                    </div>
                    <div>
                      <i className="fa-solid fa-link"></i>{contactitem.link}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


        <div className="col-3">
          <div className="title1">
            <p className="card_main_title">Nagotiation</p>
            <h6 className="status-count">17 ⇅</h6>
          </div>
          {/* //card data of col 2 */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title menu">Special title treatment<span><i className="fa-solid fa-ellipsis-vertical"></i></span></h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="title1">
            <p className="card_main_title">Offer Sent</p>
            <h6 className="status-count">13 ⇅</h6>
          </div>
          {/* //card data of col 3 */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title menu">Special title treatment<span><i className="fa-solid fa-ellipsis-vertical"></i></span></h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="title1">
            <p className="card_main_title">Deal Closed</p>
            <h6 className="status-count">12 ⇅</h6>
          </div>
          {/* //card data of col 4 */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title menu">Special title treatment<span><i className="fa-solid fa-ellipsis-vertical"></i></span></h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Dashboardcard