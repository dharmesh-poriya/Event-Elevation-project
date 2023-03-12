import React, { Children, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Event.css';
import { BASE_URL } from '../../config';
import { WithContext as ReactTags } from 'react-tag-input';


let initialEventDetails = {
    name: '',
    description: '',
    image: 'default-event-poster.gif',
    startDate: Date.now(),
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
function CreateEventModel() {
    
    const [eventDetails, setEventDetails] = useState(initialEventDetails);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [tags, setTags] = useState([]);
    // const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        let _tags = tags.map((tag) => tag.text).join(',');
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

        const res = await axios.post(BASE_URL + '/api/EventDetails/AddEvent', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            toast.success('Event registered successfully!!');
            console.log("res : ", res.data);
            setEventDetails(initialEventDetails);
            // navigate('/allevents')
            window.location.href = '/allevents';
            document.getElementById('create-event-form').form().reset();
        }).catch((err) => {
            toast.error('Error : ', 'Server Error');
        });
        console.log("Event registration res : ", res.data);
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
            <div className="modal fade modal-xl" id="createEventModel" tabIndex="-1" aria-labelledby="createEventModelLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="createEventModelLabel">Register New Event</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit} method={'post'} encType={"multipart/form-data"} id='create-event-form'>
                            <div className="modal-body">
                                <div className='my-2'>
                                    <input type="text" name="name" placeholder='Event Title' className="form-control" onChange={handleChange} required={'required'} />
                                </div>
                                <div className='my-2'>
                                    <input type="file" name="imageFile" placeholder='Event Poster' accept='image/png, image/gif, image/jpeg, image/jpg' className="form-control" onChange={(e) => { setImageFile(e.target.files[0]); handleFileInputChange(e); }} required={'required'} />
                                </div>
                                <div className='my-2'>
                                    {previewUrl && <img className='w-50' src={previewUrl} alt="Preview" />}
                                </div>
                                <div className='my-2'>
                                    <textarea type="text" name="description" placeholder='Event Description' className="form-control" rows={4} onChange={handleChange} required={'required'} ></textarea>
                                </div>
                                {/* <div className='my-2'>
                                    <input type="file" name="image" placeholder='Event Image' className="form-control" onChange={(e) => setImageFile(e.target.files[0])} required={'required'} />
                                </div> */}
                                <div className='my-2'>
                                    <input type="date" name="startDate" placeholder='Event Start Date ' className="form-control" min={Date.now()} max="2033-01-01" onChange={handleChange} required={'required'} />
                                </div>
                                <div className='my-2'>
                                    <input type="time" name="startTime" placeholder='Event Start Time' className="form-control" onChange={handleChange} required={'required'} />
                                </div>
                                <div className='my-2'>
                                    <input type="date" name="endDate" placeholder='Event End Date' className="form-control" value={eventDetails.endDate} min={Date.now()} max="2033-01-01" onChange={handleChange} required={'required'} />
                                </div>
                                <div className='my-2'>
                                    <input type="time" name="endTime" placeholder='Event End Time ' className="form-control" value={eventDetails.endTime} onChange={handleChange} required={'required'} />
                                </div>
                                <div className='my-2'>
                                    <select name="mode" className="form-select" aria-label="Default select example" onChange={handleChange} required={'required'}>
                                        <option value="">Select Event Mode</option>
                                        <option value="Online">Online</option>
                                        <option value="Offline">Offline</option>
                                    </select>
                                </div>
                                <div className='my-2'>
                                    <input type="text" name="location" placeholder='Event Location' className="form-control" onChange={handleChange} required={'required'} />
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
                                    <input type="text" name="organiser" placeholder='Event Organiser' className="form-control" onChange={handleChange} required={'required'} />
                                </div>
                                <div className='my-2'>
                                    <textarea type="text" name="organiserDescription" placeholder='Event Organiser Description' className="form-control" rows={2} onChange={handleChange} required={'required'} ></textarea>
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

export default CreateEventModel