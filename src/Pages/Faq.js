import React, { useContext, useEffect, useState } from 'react';
import '../Styles/Faq.css';
import faqContext from '../Admin/context/faqs/faqContext';

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const context = useContext(faqContext);
    const { faqs, getFaq } = context;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        getFaq();
    }, [getFaq]);


    return (
        <>
            <div className="faq-header text-center">
                <h2>Got doubts? Find answers to the most frequently asked travel questions below</h2>
            </div>

            <h2 className="faq-title">Frequently Asked Questions</h2>
            <div className="faq-main-wrapper">
                <div className="faq-container">
                {faqs && faqs.length > 0 ? (
                        faqs.map((item,index) => (
                        <div key={index} className="faq-item">
                            <div className="faq-question" onClick={() => toggleFAQ(index)}>
                                {item.question}
                            </div>
                            {activeIndex === index && (
                                <div className="faq-answer">{item.answer}</div>
                            )}
                        </div>
                    ))
                    ) : (
                        <div className="text-center">Loading Faqs...</div>
                    )}
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
