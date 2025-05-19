import React, { useContext } from 'react';
import faqContext from '../../context/faqs/faqContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Faqsitem = (props) => {
  const context = useContext(faqContext);
  const { deleteFaq } = context;
  const { faq, updateFaqs } = props;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      deleteFaq(faq._id);
      toast.success("✅ This FAQ deleted successfully!", {
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
    <tr key={faq._id}>
      <td>{faq.question}</td>
      <td>{faq.answer}</td>
      <td>
        <button className="edit-btn me-2 mb-2" onClick={() => updateFaqs(faq)}>Edit</button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
};

export default Faqsitem;
