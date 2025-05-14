import React, { useContext } from 'react'
import serviceContext from '../../context/services/serviceContetxt'


const Servicesitem = (props) => {
  const context = useContext(serviceContext);
  const { deleteService } = context;
  const { service, updateServices } = props;


  return (
    <>
      <tr key={service._id}>
        <td>{service.title}</td>
        <td>{service.description}</td>
        <td><img src={service.img} alt="img" className="table-img" /></td>
        <td>
          <button className="edit-btn me-2 mb-2" onClick={() => { updateServices(service) }}>Edit</button>
          <button className="delete-btn" onClick={() => { deleteService(service._id); }}> Delete</button>
        </td>
      </tr>
    </>
  )
}

export default Servicesitem