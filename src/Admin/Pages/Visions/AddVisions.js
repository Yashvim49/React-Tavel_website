import React, { useContext, useState } from 'react'
import visionContext from '../../context/visions/visionContetxt'

const AddVisions = ({showForm,setShowForm,showAlert}) => {
    const context = useContext(visionContext);
    const { addVisions } = context;

    const [formData,setFormData] = useState({
        title:"",
        description:"",
        image:""
    });

    const handleChange =(e) =>{
        setFormData({...formData,[e.target.name]: e.target.value })
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        addVisions(formData.title,formData.description,formData.image);
        setFormData({title:"",description:"",img:""})
        setShowForm(false);
    }

  return (
    <>
        {showForm && (
            <form className="vision-form" onSubmit={handleSubmit}>
            <h3>Add New Vision</h3>
            <input type="text" id="title" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
            <textarea name="description" id="description" placeholder="Description" value={formData.description} onChange={handleChange} required ></textarea>
            <input type="text" id="image" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
            <div className="form-buttons">
                <button type="submit" onClick={() => setShowForm(true)}>Save</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
        </form>   
        )}
    </>
  )
}

export default AddVisions