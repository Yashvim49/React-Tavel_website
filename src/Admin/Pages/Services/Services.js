import React, { useState, useContext, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar'
import serviceContext from '../../context/services/serviceContetxt'
import Servicesitem from './Servicesitem';
import AddServices from './AddServices';
import '../../Styles/Services.css'

const Services = () => {
    const context = useContext(serviceContext);
    const { services, getService, editService } = context;

    // for search  and filter
    //filter
    const [filterDate, setFilterDate] = useState('');
    const [dateFilterOption, setDateFilterOption] = useState('');
    const [showfilterOptions, setShowfilterOptions] = useState(false);
    //serch
    const [searchQuery, setSearchQuery] = useState('');


    const filteredServices = [...services]
        .filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((item) => {
            if (!filterDate) return true;
            return new Date(item.date) <= new Date(filterDate);

        });
    //aplly filter newest oldest
    if (dateFilterOption) {
        filteredServices.sort((a, b) => {
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
    const [sortService, setsortService] = useState('');
    const [sortKey, setSortKey] = useState('title');
    const [showSortOptions, setShowSortOptions] = useState(false);
    const handelSort = (Service => {
        setsortService(Service);
        setSortKey('title');
        setShowSortOptions(false);
    })
    const resetSort = () => {
        setsortService('');
        setSortKey('');
        setShowSortOptions(false);
    }
    if (sortKey && sortService) {
        filteredServices.sort((a, b) => {
            const valA = a[sortKey]?.toLowerCase() || '';
            const valB = b[sortKey]?.toLowerCase() || '';
            if (valA < valB) return sortService === 'asc' ? -1 : 1;
            if (valA > valB) return sortService === 'asc' ? 1 : -1;
            return 0;
        })
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        getService();
    }, [getService]);

    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        etitle: "",
        edescription: "",
        eimage: ""
    });


    const updateServices = (currentService) => {
        setFormData({ id: currentService._id, etitle: currentService.title, edescription: currentService.description, eimage: currentService.img })
        setShowEditForm(true);
        setShowAddForm(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editService(formData.id, formData.etitle, formData.edescription, formData.eimage);
        setShowEditForm(false);
    }


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="dashboard-layout">
                <Sidebar />
                <div className="services-content ">
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
                                }}
                                >
                                    <i className="fa-solid fa-sort" /> Sort ({sortService || 'default'})
                                </button>

                                {showSortOptions && (
                                    <div className="sort-dropdown">
                                        <form>
                                            <label className="sort-option">
                                                <input type="radio" name="sort" value="" checked={sortService === ''} onChange={() => resetSort()} />
                                                Default
                                            </label>
                                            <label className="sort-option">
                                                <input type="radio" name="sort" value="asc" checked={sortService === 'asc'} onChange={() => handelSort('asc')} />
                                                ⬆ Ascending
                                            </label>
                                            <label className="sort-option">
                                                <input type="radio" name="sort" value="desc" checked={sortService === 'desc'} onChange={() => handelSort('desc')} />
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
                            <button className="account-button">
                                <i className="fa-regular fa-user"></i> Me
                            </button>
                            <button className="add-button" onClick={() => { setShowAddForm(true); setShowEditForm(false); }}>+ Add Services</button>
                        </div>
                    </div>
                    <h2 className="text-center fw-bold my-4">
                        <span className="text-primary">Services</span>
                    </h2>

                    {/* Conditional Form Rendering */}
                    <AddServices showForm={showAddForm} setShowForm={setShowAddForm} />

                    {showEditForm && (
                        <form className="service-form" onSubmit={handleSubmit}>
                            <h3>Edit </h3>
                            <input type="text" id="etitle" name="etitle" placeholder="Title" value={formData.etitle} onChange={handleChange} required />
                            <textarea name="edescription" id="edescription" placeholder="Description" value={formData.edescription} onChange={handleChange} required ></textarea>
                            <input type="text" id="eimage" name="eimage" placeholder="Image URL" value={formData.eimage} onChange={handleChange} required />
                            <div className="form-buttons">
                                <button type="submit">Update</button>
                                <button type="button" onClick={() => setShowEditForm(false)}>Cancel</button>
                            </div>
                        </form>
                    )}

                    {/* search */}
                    {services.length === 0 && (
                        <div className="container" style={{ marginTop: '20px' }}>
                            No services available
                        </div>
                    )}

                    {/* show list */}

                    {filteredServices.length > 0 ? (
                        <table className="service-table">

                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredServices.map((service) => (
                                    <Servicesitem key={service._id} service={service} updateServices={updateServices} />
                                ))}
                            </tbody>
                        </table>
                    ) : services.length > 0 && (
                        <div className="text-center mt-3">No matching services found.</div>
                    )}
                </div>
            </div >
        </>
    );
};

export default Services;
