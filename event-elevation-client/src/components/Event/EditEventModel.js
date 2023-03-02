import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Event.css';
import { BASE_URL } from '../../config';

let initialEventDetails = {
    name: '',
    description: '',
    image: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    mode: '',
    location: '',
    organiser: '',
    organiserDescription: '',
}

function EditEventModel({ currentEvent }) {

    const [eventDetails, setEventDetails] = useState(initialEventDetails);
    const [imageFile, setImageFile] = useState(null);
    useEffect(() => {
        console.log('object : ', currentEvent);
        if (currentEvent) {
            // initialEventDetails = currentEvent;
            // currentEvent.imageFile = BASE_URL + '/api/EventDetails/event-poster/' + currentEvent.image;
            // console.log(currentEvent.imageFile)
            setEventDetails({ ...initialEventDetails, ...currentEvent });
            
            // setImageFile(currentEvent.imageFile);
        }
    }, [currentEvent]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Edited Event Details : ', eventDetails);
        // return;
        const formData = new FormData();
        formData.append('Id', eventDetails.id);
        formData.append('Name', eventDetails.name);
        formData.append('Description', eventDetails.description);
        formData.append('Image', eventDetails.image);
        formData.append('StartDate', eventDetails.startDate);
        formData.append('StartTime', eventDetails.startTime);
        formData.append('EndDate', eventDetails.endDate);
        formData.append('EndTime', eventDetails.endTime);
        formData.append('Mode', eventDetails.mode);
        formData.append('Location', eventDetails.location);
        formData.append('Organiser', eventDetails.organiser);
        formData.append('OrganiserDescription', eventDetails.organiserDescription);
        formData.append('ImageFile', "fdsfd");
        // console.log("Form Data : ",formData)

        const res = await axios.put(BASE_URL + '/api/EventDetails/' + eventDetails.id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            toast.success('Event updated successfully!!');
            window.location.reload();
            console.log("res : ", res.data);
            // setEventDetails(initialEventDetails);
        }).catch((err) => {
            toast.error('Error : ', err);
        });
        console.log("Event res : ", res.data);
    };
    const handleChange = (event) => {
        setEventDetails({ ...eventDetails, [event.target.name]: event.target.value });
    };

    return (
        <>
            {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createEventModel">
                Launch demo modal
            </button> */}
            <div className="modal fade modal-xl" id="editEventModel" tabIndex="-1" aria-labelledby="editEventModelLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editEventModelLabel">Edit Event Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit} method={'post'} encType={"multipart/form-data"}>
                            <div className="modal-body">
                                <div className='my-2'>
                                    <input type="text" name="name"
                                        value={eventDetails.name || ''}
                                        placeholder='Event Title' className="form-control" onChange={handleChange} required={'required'} />
                                </div>
                                {/* <div className='my-2'>
                                    <input type="file" name="imageFile"
                                        placeholder='Event Poster' accept='image/png, image/gif, image/jpeg, image/jpg' className="form-control" onChange={(e) => setImageFile(e.target.files[0])} required={'required'} />
                                </div> */}
                                <div className='my-2'>
                                    <textarea type="text" name="description"
                                        value={eventDetails.description}
                                        placeholder='Event Description' className="form-control" rows={4} onChange={handleChange} required={'required'} ></textarea>
                                </div>
                                {/* <div className='my-2'>
                                    <input type="file" name="image" placeholder='Event Image' className="form-control" onChange={(e) => setImageFile(e.target.files[0])} required={'required'} />
                                </div> */}
                                <div className='my-2'>
                                    <input type="date" name="startDate"
                                        value={eventDetails.startDate.slice(0, 10)}
                                        placeholder='Event Start Date ' className="form-control" min={Date.now()} max="2033-01-01" onChange={handleChange} required={'required'} />
                                </div>
                                <div className='my-2'>
                                    <input type="time" name="startTime"
                                        value={eventDetails.startTime || ''}
                                        placeholder='Event Start Time' className="form-control" onChange={handleChange} required={'required'} />
                                </div>
                                <div className='my-2'>
                                    <input type="date" name="endDate" value={eventDetails.endDate.slice(0, 10)} placeholder='Event End Date' className="form-control" min={Date.now()} max="2033-01-01" onChange={handleChange} required={'required'} />
                                </div>
                                <div className='my-2'>
                                    <input type="time" name="endTime" value={eventDetails.endTime} placeholder='Event End Time ' className="form-control" onChange={handleChange} required={'required'} />
                                </div>
                                <div className='my-2'>
                                    <select name="mode" className="form-select" value={eventDetails.mode} aria-label="Default select example" onChange={handleChange} required={'required'}>
                                        <option value="">Select Event Mode</option>
                                        <option value="Online">Online</option>
                                        <option value="Offline">Offline</option>
                                    </select>
                                </div>
                                <div className='my-2'>
                                    <input type="text" name="location" value={eventDetails.location} placeholder='Event Location' className="form-control" onChange={handleChange} required={'required'} />
                                </div>
                                <div className='my-2'>
                                    <input type="text" name="organiser" value={eventDetails.organiser} placeholder='Event Organiser' className="form-control" onChange={handleChange} required={'required'} />
                                </div>
                                <div className='my-2'>
                                    <textarea type="text" name="organiserDescription" value={eventDetails.organiserDescription} placeholder='Event Organiser Description' className="form-control" rows={2} onChange={handleChange} required={'required'} ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditEventModel