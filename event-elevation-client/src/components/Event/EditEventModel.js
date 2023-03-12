import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Event.css';
import { BASE_URL } from '../../config';
import { WithContext as ReactTags } from 'react-tag-input';

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

const KeyCodes = {
    comma: 188,
    enter: 13
};


const delimiters = [KeyCodes.comma, KeyCodes.enter];

function EditEventModel({ currentEvent }) {

    const [eventDetails, setEventDetails] = useState(initialEventDetails);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [tags, setTags] = useState([]);

    function resetEventDetailsToForm() {
        if (currentEvent) {
            setEventDetails({ ...initialEventDetails, ...currentEvent });
            let taglist = String(currentEvent.tags).split(',');
            let tagsObj = [];
            for (let str of taglist) {
                tagsObj.push({ 'id': str, 'text': str })
            }
            setTags(tagsObj);
            document.getElementById("my-form").elements.namedItem("imageFile").value = "";
            setPreviewUrl(BASE_URL + '/api/EventDetails/event-poster/' + currentEvent.image);
        }
    }
    useEffect(() => {
        console.log('object : ', currentEvent);
        if (currentEvent) {
            // currentEvent.imageFile = ;
            // console.log("CI : ",currentEvent.imageFile)
            setEventDetails({ ...initialEventDetails, ...currentEvent });
            console.log("Current Event : ", currentEvent);
            let taglist = String(currentEvent.tags).split(',');
            let tagsObj = [];
            for (let str of taglist) {
                tagsObj.push({ 'id': str, 'text': str })
            }
            // console.log('tagsObj', tagsObj);
            setTags(tagsObj)
            setPreviewUrl(BASE_URL + '/api/EventDetails/event-poster/' + currentEvent.image);
            // setImageFile(currentEvent.imageFile);
        }
    }, [currentEvent]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Edited Event Details : ', eventDetails);
        // return;
        const formData = new FormData();
        let _tags = tags.map((tag) => tag.text).join(',');
        formData.append('Id', eventDetails.id);
        formData.append('Name', eventDetails.name);
        formData.append('Description', eventDetails.description);
        formData.append('Image', eventDetails.image);
        formData.append('tags', _tags);
        formData.append('StartDate', eventDetails.startDate);
        formData.append('StartTime', eventDetails.startTime);
        formData.append('EndDate', eventDetails.endDate);
        formData.append('EndTime', eventDetails.endTime);
        formData.append('Mode', eventDetails.mode);
        formData.append('Location', eventDetails.location);
        formData.append('Organiser', eventDetails.organiser);
        formData.append('OrganiserDescription', eventDetails.organiserDescription);
        formData.append('ImageFile', imageFile);
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
            toast.error('Error : ', "Server Error");
        });
        console.log("Event res : ", res.data);
    };
    const handleChange = (event) => {
        setEventDetails({ ...eventDetails, [event.target.name]: event.target.value });
    };

    // tags methods
    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    };

    const handleFileInputChange = (event) => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(selectedFile);
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
                        <form onSubmit={handleSubmit} method={'post'} encType={"multipart/form-data"} id='my-form'>
                            <div className="modal-body">
                                <div className='my-2'>
                                    <input type="text" name="name"
                                        value={eventDetails.name || ''}
                                        placeholder='Event Title' className="form-control" onChange={handleChange} required={'required'} />
                                </div>
                                <div className='my-2'>
                                    <input type="file" name="imageFile" placeholder='Event Poster' accept='image/png, image/gif, image/jpeg, image/jpg' className="form-control" onChange={(e) => { setImageFile(e.target.files[0]); handleFileInputChange(e);
                                    setEventDetails({...eventDetails,'image':e.target.files[0].name}) }} />
                                </div>
                                <div className='my-2'>
                                    {previewUrl && <img className='w-50' src={previewUrl} alt="Preview" />}
                                </div>
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
                                    <ReactTags
                                        tags={tags}
                                        delimiters={delimiters}
                                        handleDelete={handleDelete}
                                        handleAddition={handleAddition}
                                        handleDrag={handleDrag}
                                        inputFieldPosition="bottom"
                                        autocomplete
                                        classNames={{
                                            tags: 'ReactTags',
                                            remove: 'ReactTags__remove',
                                            suggestions: 'tags__suggestions',
                                            tagInputField: 'form-control'
                                        }}
                                        required
                                    />
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
                                <button type="button" className="btn btn-info" onClick={resetEventDetailsToForm}>Reset</button>
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