  import React, { useState } from 'react'
  import { Contacteditem, Negotiationitem, offersentitem, dealcloseditem } from '../Data/carditem'


  const Dashboardcard = () => {
    const [expanded, setExpanded] = useState({});

    const handleCardClick = (column, index) => {
      setExpanded((prev) => ({
        ...prev,
        [column]: prev[column] === index ? null : index
      }));
    };
    

    return (
      <>
        <div className="row">
          <div className="col-3">
            <div className="title1">
              <p className="card_main_title">Contacted</p>
              <h6 className="status-count">{Contacteditem.length} ⇅</h6>
            </div>
            {/* //card data of col 1 */}
            {Contacteditem.map((contactitem, index) => (
              <div key={index} className={`card ${expanded['contacted'] === index ? 'expanded' : ''}`} onClick={() => handleCardClick('contacted', index)}>
                <div className="card-body">
                  <h5 className="card-title menu">{contactitem.title}<span><i className="fa-solid fa-ellipsis-vertical"></i></span></h5>
                  <p className="card-text">{contactitem.description}</p>
                    {expanded['contacted'] === index && (
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
                        <i className="fa-regular fa-comment-dots"></i> {contactitem.comment}
                      </div>
                      <div>
                        <i className="fa-solid fa-link"></i> {contactitem.link}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* //Negotiation card */}
          <div className="col-3">
            <div className="title1">
              <p className="card_main_title">Nagotiation</p>
              <h6 className="status-count">{Negotiationitem.length} ⇅</h6>
            </div>
            {/* //card data of col 2 */}
            {Negotiationitem.map((Negotiationitem, index) => (
              <div key={index} className={`card ${expanded['negotiation'] === index ? 'expanded' : ''}`} onClick={() => handleCardClick('negotiation', index)}>
                <div className="card-body">
                  <h5 className="card-title menu">{Negotiationitem.title}<span><i className="fa-solid fa-ellipsis-vertical"></i></span></h5>
                  <p className="card-text">{Negotiationitem.description}</p>
                  {expanded['negotiation'] === index && (
                    <>
                      <p className="card-text"><i className="fa-solid fa-location-dot"></i> {Negotiationitem.address}</p>
                      <p className="card-text"><i className="fa-regular fa-envelope"></i> {Negotiationitem.email}</p>
                      <div className="text-image-row">
                        <img src={Negotiationitem.img} alt="Sandra Perry" className="profile-img" />
                        <div className="text-content">
                          <p>{Negotiationitem.position}</p>
                          <h4>{Negotiationitem.member_name}</h4>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="end-title">
                    <h6 className="status-date"><i className="fa-regular fa-calendar"></i> {Negotiationitem.date}</h6>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div>
                        <i className="fa-regular fa-comment-dots"></i> {Negotiationitem.comment}
                      </div>
                      <div>
                        <i className="fa-solid fa-link"></i> {Negotiationitem.link}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* //ofer sent card */}
          <div className="col-3">
            <div className="title1">
              <p className="card_main_title">Offer Sent</p>
              <h6 className="status-count">{offersentitem.length} ⇅</h6>
            </div>
            {/* //card data of col 3 */}
            {offersentitem.map((offersentitem, index) => (
              <div key={index} className={`card ${expanded['offersent'] === index ? 'expanded' : ''}`} onClick={() => handleCardClick('offersent', index)}>
                <div className="card-body">
                  <h5 className="card-title menu">{offersentitem.title}<span><i className="fa-solid fa-ellipsis-vertical"></i></span></h5>
                  <p className="card-text">{offersentitem.description}</p>
                  {expanded['offersent'] === index && (
                    <>
                      <p className="card-text"><i className="fa-solid fa-location-dot"></i> {offersentitem.address}</p>
                      <p className="card-text"><i className="fa-regular fa-envelope"></i> {offersentitem.email}</p>
                      <div className="text-image-row">
                        <img src={offersentitem.img} alt="Sandra Perry" className="profile-img" />
                        <div className="text-content">
                          <p>{offersentitem.position}</p>
                          <h4>{offersentitem.member_name}</h4>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="end-title">
                    <h6 className="status-date"><i className="fa-regular fa-calendar"></i> {offersentitem.date}</h6>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div>
                        <i className="fa-regular fa-comment-dots"></i> {offersentitem.comment}
                      </div>
                      <div>
                        <i className="fa-solid fa-link"></i> {offersentitem.link}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* //deal closed card */}
          <div className="col-3">
            <div className="title1">
              <p className="card_main_title">Deal Closed</p>
              <h6 className="status-count">{dealcloseditem.length} ⇅</h6>
            </div>
            {/* //card data of col 4 */}
            {dealcloseditem.map((dealcloseditem, index) => (

              <div key={index} className={`card last_card ${expanded['dealclosed'] === index ? 'expanded' : ''}`} onClick={() => handleCardClick('dealclosed', index)}>
                <div className="card-body">
                  <h5 className="card-title menu">{dealcloseditem.title}<span><i className="fa-solid fa-ellipsis-vertical"></i></span></h5>
                  <p className="card-text">{dealcloseditem.description}</p>
                  {expanded['dealclosed'] === index && (
                    <>
                      <p className="card-text"><i className="fa-solid fa-location-dot"></i> {dealcloseditem.address}</p>
                      <p className="card-text"><i className="fa-regular fa-envelope"></i> {dealcloseditem.email}</p>
                      <div className="text-image-row">
                        <img src={dealcloseditem.img} alt="Sandra Perry" className="profile-img" />
                        <div className="text-content">
                          <p>{dealcloseditem.position}</p>
                          <h4>{dealcloseditem.member_name}</h4>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="end-title">
                    <h6 className="status-date"><i className="fa-regular fa-calendar"></i> {dealcloseditem.date}</h6>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div>
                        <i className="fa-regular fa-comment-dots"></i> {dealcloseditem.comment}
                      </div>
                      <div>
                        <i className="fa-solid fa-link"></i> {dealcloseditem.link}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </>
    )
  }

  export default Dashboardcard