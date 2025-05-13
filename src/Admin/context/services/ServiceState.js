import React, { useState } from "react";
import ServiceContext from "./serviceContetxt";

const ServiceState = (props) => {
    const host = "http://localhost:5000"
    const servicesInitial = []
    const [services, setservices] = useState(servicesInitial)

    //Get All Note
    const getService = async () => {
        //Todo :api call
        const response = await fetch(`${host}/api/services/fetchallservices`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // eslint-disable-next-line no-unused-vars
        const json = await response.json()
        // console.log(json)
        setservices(json)
    }

    //Add Note
    const addServices = async (title, description, img) => {
        //Todo :api call
        const response = await fetch(`${host}/api/services/addservices`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, img })
        });
        const service = await response.json();
        setservices(services.concat(service))
    }
      //Delete Note
      const deleteService = async (id) => {
        //Todo :api call
        const response = await fetch(`${host}/api/services/deleteservices/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const json =await response.json();
        const newServices = services.filter((service) => { return service._id !== id })
        setservices(newServices)
       


    }
    //Edit Note
    const editService = async (id, title, description, img) => {
        //API call
        const response = await fetch(`${host}/api/services/updateservices/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, img })
        });
        const json = await response.json();
        console.log(json)

        let newServices = JSON.parse(JSON.stringify(services))
        //logic to edit in client side
        for (let i = 0; i < newServices.length; i++) {
            const element = newServices[i];
            if (element._id === id) {
                newServices[i].title = title;
                newServices[i].description = description;
                newServices[i].img = img;
                break;
            }
        }
        setservices(newServices);
    }

    return (
        <ServiceContext.Provider value={{ services, addServices,getService,deleteService,editService }}>
            {props.children}
        </ServiceContext.Provider>
    )
}

export default ServiceState