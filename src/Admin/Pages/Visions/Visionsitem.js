import React, { useContext } from 'react'
import visionContext from '../../context/visions/visionContetxt'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Visionsitem = ({ vision, updateVisions }) => {
  const context = useContext(visionContext);
  const { deleteVision } = context;
  const handleDelete = () => {
    Swal.fire({
      title: "Delete this Vision?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it",
      reverseButtons: true,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        deleteVision(vision._id);
        toast.success("✅ This vision deleted successfully!", {
          position: "top-right",
          autoClose: 2500,
        });
      }
    });
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