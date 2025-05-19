import React, { useContext } from 'react'
import serviceContext from '../../context/services/serviceContetxt'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Servicesitem = (props) => {
  const context = useContext(serviceContext);
  const { deleteService } = context;
  const { service, updateServices } = props;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this Services?")) {
      deleteService(service._id);
      toast.success("✅ This Services deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
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