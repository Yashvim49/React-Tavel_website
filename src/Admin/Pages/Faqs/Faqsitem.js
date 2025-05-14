import React, { useContext } from 'react'
import faqContext from '../../context/faqs/faqContext'


const Faqsitem = (props) => {
  const context = useContext(faqContext);
  const { deleteFaq } = context;
  const { faq, updateFaqs } = props;


  return (
    <>
      <tr key={faq._id}>
        <td>{faq.question}</td>
        <td>{faq.answer}</td>
        <td>
          <button className="edit-btn me-2 mb-2" onClick={() => { updateFaqs(faq) }}>Edit</button>
          <button className="delete-btn" onClick={() => { deleteFaq(faq._id); }}> Delete</button>
        </td>
      </tr>
    </>
  )
}

export default Faqsitem