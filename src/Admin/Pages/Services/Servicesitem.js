import React, { useContext } from 'react'
import serviceContext from '../../context/services/serviceContetxt'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Servicesitem = ({service, updateServices}) => {
   const { deleteService } = useContext(serviceContext);

  const handleDelete = () => {
        Swal.fire({
            title: "Delete this Service?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, delete it",
            reverseButtons: true,
          }).then(({ isConfirmed }) => {
             if (isConfirmed) {
               deleteService(service._id);
               toast.success("✅This Service deleted successfully!", {
                 position: "top-right",
                 autoClose: 2500,
          });
        }
      });
  };

  return (
    <>
      <tr key={service._id}>
        <td>{service.title}</td>
        <td>{service.description}</td>
        <td><img src={service.img} alt="img" className="table-img" /></td>
        <td>
          <button className="edit-btn me-2 mb-2" onClick={() => { updateServices(service) }}>Edit</button>
          <button className="delete-btn" onClick={handleDelete}> Delete</button>
        </td>
      </tr>
    </>
  )
}

export default Servicesitem