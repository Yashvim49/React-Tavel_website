import React, { useContext } from "react";
import faqContext from "../../context/faqs/faqContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Faqsitem = ({ faq, updateFaqs }) => {
  const { deleteFaq } = useContext(faqContext);

  const handleDelete = () => {
    Swal.fire({
      title: "Delete this FAQ?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it",
      reverseButtons: true,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        deleteFaq(faq._id);
        toast.success("✅ FAQ deleted successfully!", {
          position: "top-right",
          autoClose: 2500,
        });
      }
    });
  };

  return (
    <tr>
      <td>{faq.question}</td>
      <td>{faq.answer}</td>
      <td>
        <button className="edit-btn me-2 mb-2" onClick={() => updateFaqs(faq)} > Edit </button>
        <button className="delete-btn" onClick={handleDelete}> Delete </button>
      </td>
    </tr>
  );
};

export default Faqsitem;
