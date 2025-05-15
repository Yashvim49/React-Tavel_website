import React, { useState, useContext, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar'
import faqContext from '../../context/faqs/faqContext'
import AddFaqs from './AddFaqs'
import Faqsitem from './Faqsitem'
import '../../Styles/Faqs.css'

const Faqs = () => {
    const context = useContext(faqContext);
    const { faqs, getFaq, editFaq } = context;

    // for search  and filter
    //filter
    const [filterDate, setFilterDate] = useState('');
    const [dateFilterOption, setDateFilterOption] = useState('');
    const [showfilterOptions, setShowfilterOptions] = useState(false);

    // for search 
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFaqs = [...faqs]
        .filter((item) =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((item) => {
            if (!filterDate) return true;
            return new Date(item.date) <= new Date(filterDate);

        });
    //aplly filter newest oldest
    if (dateFilterOption) {
        filteredFaqs.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (dateA < dateB) return dateFilterOption === 'oldest' ? -1 : 1;
            if (dateA > dateB) return dateFilterOption === 'oldest' ? 1 : -1;
            return 0;
        });
    }
    const resetfilter = () => {
        setFilterDate('');
        setDateFilterOption('');
        setShowfilterOptions(false);
    }
    //sort
    const [sortFaq, setsortFaq] = useState('');
    const [sortKey, setSortKey] = useState('question');
    const [showSortOptions, setShowSortOptions] = useState(false);
    const handelSort = (Faq => {
        setsortFaq(Faq);
        setSortKey('question');
        setShowSortOptions(false);
    })
    const resetSort = () => {
        setsortFaq('');
        setSortKey('');
        setShowSortOptions(false);
    }
    if (sortKey && sortFaq) {
        filteredFaqs.sort((a, b) => {
            const valA = a[sortKey]?.toLowerCase() || '';
            const valB = b[sortKey]?.toLowerCase() || '';
            if (valA < valB) return sortFaq === 'asc' ? -1 : 1;
            if (valA > valB) return sortFaq === 'asc' ? 1 : -1;
            return 0;
        })
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        getFaq();
    }, [getFaq]);

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
                            <div className="sort-dropdown-wrapper" style={{ position: 'relative' }}>
                                <button className="sort-button" onClick={() => {
                                    setShowSortOptions(!showSortOptions);
                                    setShowfilterOptions(false);
                                }}>
                                    <i className="fa-solid fa-sort" /> Sort ({sortFaq || 'default'})
                                </button>

                                {showSortOptions && (
                                    <div className="sort-dropdown">
                                        <form>
                                            <label className="sort-option">
                                                <input type="radio" name="sort" value="" checked={sortFaq === ''} onChange={() => resetSort()} />
                                                Default
                                            </label>
                                            <label className="sort-option">
                                                <input type="radio" name="sort" value="asc" checked={sortFaq === 'asc'} onChange={() => handelSort('asc')} />
                                                ⬆ Ascending
                                            </label>
                                            <label className="sort-option">
                                                <input type="radio" name="sort" value="desc" checked={sortFaq === 'desc'} onChange={() => handelSort('desc')} />
                                                ⬇ Descending
                                            </label>
                                        </form>
                                    </div>

                                )}
                            </div>
                            {/* //filter */}
                            <div className="sort-dropdown-wrapper" style={{ position: 'relative' }}>
                                <button className="sort-button" onClick={() => { setShowfilterOptions(!showfilterOptions); setShowSortOptions(false); }}>
                                    <i className="fa-solid fa-filter"></i> Filter </button>

                                {showfilterOptions && (
                                    <div className="sort-dropdown">
                                        <form>
                                            <label className="sort-option">
                                                <input type="radio" name="dateFilter" value="" checked={dateFilterOption === ''} onChange={resetfilter} />
                                                Default
                                            </label>
                                            <label className="sort-option">
                                                <input type="radio" name="dateFilter" value="newest" checked={dateFilterOption === 'newest'} onChange={() => {
                                                    setDateFilterOption('newest'); setShowfilterOptions(false);
                                                }} />
                                                Newest
                                            </label>
                                            <label className="sort-option">
                                                <input type="radio" name="dateFilter" value="oldest" checked={dateFilterOption === 'oldest'} onChange={() => { setDateFilterOption('oldest'); setShowfilterOptions(false); }} />
                                                Oldest
                                            </label>
                                        </form>
                                    </div>
                                )}
                            </div>
                           
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
                            <input type="text" id="equestion" name="equestion" value={formData.equestion} onChange={handleChange} required />
                            <textarea name="eanswer" id="eanswer" value={formData.eanswer} onChange={handleChange} required ></textarea>
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
                                    <th>Question</th>
                                    <th>Answer</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFaqs.map((faq) => (
                                    <Faqsitem key={faq._id} faq={faq} updateFaqs={updateFaqs} />
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
