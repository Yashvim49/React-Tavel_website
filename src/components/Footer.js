import React from 'react';
import '../Styles/Footer.css';

const Footer = () => {
    return (
        <footer className="travel-footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h3>         
                        <i className="fa-solid fa-earth-americas"></i> WanderWise
                    </h3>
                    <p>
                        Explore the world with confidence. Wanderwise helps you book flights, tours, and accommodations effortlessly.
                    </p>
                </div>

                <div className="footer-section links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/service">Services</a></li>
                        <li><a href="/faq">FAQs</a></li>
                    </ul>
                </div>

                <div className="footer-section contact">
                    <h4>Contact Us</h4>
                    <p>Email: support@wanderwise.com</p>
                    <p>Phone: +1 234 567 890</p>
                    <p>Address: 44 time square, Wander City, AM 346654</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} WanderWise. All rights reserved.</p>
                <div className="socials">
                    <a href="https://facebook.com"><i className="fab fa-facebook-f"></i></a>
                    <a href="https://instagram.com"><i className="fab fa-instagram"></i></a>
                    <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
