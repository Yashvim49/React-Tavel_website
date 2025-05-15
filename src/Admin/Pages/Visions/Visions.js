import React, { useContext, useEffect, useState } from 'react'
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
  //aplly filter newest oldest
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
  const [showEditForm, setShowEditForm] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    etitle: "",
    edescription: "",
    eimage: ""
  });

  const updateVisions = (currentVision) => {
    setFormData({ id: currentVision._id, etitle: currentVision.title, edescription: currentVision.description, eimage: currentVision.img })
    setShowEditForm(true);
    setShowAddForm(false);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    editVision(formData.id, formData.etitle, formData.edescription, formData.eimage);
    setShowEditForm(false);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
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
            
              <button className="add-button" onClick={() => { setShowAddForm(true); setShowEditForm(false); }}>+ Add Vision</button>

            </div>
          </div>
          <h2 className="text-center fw-bold my-4">
            <span className="text-primary">Visions</span>
          </h2>

          <AddVisions showForm={showAddForm} setShowForm={setShowAddForm} />
          {showEditForm && (
            <form className="vision-form" onSubmit={handleSubmit}>
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