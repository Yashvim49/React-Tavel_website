import React, { useState } from "react";
import VisionContext from "./visionContetxt";

const VisionState = (props) => {
    const host = "http://localhost:5000"
    const visionsInitial = []
    const [visions, setvisions] = useState(visionsInitial)

    //Get All vision
    const getVision = async () => {
        //Todo :api call
        const response = await fetch(`${host}/api/visions/fetchallvisions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // eslint-disable-next-line no-unused-vars
        const json = await response.json()
        // console.log(json)
        setvisions(json)
    }

    //Add vision
    const addVisions = async (title, description, img) => {
        //Todo :api call
        const response = await fetch(`${host}/api/visions/addvisions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, img })
        });
        const vision = await response.json();
        setvisions(visions.concat(vision))
    }

      //Delete vision
      const deleteVision = async (id) => {
        //Todo :api call
        const response = await fetch(`${host}/api/visions/deletevisions/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const json =await response.json();
        console.log(json)
        const newVisions = visions.filter((vision) => { return vision._id !== id })
        setvisions(newVisions)
    }

    //Edit vision
    const editVision = async (id, title, description, img) => {
        //API call
        const response = await fetch(`${host}/api/visions/updatevisions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, img })
        });
        const json = await response.json();
        console.log(json)

        let newVisions = JSON.parse(JSON.stringify(visions))
        //logic to edit in client side
        for (let i = 0; i < newVisions.length; i++) {
            const element = newVisions[i];
            if (element._id === id) {
                newVisions[i].title = title;
                newVisions[i].description = description;
                newVisions[i].img = img;
                break;
            }
        }
        setvisions(newVisions);
    }

    return (
        <VisionContext.Provider value={{ visions, getVision,addVisions,deleteVision,editVision }}>
            {props.children}
        </VisionContext.Provider>
    )
}

export default VisionState