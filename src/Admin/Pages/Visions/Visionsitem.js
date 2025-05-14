import React, { useContext } from 'react'
import visionContext from '../../context/visions/visionContetxt'

const Visionsitem = (props) => {
    const context = useContext(visionContext);
    const { deleteVision } = context;
    const { vision , updateVisions } = props;
  return (
    <>
         <tr key={vision._id}>
        <td>{vision.title}</td>
        <td>{vision.description}</td>
        <td><img src={vision.img} alt="img" className="table-img" /></td>
        <td>
          <button className="edit-btn me-2 mb-2" onClick={() => { updateVisions(vision) }}>Edit</button>
          <button className="delete-btn" onClick={() => { deleteVision(vision._id); }}> Delete</button>
        </td>
      </tr>
    </>
  )
}

export default Visionsitem