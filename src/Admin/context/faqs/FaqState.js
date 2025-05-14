import React, { useState } from "react";
import FaqContext from "./faqContext";

const FaqsState = (props) => {
    const host = "http://localhost:5000"
    const faqsInitial = []
    const [faqs, setfaqs] = useState(faqsInitial)

    //Get All faq
    const getFaq = async () => {
        //Todo :api call
        const response = await fetch(`${host}/api/faqs/fetchallfaqs`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // eslint-disable-next-line no-unused-vars
        const json = await response.json()
        // console.log(json)
        setfaqs(json)
    }

    //Add faq
    const addFaqs = async (question, answer) => {
        //Todo :api call
        const response = await fetch(`${host}/api/faqs/addfaqs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question, answer })
        });
        const faq = await response.json();
        setfaqs(faqs.concat(faq))
    }

      //Delete faq
      const deleteFaq = async (id) => {
        //Todo :api call
        const response = await fetch(`${host}/api/faqs/deletefaqs/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const json =await response.json();
        console.log(json)
        const newFaqs = faqs.filter((faq) => { return faq._id !== id })
        setfaqs(newFaqs)
       


    }
    //Edit faq
    const editFaq = async (id,question,answer) => {
        //API call
        const response = await fetch(`${host}/api/faqs/updatefaqs/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question, answer })
        });
        const json = await response.json();
        console.log(json)

        let newFaqs = JSON.parse(JSON.stringify(faqs))
        //logic to edit in client side
        for (let i = 0; i < newFaqs.length; i++) {
            const element = newFaqs[i];
            if (element._id === id) {
                newFaqs[i].question = question;
                newFaqs[i].answer = answer;
                break;
            }
        }
        setfaqs(newFaqs);
    }

    return (
        <FaqContext.Provider value={{ faqs, addFaqs,getFaq,deleteFaq,editFaq }}>
            {props.children}
        </FaqContext.Provider>
    )
}

export default FaqsState