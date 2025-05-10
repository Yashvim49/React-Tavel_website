import React from 'react';
import '../Styles/Home.css';
import '../Styles/Service.css'
import '../Styles/Vision.css'

import serviceItems from '../Data/ServiceItem';
import VisionItems from '../Data/VisionItem';
const travelImages = [
  "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8OHx8dHJhdmVsfGVufDB8fDB8fHww",
  "https://media.istockphoto.com/id/1166378619/photo/large-group-of-happy-friends-in-mountains-area.jpg?s=612x612&w=0&k=20&c=PRlOrqCmlc7QEpTtQw5Blk5NlTtQzT8osgFDK8059p0=",
  "https://media.istockphoto.com/id/1457724042/photo/happy-asian-family-that-enjoys-beach-activities-during-the-summer-holidays-parent-and.jpg?s=612x612&w=0&k=20&c=k0AxSR7IqScTvKBc6fGxFOFf-Vqhr2yc8mthCwjb0hY=",
  "https://aaa.scene7.com/is/image/aaaautoclubsouthstage/4-of-4-solo-travel-guide-seo-1?ts=1734337040134&dpr=off",
  "https://images.unsplash.com/photo-1659123372596-598590792841?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBlb3BsZSUyMG9uJTIwbW91bnRhaW58ZW58MHx8MHx8fDA%3D",
  "https://cdn.prod.website-files.com/64b635ee04cc73cdb9d53d33/663d5a1679032cce43caf771_iStock-975627336.jpg",
  "https://www.takearoad.com/web/image/520-115d0819/727474527.jpg",
];

const Home = () => {
  const Items = serviceItems.slice(0, 4);
  const visonitems = VisionItems;
  const scrollingImages = [...travelImages, ...travelImages];
  return (
    <>
      <div className="hero-background">
        <div className="hero-content">
          <h2>Discover Hidden Gems Around the World</h2>
          <p>Not just destinations — experiences. Not just travel — transformation</p>
          <button type="button" className="btn">About Us</button>
        </div>
      </div>
      {/* service */}
      <div className="container">
        <h2 className="text-center services-title">Top Services</h2>
        <div className="row g-4">
          {Items.map((item) => (
            <div className="col-md-3" >
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
      {/* vision */}
      <h2 className="text-center vision-title">Our Vision</h2>
      <div className="container">
        <div className="row">
          {visonitems.map((item) => (
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
    

      {/* journy */}
      <h2 className="text-center services-title">See Our Travel Journeys</h2>
      <div className="img-scroll-wrapper">

        <div className="img-scroll-track">
          {scrollingImages.map((src, i) => (
            <div className="img-car" key={i}>
              <img src={src} alt={`travel-${i}`} />
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default Home;
