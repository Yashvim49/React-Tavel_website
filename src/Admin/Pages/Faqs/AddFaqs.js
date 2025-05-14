import React, { useContext, useState } from 'react'
import faqContext from '../../context/faqs/faqContext'

const AddFqs = ({ showForm, setShowForm }) => {
    const context = useContext(faqContext);
    const { addFaqs } = context;

    const [formData, setFormData] = useState({
        question: "",
        answer: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addFaqs(formData.question, formData.answer);
        setFormData({ question: "", answer: ""})
        setShowForm(false);
    }

    return (
        <>
            {showForm && (
                <form className="service-form" onSubmit={handleSubmit}>
                    <h3>Add New Service</h3>
                    <input type="text" id="question" name="question" placeholder="Question write here.." value={formData.question} onChange={handleChange} required />
                    <textarea name="answer" id="answer" placeholder="Answen write here.." value={formData.answer} onChange={handleChange} required ></textarea>
                    <div className="form-buttons">
                        <button type="submit" onClick={() => setShowForm(true)}>Save</button>
                        <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                </form>
            )}
        </>
    )
}

export default AddFqs