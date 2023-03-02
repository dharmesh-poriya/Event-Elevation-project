import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';

function AddTags() {
    const { eventId } = useParams();
    const [tags, setTags] = useState([]);
    const [selectedChoices, setSelectedChoices] = useState([]);
    const [eventTags1, seteventTags1] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            const res = await axios.get(BASE_URL + '/api/Tags');
            setTags(res.data);

            await axios.get(BASE_URL + '/api/EventsTags/event/' + eventId).then((res) => {
                seteventTags1(res.data);
                for (let i = 0; i < res.data.length; i++) {
                    eventTags1.push(res.data[i].id);
                }
                console.log('Event Tags : ', eventTags1);
            }).catch((err) => {
                console.log('Error : ', err.message);
            });

        }
        fetchTags();
    }, []);


    const handleChoiceChange = (e) => {
        const choiceId = parseInt(e.target.value);
        if (e.target.checked) {
            setSelectedChoices([...selectedChoices, choiceId]);
        } else {
            setSelectedChoices(selectedChoices.filter(id => id !== choiceId));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('selected choices : ', selectedChoices);
        const formData = [];
        for (let i = 0; i < selectedChoices.length; i++) {
            let len = formData.push({ 'eventId': eventId, 'tagId': selectedChoices[i] })
            console.log("Length : ", len);
        }
        axios.post(BASE_URL + '/api/EventsTags', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log(res);
            window.location.reload();
            toast.success('Tags Added Successfully');
        }).catch((err) => {
            toast.error('Error : ', err.message);
        });

    }

    return (
        <>
            <div className="modal fade" id="addTagsModal" tabIndex="-1" aria-labelledby="addTagsModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addTagsModalLabel">Add Tags in Your Event</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                {tags && tags.map((tag) => {
                                    if (eventTags1 && eventTags1.includes(tag.id)===false) {
                                        return (
                                            <div className="form-check" key={tag.id}>
                                                <input className="form-check-input" type="checkbox" value={tag.id} id={tag.id} checked={selectedChoices.includes(tag.id)} onChange={handleChoiceChange} />
                                                <label className="form-check-label" htmlFor={tag.id}>
                                                    {tag.name}
                                                </label>
                                            </div>
                                        );
                                    } else {
                                        return null;
                                    }
                                })
                                }
                            </div>
                            <p>Selected Choices: {JSON.stringify(selectedChoices)}</p>
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

export default AddTags