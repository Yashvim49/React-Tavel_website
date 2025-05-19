import React, { useContext } from 'react'
import visionContext from '../../context/visions/visionContetxt'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Visionsitem = (props) => {
    const context = useContext(visionContext);
    const { deleteVision } = context;
    const { vision , updateVisions } = props;
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this Vision?")) {
          deleteVision(vision._id);
          toast.success("✅ This vision deleted successfully!", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      };

  return (
    <>
         <tr key={vision._id}>
        <td>{vision.title}</td>
        <td>{vision.description}</td>
        <td><img src={vision.img} alt="img" className="table-img" /></td>
        <td>
          <button className="edit-btn me-2 mb-2" onClick={() => { updateVisions(vision) }}>Edit</button>
          <button className="delete-btn" onClick={handleDelete}> Delete</button>
        </td>
      </tr>
    </>
  )
}

export default Visionsitem