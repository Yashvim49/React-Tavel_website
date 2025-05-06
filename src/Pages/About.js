import React from 'react'
import '../Styles/About.css'

const About = () => {
    return (
        <>
            <div className="about-header text-center mb-4">
                <h2>Meet the Team Behind Your Journey</h2>
            </div>
            <h2 className="text-center about-title">About Us</h2>
            <div className="experience-container">
                <h4 className="about-h1-title">
                    High-Quality<br />Travel Experiences
                </h4>
                <p className="experience-text">
                    <strong> From a bold idea to a trusted name in Indian tourism, WanderWise crafts journeys that inspire</strong>.
                     Blending innovation with local insights, we redefine how India travels — delivering seamless, premium, and unforgettable adventures.
                </p>
                <a href="#contact" className="contact-btn">Contact Us</a>
            </div>

            <div className="about-main-wrapper">
                <div className="about-history">
                    <div className="about-text">
                        <p>
                            <h2 className="text about-h-title">Short History</h2>

                            <strong>WanderWise</strong> was founded in 2010 in India with a passion for helping people explore hidden gems across the country.
                            Starting with curated local experiences, we soon expanded to offer <strong>flights, hotels</strong>, and all-inclusive travel packages.
                            By 2016, we were serving travelers across Asia and building partnerships with top tourism providers.
                            In <strong>2022</strong>, we launched our mobile app, making trip planning easier for thousands of Indian explorers.
                            Today, <strong>WanderWise</strong> is one of India's most trusted travel brands, known for personalized and seamless journeys.
                        </p>
                    </div>

                    {/* Image Block */}
                    <img
                        src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJvdXQlMjB1c3xlbnwwfHwwfHx8MA%3D%3D"
                        alt="Travel"
                    />

                </div>
            </div>
            <div className="best">
                <h2 className="about-title text-center">We Are Best</h2>
                <h3 className="best-subtitle">
                    At <strong>WanderWise</strong>, we don’t just plan trips — we craft life-changing experiences.
                </h3>
                <p className="best-description">
                    Here’s why thousands of travelers choose us again and again.
                </p>
                <div className="best-cards-container">
                    <div className="best-card">
                        <h4><i class="fa-solid fa-clock-rotate-left"></i> 10+ Years of Experience</h4>
                        <p>We’ve helped thousands of travelers explore over 50 countries across the globe.</p>
                    </div>
                    <div className="best-card">
                        <h4><i class="fa-solid fa-users"></i> 95% Customer Satisfaction</h4>
                        <p>Our reviews speak for themselves — happy clients, unforgettable memories.</p>
                    </div>
                    <div className="best-card">
                        <h4><i class="fa-solid fa-award"></i> Award-Winning Travel Services</h4>
                        <p>Recognized for excellence in travel planning and personalized itineraries.</p>
                    </div>
                    <div className="best-card">
                        <h4><i class="fa-solid fa-globe"></i> Global Network of Experts</h4>
                        <p>Local partnerships in every region to ensure you always feel at home.</p>
                    </div>
                </div>
            </div>


        </>
    )
}

export default About
