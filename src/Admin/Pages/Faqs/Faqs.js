import React, { useState, useContext, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar'
import faqContext from '../../context/faqs/faqContext'
import AddFaqs from './AddFaqs'
import Faqsitem from './Faqsitem'
import '../../Styles/Faqs.css'

const Faqs = () => {
    const context = useContext(faqContext);
    const { faqs, getFaq, editFaq } = context;
    
    // for search 
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFaqs = faqs.filter((item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        getFaq();
    }, []);

    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        equestion: "",
        eanswer: ""
    });


    const updateFaqs = (currentFaq) => {
        setFormData({ id: currentFaq._id, equestion: currentFaq.question, eanswer: currentFaq.answer })
        setShowEditForm(true);
        setShowAddForm(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editFaq(formData.id, formData.equestion, formData.eanswer);
        setShowEditForm(false);
    }




    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    return (
        <>
            <div className="dashboard-layout">
                <Sidebar />
                <div className="faq-content ">
                    <div className="dashboard-header">
                        <div className="left-controls">
                            <div className="search-wrapper">
                                <i className="fa-solid fa-magnifying-glass icon-left" />
                                <input type="text" placeholder="Search Services" className="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                        </div>
                        <div className="right-controls">
                            <button className="sort-button">
                                <i className="fa-solid fa-sort"></i> Sort
                            </button>
                            <button className="filter-button">
                                <i className="fa-solid fa-filter"></i> Filter
                            </button>
                            <button className="account-button">
                                <i className="fa-regular fa-user"></i> Me
                            </button>
                            <button className="add-button" onClick={() => { setShowAddForm(true); setShowEditForm(false); }}>+ Add Faqs</button>
                        </div>
                    </div>
                    <h2 className="text-center fw-bold my-4">
                        <span className="text-primary">Frequently Asked Questions</span>
                    </h2>


                    {/* Conditional Form Rendering */}
                    <AddFaqs showForm={showAddForm} setShowForm={setShowAddForm} />

                    {showEditForm && (
                        <form className="faq-form" onSubmit={handleSubmit}>
                            <h3>Edit Faqs..</h3>
                            <input type="text" id="equestion" name="equestion"  value={formData.equestion} onChange={handleChange} required />
                            <textarea name="eanswer" id="eanswer"  value={formData.eanswer} onChange={handleChange} required ></textarea>
                            <div className="form-buttons">
                                <button type="submit">Update</button>
                                <button type="button" onClick={() => setShowEditForm(false)}>Cancel</button>
                            </div>
                        </form>
                    )}

                    {/* search */}
                    {faqs.length === 0 && (
                        <div className="container" style={{ marginTop: '20px' }}>
                            No Faq available
                        </div>
                    )}

                    {/* show list */}

                    {filteredFaqs.length > 0 ? (
                        <table className="faq-table">

                            <thead>
                                <tr>
                                    <th>question</th>
                                    <th>answer</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFaqs.map((faq) => (
                                    <Faqsitem
                                        key={faq._id}
                                        faq={faq}
                                        updateFaqs={updateFaqs}
                                    />
                                ))}
                            </tbody>
                        </table>
                    ) : faqs.length > 0 && (
                        <div className="text-center mt-3">No matching Faq found.</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Faqs;
