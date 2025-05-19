import React, { useState, useContext, useEffect, useRef } from 'react';
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
    const [formData, setFormData] = useState({
        id: "",
        equestion: "",
        eanswer: ""
    });

    const updateFaqs = (currentFaq) => {
        ref.current.click();
        setFormData({ id: currentFaq._id, equestion: currentFaq.question, eanswer: currentFaq.answer })
        setShowAddForm(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editFaq(formData.id, formData.equestion, formData.eanswer);
        refClose.current.click();

    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const ref = useRef(null)
    const refClose = useRef(null)


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

                            <button className="add-button" onClick={() => { setShowAddForm(true); }}>+ Add Faqs</button>
                        </div>
                    </div>
                    <h2 className="text-center fw-bold my-4">
                        <span className="text-primary">Frequently Asked Questions</span>
                    </h2>

                    {/* Conditional Form Rendering */}
                    <AddFaqs showForm={showAddForm} setShowForm={setShowAddForm} />
                    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Launch demo modal
                    </button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form className="faq-form" >
                                        <h3>Edit Faqs..</h3>
                                        <input type="text" id="equestion" name="equestion" value={formData.equestion} onChange={handleChange} required />
                                        <textarea name="eanswer" id="eanswer" value={formData.eanswer} onChange={handleChange} required ></textarea>
                                      
                                    </form>
                                </div>
                                <div className="modal-footer form-buttons">
                                    <button onClick={handleSubmit} type="submit">Update</button>
                                    <button ref={refClose} type="button" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>


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
