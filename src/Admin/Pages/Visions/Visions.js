import React, { useContext, useEffect, useState } from 'react'
import '../../Styles/Visions.css'
import Sidebar from '../../Components/Sidebar'
import AddVisions from './AddVisions';
import Visionsitem from './Visionsitem';
import visionContext from '../../context/visions/visionContetxt'

const Visions = ({ showAlert }) => {
  const context = useContext(visionContext);
  const { visions, getVision, editVision } = context;

  //for search
  const [searchQuery, setSearchQuery] = useState('');
  const filteredVisions = visions.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getVision();
  }, []);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm,setShowEditForm]=useState(false);

  const [formData,setFormData]=useState({
    id:"",
    etitle:"",
    edescription:"",
    eimage:""
  });

  const updateVisions=(currentVision)=>{
    setFormData({id:currentVision._id,etitle:currentVision.title,edescription:currentVision.description,eimage:currentVision.img})
    setShowEditForm(true);
    setShowAddForm(false);
  }
  const handleSubmit =(e)=>{
    e.preventDefault();
    editVision(formData.id, formData.etitle,formData.edescription,formData.eimage);
    setShowEditForm(false);
  }

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
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
                <input type="text" placeholder="Search Services" className="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
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