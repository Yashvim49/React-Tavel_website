import React, { useState } from 'react';
import '../Styles/Faq.css';

const faqs = [
    {
        question: "What documents do I need to travel internationally?",
        answer: "You typically need a valid passport and possibly a visa, depending on your destination country."
    },
    {
        question: "Can I cancel or reschedule my booking?",
        answer: "Yes, most bookings can be canceled or rescheduled with notice. Fees may apply depending on the provider."
    },
    {
        question: "Do you offer travel insurance?",
        answer: "Yes, we offer comprehensive travel insurance packages for all trip types."
    },
    {
        question: "Are group discounts available?",
        answer: "Yes, we provide discounts for group bookings of 5 or more travelers."
    },
    {
        question: "How can I contact customer support?",
        answer: "You can reach us via our 24/7 helpline, email, or live chat on our website."
    }
];

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
            <div className="faq-header text-center">
                <h2>Got doubts? Find answers to the most frequently asked travel questions below</h2>
            </div>

            <h2 className="faq-title">Frequently Asked Questions</h2>
            <div className="faq-main-wrapper">
                <div className="faq-container">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <div className="faq-question" onClick={() => toggleFAQ(index)}>
                                {faq.question}
                            </div>
                            {activeIndex === index && (
                                <div className="faq-answer">{faq.answer}</div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="faq-image">
                    <img
                        src="https://t4.ftcdn.net/jpg/10/52/24/45/360_F_1052244520_HwV9SYvmcwQRO0yM15zZJ3n7PCTFu9GS.jpg"
                        alt="Travel"
                    />
                </div>
            </div>
        </>
    );
};

export default Faq;
