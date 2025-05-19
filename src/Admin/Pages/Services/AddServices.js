import React, { useContext, useState } from 'react'
import serviceContext from '../../context/services/serviceContetxt'

const AddServices = ({ showForm, setShowForm }) => {
    const context = useContext(serviceContext);
    const { addServices } = context;

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: ""
    });

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value })
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        addServices(formData.title, formData.description, formData.image);
        setFormData({ title: "", description: "", img: "" })
        setShowForm(false);
    }
    const handleChange = (e) => {
        if (e.target.name === "imageFile") {
            const fileList = e.target.files;
            if (fileList && fileList.length > 0) {
                const file = fileList[0];
                const imageURL = URL.createObjectURL(file);
                setFormData({ ...formData, image: imageURL });
                // console.log(imageURL)
            }
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };
    //for url or file imag
    const [uploadType, setUploadType] = useState("url");
    return (
        <>
            {showForm && (
                <form className="service-form" onSubmit={handleSubmit}>
                    <h3>Add New Service</h3>
                    <input type="text" id="title" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                    <textarea name="description" id="description" placeholder="Description" value={formData.description} onChange={handleChange} required ></textarea>
                    {/* Upload Options */}
                    <div className="upload-options">
                        <label>
                            <input type="radio" name="uploadType" value="url" checked={uploadType === "url"}
                                onChange={() => {
                                    setUploadType("url");
                                    setFormData({ ...formData, image: "" });
                                }} />
                            Use Image URL
                        </label>
                        <label>
                            <input type="radio" name="uploadType" value="file" checked={uploadType === "file"}
                                onChange={() => {
                                    setUploadType("file");
                                    setFormData({ ...formData, image: "" });
                                }} />
                            Upload from PC
                        </label>
                    </div>

                    {uploadType === "url" ? (
                        <input type="text" id="image" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
                    ) : (
                        <input type="file" id="imageFile" name="imageFile" onChange={handleChange} required />
                    )}
                    {formData.image && (
                        <img src={formData.image} alt="Preview" className="image-preview" style={{ width: "100px", height: "auto", margin: "10px 0", borderRadius: "8px" }} />
                    )}

                    <div className="form-buttons">
                        <button type="submit" onClick={() => setShowForm(true)}>Save</button>
                        <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                </form>
            )}
        </>
    )
}

export default AddServices