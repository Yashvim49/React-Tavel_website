import React, { useContext, useEffect, useRef, useState } from 'react'
import '../../Styles/Visions.css'
import Sidebar from '../../Components/Sidebar'
import AddVisions from './AddVisions';
import Visionsitem from './Visionsitem';
import visionContext from '../../context/visions/visionContetxt'

const Visions = () => {
  const context = useContext(visionContext);
  const { visions, getVision, editVision } = context;
  // for search  and filter
  //filter
  const [filterDate, setFilterDate] = useState('');
  const [dateFilterOption, setDateFilterOption] = useState('');
  const [showfilterOptions, setShowfilterOptions] = useState(false);
  //for search
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVisions = [...visions]
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((item) => {
      if (!filterDate) return true;
      return new Date(item.date) <= new Date(filterDate);
    });
  // aplly filter newest oldest
  if (dateFilterOption) {
    filteredVisions.sort((a, b) => {
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
  const [sortVision, setsortVision] = useState('');
  const [sortKey, setSortKey] = useState('title');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const handelSort = (Vision => {
    setsortVision(Vision);
    setSortKey('title');
    setShowSortOptions(false);
  })
  const resetSort = () => {
    setsortVision('');
    setSortKey('');
    setShowSortOptions(false);
  }
  if (sortKey && sortVision) {
    filteredVisions.sort((a, b) => {
      const valA = a[sortKey]?.toLowerCase() || '';
      const valB = b[sortKey]?.toLowerCase() || '';
      if (valA < valB) return sortVision === 'asc' ? -1 : 1;
      if (valA > valB) return sortVision === 'asc' ? 1 : -1;
      return 0;
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getVision();
  }, [getVision]);

  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    etitle: "",
    edescription: "",
    eimage: ""
  });

  const ref = useRef(null)
  const refClose = useRef(null)

  const updateVisions = (currentVision) => {
    ref.current.click();
    setFormData({ id: currentVision._id, etitle: currentVision.title, edescription: currentVision.description, eimage: currentVision.img })
    setUploadType(currentVision.image?.startsWith("blob:") ? "file" : "url");
    setShowAddForm(false);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    editVision(formData.id, formData.etitle, formData.edescription, formData.eimage);
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
        <div className="vision-content">
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
                  <i className="fa-solid fa-sort" /> Sort ({sortVision || 'default'})
                </button>

                {showSortOptions && (
                  <div className="sort-dropdown">
                    <form>
                      <label className="sort-option">
                        <input type="radio" name="sort" value="" checked={sortVision === ''} onChange={() => resetSort()} />
                        Default
                      </label>
                      <label className="sort-option">
                        <input type="radio" name="sort" value="asc" checked={sortVision === 'asc'} onChange={() => handelSort('asc')} />
                        ⬆ Ascending
                      </label>
                      <label className="sort-option">
                        <input type="radio" name="sort" value="desc" checked={sortVision === 'desc'} onChange={() => handelSort('desc')} />
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

              <button className="add-button" onClick={() => { setShowAddForm(true); }}>+ Add Vision</button>

            </div>
          </div>
          <h2 className="text-center fw-bold my-4">
            <span className="text-primary">Visions</span>
          </h2>

          <AddVisions showForm={showAddForm} setShowForm={setShowAddForm} />
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
                  <form className="vision-form" onSubmit={handleSubmit}>
                    <h3>Edit</h3>
                    <input type="text" id="etitle" name="etitle" placeholder="Title" value={formData.etitle} onChange={handleChange} required />
                    <textarea name="edescription" id="edescription" placeholder="Description" value={formData.edescription} onChange={handleChange} required ></textarea>
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
          {visions.length === 0 && (
            <div className="container" style={{ marginTop: '20px' }}>
              No Vision available
            </div>
          )}

          {/* show list */}

          {filteredVisions.length > 0 ? (
            <table className="vision-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVisions.map((vision) => (
                  <Visionsitem
                    key={vision._id}
                    vision={vision}
                    updateVisions={updateVisions}
                  />
                ))}
              </tbody>
            </table>
          ) : visions.length > 0 && (
            <div className="text-center mt-3">No matching vision found.</div>
          )}
        </div>
      </div>

    </>
  )
}

export default Visions