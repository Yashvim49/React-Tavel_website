import React, { useState, useContext, useEffect, useRef } from 'react';
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


    const filteredServices = (services ?? [])
        .filter(item =>
            (item?.title ?? '')
                .toLowerCase()
                .includes((searchQuery ?? '').toLowerCase()) ||
            (item?.description ?? '')
                .toLowerCase()
                .includes((searchQuery ?? '').toLowerCase())
        )
        .filter(item => {
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

    const [formData, setFormData] = useState({
        id: "",
        etitle: "",
        edescription: "",
        eimage: ""
    });

    const ref = useRef(null)
    const refClose = useRef(null)

    const updateServices = (currentService) => {
        ref.current.click();
        setFormData({ id: currentService._id, etitle: currentService.title, edescription: currentService.description, eimage: currentService.img })
        setUploadType(currentService.image?.startsWith("blob:") ? "file" : "url");
        setShowAddForm(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editService(formData.id, formData.etitle, formData.edescription, formData.eimage);
        refClose.current.click();
    }


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const [uploadType, setUploadType] = useState("url");


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
                                                <input type="radio" name="sort" value="" minLength={3} checked={sortService === ''} onChange={() => resetSort()} />
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

                            <button className="add-button" onClick={() => { setShowAddForm(true); }}>+ Add Services</button>
                        </div>
                    </div>
                    <h2 className="text-center fw-bold my-4">
                        <span className="text-primary">Services</span>
                    </h2>

                    {/* Conditional Form Rendering */}
                    <AddServices showForm={showAddForm} setShowForm={setShowAddForm} />
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
                                    <form className="service-form">
                                        <h3>Edit </h3>
                                        <input type="text" id="etitle" name="etitle" placeholder="Title" value={formData.etitle} onChange={handleChange} required />
                                        <textarea name="edescription" id="edescription" placeholder="Description" value={formData.edescription} onChange={handleChange} required ></textarea>
                                        {/* <input type="text" id="eimage" name="eimage" placeholder="Image URL" value={formData.eimage} onChange={handleChange} required /> */}
                                        {/* Upload Options */}
                                        <div className="upload-options">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="editUploadType"
                                                    value="url"
                                                    checked={uploadType === "url"}
                                                    onChange={() => {
                                                        setUploadType("url");
                                                        setFormData({ ...formData, eimage: "" });
                                                    }}
                                                />
                                                Use Image URL
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="editUploadType"
                                                    value="file"
                                                    checked={uploadType === "file"}
                                                    onChange={() => {
                                                        setUploadType("file");
                                                        setFormData({ ...formData, eimage: "" });
                                                    }}
                                                />
                                                Upload from PC
                                            </label>
                                        </div>

                                        {/* Conditionally render image input */}
                                        {uploadType === "url" ? (
                                            <input
                                                type="text"
                                                id="eimage"
                                                name="eimage"
                                                placeholder="Image URL"
                                                value={formData.eimage}
                                                onChange={handleChange}
                                                required
                                            />
                                        ) : (
                                            <input
                                                type="file"
                                                id="eimageFile"
                                                name="eimageFile"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        const imageURL = URL.createObjectURL(file);
                                                        setFormData({ ...formData, eimage: imageURL });
                                                    }
                                                }}
                                                required
                                            />
                                        )}

                                        {/* Image Preview */}
                                        {formData.eimage && (
                                            <img
                                                src={formData.eimage}
                                                alt="Preview"
                                                className="image-preview"
                                                style={{ width: "100px", height: "auto", margin: "10px 0", borderRadius: "8px" }}
                                            />
                                        )}


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
